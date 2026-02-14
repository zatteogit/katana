/**
 * KatanaDownloadsTab — Download center for all Katana artifacts
 * Replaces the old "Repo" tab.
 * Allows downloading Katana standalone (stable/dev), companion tools suite,
 * and full bundle in multiple versions.
 */

import { useState } from "react";
import {
  Download,
  Package,
  Layers,
  CheckCheck,
  Loader2,
  Shield,
  FlaskConical,
  Scissors,
  Crosshair,
  Sparkles,
  FileCode,
  Archive,
  Tag,
  Clock,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Info,
  AlertTriangle,
} from "lucide-react";
import JSZip from "jszip";
import { dataJsCode } from "./katana-files/data-js-code";
import { scriptJsCode } from "./katana-files/script-js-code";
import { styleCssCode } from "./katana-files/style-css-code";
import { indexHtmlCode } from "./katana-files/index-html-code";
import { previewInjectCode as previewInjectDevCode } from "./katana-files/preview-inject-dev";

/* ------------------------------------------------------------------ */
/* Version registry                                                    */
/* ------------------------------------------------------------------ */

interface VersionEntry {
  version: string;
  tag: "stable" | "dev" | "legacy";
  date: string;
  highlights: string[];
}

const KATANA_VERSIONS: VersionEntry[] = [
  {
    version: "v3.0",
    tag: "stable",
    date: "2026-02-14",
    highlights: [
      "Smart Asset Detection (detectAssetFromFile())",
      "Overlay Zones — Area Testi + Area Loghi",
      "Export multi-breakpoint con compressione target KB",
      "Modale custom brutalist per conferma detection",
      "@1x/@2x retina support",
    ],
  },
  {
    version: "v3.1.0-dev",
    tag: "dev",
    date: "2026-02-14",
    highlights: [
      "Tutto v3.0 + diagnostica attiva",
      "Preview-inject FAB per anteprima componenti",
      "Tracing pipeline (PI_TRACE)",
      "CDN fallback stubs avanzati",
      "Ottimizzazione CSS modali per iframe",
    ],
  },
];

const TOOLS_VERSIONS: VersionEntry[] = [
  {
    version: "v3.1.0-dev",
    tag: "dev",
    date: "2026-02-14",
    highlights: [
      "Launcher con Safari detection",
      "Katana Dev Tool (Preview + Codice + Downloads)",
      "Prompt Generator con Social Media Kit (13 formati)",
      "ConfigGenerator per SITE_CONFIG da analisi Figma",
      "Batch generate prompt con auto-fill",
      "GitHub Pages deploy (HashRouter + base path)",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  const kb = bytes / 1024;
  if (kb < 1024) return kb.toFixed(1) + " KB";
  return (kb / 1024).toFixed(2) + " MB";
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ------------------------------------------------------------------ */
/* ZIP generators                                                      */
/* ------------------------------------------------------------------ */

async function buildKatanaStandaloneZip(): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder("katana-v3.0-stable");
  if (!folder) throw new Error("zip error");
  folder.file("data.js", dataJsCode);
  folder.file("script.js", scriptJsCode);
  folder.file("style.css", styleCssCode);
  folder.file("index.html", indexHtmlCode);
  folder.file(
    "README.txt",
    [
      "Katana v3.0 Stable — Standalone",
      "================================",
      "",
      "Apri index.html nel browser per usare Katana.",
      "Funziona completamente offline.",
      "",
      "File inclusi:",
      "  - index.html   Markup + CDN dependencies",
      "  - data.js      STRINGS (i18n) + SITE_CONFIG",
      "  - script.js    Logic, crop, detection, export",
      "  - style.css    Design system brutalist",
      "",
      "Katana Tools Suite — Internal",
    ].join("\n"),
  );
  return zip.generateAsync({ type: "blob" });
}

async function buildKatanaDevZip(): Promise<Blob> {
  const zip = new JSZip();
  const folder = zip.folder("katana-v3.1.0-dev");
  if (!folder) throw new Error("zip error");
  folder.file("data.js", dataJsCode);
  folder.file("script.js", scriptJsCode);
  folder.file("style.css", styleCssCode);
  folder.file("index.html", indexHtmlCode);
  folder.file("preview-inject-dev.js", previewInjectDevCode);
  folder.file(
    "README.txt",
    [
      "Katana v3.1.0-dev — Development Build",
      "======================================",
      "",
      "Include i file standard + preview-inject-dev.js",
      "per diagnostica e anteprima componenti.",
      "",
      "NOTA: Questa versione include script di debug.",
      "Non usare in produzione — usa la versione Stable.",
      "",
      "Katana Tools Suite — Internal",
    ].join("\n"),
  );
  return zip.generateAsync({ type: "blob" });
}

function downloadSingleFile(
  filename: string,
  content: string,
  mimeType = "text/plain",
) {
  const blob = new Blob([content], { type: mimeType });
  downloadBlob(blob, filename);
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                      */
/* ------------------------------------------------------------------ */

function VersionBadge({ tag }: { tag: "stable" | "dev" | "legacy" }) {
  const styles = {
    stable: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dev: "bg-amber-50 text-amber-700 border-amber-200",
    legacy: "bg-slate-100 text-slate-500 border-slate-200",
  };
  const icons = {
    stable: <Shield className="w-2.5 h-2.5" />,
    dev: <FlaskConical className="w-2.5 h-2.5" />,
    legacy: <Clock className="w-2.5 h-2.5" />,
  };
  const labels = { stable: "STABLE", dev: "DEV", legacy: "LEGACY" };

  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded border ${styles[tag]}`}
      style={{ fontSize: "9px", fontFamily: "monospace", letterSpacing: "0.04em" }}
    >
      {icons[tag]}
      {labels[tag]}
    </span>
  );
}

function DownloadCard({
  icon, gradient, title, subtitle, version, tag, date, size,
  highlights, onDownload, downloading, children,
}: {
  icon: React.ReactNode; gradient: string; title: string;
  subtitle: string; version: string; tag: "stable" | "dev" | "legacy";
  date: string; size?: string; highlights: string[];
  onDownload: () => void; downloading: boolean; children?: React.ReactNode;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-xl ${gradient} flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
              <span className="text-slate-900" style={{ fontSize: "15px" }}>{title}</span>
              <VersionBadge tag={tag} />
              <span className="text-slate-400" style={{ fontSize: "11px", fontFamily: "monospace" }}>{version}</span>
            </div>
            <p className="text-slate-500 mb-3" style={{ fontSize: "12px" }}>{subtitle}</p>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="inline-flex items-center gap-1 text-slate-400" style={{ fontSize: "10px" }}>
                <Clock className="w-3 h-3" />{date}
              </span>
              {size && (
                <span className="inline-flex items-center gap-1 text-slate-400" style={{ fontSize: "10px" }}>
                  <Archive className="w-3 h-3" />~{size}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-slate-400" style={{ fontSize: "10px" }}>
                <Tag className="w-3 h-3" />{version}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={onDownload} disabled={downloading}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition-colors disabled:opacity-60 disabled:cursor-wait"
                style={{ fontSize: "12px" }}>
                {downloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                {downloading ? "Generazione..." : "Scarica ZIP"}
              </button>
              <button onClick={() => setShowDetails(!showDetails)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-700 transition-colors"
                style={{ fontSize: "12px" }}>
                {showDetails ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                Dettagli
              </button>
              {children}
            </div>
          </div>
        </div>
      </div>
      {showDetails && (
        <div className="border-t border-slate-100 bg-slate-50 px-5 py-4">
          <h4 className="text-slate-700 mb-2" style={{ fontSize: "11px", letterSpacing: "0.05em" }}>CONTENUTO</h4>
          <ul className="space-y-1">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600" style={{ fontSize: "12px", lineHeight: "1.5" }}>
                <CheckCheck className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />{h}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Singoli file Katana                                                 */
/* ------------------------------------------------------------------ */

const katanaFiles = [
  { name: "data.js", desc: "STRINGS + SITE_CONFIG", size: dataJsCode.length, code: dataJsCode, mime: "application/javascript" },
  { name: "script.js", desc: "Logic, crop, detection, export", size: scriptJsCode.length, code: scriptJsCode, mime: "application/javascript" },
  { name: "style.css", desc: "Design system brutalist", size: styleCssCode.length, code: styleCssCode, mime: "text/css" },
  { name: "index.html", desc: "Markup + CDN dependencies", size: indexHtmlCode.length, code: indexHtmlCode, mime: "text/html" },
];

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT                                                      */
/* ------------------------------------------------------------------ */

export function KatanaDownloadsTab() {
  const [downloadingStable, setDownloadingStable] = useState(false);
  const [downloadingDev, setDownloadingDev] = useState(false);
  const [showSingleFiles, setShowSingleFiles] = useState(false);

  const handleDownloadStable = async () => {
    setDownloadingStable(true);
    try { const blob = await buildKatanaStandaloneZip(); downloadBlob(blob, "katana-v3.0-stable.zip"); }
    finally { setDownloadingStable(false); }
  };

  const handleDownloadDev = async () => {
    setDownloadingDev(true);
    try { const blob = await buildKatanaDevZip(); downloadBlob(blob, "katana-v3.1.0-dev.zip"); }
    finally { setDownloadingDev(false); }
  };

  const totalStableSize = katanaFiles.reduce((sum, f) => sum + f.size, 0);
  const totalDevSize = totalStableSize + previewInjectDevCode.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h2 style={{ fontSize: "18px" }} className="text-slate-900 mb-1">Download Center</h2>
            <p className="text-slate-600" style={{ fontSize: "13px", lineHeight: "1.7" }}>
              Scarica tutte le applicazioni Katana nelle diverse versioni.
              Ogni pacchetto include i file pronti per il deploy, con README e note di versione.
            </p>
          </div>
        </div>
      </div>

      {/* Katana Standalone */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Scissors className="w-4 h-4 text-slate-500" />
          <h3 className="text-slate-800" style={{ fontSize: "14px" }}>Katana — Crop Tool Standalone</h3>
          <span className="text-slate-400" style={{ fontSize: "11px" }}>4 file vanilla (JS + CSS + HTML), funziona offline</span>
        </div>
        <div className="space-y-3">
          <DownloadCard icon={<Scissors className="w-5 h-5 text-white" />} gradient="bg-gradient-to-br from-slate-700 to-slate-900"
            title="Katana Standalone" subtitle="Ritaglio e export asset immagine per Poste.it Corporate — versione produzione"
            version="v3.0" tag="stable" date="2026-02-14" size={formatBytes(totalStableSize)}
            highlights={KATANA_VERSIONS[0].highlights} onDownload={handleDownloadStable} downloading={downloadingStable} />
          <DownloadCard icon={<FlaskConical className="w-5 h-5 text-white" />} gradient="bg-gradient-to-br from-amber-500 to-orange-600"
            title="Katana Dev Build" subtitle="Include diagnostica, preview-inject FAB e tracing pipeline"
            version="v3.1.0-dev" tag="dev" date="2026-02-14" size={formatBytes(totalDevSize)}
            highlights={KATANA_VERSIONS[1].highlights} onDownload={handleDownloadDev} downloading={downloadingDev}>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-700" style={{ fontSize: "10px" }}>
              <AlertTriangle className="w-3 h-3" />Non usare in produzione
            </span>
          </DownloadCard>
        </div>
      </div>

      {/* Single file downloads */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <button onClick={() => setShowSingleFiles(!showSingleFiles)}
          className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-slate-500" />
            <span className="text-slate-700" style={{ fontSize: "13px" }}>Download singoli file Katana v3.0</span>
            <span className="text-slate-400" style={{ fontSize: "11px" }}>per aggiornamento manuale di <code>dist/</code></span>
          </div>
          {showSingleFiles ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
        </button>
        {showSingleFiles && (
          <div className="border-t border-slate-100 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {katanaFiles.map((f) => (
                <div key={f.name} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-slate-50 hover:border-slate-300 transition-colors">
                  <div>
                    <div className="text-slate-800" style={{ fontSize: "13px", fontFamily: "monospace" }}>{f.name}</div>
                    <div className="text-slate-500" style={{ fontSize: "11px" }}>{f.desc}</div>
                    <div className="text-slate-400" style={{ fontSize: "10px" }}>{formatBytes(f.size)}</div>
                  </div>
                  <button onClick={() => downloadSingleFile(f.name, f.code, f.mime)}
                    className="p-2 rounded-lg border border-slate-200 bg-white hover:border-slate-400 hover:text-slate-700 transition-colors text-slate-500"
                    title={`Scarica ${f.name}`}>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Companion Tools */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-slate-500" />
          <h3 className="text-slate-800" style={{ fontSize: "14px" }}>Katana Tools Suite — Companion App</h3>
          <span className="text-slate-400" style={{ fontSize: "11px" }}>React + Vite + Tailwind</span>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center flex-shrink-0">
              <Crosshair className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                <span className="text-slate-900" style={{ fontSize: "15px" }}>Katana Tools Suite</span>
                <VersionBadge tag="dev" />
                <span className="text-slate-400" style={{ fontSize: "11px", fontFamily: "monospace" }}>v3.1.0-dev</span>
              </div>
              <p className="text-slate-500 mb-3" style={{ fontSize: "12px" }}>
                L'app companion completa: Launcher, Katana Dev Tool (Preview + Codice + Downloads), e Prompt Generator con Social Media Kit.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[{icon: <Scissors className="w-3 h-3" />, label: "Launcher", color: "bg-slate-100 border-slate-200 text-slate-600"},
                  {icon: <Crosshair className="w-3 h-3" />, label: "Dev Tool", color: "bg-blue-50 border-blue-200 text-blue-700"},
                  {icon: <Sparkles className="w-3 h-3" />, label: "Prompt Generator", color: "bg-violet-50 border-violet-200 text-violet-700"}]
                .map((app) => (
                  <span key={app.label} className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border ${app.color}`} style={{ fontSize: "11px" }}>
                    {app.icon}{app.label}
                  </span>
                ))}
              </div>
              <div className="bg-slate-50 rounded-lg p-3 mb-4">
                <h4 className="text-slate-600 mb-2" style={{ fontSize: "11px", letterSpacing: "0.04em" }}>TARGET DI DEPLOY</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-700" style={{ fontSize: "10px", fontFamily: "monospace" }}>DEV / FIGMA MAKE</span>
                    <span className="text-slate-500" style={{ fontSize: "11px" }}><code>npm run dev</code> — BrowserRouter, <code>base: "/"</code></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700" style={{ fontSize: "10px", fontFamily: "monospace" }}>GITHUB PAGES</span>
                    <span className="text-slate-500" style={{ fontSize: "11px" }}><code>VITE_DEPLOY_TARGET=github-pages npm run build</code> — HashRouter, <code>base: "./"</code></span>
                  </div>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                {TOOLS_VERSIONS[0].highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-600" style={{ fontSize: "12px", lineHeight: "1.5" }}>
                    <CheckCheck className="w-3 h-3 text-emerald-500 mt-0.5 flex-shrink-0" />{h}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-500" style={{ fontSize: "12px" }}>
                  <Info className="w-3.5 h-3.5" />Deploy da build locale
                </span>
                <span className="text-slate-400" style={{ fontSize: "11px" }}>Build e deploy dalla codebase interna</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Version Timeline */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-4 h-4 text-slate-500" />
          <h3 className="text-slate-800" style={{ fontSize: "14px" }}>Storico versioni</h3>
        </div>
        <div className="relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-slate-200" />
          <div className="space-y-4">
            {[{v: "v3.1.0-dev", tag: "dev" as const, date: "2026-02-14", color: "bg-amber-400", lines: ["Issues implementate: #4, #6, #8, #9, #10","Issues in fork preview: #1, #2, #3, #5, #7","Header minimale + preview full-width + version switch","Tab Downloads (sostituisce Repo) con pacchetti versioned","Safari detection banner nel Launcher"]},
              {v: "v3.0", tag: "stable" as const, date: "2026-02-14", color: "bg-emerald-500", lines: ["Smart Asset Detection, Overlay Zones, Export multi-breakpoint","Modale brutalist, @1x/@2x retina, compressione target KB","CDN fallback stubs per funzionamento offline"]},
              {v: "v2.0", tag: "legacy" as const, date: "2024", color: "bg-slate-300", lines: ["SITE_CONFIG, focus area, vanilla JS migration da jQuery"]},
              {v: "v1.0", tag: "legacy" as const, date: "2023", color: "bg-slate-300", lines: ["Versione iniziale — Cropper.js, export singolo asset"]}]
            .map((entry) => (
              <div key={entry.v} className="flex gap-4">
                <div className="w-[31px] flex-shrink-0 flex justify-center">
                  <div className={`w-3 h-3 rounded-full ${entry.color} border-2 border-white shadow-sm mt-1.5`} />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-slate-800" style={{ fontSize: "13px" }}>{entry.v}</span>
                    <VersionBadge tag={entry.tag} />
                    <span className="text-slate-400" style={{ fontSize: "10px" }}>{entry.date}</span>
                  </div>
                  <div className="text-slate-500 space-y-0.5" style={{ fontSize: "11px", lineHeight: "1.6" }}>
                    {entry.lines.map((l, i) => <div key={i}>{l}</div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deploy notes */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-slate-500" />
          <h3 className="text-slate-800" style={{ fontSize: "13px" }}>Note di deploy</h3>
        </div>
        <div className="space-y-2" style={{ fontSize: "12px", lineHeight: "1.6" }}>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">1.</span>
            <span className="text-slate-700">
              <strong>Katana standalone</strong> va copiato in <code className="bg-slate-200 px-1 rounded">dist/katana/</code> nella distribuzione finale. Apri <code>index.html</code> per usarlo offline.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">2.</span>
            <span className="text-slate-700">
              <strong>Tools Suite per GitHub Pages:</strong> <code className="bg-slate-200 px-1 rounded">VITE_DEPLOY_TARGET=github-pages npm run build</code>, poi deploya <code>dist/</code>.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">3.</span>
            <span className="text-slate-700"><strong>Struttura deploy completa:</strong></span>
          </div>
          <pre className="ml-6 bg-white rounded-lg border border-slate-200 p-3 text-slate-700" style={{ fontSize: "11px", fontFamily: "monospace" }}>{`dist/
\u251c\u2500\u2500 index.html          \u2190 Launcher (Tools Suite)
\u251c\u2500\u2500 assets/             \u2190 JS/CSS bundled
\u2514\u2500\u2500 katana/
    \u251c\u2500\u2500 index.html      \u2190 Katana crop tool
    \u251c\u2500\u2500 data.js
    \u251c\u2500\u2500 script.js
    \u2514\u2500\u2500 style.css`}</pre>
        </div>
      </div>
    </div>
  );
}
