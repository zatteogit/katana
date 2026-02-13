import { useState } from "react";
import {
  Copy,
  CheckCheck,
  FileCode,
  ChevronDown,
  ChevronRight,
  Download,
} from "lucide-react";
import { dataJsCode } from "./katana-files/data-js-code";
import { scriptJsCode } from "./katana-files/script-js-code";
import { styleCssCode } from "./katana-files/style-css-code";
import { indexHtmlCode } from "./katana-files/index-html-code";

interface FileOutput {
  filename: string;
  description: string;
  code: string;
}

function CopyButton({
  text,
  label,
}: {
  text: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all ${
        copied
          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
          : "bg-white border-slate-200 text-slate-600 hover:border-slate-400"
      }`}
      style={{ fontSize: "11px" }}
    >
      {copied ? (
        <CheckCheck className="w-3 h-3" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {copied ? "Copiato!" : label || "Copia intero file"}
    </button>
  );
}

function FileBlock({ file }: { file: FileOutput }) {
  const [open, setOpen] = useState(false);
  const lines = file.code.split("\n").length;
  const sizeKB = (
    new TextEncoder().encode(file.code).length / 1024
  ).toFixed(1);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <FileCode className="w-4 h-4 text-slate-500" />
          <span
            className="text-slate-800"
            style={{
              fontSize: "14px",
              fontFamily: "monospace",
            }}
          >
            {file.filename}
          </span>
          <span
            className="px-2 py-0.5 rounded border bg-blue-100 text-blue-700 border-blue-200"
            style={{ fontSize: "10px" }}
          >
            FILE COMPLETO
          </span>
          <span
            className="text-slate-400"
            style={{ fontSize: "11px" }}
          >
            {lines} righe &middot; {sizeKB} KB
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={file.code} />
        </div>
      </div>

      {/* Description */}
      <div className="px-4 py-2 bg-slate-50 border-b border-slate-100">
        <p
          className="text-slate-600"
          style={{ fontSize: "12px", lineHeight: "1.5" }}
        >
          {file.description}
        </p>
      </div>

      {/* Toggle code */}
      <div
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 cursor-pointer hover:bg-slate-700 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        )}
        <span
          className="text-slate-400"
          style={{ fontSize: "11px" }}
        >
          {open ? "Nascondi codice" : "Mostra codice"}
        </span>
      </div>

      {open && (
        <pre
          className="p-4 bg-slate-900 text-slate-200 overflow-auto max-h-[600px]"
          style={{
            fontSize: "11.5px",
            lineHeight: "1.55",
            fontFamily:
              "'SF Mono', 'Fira Code', 'Consolas', monospace",
          }}
        >
          {file.code}
        </pre>
      )}
    </div>
  );
}

/* ======================================================================= */
/* FILE DEFINITIONS                                                         */
/* ======================================================================= */

const files: FileOutput[] = [
  {
    filename: "data.js",
    description:
      "v3.0: STRINGS aggiornate con chiavi smart detection (detectTitle, detectChannel, detectComponent, detectVariant, detectSlug, detectConfirm, detectBtnConfirm, detectBtnCancel, detectFileName). Versione bumped a v3.0 Stable. SITE_CONFIG invariato.",
    code: dataJsCode,
  },
  {
    filename: "script.js",
    description:
      "v3.0: Smart asset detection — detectAssetFromFile() analizza nome file, dimensioni, layer PSD. showDetectModal() crea modale custom brutalist con conferma/ignora (no confirm() nativo). applyDetectedMatch() switcha selettori UI + slug. loadMaster() flow asincrono: attende scelta utente prima di runSmartCrop. fileToDataUrl() memorizza layer PSD.",
    code: scriptJsCode,
  },
  {
    filename: "style.css",
    description:
      "v3.0: Sezione 10 — Detect Modal con animazioni (fadeIn/slideIn), layout righe label/value, bottoni brutalist (accent/ghost). #psdStatus position:absolute. Fix } mancante su .btn-fix-floating:hover.",
    code: styleCssCode,
  },
  {
    filename: "index.html",
    description:
      "Invariato rispetto a v2.0. HTML originale con file input accept PSD, toggle PSD con custom-switch-layout, hint-oz nel modal footer.",
    code: indexHtmlCode,
  },
];

/* ======================================================================= */
/* MAIN COMPONENT                                                           */
/* ======================================================================= */
export function KatanaCodeTab() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              style={{ fontSize: "18px" }}
              className="text-slate-900 mb-2"
            >
              Codice Katana aggiornato
            </h2>
            <p
              className="text-slate-600"
              style={{ fontSize: "13px", lineHeight: "1.7" }}
            >
              4 file completi pronti per il copy-paste su
              Notion. Ogni file va copiato e incollato{" "}
              <strong>al posto dell'intero contenuto</strong>{" "}
              della sotto-pagina corrispondente nel Progetto
              Katana.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Download className="w-5 h-5 text-slate-400" />
          </div>
        </div>

        {/* File summary grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {files.map((f) => (
            <div
              key={f.filename}
              className="rounded-md p-3 border text-center bg-blue-50 border-blue-200"
            >
              <div
                className="text-slate-800"
                style={{
                  fontSize: "13px",
                  fontFamily: "monospace",
                }}
              >
                {f.filename}
              </div>
              <div
                className="text-blue-600"
                style={{ fontSize: "10px" }}
              >
                Sostituire intero
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Naming convention callout */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h3
          className="text-slate-800 mb-2"
          style={{ fontSize: "13px" }}
        >
          Convenzione colori overlay (crop modal)
        </h3>
        <div
          className="flex flex-wrap gap-4"
          style={{ fontSize: "12px" }}
        >
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span
              className="w-3 h-3 rounded-sm border-2"
              style={{
                borderColor: "rgba(34, 197, 94, 0.85)",
                background: "rgba(34, 197, 94, 0.15)",
              }}
            />
            <code>f</code> = <strong>Area Focus</strong> (verde,
            solido)
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span
              className="w-3 h-3 rounded-sm border"
              style={{
                borderStyle: "dashed",
                borderWidth: "2px",
                borderColor: "rgba(245, 158, 11, 0.90)",
                background: "rgba(245, 158, 11, 0.18)",
              }}
            />
            <code>oz text</code> = <strong>Area Testi</strong>{" "}
            (ambra, dashed)
          </span>
          <span className="inline-flex items-center gap-1.5 text-slate-700">
            <span
              className="w-3 h-3 rounded-sm border"
              style={{
                borderStyle: "dashed",
                borderWidth: "2px",
                borderColor: "rgba(239, 68, 68, 0.90)",
                background: "rgba(239, 68, 68, 0.18)",
              }}
            />
            <code>oz badge</code> = <strong>Area Loghi</strong>{" "}
            (rosso, dashed)
          </span>
        </div>
      </div>

      {/* All files */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <h3
            style={{ fontSize: "14px" }}
            className="text-slate-800"
          >
            File da sostituire integralmente ({files.length})
          </h3>
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="space-y-4">
          {files.map((f) => (
            <FileBlock key={f.filename} file={f} />
          ))}
        </div>
      </div>
    </div>
  );
}