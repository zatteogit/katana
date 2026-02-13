import { useState } from "react";
import {
  FolderOpen,
  FileCode,
  FileText,
  Download,
  Copy,
  CheckCheck,
  GitBranch,
  Layers,
  ArrowRight,
  Info,
  FolderGit2,
  Package,
  Terminal,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { dataJsCode } from "./katana-files/data-js-code";
import { scriptJsCode } from "./katana-files/script-js-code";
import { styleCssCode } from "./katana-files/style-css-code";
import { indexHtmlCode } from "./katana-files/index-html-code";

/* ======================================================================= */
/* Helper: Copy Button                                                      */
/* ======================================================================= */
function CopyBtn({
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
      {copied ? "Copiato!" : label || "Copia"}
    </button>
  );
}

/* ======================================================================= */
/* Helper: Download single file                                             */
/* ======================================================================= */
function downloadFile(
  filename: string,
  content: string,
  mimeType = "text/plain",
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ======================================================================= */
/* Helper: Download all 4 files as zip-like (individual downloads)          */
/* ======================================================================= */
function downloadAllFiles() {
  const files = [
    {
      name: "data.js",
      content: dataJsCode,
      mime: "application/javascript",
    },
    {
      name: "script.js",
      content: scriptJsCode,
      mime: "application/javascript",
    },
    { name: "style.css", content: styleCssCode, mime: "text/css" },
    {
      name: "index.html",
      content: indexHtmlCode,
      mime: "text/html",
    },
  ];
  files.forEach((f, i) => {
    setTimeout(
      () => downloadFile(f.name, f.content, f.mime),
      i * 200,
    );
  });
}

/* ======================================================================= */
/* Tree Node                                                                */
/* ======================================================================= */
interface TreeItem {
  name: string;
  type: "folder" | "file";
  tag?: string;
  tagColor?: string;
  desc?: string;
  children?: TreeItem[];
}

function TreeNode({
  item,
  depth = 0,
  defaultOpen = true,
}: {
  item: TreeItem;
  depth?: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isFolder = item.type === "folder";
  const pad = depth * 20;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1.5 px-2 rounded-md transition-colors ${
          isFolder
            ? "hover:bg-slate-100 cursor-pointer"
            : "hover:bg-slate-50"
        }`}
        style={{ paddingLeft: pad + 8 }}
        onClick={() => isFolder && setOpen(!open)}
      >
        {isFolder ? (
          open ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          )
        ) : (
          <span className="w-3.5" />
        )}
        {isFolder ? (
          <FolderOpen className="w-4 h-4 text-amber-500 flex-shrink-0" />
        ) : (
          <FileCode className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
        <span
          className={`${isFolder ? "text-slate-800" : "text-slate-600"}`}
          style={{
            fontSize: "13px",
            fontFamily: isFolder ? "inherit" : "monospace",
          }}
        >
          {item.name}
        </span>
        {item.tag && (
          <span
            className={`px-1.5 py-0.5 rounded border ${item.tagColor || "bg-slate-100 border-slate-200 text-slate-600"}`}
            style={{ fontSize: "9px" }}
          >
            {item.tag}
          </span>
        )}
        {item.desc && (
          <span
            className="text-slate-400 ml-1"
            style={{ fontSize: "11px" }}
          >
            {item.desc}
          </span>
        )}
      </div>
      {isFolder && open && item.children && (
        <div>
          {item.children.map((child, i) => (
            <TreeNode
              key={i}
              item={child}
              depth={depth + 1}
              defaultOpen={depth < 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================================================================= */
/* Repo Structure Data                                                      */
/* ======================================================================= */
const repoTree: TreeItem = {
  name: "katana/",
  type: "folder",
  tag: "ROOT",
  tagColor: "bg-violet-100 border-violet-200 text-violet-700",
  children: [
    {
      name: "dist/",
      type: "folder",
      tag: "OUTPUT",
      tagColor: "bg-emerald-100 border-emerald-200 text-emerald-700",
      desc: "File deployabili Katana",
      children: [
        {
          name: "data.js",
          type: "file",
          desc: "STRINGS + SITE_CONFIG",
        },
        {
          name: "script.js",
          type: "file",
          desc: "Logic, crop, detection, export",
        },
        {
          name: "style.css",
          type: "file",
          desc: "Design system brutalist",
        },
        {
          name: "index.html",
          type: "file",
          desc: "Markup + CDN dependencies",
        },
      ],
    },
    {
      name: "tool/",
      type: "folder",
      tag: "DEV TOOL",
      tagColor: "bg-blue-100 border-blue-200 text-blue-700",
      desc: "React analysis app (Vite + Tailwind)",
      children: [
        {
          name: "src/",
          type: "folder",
          children: [
            {
              name: "app/",
              type: "folder",
              children: [
                {
                  name: "App.tsx",
                  type: "file",
                  desc: "Entry point, tabs, stats",
                },
                {
                  name: "components/",
                  type: "folder",
                  children: [
                    {
                      name: "analysis-data.ts",
                      type: "file",
                      desc: "Dati analisi Figma vs Config",
                    },
                    {
                      name: "ComparisonCard.tsx",
                      type: "file",
                      desc: "Card confronto frame",
                    },
                    {
                      name: "KatanaCodeTab.tsx",
                      type: "file",
                      desc: "Tab codice (4 file)",
                    },
                    {
                      name: "KatanaPreviewTab.tsx",
                      type: "file",
                      desc: "Preview live iframe",
                    },
                    {
                      name: "KatanaRepoTab.tsx",
                      type: "file",
                      desc: "Struttura repo (questo tab)",
                    },
                    {
                      name: "katana-files/",
                      type: "folder",
                      tag: "SOURCE",
                      tagColor:
                        "bg-amber-100 border-amber-200 text-amber-700",
                      desc: "Sorgente TS dei file output",
                      children: [
                        {
                          name: "data-js-code.ts",
                          type: "file",
                        },
                        {
                          name: "script-js-code.ts",
                          type: "file",
                        },
                        {
                          name: "style-css-code.ts",
                          type: "file",
                        },
                        {
                          name: "index-html-code.ts",
                          type: "file",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "styles/",
              type: "folder",
              desc: "CSS del dev tool",
            },
          ],
        },
        {
          name: "package.json",
          type: "file",
          desc: "Dipendenze dev tool",
        },
        { name: "vite.config.ts", type: "file" },
        { name: "tsconfig.json", type: "file" },
      ],
    },
    {
      name: ".gitignore",
      type: "file",
      desc: "node_modules, .DS_Store...",
    },
    { name: "README.md", type: "file", desc: "Docs progetto" },
  ],
};

/* ======================================================================= */
/* Git Commands                                                             */
/* ======================================================================= */
const gitCommands = `# 1. Struttura iniziale del repo
mkdir -p dist tool

# 2. Copia i 4 file output in dist/
cp data.js script.js style.css index.html dist/

# 3. Sposta il progetto React (dev tool) in tool/
mv src package.json vite.config.ts tsconfig.json postcss.config.mjs tool/

# 4. Commit separato per dist/ (output Katana)
git add dist/
git commit -m "feat(dist): Katana v3.0 — output files (data, script, style, html)"

# 5. Commit separato per tool/ (React dev tool)
git add tool/
git commit -m "feat(tool): Katana Frame Analyzer — React analysis app"

# 6. Push
git push origin main`;

/* ======================================================================= */
/* .gitignore content                                                       */
/* ======================================================================= */
const gitignoreContent = `# Dependencies
node_modules/
.pnpm-store/

# Build output (dev tool)
tool/dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.local
.env.*.local`;

/* ======================================================================= */
/* README template                                                          */
/* ======================================================================= */
const readmeTemplate = `# Katana

Tool interno per il ritaglio e l'export di asset immagine per Poste.it Retail, Corporate e Social Media Kit.

## Struttura Repository

\`\`\`
katana/
├── dist/           ← File deployabili (copia su Notion / hosting)
│   ├── data.js     ← STRINGS + SITE_CONFIG
│   ├── script.js   ← Logic, crop, smart detection, export
│   ├── style.css   ← Design system brutalist
│   └── index.html  ← Markup + dipendenze CDN
│
├── tool/           ← Dev tool React (analisi Figma vs Config)
│   ├── src/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
\`\`\`

## dist/ — Katana App

I 4 file in \`dist/\` compongono l'applicazione Katana completa.
Per utilizzarla, apri \`index.html\` direttamente nel browser (funziona offline).

### Versione corrente: v3.0 Stable
- Smart Asset Detection (\`detectAssetFromFile()\`)
- Overlay Zones (oz) — Area Testi + Area Loghi
- Export PSD con layer (sorgente + overlay)
- Modale custom brutalist per conferma detection

## tool/ — Frame Analyzer

App React (Vite + Tailwind) per analizzare le misure dei frame Figma
rispetto alla SITE_CONFIG corporate.

### Avvio
\`\`\`bash
cd tool
pnpm install
pnpm dev
\`\`\`

### Tab disponibili
- **Analisi**: Confronto Figma vs Config con filtri e statistiche
- **Schema oz**: Documentazione proposta Overlay Zones
- **Preview**: Live preview dei 4 file combinati in iframe
- **JSON Corretto**: SITE_CONFIG aggiornata con correzioni
- **Codice Katana**: I 4 file pronti per copy-paste
- **Repository**: Struttura repo e export file
`;

/* ======================================================================= */
/* File info for download section                                           */
/* ======================================================================= */
const outputFiles = [
  {
    name: "data.js",
    desc: "STRINGS (i18n) + SITE_CONFIG (3 canali, tutti i componenti)",
    icon: "📦",
    size: dataJsCode.length,
    code: dataJsCode,
    mime: "application/javascript",
  },
  {
    name: "script.js",
    desc: "Logic core: crop, detection, overlay, export ZIP/PSD",
    icon: "⚡",
    size: scriptJsCode.length,
    code: scriptJsCode,
    mime: "application/javascript",
  },
  {
    name: "style.css",
    desc: "Design system brutalist: tokens, card, modal, overlay zones",
    icon: "🎨",
    size: styleCssCode.length,
    code: styleCssCode,
    mime: "text/css",
  },
  {
    name: "index.html",
    desc: "Markup HTML + dipendenze CDN (Bootstrap, Cropper, etc.)",
    icon: "📄",
    size: indexHtmlCode.length,
    code: indexHtmlCode,
    mime: "text/html",
  },
];

/* ======================================================================= */
/* MAIN COMPONENT                                                           */
/* ======================================================================= */
export function KatanaRepoTab() {
  const [showGit, setShowGit] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <FolderGit2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h2
              style={{ fontSize: "18px" }}
              className="text-slate-900 mb-1"
            >
              Struttura Repository GitHub
            </h2>
            <p
              className="text-slate-600"
              style={{ fontSize: "13px", lineHeight: "1.7" }}
            >
              Separazione netta tra{" "}
              <strong className="text-emerald-700">
                output deployabile
              </strong>{" "}
              (i 4 file Katana in{" "}
              <code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                dist/
              </code>
              ) e{" "}
              <strong className="text-blue-700">
                dev tool di analisi
              </strong>{" "}
              (l'app React in{" "}
              <code className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">
                tool/
              </code>
              ). Il repo{" "}
              <code className="text-slate-700">
                zatteogit/katana
              </code>{" "}
              ospita entrambi con commit history separata.
            </p>
          </div>
        </div>
      </div>

      {/* Separation Concept */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-emerald-600" />
            <span
              className="text-emerald-900"
              style={{ fontSize: "14px" }}
            >
              <code>dist/</code> — Output Katana
            </span>
          </div>
          <div
            className="text-emerald-800 space-y-1.5"
            style={{ fontSize: "12px", lineHeight: "1.6" }}
          >
            <p>
              <strong>4 file vanilla</strong> (JS + CSS + HTML)
              pronti per il deploy.
            </p>
            <p>
              Funzionano <strong>offline</strong> aprendo{" "}
              <code>index.html</code> nel browser.
            </p>
            <p>
              Aggiornati copy-pastando dal tab "Codice Katana" o
              scaricando da qui.
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span
              className="px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              data.js
            </span>
            <span
              className="px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              script.js
            </span>
            <span
              className="px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              style.css
            </span>
            <span
              className="px-2 py-1 rounded bg-emerald-200/60 text-emerald-800 border border-emerald-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              index.html
            </span>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span
              className="text-blue-900"
              style={{ fontSize: "14px" }}
            >
              <code>tool/</code> — Dev Tool React
            </span>
          </div>
          <div
            className="text-blue-800 space-y-1.5"
            style={{ fontSize: "12px", lineHeight: "1.6" }}
          >
            <p>
              App <strong>Vite + React + Tailwind</strong> per
              analisi frame Figma.
            </p>
            <p>
              Confronta misure Figma vs SITE_CONFIG, genera JSON
              corretto, preview live.
            </p>
            <p>
              Contiene i sorgenti TS dei 4 file in{" "}
              <code>katana-files/</code>.
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span
              className="px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              React
            </span>
            <span
              className="px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              Tailwind
            </span>
            <span
              className="px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              Vite
            </span>
            <span
              className="px-2 py-1 rounded bg-blue-200/60 text-blue-800 border border-blue-300"
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
              }}
            >
              TypeScript
            </span>
          </div>
        </div>
      </div>

      {/* Data Flow */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h3
          className="text-slate-800 mb-3"
          style={{ fontSize: "13px" }}
        >
          Flusso dati
        </h3>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div
            className="px-3 py-2 rounded border bg-amber-50 border-amber-200 text-amber-800 text-center"
            style={{ fontSize: "11px" }}
          >
            <div style={{ fontFamily: "monospace" }}>
              katana-files/*.ts
            </div>
            <div className="text-amber-600" style={{ fontSize: "9px" }}>
              Sorgente TypeScript
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div
            className="px-3 py-2 rounded border bg-blue-50 border-blue-200 text-blue-800 text-center"
            style={{ fontSize: "11px" }}
          >
            <div style={{ fontFamily: "monospace" }}>
              KatanaCodeTab.tsx
            </div>
            <div className="text-blue-600" style={{ fontSize: "9px" }}>
              Render + Copy UI
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div
            className="px-3 py-2 rounded border bg-emerald-50 border-emerald-200 text-emerald-800 text-center"
            style={{ fontSize: "11px" }}
          >
            <div style={{ fontFamily: "monospace" }}>dist/</div>
            <div
              className="text-emerald-600"
              style={{ fontSize: "9px" }}
            >
              File pronti
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <div
            className="px-3 py-2 rounded border bg-violet-50 border-violet-200 text-violet-800 text-center"
            style={{ fontSize: "11px" }}
          >
            <div style={{ fontFamily: "monospace" }}>
              GitHub / Notion
            </div>
            <div
              className="text-violet-600"
              style={{ fontSize: "9px" }}
            >
              Deploy
            </div>
          </div>
        </div>
      </div>

      {/* File Tree */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-slate-500" />
          <span
            className="text-slate-800"
            style={{ fontSize: "14px" }}
          >
            Struttura consigliata
          </span>
          <span
            className="text-slate-400 ml-1"
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
            }}
          >
            zatteogit/katana
          </span>
        </div>
        <div className="p-3 bg-slate-50">
          <TreeNode item={repoTree} />
        </div>
      </div>

      {/* Download Output Files */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-600" />
            <h3
              className="text-slate-800"
              style={{ fontSize: "14px" }}
            >
              Scarica file per{" "}
              <code className="text-emerald-700">dist/</code>
            </h3>
          </div>
          <button
            onClick={downloadAllFiles}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
            style={{ fontSize: "12px" }}
          >
            <Download className="w-3.5 h-3.5" />
            Scarica tutti (4 file)
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {outputFiles.map((f) => (
            <div
              key={f.name}
              className="flex items-center justify-between p-3 rounded-md border border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span style={{ fontSize: "20px" }}>
                  {f.icon}
                </span>
                <div>
                  <div
                    className="text-slate-800"
                    style={{
                      fontSize: "13px",
                      fontFamily: "monospace",
                    }}
                  >
                    {f.name}
                  </div>
                  <div
                    className="text-slate-500"
                    style={{ fontSize: "11px" }}
                  >
                    {f.desc}
                  </div>
                  <div
                    className="text-slate-400"
                    style={{ fontSize: "10px" }}
                  >
                    {(f.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              </div>
              <button
                onClick={() =>
                  downloadFile(f.name, f.code, f.mime)
                }
                className="p-2 rounded border border-slate-200 bg-white hover:border-emerald-300 hover:text-emerald-600 transition-colors text-slate-500"
                title={`Scarica ${f.name}`}
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Git Commands */}
      <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
        <div
          className="px-4 py-2.5 bg-slate-800 border-b border-slate-700 flex items-center justify-between cursor-pointer hover:bg-slate-750 transition-colors"
          onClick={() => setShowGit(!showGit)}
        >
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-400" />
            <span
              className="text-slate-300"
              style={{ fontSize: "13px" }}
            >
              Comandi Git per la riorganizzazione
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CopyBtn text={gitCommands} label="Copia comandi" />
            {showGit ? (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </div>
        {showGit && (
          <pre
            className="p-4 text-slate-200 overflow-auto"
            style={{
              fontSize: "12px",
              lineHeight: "1.6",
              fontFamily:
                "'SF Mono', 'Fira Code', 'Consolas', monospace",
            }}
          >
            {gitCommands}
          </pre>
        )}
      </div>

      {/* Config Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* .gitignore */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span
                className="text-slate-700"
                style={{
                  fontSize: "13px",
                  fontFamily: "monospace",
                }}
              >
                .gitignore
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CopyBtn text={gitignoreContent} />
              <button
                onClick={() =>
                  downloadFile(".gitignore", gitignoreContent)
                }
                className="p-1.5 rounded border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
                title="Scarica .gitignore"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
          <pre
            className="p-3 text-slate-700 overflow-auto bg-slate-50"
            style={{
              fontSize: "11px",
              lineHeight: "1.5",
              fontFamily: "monospace",
              maxHeight: 200,
            }}
          >
            {gitignoreContent}
          </pre>
        </div>

        {/* README */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span
                className="text-slate-700"
                style={{
                  fontSize: "13px",
                  fontFamily: "monospace",
                }}
              >
                README.md
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CopyBtn text={readmeTemplate} />
              <button
                onClick={() =>
                  downloadFile(
                    "README.md",
                    readmeTemplate,
                    "text/markdown",
                  )
                }
                className="p-1.5 rounded border border-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
                title="Scarica README.md"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
          </div>
          <pre
            className="p-3 text-slate-700 overflow-auto bg-slate-50"
            style={{
              fontSize: "11px",
              lineHeight: "1.5",
              fontFamily: "monospace",
              maxHeight: 200,
            }}
          >
            {readmeTemplate}
          </pre>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4 text-slate-500" />
          <h3
            className="text-slate-800"
            style={{ fontSize: "14px" }}
          >
            Note per il push su GitHub
          </h3>
        </div>
        <div
          className="space-y-2"
          style={{ fontSize: "12px", lineHeight: "1.6" }}
        >
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">
              1.
            </span>
            <span className="text-slate-700">
              <strong>
                <code>dist/</code> va committato:
              </strong>{" "}
              Contiene i file deployabili finali. Non
              aggiungerlo a <code>.gitignore</code>. Questi
              sono gli artefatti che vengono copiati su Notion o
              serviti direttamente.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">
              2.
            </span>
            <span className="text-slate-700">
              <strong>
                <code>tool/dist/</code> NON va committato:
              </strong>{" "}
              È l'output di build del dev tool React (generato
              da <code>vite build</code>). Questo sì va in{" "}
              <code>.gitignore</code>.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">
              3.
            </span>
            <span className="text-slate-700">
              <strong>Aggiornamento dist/:</strong> Quando
              modifichi i file in{" "}
              <code>katana-files/*.ts</code>, scarica i 4 file
              aggiornati da questo tab e sostituiscili in{" "}
              <code>dist/</code> prima del commit.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">
              4.
            </span>
            <span className="text-slate-700">
              <strong>Commit message convention:</strong>{" "}
              <code>feat(dist):</code> per modifiche ai file
              output, <code>feat(tool):</code> per modifiche al
              dev tool. Mantiene la storia chiara.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5 flex-shrink-0">
              5.
            </span>
            <span className="text-slate-700">
              <strong>Il commit iniziale</strong> (
              <code>bea59e9</code>) contiene config, stili e{" "}
              <code>.gitignore</code>. Il prossimo push deve
              aggiungere sia <code>dist/</code> che{" "}
              <code>tool/</code> con commit separati.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
