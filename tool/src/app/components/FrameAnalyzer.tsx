/**
 * Katana Dev Tool — main page
 * Single minimal header + full-width preview.
 * Tabs: Preview (Katana live), Codice Katana, Downloads
 */

import { useState, useRef } from "react";
import {
  Eye,
  Code2,
  Download,
  Crosshair,
  RefreshCw,
  ExternalLink,
  Shield,
  FlaskConical,
} from "lucide-react";
import { Link } from "react-router";
import { KatanaCodeTab } from "./KatanaCodeTab";
import { KatanaPreviewTab, type KatanaPreviewHandle } from "./KatanaPreviewTab";
import { KatanaDownloadsTab } from "./KatanaDownloadsTab";

type TabType = "preview" | "code" | "downloads";

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: "preview", label: "Preview", icon: <Eye className="w-3.5 h-3.5" /> },
  {
    id: "code",
    label: "Codice Katana",
    icon: <Code2 className="w-3.5 h-3.5" />,
  },
  {
    id: "downloads",
    label: "Downloads",
    icon: <Download className="w-3.5 h-3.5" />,
  },
];

export function FrameAnalyzer() {
  const [activeTab, setActiveTab] = useState<TabType>("preview");
  const [mode, setMode] = useState<"stable" | "dev">("stable");
  const previewRef = useRef<KatanaPreviewHandle>(null);

  const isPreview = activeTab === "preview";

  const toggleMode = () => {
    const next = mode === "stable" ? "dev" : "stable";
    setMode(next);
    // force iframe reload on mode change
    setTimeout(() => previewRef.current?.reload(), 0);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* ─── Single minimal header ─── */}
      <header className="bg-white border-b border-slate-200 flex-shrink-0 z-10">
        <div
          className={`flex items-center gap-2 py-1.5 ${
            isPreview ? "px-3" : "max-w-5xl mx-auto px-4"
          }`}
        >
          {/* Back */}
          <Link
            to="/"
            className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
            title="Torna al Launcher"
          >
            <Crosshair className="w-3.5 h-3.5 text-white" />
          </Link>

          {/* Title — compact */}
          <span
            className="text-slate-700 flex-shrink-0 hidden sm:block"
            style={{ fontSize: "13px" }}
          >
            Katana Dev Tool
          </span>

          {/* Separator */}
          <div className="w-px h-4 bg-slate-200 flex-shrink-0 hidden sm:block" />

          {/* Version switch — always visible, actionable only in preview */}
          <button
            onClick={toggleMode}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-all flex-shrink-0 ${
              mode === "stable"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
            }`}
            style={{ fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.03em" }}
            title={
              mode === "stable"
                ? "STABLE — Baseline v3.0 verificata (freeze 2026-02-14). Clicca per passare a DEV."
                : "DEV — Diagnostica + preview-inject attivi. Clicca per tornare a STABLE (baseline)."
            }
          >
            {mode === "stable" ? (
              <Shield className="w-3 h-3" />
            ) : (
              <FlaskConical className="w-3 h-3" />
            )}
            {mode === "stable" ? "v3.0 STABLE" : "v3.0 DEV"}
          </button>

          {/* Tab switcher — pushed to center-right */}
          <div className="ml-auto flex items-center gap-0.5 bg-slate-100 rounded-lg p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-slate-800"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                style={{ fontSize: "11px" }}
              >
                <span className="flex items-center gap-1.5">
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Preview actions */}
          {isPreview && (
            <>
              <div className="w-px h-4 bg-slate-200 flex-shrink-0" />
              <div className="flex items-center gap-0.5 flex-shrink-0">
                <button
                  onClick={() => previewRef.current?.reload()}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Ricarica preview"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => previewRef.current?.openNewTab()}
                  className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  title="Apri in nuovo tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* ─── Content ─── */}
      {isPreview ? (
        <div className="flex-1 min-h-0">
          <KatanaPreviewTab ref={previewRef} mode={mode} />
        </div>
      ) : (
        <main className="flex-1 overflow-auto">
          <div className="max-w-5xl mx-auto px-4 py-6">
            {activeTab === "code" && <KatanaCodeTab />}
            {activeTab === "downloads" && <KatanaDownloadsTab />}
          </div>
        </main>
      )}
    </div>
  );
}
