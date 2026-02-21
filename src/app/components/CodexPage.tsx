/**
 * CodexPage — Report Engine Pro
 * ===============================
 * Full React port of Codex v1.5 (originally vanilla JS + XLSX).
 * Generates paginated A4 report pages from Excel data with
 * POLIS (Coworking/Uffici) or Libero template support.
 *
 * Architecture:
 *   CodexPage (state + orchestration)
 *   ├── BentoHeader (app branding)
 *   ├── ConfigPanel (template, sub-type, date, title, file upload)
 *   ├── ReportOutput (paginated A4 pages)
 *   │   └── PageA4 (single report page w/ table)
 *   ├── ActionBar (fixed bottom: reset, generate, print)
 *   └── BentoFooter
 *
 * feat-033 — Φ6 Integrazione Codex.
 */

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  Upload,
  RotateCcw,
  FileText,
  Check,
  Download,
  Loader2,
  Printer,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import { DS, LOGO_PRESET } from "./design-system";
import { S } from "./strings";
import { useBentoTheme } from "./ds/ThemeContext";
import { BentoPageShell } from "./ds/BentoPageShell";
import { BentoHeader } from "./ds/BentoHeader";
import { BentoFooter } from "./BentoFooter";
import { DSVersionBadge } from "./ds/DSVersionBadge";
import { DSDropZone } from "./ds/DSDropZone";
import { CodexLogo } from "./CodexLogo";
import { useFeatureFlag } from "./feature-flags";

/* Logo assets for the generated PDF report */
import logoPoste from "figma:asset/f79ad82d260913c8616bb49e6efce9dfd1d0e7ab.png";
import logoPolis from "figma:asset/ce9083a0bd5e59f0689375902d8de59b10599506.png";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type Template = "libero" | "polis";
type PolisSubType = "coworking" | "uffici";

interface PageData {
  rows: string[][];
  pageNum: number;
  totalPages: number;
}

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

const ROWS_PER_PAGE = 22;
const HEADER_ROWS_SKIP = 4;
const DEFAULT_COLUMNS = 3;

/** Codex app accent — green */
const CX_ACCENT = DS.DATA_GREEN;

const MESI = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre",
];

/** Report brand colors (Poste Italiane CI — not Bento DS tokens) */
const RPT = {
  BLUE: "#0047bb",
  YELLOW: "#eedc00",
  TEXT: "#333333",
  FOOTER: "#999999",
} as const;

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatDateIT(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day} ${MESI[parseInt(month, 10) - 1]} ${year}`;
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

function buildTitle(
  subType: PolisSubType,
  dateStr: string,
  rowCount: number,
): string {
  const base =
    subType === "coworking"
      ? "Spazi di Co-Working ultimati al"
      : "Uffici Postali ultimati al";
  return `${rowCount > 0 ? `${rowCount} ` : ""}${base} ${formatDateIT(dateStr)}`;
}

/**
 * Compute rowspan for the first two columns (POLIS mode).
 * Returns a 2D boolean mask: `true` = cell consumed by a span above.
 */
function buildSpanMask(
  rows: string[][],
  colCount: number,
): boolean[][] {
  const mask: boolean[][] = rows.map(() => new Array(colCount).fill(false));
  for (let c = 0; c < Math.min(colCount, 2); c++) {
    for (let i = 0; i < rows.length; i++) {
      if (mask[i][c]) continue;
      const val = (rows[i]?.[c] ?? "").trim();
      if (!val) continue;
      for (let j = i + 1; j < rows.length; j++) {
        const next = (rows[j]?.[c] ?? "").trim();
        if (next === val) {
          mask[j][c] = true;
        } else {
          break;
        }
      }
    }
  }
  return mask;
}

function getSpan(
  rows: string[][],
  mask: boolean[][],
  rowIdx: number,
  colIdx: number,
): number {
  if (mask[rowIdx][colIdx]) return 0; // consumed
  let span = 1;
  for (let j = rowIdx + 1; j < rows.length; j++) {
    if (mask[j][colIdx]) span++;
    else break;
  }
  return span;
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

/** Label component for form fields — matches Katana font-black pattern */
function FieldLabel({ children }: { children: React.ReactNode }) {
  const { isDark: d } = useBentoTheme();
  return (
    <label
      className="block font-mono font-black uppercase tracking-wider"
      style={{
        fontSize: DS.FONT_SMALL,
        color: d ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
        marginBottom: DS.SPACE_2,
      }}
    >
      {children}
    </label>
  );
}

/** Styled text input — brutalist (Katana-aligned: BORDER_WIDTH_MEDIUM, RADIUS_NONE) */
function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const { isDark: d } = useBentoTheme();
  const formBg = d ? DS.BG_SURFACE : DS.BRUTALIST_INPUT_BG;
  return (
    <input
      {...props}
      className="w-full font-sans outline-none"
      style={{
        padding: `${DS.SPACE_3} ${DS.SPACE_4}`,
        border: `${DS.BORDER_WIDTH_MEDIUM} solid ${d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
        borderRadius: DS.RADIUS_NONE,
        backgroundColor: formBg,
        color: d ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY,
        fontSize: DS.FONT_BASE,
        transition: `border-color ${DS.TRANSITION_FAST}`,
        ...props.style,
      }}
    />
  );
}

/** Segmented control — brutalist toggle (Katana-aligned) */
function SegmentedControl({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  const { isDark: d } = useBentoTheme();
  return (
    <div
      className="flex relative"
      style={{
        backgroundColor: d ? DS.BG_SURFACE : DS.ON_LIGHT_BG,
        border: `${DS.BORDER_WIDTH_MEDIUM} solid ${d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
        borderRadius: DS.RADIUS_NONE,
        padding: DS.SPACE_1,
        gap: DS.SPACE_1,
      }}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="flex-1 font-mono font-black uppercase relative z-10"
            style={{
              padding: `${DS.SPACE_3} ${DS.SPACE_4}`,
              fontSize: DS.FONT_SMALL,
              letterSpacing: DS.LS_WIDE,
              backgroundColor: active ? CX_ACCENT : "transparent",
              color: active
                ? DS.TEXT_INVERSE
                : d
                  ? DS.TEXT_SECONDARY
                  : DS.ON_LIGHT_TEXT_SECONDARY,
              border: "none",
              cursor: "pointer",
              transition: `all ${DS.TRANSITION_FAST}`,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/** Radio card for POLIS sub-type — brutalist (Katana-aligned) */
function RadioCard({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  const { isDark: d } = useBentoTheme();
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex justify-between items-center w-full font-sans"
      style={{
        padding: `${DS.SPACE_3} ${DS.SPACE_4}`,
        border: `${DS.BORDER_WIDTH_MEDIUM} solid ${
          checked ? CX_ACCENT : d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300
        }`,
        borderRadius: DS.RADIUS_NONE,
        backgroundColor: checked
          ? `${CX_ACCENT}18`
          : "transparent",
        cursor: "pointer",
        transition: `all ${DS.TRANSITION_FAST}`,
        fontSize: DS.FONT_BASE,
        color: d ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY,
      }}
    >
      <span>{label}</span>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: DS.RADIUS_CIRCLE,
          border: checked
            ? `${DS.SPACE_3} solid ${CX_ACCENT}`
            : `${DS.BORDER_WIDTH_REGULAR} solid ${d ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_300}`,
          backgroundColor: d ? DS.BG_SURFACE : DS.ON_LIGHT_BG,
          transition: `all ${DS.TRANSITION_FAST}`,
          flexShrink: 0,
        }}
      />
    </button>
  );
}

/** Single A4 page rendering */
function PageA4({
  data,
  isPolis,
  title,
  numCols,
}: {
  data: PageData;
  isPolis: boolean;
  title: string;
  numCols: number;
}) {
  const spanMask = useMemo(
    () => (isPolis ? buildSpanMask(data.rows, numCols) : null),
    [isPolis, data.rows, numCols],
  );

  return (
    <div
      className="codex-page-a4"
      style={{
        backgroundColor: DS.ON_LIGHT_BG,
        width: "210mm",
        height: "297mm",
        padding: "15mm",
        margin: "40px auto",
        position: "relative",
        boxShadow: "0 0 30px rgba(0,0,0,0.05)",
        fontFamily: "Arial, sans-serif",
        color: RPT.TEXT,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Page header — logos */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10mm",
          flexShrink: 0,
        }}
      >
        <img src={logoPoste} alt="Poste Italiane" style={{ height: "16mm" }} />
        {isPolis && (
          <img src={logoPolis} alt="POLIS" style={{ height: "16mm" }} />
        )}
      </div>

      {/* Report title */}
      <div
        style={{
          color: RPT.BLUE,
          fontWeight: "bold",
          fontSize: "14pt",
          textAlign: "center",
          marginBottom: "10mm",
          flexShrink: 0,
        }}
      >
        {title}
      </div>

      {/* Data table — flex: 1 so it fills remaining space without overflow */}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "10pt",
          }}
        >
          <thead>
            <tr>
              {isPolis ? (
                <>
                  <th style={thStyle}>{S.CODEX_COL_REGIONE}</th>
                  <th style={thStyle}>{S.CODEX_COL_PROVINCIA}</th>
                  <th style={thStyle}>{S.CODEX_COL_COMUNE}</th>
                </>
              ) : (
                Array.from({ length: numCols }, (_, i) => (
                  <th key={i} style={thStyle}>
                    {S.CODEX_COL_PREFIX} {i + 1}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <tr key={ri}>
                {Array.from({ length: numCols }, (_, ci) => {
                  if (isPolis && ci < 2 && spanMask) {
                    if (spanMask[ri][ci]) return null; // consumed by rowspan
                    const span = getSpan(data.rows, spanMask, ri, ci);
                    return (
                      <td key={ci} rowSpan={span} style={tdStyle}>
                        {(row[ci] ?? "").toString().trim()}
                      </td>
                    );
                  }
                  return (
                    <td key={ci} style={tdStyle}>
                      {(row[ci] ?? "").toString().trim()}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Page footer — in flow, always at bottom thanks to flex layout */}
      <div
        style={{
          textAlign: "center",
          fontSize: "9pt",
          color: RPT.FOOTER,
          fontWeight: "bold",
          flexShrink: 0,
          paddingTop: "5mm",
        }}
      >
        {S.CODEX_PAGE_LABEL} {data.pageNum} {S.CODEX_PAGE_OF} {data.totalPages}
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  backgroundColor: RPT.YELLOW,
  color: RPT.BLUE,
  border: `1px solid ${RPT.YELLOW}`,
  padding: "6px",
  fontSize: "10pt",
  textAlign: "left",
  fontWeight: "bold",
};

const tdStyle: React.CSSProperties = {
  border: `1px solid ${RPT.YELLOW}`,
  padding: "6px",
  fontSize: "10pt",
  verticalAlign: "top",
};

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */

export function CodexPage() {
  const { isDark: d } = useBentoTheme();
  const ffPdfExport = useFeatureFlag("shiito.pdf-export");

  /* ── State ──────────────────────────────────────────────────────── */
  const [template, setTemplate] = useState<Template>("polis");
  const [subType, setSubType] = useState<PolisSubType>("coworking");
  const [reportDate, setReportDate] = useState(todayISO());
  const [reportTitle, setReportTitle] = useState("");
  const [numCols, setNumCols] = useState(DEFAULT_COLUMNS);
  const [workbook, setWorkbook] = useState<XLSX.WorkBook | null>(null);
  const [fileName, setFileName] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [pages, setPages] = useState<PageData[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const reportRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Derived title (POLIS auto-gen) ─────────────────────────────── */
  useEffect(() => {
    if (template === "polis") {
      setReportTitle(buildTitle(subType, reportDate, rowCount));
    }
  }, [template, subType, reportDate, rowCount]);

  /* ── File handling ──────────────────────────────────────────────── */
  const handleFile = useCallback(async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      setWorkbook(wb);
      setFileName(file.name);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(ws, { header: 1 });
      const count = Math.max(0, rows.length - HEADER_ROWS_SKIP);
      setRowCount(count);
      toast.success(`${S.CODEX_DROP_OK}: ${file.name} (${count} ${S.CODEX_DROP_ROWS})`);
    } catch {
      toast.error(S.CODEX_ALERT_FILE_ERROR);
    }
  }, []);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  /* ── Generate report ────────────────────────────────────────────── */
  const generateReport = useCallback(() => {
    if (!workbook) {
      toast.error(S.CODEX_ALERT_NO_FILE);
      return;
    }
    const isPolis = template === "polis";
    const cols = isPolis ? 3 : numCols;
    const ws = workbook.Sheets[workbook.SheetNames[0]];
    const allRows = XLSX.utils
      .sheet_to_json<string[]>(ws, { header: 1 })
      .slice(HEADER_ROWS_SKIP);

    const totalPages = Math.ceil(allRows.length / ROWS_PER_PAGE);
    const newPages: PageData[] = [];
    for (let p = 0; p < totalPages; p++) {
      const pageRows = allRows.slice(
        p * ROWS_PER_PAGE,
        (p + 1) * ROWS_PER_PAGE,
      );
      // Ensure each row has enough columns
      const normalizedRows = pageRows.map((row) => {
        const r = Array.isArray(row) ? row : [];
        while (r.length < cols) r.push("");
        return r.map(String);
      });
      newPages.push({
        rows: normalizedRows,
        pageNum: p + 1,
        totalPages,
      });
    }
    setPages(newPages);
    // Scroll to report after a tick
    requestAnimationFrame(() => {
      reportRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [workbook, template, numCols]);

  /* ── Auto-generate when workbook or config changes ──────────── */
  useEffect(() => {
    if (workbook) generateReport();
  }, [generateReport]);

  /* ── Reset ──────────────────────────────────────────────────────── */
  const handleReset = useCallback(() => {
    setWorkbook(null);
    setFileName("");
    setRowCount(0);
    setPages([]);
    setReportTitle("");
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  /* ── Download PDF ──────────────────────────────────────────────── */
  const handleDownloadPDF = useCallback(async () => {
    if (!reportRef.current) return;
    setIsDownloading(true);
    try {
      const pageElements = reportRef.current.querySelectorAll(".codex-page-a4");
      if (pageElements.length === 0) return;

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfW = pdf.internal.pageSize.getWidth();   // 210
      const pdfH = pdf.internal.pageSize.getHeight();   // 297

      for (let i = 0; i < pageElements.length; i++) {
        const el = pageElements[i] as HTMLElement;
        const canvas = await html2canvas(el, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        });
        const imgData = canvas.toDataURL("image/jpeg", 0.92);

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, 0, pdfW, pdfH);
      }

      // Build safe filename from report title
      const safeName =
        reportTitle
          .replace(/[^a-zA-Z0-9\u00C0-\u024F\s-]/g, "")
          .replace(/\s+/g, "_")
          .substring(0, 60) || "report_codex";
      pdf.save(`${safeName}.pdf`);
      toast.success("PDF scaricato con successo");
    } catch (err) {
      console.error("Codex PDF generation error:", err);
      toast.error("Errore nella generazione del PDF");
    } finally {
      setIsDownloading(false);
    }
  }, [reportTitle]);

  const isPolis = template === "polis";

  /* ── Styles ─────────────────────────────────────────────────────── */
  const panelBg = d ? DS.BG_CARD : DS.ON_LIGHT_BG;
  const panelBorder = d
    ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
    : DS.BRUTALIST_BORDER;
  const panelShadow = d ? "none" : DS.BRUTALIST_SHADOW_LG;

  return (
    <BentoPageShell className="codex-shell">
      <BentoHeader
        backTo="/"
        icon={<CodexLogo size={22} color={LOGO_PRESET.ON_DARK.color} />}
        iconBg={DS.DATA_GREEN}
        iconBgDark={DS.DATA_GREEN}
        title={S.CODEX_TITLE}
        subtitle={S.CODEX_SUBTITLE}
        kanji={S.CODEX_KANJI}
      >
        {/* Version badge */}
        <span className="hidden sm:inline-flex items-center gap-2">
          <span
            className="font-mono font-black uppercase"
            style={{
              fontSize: DS.FONT_SMALL,
              color: d ? DS.TEXT_SECONDARY : DS.TEXT_DIM,
            }}
          >
            {S.CODEX_VERSION}
          </span>
          <DSVersionBadge tag="beta" />
        </span>
      </BentoHeader>

      <main className="flex-1 w-full max-w-3xl mx-auto px-5 py-8 codex-no-print">
        {/* ── Config Panel ──────────────────────────────────────── */}
        <div
          className="p-5 space-y-5"
          style={{
            backgroundColor: panelBg,
            border: panelBorder,
            boxShadow: panelShadow,
          }}
        >
          {/* Template selector */}
          <div>
            <FieldLabel>{S.CODEX_CFG_TEMPLATE}</FieldLabel>
            <SegmentedControl
              value={template}
              onChange={(v) => setTemplate(v as Template)}
              options={[
                { value: "libero", label: S.CODEX_TEMPLATE_LIBERO },
                { value: "polis", label: S.CODEX_TEMPLATE_POLIS },
              ]}
            />
          </div>

          {/* Columns count — LIBERO only */}
          {!isPolis && (
            <div>
              <FieldLabel>{S.CODEX_CFG_COLUMNS}</FieldLabel>
              <StyledInput
                type="number"
                min={1}
                max={10}
                value={numCols}
                onChange={(e) => setNumCols(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
              />
            </div>
          )}

          {/* Sub-type — POLIS only */}
          {isPolis && (
            <div>
              <FieldLabel>{S.CODEX_CFG_SUBTYPE}</FieldLabel>
              <div className="grid grid-cols-2" style={{ gap: DS.SPACE_3 }}>
                <RadioCard
                  label={S.CODEX_CFG_SUBTYPE_COWORKING}
                  checked={subType === "coworking"}
                  onChange={() => setSubType("coworking")}
                />
                <RadioCard
                  label={S.CODEX_CFG_SUBTYPE_UFFICI}
                  checked={subType === "uffici"}
                  onChange={() => setSubType("uffici")}
                />
              </div>
            </div>
          )}

          {/* Date input — POLIS only */}
          {isPolis && (
            <div>
              <FieldLabel>{S.CODEX_CFG_DATE}</FieldLabel>
              <StyledInput
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
            </div>
          )}

          {/* Report title */}
          <div>
            <FieldLabel>{S.CODEX_CFG_REPORT_TITLE}</FieldLabel>
            <StyledInput
              type="text"
              value={reportTitle}
              onChange={(e) => setReportTitle(e.target.value)}
              placeholder={S.CODEX_CFG_REPORT_TITLE_PLACEHOLDER}
            />
          </div>

          {/* File upload */}
          <div>
            <FieldLabel>{S.CODEX_CFG_UPLOAD}</FieldLabel>
            {fileName ? (
              /* ── File loaded indicator (brutalist) ── */
              <div
                className="flex items-center justify-between p-4"
                style={{
                  border: d
                    ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
                    : DS.BRUTALIST_BORDER,
                  backgroundColor: d ? DS.BG_SURFACE : DS.ON_LIGHT_BG,
                }}
              >
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" style={{ color: DS.DATA_GREEN }} />
                  <span
                    className="font-mono font-bold"
                    style={{ fontSize: DS.FONT_BASE, color: d ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG }}
                  >
                    {fileName}
                  </span>
                  <span
                    className="font-mono"
                    style={{ fontSize: DS.FONT_SMALL, color: d ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED }}
                  >
                    ({rowCount} {S.CODEX_DROP_ROWS})
                  </span>
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="font-mono font-black uppercase"
                  style={{
                    fontSize: DS.FONT_TINY,
                    letterSpacing: DS.LS_WIDE,
                    color: d ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_TERTIARY,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Cambia
                </button>
              </div>
            ) : (
              /* ── DSDropZone (shared DS component) ── */
              <DSDropZone
                onFile={handleFile}
                title={S.CODEX_DROP_HINT}
                subtitle=".xlsx, .xls"
                accept=".xlsx,.xls"
                icon={<Upload className="w-6 h-6" />}
              />
            )}
            <input
              ref={fileRef}
              type="file"
              accept=".xlsx,.xls"
              hidden
              onChange={onFileChange}
            />
          </div>
        </div>

        {/* ── Empty state ──────────────────────────────────────── */}
        {pages.length === 0 && (
          <div
            className="flex flex-col items-center justify-center gap-3"
            style={{
              padding: `${DS.SPACE_10} ${DS.SPACE_6}`,
              marginTop: DS.SPACE_6,
              border: `${DS.BORDER_WIDTH_THIN} dashed ${d ? DS.BORDER_SUBTLE : DS.ON_LIGHT_BORDER}`,
            }}
          >
            <FileText
              className="w-8 h-8"
              style={{ color: d ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED, opacity: 0.5 }}
            />
            <p
              className="font-sans text-center"
              style={{
                fontSize: DS.FONT_BASE,
                color: d ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
              }}
            >
              {S.CODEX_EMPTY}
            </p>
          </div>
        )}
      </main>

      {/* ── Report Output ─────────────────────────────────────── */}
      {pages.length > 0 && (
        <div className="codex-no-print max-w-3xl mx-auto w-full px-5">
          <div
            className="flex items-center justify-between py-4"
            style={{ borderBottom: `${DS.BORDER_WIDTH_THIN} solid ${d ? DS.BORDER_SUBTLE : DS.ON_LIGHT_BORDER}` }}
          >
            <span
              className="font-mono font-bold"
              style={{ fontSize: DS.FONT_BASE, color: d ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_SECONDARY }}
            >
              {pages.length} {pages.length === 1 ? "pagina" : "pagine"}
            </span>
            <div className="flex items-center" style={{ gap: DS.SPACE_3 }}>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider transition-opacity hover:opacity-70"
                style={{
                  fontSize: DS.FONT_SMALL,
                  color: d ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_TERTIARY,
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {S.CODEX_BTN_RESET}
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading || !ffPdfExport}
                className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-wider transition-opacity hover:opacity-90"
                style={{
                  fontSize: DS.FONT_SMALL,
                  backgroundColor: !ffPdfExport ? (d ? DS.BG_SURFACE : DS.ON_LIGHT_GRAY_300) : CX_ACCENT,
                  color: !ffPdfExport ? (d ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED) : DS.TEXT_INVERSE,
                  padding: `${DS.SPACE_3} ${DS.SPACE_5}`,
                  border: "none",
                  cursor: !ffPdfExport ? "not-allowed" : isDownloading ? "wait" : "pointer",
                  boxShadow: d ? "none" : `3px 3px 0 ${CX_ACCENT}66`,
                  fontWeight: 900,
                  opacity: !ffPdfExport ? 0.5 : 1,
                }}
                title={!ffPdfExport ? "PDF export disabilitato dal Feature Flag" : undefined}
              >
                {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                {isDownloading ? S.CODEX_BTN_DOWNLOAD_BUSY : S.CODEX_BTN_DOWNLOAD}
              </button>
            </div>
          </div>
        </div>
      )}

      {pages.length > 0 && (
        <div ref={reportRef} className="codex-report-output" style={{ paddingBottom: "60px" }}>
          {pages.map((page) => (
            <PageA4
              key={page.pageNum}
              data={page}
              isPolis={isPolis}
              title={reportTitle}
              numCols={isPolis ? 3 : numCols}
            />
          ))}
        </div>
      )}

      <div className="codex-no-print">
        <BentoFooter />
      </div>

      {/* ── feat-132: Floating toolbar — visible when report exists ── */}
      {pages.length > 0 && (
        <div
          className="codex-no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center"
          style={{
            gap: DS.SPACE_2,
            padding: `${DS.SPACE_2} ${DS.SPACE_4}`,
            backgroundColor: d ? DS.BG_CARD : DS.ON_LIGHT_BG,
            border: d
              ? `${DS.BORDER_WIDTH_MEDIUM} solid ${DS.BORDER_DEFAULT}`
              : DS.BRUTALIST_BORDER,
            boxShadow: d ? DS.DARK_SHADOW_LG : DS.BRUTALIST_SHADOW_LG,
          }}
        >
          {/* Download PDF */}
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading || !ffPdfExport}
            className="inline-flex items-center gap-1.5 font-mono font-bold uppercase"
            style={{
              fontSize: DS.FONT_MICRO,
              letterSpacing: DS.LS_WIDE,
              padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
              backgroundColor: !ffPdfExport
                ? (d ? DS.BG_SURFACE : DS.ON_LIGHT_GRAY_200)
                : CX_ACCENT,
              color: !ffPdfExport
                ? (d ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED)
                : DS.TEXT_INVERSE,
              border: "none",
              cursor: !ffPdfExport ? "not-allowed" : isDownloading ? "wait" : "pointer",
              opacity: !ffPdfExport ? 0.5 : 1,
            }}
            title={!ffPdfExport ? "PDF export disabilitato" : "Scarica PDF"}
          >
            {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            PDF
          </button>

          {/* Print (browser Ctrl+P) */}
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 font-mono font-bold uppercase"
            style={{
              fontSize: DS.FONT_MICRO,
              letterSpacing: DS.LS_WIDE,
              padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
              backgroundColor: d ? DS.BG_SURFACE : DS.ON_LIGHT_GRAY_100,
              color: d ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_PRIMARY,
              border: `${DS.BORDER_WIDTH_THIN} solid ${d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
              cursor: "pointer",
            }}
            title="Stampa (Ctrl+P)"
          >
            <Printer className="w-3.5 h-3.5" />
            Stampa
          </button>

          {/* New report (reset) */}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 font-mono font-bold uppercase"
            style={{
              fontSize: DS.FONT_MICRO,
              letterSpacing: DS.LS_WIDE,
              padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
              backgroundColor: "transparent",
              color: d ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_TERTIARY,
              border: `${DS.BORDER_WIDTH_THIN} solid ${d ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
              cursor: "pointer",
            }}
            title="Nuovo report"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Nuovo
          </button>

          {/* Share (copy title to clipboard) */}
          <button
            onClick={() => {
              const text = `${reportTitle} — ${pages.length} pagine`;
              navigator.clipboard.writeText(text).then(
                () => toast.success("Info report copiata"),
                () => toast.error("Copia fallita"),
              );
            }}
            className="inline-flex items-center gap-1.5 font-mono font-bold uppercase"
            style={{
              fontSize: DS.FONT_MICRO,
              letterSpacing: DS.LS_WIDE,
              padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
              backgroundColor: "transparent",
              color: d ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_TERTIARY,
              border: `${DS.BORDER_WIDTH_THIN} solid ${d ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
              cursor: "pointer",
            }}
            title="Copia info report"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ── Print stylesheet (injected inline — Ctrl+P fallback) ── */}
      <style>{`
        @media print {
          /* ── Force A4 page dimensions ──────────────────── */
          @page {
            size: 210mm 297mm;
            margin: 0;
          }

          /* ── Preserve background colors (yellow headers) ── */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* ── Hide all non-report content ────────────────── */
          .codex-no-print,
          .codex-no-print *,
          header, footer, nav {
            display: none !important;
          }

          /* ── Reset body ─────────────────────────────────── */
          html, body {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            min-height: 0 !important;
            height: auto !important;
          }

          /* ── Reset BentoPageShell wrapper (min-h-screen, grid bg) */
          .codex-shell {
            min-height: 0 !important;
            background: white !important;
            background-image: none !important;
            display: block !important;
            padding: 0 !important;
          }

          /* ── A4 page rules ──────────────────────────────── */
          .codex-page-a4 {
            box-shadow: none !important;
            margin: 0 !important;
            page-break-after: always;
            page-break-inside: avoid;
            break-after: page;
            break-inside: avoid;
          }
          .codex-page-a4:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .codex-report-output {
            padding: 0 !important;
          }
        }
      `}</style>
    </BentoPageShell>
  );
}