import {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import {
  RefreshCw,
  Maximize2,
  Minimize2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { dataJsCode } from "./katana-files/data-js-code";
import { scriptJsCode } from "./katana-files/script-js-code";
import { styleCssCode } from "./katana-files/style-css-code";
import { indexHtmlCode } from "./katana-files/index-html-code";

/**
 * Combina i 4 file Katana (index.html, style.css, data.js, script.js)
 * in un unico documento HTML autonomo, inlinando CSS e JS.
 * Non aggiunge e non modifica nulla del codice originale.
 */
function buildFullHtml(): string {
  let html = indexHtmlCode;

  // 1. Rimuovi CSP meta tag — in un iframe srcDoc blocca i CDN
  const cspIdx = html.indexOf("Content-Security-Policy");
  if (cspIdx !== -1) {
    const cspMetaStart = html.lastIndexOf("<meta", cspIdx);
    const cspMetaEnd = html.indexOf("/>", cspIdx);
    if (cspMetaStart !== -1 && cspMetaEnd !== -1) {
      html =
        html.substring(0, cspMetaStart) +
        "<!-- CSP removed -->" +
        html.substring(cspMetaEnd + 2);
    }
  }

  // 1b. Rimuovi attributi integrity (SRI) — in iframe srcDoc possono fallire
  html = html.replace(/\s+integrity="[^"]*"/g, "");

  // 2. CSS: sostituisci link style.css con <style> inline
  const cssIdx = html.indexOf('href="style.css"');
  if (cssIdx !== -1) {
    const linkStart = html.lastIndexOf("<link", cssIdx);
    const linkEnd = html.indexOf(">", cssIdx) + 1;
    if (linkStart !== -1 && linkEnd > 0) {
      html =
        html.substring(0, linkStart) +
        "<style>\n" +
        styleCssCode +
        "\n</style>" +
        html.substring(linkEnd);
    }
  }

  // 3. JS: sostituisci <script src="data.js"> con inline
  const dataIdx = html.indexOf('src="data.js"');
  if (dataIdx !== -1) {
    const scriptStart = html.lastIndexOf("<script", dataIdx);
    const closingTag = "</script>";
    const scriptEnd = html.indexOf(closingTag, dataIdx);
    if (scriptStart !== -1 && scriptEnd !== -1) {
      html =
        html.substring(0, scriptStart) +
        "<script>\n" +
        dataJsCode +
        "\n<" +
        "/script>" +
        html.substring(scriptEnd + closingTag.length);
    }
  }

  // 4. JS: sostituisci <script src="script.js..."> con inline
  const jsIdx = html.indexOf('src="script.js');
  if (jsIdx !== -1) {
    const scriptStart = html.lastIndexOf("<script", jsIdx);
    const closingTag = "</script>";
    const scriptEnd = html.indexOf(closingTag, jsIdx);
    if (scriptStart !== -1 && scriptEnd !== -1) {
      html =
        html.substring(0, scriptStart) +
        "<script>\n" +
        scriptJsCode +
        "\n<" +
        "/script>" +
        html.substring(scriptEnd + closingTag.length);
    }
  }

  return html;
}

/**
 * Script iniettato nell'iframe per catturare console.log/warn/error
 * e inviarli alla finestra parent tramite postMessage.
 */
const CONSOLE_CAPTURE_SCRIPT = [
  "<script>",
  "(function(){",
  "  var oL=console.log,oW=console.warn,oE=console.error,oI=console.info;",
  "  function s(t,a){",
  "    var x=[].slice.call(a).map(function(v){",
  "      try{return typeof v==='object'?JSON.stringify(v,null,2):String(v)}",
  "      catch(e){return String(v)}",
  "    }).join(' ');",
  "    window.parent.postMessage({__kc:1,t:t,x:x},'*');",
  "  }",
  "  console.log=function(){s('log',arguments);oL.apply(console,arguments)};",
  "  console.warn=function(){s('warn',arguments);oW.apply(console,arguments)};",
  "  console.error=function(){s('error',arguments);oE.apply(console,arguments)};",
  "  console.info=function(){s('info',arguments);oI.apply(console,arguments)};",
  "  window.onerror=function(m,u,l,c){s('error',['[JS] '+m+' L'+l+':'+c])};",
  "  window.addEventListener('unhandledrejection',function(e){",
  "    s('error',['[Promise] '+(e.reason&&e.reason.message||String(e.reason))]);",
  "  });",
  "})();",
  "<" + "/script>",
].join("\n");

interface LogLine {
  type: "log" | "warn" | "error" | "info";
  text: string;
  ts: string;
}

export function KatanaPreviewTab() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [showConsole, setShowConsole] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Costruisci HTML completo una sola volta
  const srcDoc = useMemo(() => {
    let html = buildFullHtml();

    // Inietta console capture subito dopo <body>
    html = html.replace(
      "<body>",
      "<body>\n" + CONSOLE_CAPTURE_SCRIPT,
    );

    return html;
  }, []);

  // Listener per messaggi console dall'iframe
  const onMessage = useCallback((e: MessageEvent) => {
    if (e.data && e.data.__kc) {
      const d = new Date();
      const ts =
        String(d.getHours()).padStart(2, "0") +
        ":" +
        String(d.getMinutes()).padStart(2, "0") +
        ":" +
        String(d.getSeconds()).padStart(2, "0");
      setLogs((prev) => [
        ...prev.slice(-300),
        { type: e.data.t, text: e.data.x, ts },
      ]);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMessage);
    return () =>
      window.removeEventListener("message", onMessage);
  }, [onMessage]);

  const reload = () => {
    setLogs([]);
    setIframeKey((k) => k + 1);
  };

  const openNewTab = () => {
    const blob = new Blob([srcDoc], { type: "text/html" });
    window.open(URL.createObjectURL(blob), "_blank");
  };

  const errCount = logs.filter(
    (l) => l.type === "error",
  ).length;
  const warnCount = logs.filter(
    (l) => l.type === "warn",
  ).length;

  const logColor: Record<string, string> = {
    log: "text-slate-300",
    info: "text-blue-400",
    warn: "text-amber-400",
    error: "text-red-400",
  };

  return (
    <div className="space-y-4">
      {/* Descrizione */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <h2
          className="text-slate-900 mb-1"
          style={{ fontSize: "18px" }}
        >
          Katana — Live Preview
        </h2>
        <p
          className="text-slate-500"
          style={{ fontSize: "12px", lineHeight: "1.6" }}
        >
          Esecuzione live dei 4 file generati (data.js +
          script.js + style.css + index.html) combinati in un
          unico documento. Carica un'immagine per testare il
          crop con gli overlay. Apri la Console per vedere
          errori e log.
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between bg-slate-800 rounded-t-lg px-4 py-2 border border-slate-700 border-b-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span
            className="text-slate-400"
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
            }}
          >
            katana-preview.html
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Console toggle */}
          <button
            onClick={() => setShowConsole((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md border transition-all ${
              showConsole
                ? "bg-slate-700 text-slate-200 border-slate-600"
                : "bg-transparent text-slate-400 border-slate-700 hover:text-slate-300"
            }`}
            style={{ fontSize: "11px" }}
          >
            <AlertCircle className="w-3 h-3" />
            Console
            {errCount > 0 && (
              <span
                className="bg-red-500 text-white rounded-full px-1.5"
                style={{ fontSize: "9px" }}
              >
                {errCount}
              </span>
            )}
            {warnCount > 0 && errCount === 0 && (
              <span
                className="bg-amber-500 text-white rounded-full px-1.5"
                style={{ fontSize: "9px" }}
              >
                {warnCount}
              </span>
            )}
          </button>
          <button
            onClick={reload}
            className="p-1.5 rounded-md bg-transparent text-slate-400 border border-slate-700 hover:text-slate-200 transition-colors"
            title="Ricarica"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setFullscreen((v) => !v)}
            className="p-1.5 rounded-md bg-transparent text-slate-400 border border-slate-700 hover:text-slate-200 transition-colors"
            title={
              fullscreen ? "Esci da fullscreen" : "Fullscreen"
            }
          >
            {fullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={openNewTab}
            className="p-1.5 rounded-md bg-transparent text-slate-400 border border-slate-700 hover:text-slate-200 transition-colors"
            title="Apri in nuovo tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Iframe */}
      <div
        className={`bg-slate-900 border border-slate-700 overflow-hidden transition-all ${
          fullscreen
            ? "fixed inset-0 z-50 rounded-none"
            : "rounded-b-lg"
        }`}
        style={{
          height: fullscreen ? "100vh" : 700,
          marginTop: 0,
        }}
      >
        <iframe
          key={iframeKey}
          ref={iframeRef}
          srcDoc={srcDoc}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms"
          title="Katana Live Preview"
        />
      </div>

      {/* Console panel */}
      {showConsole && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 bg-slate-800 border-b border-slate-700">
            <span
              className="text-slate-400"
              style={{ fontSize: "11px" }}
            >
              Console ({logs.length} messaggi)
            </span>
            <button
              onClick={() => setLogs([])}
              className="text-slate-500 hover:text-slate-300 transition-colors"
              style={{ fontSize: "10px" }}
            >
              Pulisci
            </button>
          </div>
          <div
            className="overflow-auto p-2 space-y-0.5"
            style={{
              maxHeight: 250,
              fontSize: "11px",
              fontFamily:
                "'SF Mono','Fira Code',Consolas,monospace",
            }}
          >
            {logs.length === 0 ? (
              <div
                className="text-slate-600 py-4 text-center"
                style={{ fontSize: "11px" }}
              >
                Nessun messaggio
              </div>
            ) : (
              logs.map((l, i) => (
                <div
                  key={i}
                  className={`px-2 py-0.5 rounded ${
                    l.type === "error"
                      ? "bg-red-950/30"
                      : l.type === "warn"
                        ? "bg-amber-950/20"
                        : ""
                  }`}
                >
                  <span className="text-slate-600 mr-2">
                    {l.ts}
                  </span>
                  <span
                    className={
                      logColor[l.type] || "text-slate-300"
                    }
                  >
                    {l.type === "error"
                      ? "ERR "
                      : l.type === "warn"
                        ? "WRN "
                        : ""}
                    {l.text}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Istruzioni */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <h3
          className="text-slate-800 mb-2"
          style={{ fontSize: "13px" }}
        >
          Come usare la preview
        </h3>
        <div
          className="space-y-1.5 text-slate-600"
          style={{ fontSize: "12px", lineHeight: "1.6" }}
        >
          <p>
            <span className="text-slate-400 mr-1">1.</span>
            Seleziona <strong>Canale</strong> e{" "}
            <strong>Componente</strong>.
          </p>
          <p>
            <span className="text-slate-400 mr-1">2.</span>
            <strong>Trascina un'immagine</strong> nella drop
            zone.
          </p>
          <p>
            <span className="text-slate-400 mr-1">3.</span>
            Clicca <strong>"Ritaglia"</strong> su una card per
            il crop modal con overlay.
          </p>
          <p>
            <span className="text-slate-400 mr-1">4.</span>
            Apri la <strong>Console</strong> per errori. Usa{" "}
            <strong>"Apri in nuovo tab"</strong> per test a
            schermo pieno.
          </p>
        </div>
      </div>
    </div>
  );
}