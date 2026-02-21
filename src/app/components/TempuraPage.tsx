/**
 * TempuraPage — PPTX Template Converter (Poste Italiane)
 * ========================================================
 * Converte qualsiasi presentazione PPTX nel template corporate
 * Poste Italiane attraverso una pipeline a 5 step:
 *   1. Upload file PPTX sorgente
 *   2. Estrazione contenuto (testo, gerarchia, immagini)
 *   3. Classificazione automatica layout per ogni slide
 *   4. Preview e override manuale dei layout assegnati
 *   5. Generazione PPTX branded con pptxgenjs
 *
 * feat-043 — Φ7 Integrazione Tempura.
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 */

import { useState, useCallback, useRef } from "react";
import {
  Upload,
  FileDown,
  RotateCcw,
  ChevronDown,
  FileText,
  ImageIcon,
  Check,
  Loader2,
  ArrowRight,
  Presentation,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

import { DS, LOGO_PRESET } from "./design-system";
import { S } from "./strings";
import { BentoHeader } from "./ds/BentoHeader";
import { BentoPageShell } from "./ds/BentoPageShell";
import { BentoFooter } from "./BentoFooter";
import { useBentoTheme } from "./ds/ThemeContext";
import { TempuraLogo } from "./TempuraLogo";
import { DSActionButton } from "./ds/DSActionButton";
import { DSVersionBadge } from "./ds/DSVersionBadge";
import { DSDropZone } from "./ds/DSDropZone";
import { useFeatureFlag } from "./feature-flags";

import {
  extractSourceContent,
  classifySlides,
  generatePostePptx,
  downloadBlob,
  type ExtractedSlide,
  type ClassifiedSlide,
  type PipelineStep,
} from "./tempura/tempura-engine";
import {
  LAYOUT_CATALOG,
  LAYOUT_ORDER,
  PI_COLORS,
  type LayoutId,
} from "./tempura/tempura-codex";

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const TX = {
  ACCENT: DS.DATA_AMBER,
} as const;

const PIPELINE_STEPS: { key: PipelineStep; label: string; num: string }[] = [
  { key: "extracting", label: S.TEMPURA_STEP_UPLOAD, num: "01" },
  { key: "classifying", label: S.TEMPURA_STEP_EXTRACT, num: "02" },
  { key: "previewing", label: S.TEMPURA_STEP_CLASSIFY, num: "03" },
  { key: "generating", label: S.TEMPURA_STEP_PREVIEW, num: "04" },
  { key: "done", label: S.TEMPURA_STEP_GENERATE, num: "05" },
];

const STEP_ORDER: PipelineStep[] = [
  "idle",
  "extracting",
  "classifying",
  "previewing",
  "generating",
  "done",
];

function stepIndex(step: PipelineStep): number {
  return STEP_ORDER.indexOf(step);
}

/* ------------------------------------------------------------------ */
/* Sub-Components                                                       */
/* ------------------------------------------------------------------ */

/** Section label — mono uppercase, Katana-aligned */
function SectionLabel({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <label
      className="block font-mono font-black uppercase tracking-wider"
      style={{
        fontSize: DS.FONT_SMALL,
        color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
        marginBottom: DS.SPACE_2,
      }}
    >
      {children}
    </label>
  );
}

/** Pipeline step indicator — horizontal bar */
function PipelineBar({
  currentStep,
  isDark,
}: {
  currentStep: PipelineStep;
  isDark: boolean;
}) {
  const current = stepIndex(currentStep);

  return (
    <div
      className="flex items-center gap-0 w-full overflow-hidden"
      style={{
        border: isDark
          ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
          : DS.BRUTALIST_BORDER,
        boxShadow: isDark ? "none" : DS.BRUTALIST_SHADOW_SM,
      }}
    >
      {PIPELINE_STEPS.map((step, i) => {
        const stepIdx = i + 1; // 1-based (idle=0)
        const isActive = current === stepIdx;
        const isDone = current > stepIdx;

        let bg: string;
        let fg: string;
        if (isDone) {
          bg = isDark ? DS.BG_ELEVATED : DS.ON_LIGHT_GRAY_100;
          fg = isDark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_SECONDARY;
        } else if (isActive) {
          bg = TX.ACCENT;
          fg = DS.BG_DEEP;
        } else {
          bg = isDark ? DS.BG_CARD : DS.ON_LIGHT_BG;
          fg = isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED;
        }

        return (
          <div
            key={step.key}
            className="flex-1 flex items-center justify-center gap-1.5 relative"
            style={{
              backgroundColor: bg,
              color: fg,
              padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
              borderRight:
                i < PIPELINE_STEPS.length - 1
                  ? `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`
                  : undefined,
              transition: `background-color ${DS.TRANSITION_NORMAL}, color ${DS.TRANSITION_NORMAL}`,
            }}
          >
            {isDone ? (
              <Check className="w-3 h-3 flex-shrink-0" />
            ) : isActive && currentStep !== "done" ? (
              <Loader2 className="w-3 h-3 flex-shrink-0 animate-spin" />
            ) : null}
            <span
              className="font-mono font-black uppercase truncate"
              style={{ fontSize: DS.FONT_MICRO, letterSpacing: DS.LS_WIDE }}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Slide classification table */
function SlideTable({
  slides,
  onLayoutChange,
  isDark,
  layoutOverrideEnabled,
}: {
  slides: ClassifiedSlide[];
  onLayoutChange: (slideIdx: number, layout: LayoutId) => void;
  isDark: boolean;
  layoutOverrideEnabled: boolean;
}) {
  const panelBg = isDark ? DS.BG_CARD : DS.ON_LIGHT_BG;
  const panelBorder = isDark
    ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
    : DS.BRUTALIST_BORDER;
  const panelShadow = isDark ? "none" : DS.BRUTALIST_SHADOW_LG;

  return (
    <div
      className="overflow-x-auto"
      style={{
        backgroundColor: panelBg,
        border: panelBorder,
        boxShadow: panelShadow,
      }}
    >
      {/* Table header */}
      <div
        className="flex items-center"
        style={{
          padding: `${DS.SPACE_3} ${DS.SPACE_5}`,
          borderBottom: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
        }}
      >
        <Presentation className="w-4 h-4 flex-shrink-0" style={{ color: TX.ACCENT }} />
        <span
          className="font-mono font-black uppercase ml-2"
          style={{
            fontSize: DS.FONT_SMALL,
            letterSpacing: DS.LS_WIDE,
            color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
          }}
        >
          {S.TEMPURA_STEP_CLASSIFY} — {slides.length} slide
        </span>
      </div>

      {/* Table rows */}
      <div>
        {/* Column headers */}
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: "60px 1fr 200px 60px 50px",
            padding: `${DS.SPACE_2} ${DS.SPACE_5}`,
            borderBottom: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
          }}
        >
          {[S.TEMPURA_COL_SLIDE, S.TEMPURA_COL_TITLE, S.TEMPURA_COL_LAYOUT, S.TEMPURA_COL_LINES, S.TEMPURA_COL_IMAGE].map(
            (col) => (
              <span
                key={col}
                className="font-mono font-black uppercase"
                style={{
                  fontSize: DS.FONT_NANO,
                  letterSpacing: DS.LS_WIDE,
                  color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                }}
              >
                {col}
              </span>
            ),
          )}
        </div>

        {/* Data rows */}
        {slides.map((slide, idx) => (
          <motion.div
            key={slide.sourceNum}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.03, type: "spring", ...DS.SPRING_DEFAULT }}
            className="grid items-center"
            style={{
              gridTemplateColumns: "60px 1fr 200px 60px 50px",
              padding: `${DS.SPACE_2} ${DS.SPACE_5}`,
              borderBottom:
                idx < slides.length - 1
                  ? `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_100}`
                  : undefined,
            }}
          >
            {/* Slide number */}
            <span
              className="font-mono font-bold"
              style={{
                fontSize: DS.FONT_SMALL,
                color: TX.ACCENT,
              }}
            >
              {String(slide.sourceNum).padStart(2, "0")}
            </span>

            {/* Title preview */}
            <span
              className="font-mono truncate"
              style={{
                fontSize: DS.FONT_SMALL,
                color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY,
                paddingRight: DS.SPACE_3,
              }}
              title={slide.title}
            >
              {slide.title || "—"}
            </span>

            {/* Layout selector */}
            <div className="relative">
              <select
                value={slide.targetLayout}
                onChange={(e) =>
                  onLayoutChange(idx, e.target.value as LayoutId)
                }
                disabled={!layoutOverrideEnabled}
                className="font-mono outline-none w-full appearance-none"
                style={{
                  fontSize: DS.FONT_MICRO,
                  color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY,
                  backgroundColor: isDark ? DS.BG_SURFACE : DS.BRUTALIST_INPUT_BG,
                  border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                  borderRadius: DS.RADIUS_NONE,
                  padding: `${DS.SPACE_1} ${DS.SPACE_6} ${DS.SPACE_1} ${DS.SPACE_2}`,
                  cursor: layoutOverrideEnabled ? "pointer" : "not-allowed",
                  opacity: layoutOverrideEnabled ? 1 : 0.5,
                }}
              >
                {LAYOUT_ORDER.map((lid) => (
                  <option key={lid} value={lid}>
                    {LAYOUT_CATALOG[lid].label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED }}
              />
            </div>

            {/* Line count */}
            <span
              className="font-mono text-center"
              style={{
                fontSize: DS.FONT_MICRO,
                color: isDark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_SECONDARY,
              }}
            >
              {slide.lineCount}
            </span>

            {/* Image indicator */}
            <span className="flex justify-center">
              {slide.hasImage ? (
                <ImageIcon
                  className="w-3.5 h-3.5"
                  style={{ color: TX.ACCENT }}
                />
              ) : (
                <span
                  className="font-mono"
                  style={{
                    fontSize: DS.FONT_MICRO,
                    color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                  }}
                >
                  —
                </span>
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/** File loaded indicator — brutalist inline badge (replaces drop zone after upload) */
function FileLoadedBadge({
  fileName,
  slideCount,
  onReset,
  isDark,
}: {
  fileName: string;
  slideCount: number;
  onReset: () => void;
  isDark: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: `${DS.SPACE_3} ${DS.SPACE_5}`,
        backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
        border: isDark
          ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
          : DS.BRUTALIST_BORDER,
        boxShadow: isDark ? "none" : DS.BRUTALIST_SHADOW_SM,
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="w-10 h-10 flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: TX.ACCENT,
            border: `${DS.BORDER_WIDTH_MEDIUM} solid ${TX.ACCENT}`,
          }}
        >
          <FileText className="w-5 h-5" style={{ color: DS.BG_DEEP }} />
        </div>
        <div className="min-w-0">
          <p
            className="font-mono font-bold truncate"
            style={{
              fontSize: DS.FONT_SMALL,
              color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY,
            }}
          >
            {fileName}
          </p>
          <p
            className="font-mono"
            style={{
              fontSize: DS.FONT_MICRO,
              color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
            }}
          >
            {slideCount} {S.TEMPURA_DROP_SLIDES}
          </p>
        </div>
      </div>
      <DSActionButton
        icon={<RotateCcw className="w-3.5 h-3.5" />}
        onClick={onReset}
        variant="secondary"
      >
        {S.TEMPURA_BTN_RESET}
      </DSActionButton>
    </div>
  );
}

/** Poste Italiane color preview swatch */
function PosteColorSwatch({ isDark }: { isDark: boolean }) {
  const swatches = [
    { label: "BLU", hex: PI_COLORS.blu.hex },
    { label: "GIALLO", hex: PI_COLORS.giallo.hex },
    { label: "CELESTE", hex: PI_COLORS.celeste.hex },
    { label: "GRIGIO", hex: PI_COLORS.grigio1.hex },
  ];

  return (
    <div className="flex items-center gap-2">
      {swatches.map((s) => (
        <div key={s.label} className="flex items-center gap-1">
          <div
            className="w-4 h-4 flex-shrink-0"
            style={{
              backgroundColor: s.hex,
              border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
            }}
          />
          <span
            className="font-mono"
            style={{
              fontSize: DS.FONT_NANO,
              color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* TempuraPage                                                          */
/* ------------------------------------------------------------------ */

export function TempuraPage() {
  const { isDark } = useBentoTheme();
  const ffLayoutOverride = useFeatureFlag("tempura.layout-override");

  /* ── State ─────────────────────────────────────────────────────── */
  const [pipelineStep, setPipelineStep] = useState<PipelineStep>("idle");
  const [fileName, setFileName] = useState("");
  const [rawSlides, setRawSlides] = useState<ExtractedSlide[]>([]);
  const [classified, setClassified] = useState<ClassifiedSlide[]>([]);
  const [pptxBlob, setPptxBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [presTitle, setPresTitle] = useState("");
  const [presAuthor, setPresAuthor] = useState("");

  const fileRef = useRef<File | null>(null);

  /* ── Derived style helpers ─────────────────────────────────────── */
  const panelBg = isDark ? DS.BG_CARD : DS.ON_LIGHT_BG;
  const panelBorder = isDark
    ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
    : DS.BRUTALIST_BORDER;
  const panelShadow = isDark ? "none" : DS.BRUTALIST_SHADOW_LG;
  const formBg = isDark ? DS.BG_SURFACE : DS.BRUTALIST_INPUT_BG;

  /* ── Handlers ──────────────────────────────────────────────────── */
  const handleFile = useCallback(async (file: File) => {
    fileRef.current = file;
    setFileName(file.name);
    setPipelineStep("extracting");
    setPptxBlob(null);

    try {
      // Step 1: Extract
      const slides = await extractSourceContent(file);
      setRawSlides(slides);
      toast.success(`${S.TEMPURA_TOAST_EXTRACT_OK}: ${slides.length} ${S.TEMPURA_DROP_SLIDES}`);

      // Step 2: Classify
      setPipelineStep("classifying");
      const cls = classifySlides(slides);
      setClassified(cls);
      toast.success(S.TEMPURA_TOAST_CLASSIFY_OK);

      // Step 3: Ready for preview
      setPipelineStep("previewing");

      // Auto-set title from filename
      const baseName = file.name.replace(/\.pptx?$/i, "").replace(/[_-]/g, " ");
      setPresTitle(baseName);
    } catch (err) {
      const msg = err instanceof Error ? err.message : S.TEMPURA_ALERT_FILE_ERROR;
      console.error("Tempura extraction error:", msg, err);
      toast.error(msg);
      setPipelineStep("error");
    }
  }, []);

  const handleLayoutChange = useCallback(
    (slideIdx: number, layout: LayoutId) => {
      setClassified((prev) =>
        prev.map((s, i) =>
          i === slideIdx
            ? { ...s, targetLayout: layout, overridden: true }
            : s,
        ),
      );
    },
    [],
  );

  const handleGenerate = useCallback(async () => {
    if (classified.length === 0) {
      toast.error(S.TEMPURA_ALERT_NO_FILE);
      return;
    }

    setIsGenerating(true);
    setPipelineStep("generating");

    try {
      const blob = await generatePostePptx(classified, {
        title: presTitle || undefined,
        author: presAuthor || undefined,
      });
      setPptxBlob(blob);
      setPipelineStep("done");
      toast.success(S.TEMPURA_TOAST_GENERATE_OK);
    } catch (err) {
      console.error("Tempura generation error:", err);
      toast.error("Errore durante la generazione del PPTX.");
      setPipelineStep("error");
    } finally {
      setIsGenerating(false);
    }
  }, [classified, presTitle, presAuthor]);

  const handleDownload = useCallback(() => {
    if (!pptxBlob) return;
    const outName = fileName
      ? fileName.replace(/\.pptx?$/i, "_POSTE.pptx")
      : "presentazione_POSTE.pptx";
    downloadBlob(pptxBlob, outName);
  }, [pptxBlob, fileName]);

  const handleReset = useCallback(() => {
    fileRef.current = null;
    setFileName("");
    setRawSlides([]);
    setClassified([]);
    setPptxBlob(null);
    setPipelineStep("idle");
    setPresTitle("");
    setPresAuthor("");
    setIsGenerating(false);
  }, []);

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <BentoPageShell>
      <BentoHeader
        backTo="/"
        icon={
          <TempuraLogo
            size={22}
            {...LOGO_PRESET.ON_DARK}
            accent={TX.ACCENT}
          />
        }
        iconBg={TX.ACCENT}
        title={S.TEMPURA_TITLE}
        subtitle={S.TEMPURA_SUBTITLE}
      >
        {/* Version badge */}
        <span className="hidden sm:inline-flex items-center gap-2">
          <span
            className="font-mono font-black uppercase"
            style={{
              fontSize: DS.FONT_SMALL,
              color: isDark ? DS.TEXT_SECONDARY : DS.TEXT_DIM,
            }}
          >
            {S.TEMPURA_VERSION}
          </span>
          <DSVersionBadge tag="dev" />
        </span>

        {/* Kanji */}
        <span
          className="hidden sm:inline"
          aria-hidden="true"
          lang="ja"
          style={{
            fontSize: DS.FONT_XLARGE,
            lineHeight: DS.LH_NONE,
            color: isDark ? DS.BORDER_HOVER : DS.ON_LIGHT_BORDER,
          }}
        >
          {S.TEMPURA_KANJI}
        </span>
      </BentoHeader>

      <main className="flex-1 w-full max-w-7xl mx-auto px-5 py-8">
        <div className="flex flex-col" style={{ gap: DS.SPACE_6 }}>
          {/* ══════════════════════════════════════════════════════════ */}
          {/* PIPELINE BAR                                              */}
          {/* ══════════════════════════════════════════════════════════ */}
          {pipelineStep !== "idle" && (
            <PipelineBar currentStep={pipelineStep} isDark={isDark} />
          )}

          {/* ══════════════════════════════════════════════════════════ */}
          {/* UPLOAD / FILE LOADED                                      */}
          {/* ══════════════════════════════════════════════════════════ */}
          {pipelineStep === "idle" || pipelineStep === "error" ? (
            <DSDropZone
              onFile={handleFile}
              title={S.TEMPURA_DROP_HINT}
              subtitle=".pptx"
              accept=".pptx,.ppt"
              icon={<Upload className="w-6 h-6" />}
            />
          ) : (
            <FileLoadedBadge
              fileName={fileName}
              slideCount={rawSlides.length}
              onReset={handleReset}
              isDark={isDark}
            />
          )}

          {/* ══════════════════════════════════════════════════════════ */}
          {/* CLASSIFICATION TABLE                                      */}
          {/* ══════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {classified.length > 0 && stepIndex(pipelineStep) >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ type: "spring", ...DS.SPRING_DEFAULT }}
              >
                <SlideTable
                  slides={classified}
                  onLayoutChange={handleLayoutChange}
                  isDark={isDark}
                  layoutOverrideEnabled={ffLayoutOverride}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════════════════════════════════════════════════════════ */}
          {/* METADATA + ACTIONS PANEL                                  */}
          {/* ══════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {stepIndex(pipelineStep) >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{
                  type: "spring",
                  ...DS.SPRING_DEFAULT,
                  delay: 0.1,
                }}
                style={{
                  backgroundColor: panelBg,
                  border: panelBorder,
                  boxShadow: panelShadow,
                }}
              >
                {/* Panel header */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: `${DS.SPACE_3} ${DS.SPACE_5}`,
                    borderBottom: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <FileDown
                      className="w-4 h-4"
                      style={{ color: TX.ACCENT }}
                    />
                    <span
                      className="font-mono font-black uppercase"
                      style={{
                        fontSize: DS.FONT_SMALL,
                        letterSpacing: DS.LS_WIDE,
                        color: isDark
                          ? DS.TEXT_PRIMARY
                          : DS.ON_LIGHT_BORDER_STRONG,
                      }}
                    >
                      {S.TEMPURA_CFG_META}
                    </span>
                  </div>
                  <PosteColorSwatch isDark={isDark} />
                </div>

                {/* Panel body */}
                <div
                  className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-start"
                  style={{ gap: 0 }}
                >
                  {/* Left: metadata fields */}
                  <div
                    style={{
                      padding: DS.SPACE_5,
                      display: "flex",
                      flexDirection: "column",
                      gap: DS.SPACE_4,
                    }}
                  >
                    <div>
                      <SectionLabel isDark={isDark}>
                        {S.TEMPURA_CFG_META_TITLE}
                      </SectionLabel>
                      <input
                        type="text"
                        value={presTitle}
                        onChange={(e) => setPresTitle(e.target.value)}
                        placeholder={S.TEMPURA_CFG_META_TITLE_PLACEHOLDER}
                        className="font-mono w-full outline-none"
                        style={{
                          fontSize: DS.FONT_SMALL,
                          color: isDark
                            ? DS.TEXT_PRIMARY
                            : DS.ON_LIGHT_TEXT_PRIMARY,
                          backgroundColor: formBg,
                          border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                          borderRadius: DS.RADIUS_NONE,
                          padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
                        }}
                      />
                    </div>
                    <div>
                      <SectionLabel isDark={isDark}>
                        {S.TEMPURA_CFG_META_AUTHOR}
                      </SectionLabel>
                      <input
                        type="text"
                        value={presAuthor}
                        onChange={(e) => setPresAuthor(e.target.value)}
                        placeholder={S.TEMPURA_CFG_META_AUTHOR_PLACEHOLDER}
                        className="font-mono w-full outline-none"
                        style={{
                          fontSize: DS.FONT_SMALL,
                          color: isDark
                            ? DS.TEXT_PRIMARY
                            : DS.ON_LIGHT_TEXT_PRIMARY,
                          backgroundColor: formBg,
                          border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                          borderRadius: DS.RADIUS_NONE,
                          padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Right: actions */}
                  <div
                    className="flex flex-col items-stretch justify-between"
                    style={{
                      padding: DS.SPACE_5,
                      borderLeft: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_BORDER}`,
                      minWidth: 200,
                      gap: DS.SPACE_4,
                    }}
                  >
                    {/* Poste template preview */}
                    <div>
                      <SectionLabel isDark={isDark}>Template target</SectionLabel>
                      <div
                        className="flex items-center gap-2"
                        style={{
                          padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
                          backgroundColor: PI_COLORS.blu.hex,
                          border: `${DS.BORDER_WIDTH_MEDIUM} solid ${PI_COLORS.blu.hex}`,
                        }}
                      >
                        <span
                          className="font-mono font-bold uppercase"
                          style={{
                            fontSize: DS.FONT_MICRO,
                            color: PI_COLORS.bianco.hex,
                            letterSpacing: DS.LS_WIDE,
                          }}
                        >
                          Poste Italiane 2023
                        </span>
                      </div>
                    </div>

                    {/* Generate / Download buttons */}
                    <div
                      className="flex flex-col"
                      style={{ gap: DS.SPACE_3 }}
                    >
                      {pipelineStep !== "done" ? (
                        <DSActionButton
                          icon={<ArrowRight className="w-4 h-4" />}
                          onClick={handleGenerate}
                          loading={isGenerating}
                          loadingText={S.TEMPURA_BTN_GENERATE_BUSY}
                          variant="custom"
                          accentColor={TX.ACCENT}
                        >
                          {S.TEMPURA_BTN_GENERATE}
                        </DSActionButton>
                      ) : (
                        <DSActionButton
                          icon={<FileDown className="w-4 h-4" />}
                          onClick={handleDownload}
                          variant="custom"
                          accentColor={TX.ACCENT}
                        >
                          {S.TEMPURA_BTN_DOWNLOAD}
                        </DSActionButton>
                      )}
                      <DSActionButton
                        icon={<RotateCcw className="w-3.5 h-3.5" />}
                        onClick={handleReset}
                        variant="secondary"
                      >
                        {S.TEMPURA_BTN_RESET}
                      </DSActionButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════════════════════════════════════════════════════════ */}
          {/* DONE BANNER                                               */}
          {/* ══════════════════════════════════════════════════════════ */}
          <AnimatePresence>
            {pipelineStep === "done" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", ...DS.SPRING_SNAPPY }}
                className="flex items-center justify-center gap-3"
                style={{
                  padding: `${DS.SPACE_4} ${DS.SPACE_6}`,
                  backgroundColor: isDark
                    ? DS.BG_ELEVATED
                    : DS.ON_LIGHT_GRAY_100,
                  border: isDark
                    ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
                    : DS.BRUTALIST_BORDER,
                  boxShadow: isDark ? "none" : DS.BRUTALIST_SHADOW_SM,
                }}
              >
                <Check
                  className="w-5 h-5"
                  style={{ color: DS.DATA_GREEN }}
                />
                <span
                  className="font-mono font-black uppercase"
                  style={{
                    fontSize: DS.FONT_BASE,
                    letterSpacing: DS.LS_WIDE,
                    color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
                  }}
                >
                  {S.TEMPURA_PIPELINE_DONE}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ══════════════════════════════════════════════════════════ */}
          {/* EMPTY STATE                                               */}
          {/* ══════════════════════════════════════════════════════════ */}
          {pipelineStep === "idle" && (
            <div
              className="flex flex-col items-center justify-center gap-4"
              style={{
                padding: `${DS.SPACE_10} ${DS.SPACE_6}`,
                border: `${DS.BORDER_WIDTH_THIN} dashed ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_BORDER}`,
              }}
            >
              <Presentation
                className="w-10 h-10"
                style={{ color: TX.ACCENT, opacity: 0.3 }}
              />
              <p
                className="font-sans text-center"
                style={{
                  fontSize: DS.FONT_SMALL,
                  color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                  maxWidth: 420,
                  lineHeight: DS.LH_RELAXED,
                }}
              >
                {S.TEMPURA_EMPTY}
              </p>
            </div>
          )}

          {/* Description — small print */}
          <p
            className="font-sans"
            style={{
              fontSize: DS.FONT_TINY,
              color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
              lineHeight: DS.LH_RELAXED,
              maxWidth: 640,
            }}
          >
            {S.TEMPURA_DESCRIPTION}
          </p>
        </div>
      </main>

      <BentoFooter />
    </BentoPageShell>
  );
}