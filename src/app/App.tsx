import { useState, useMemo } from "react";
import {
  Check,
  X,
  Plus,
  Crosshair,
  Copy,
  CheckCheck,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  FileJson,
  Layers,
  Filter,
  EyeOff,
  Eye,
  BookOpen,
  ArrowRight,
  Code2,
  FolderGit2,
} from "lucide-react";
import {
  analysisEntries,
  correctedCorporateConfig,
  overlayStats,
  type Status,
} from "./components/analysis-data";
import { ComparisonCard } from "./components/ComparisonCard";
import { KatanaCodeTab } from "./components/KatanaCodeTab";
import { KatanaPreviewTab } from "./components/KatanaPreviewTab";
import { KatanaRepoTab } from "./components/KatanaRepoTab";

type FilterType = "all" | Status;
type TabType =
  | "analysis"
  | "schema"
  | "preview"
  | "json"
  | "code"
  | "repo";

const filterOptions: {
  value: FilterType;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "all",
    label: "Tutti",
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    value: "mismatch",
    label: "Mismatch",
    icon: <X className="w-3.5 h-3.5" />,
  },
  {
    value: "focus_add",
    label: "Focus",
    icon: <Crosshair className="w-3.5 h-3.5" />,
  },
  {
    value: "new_component",
    label: "Nuovi",
    icon: <Plus className="w-3.5 h-3.5" />,
  },
  {
    value: "new_variant",
    label: "Varianti",
    icon: <Plus className="w-3.5 h-3.5" />,
  },
  {
    value: "ok",
    label: "OK",
    icon: <Check className="w-3.5 h-3.5" />,
  },
];

function StatCard({
  label,
  count,
  color,
  icon,
}: {
  label: string;
  count: number;
  color: string;
  icon: React.ReactNode;
}) {
  return (
    <div className={`rounded-lg border p-3 ${color}`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span
          style={{ fontSize: "11px" }}
          className="uppercase tracking-wider opacity-70"
        >
          {label}
        </span>
      </div>
      <div
        style={{ fontSize: "28px", fontFamily: "monospace" }}
      >
        {count}
      </div>
    </div>
  );
}

function GroupedEntries({
  component,
  entries,
}: {
  component: string;
  entries: typeof analysisEntries;
}) {
  const [open, setOpen] = useState(true);
  const hasIssues = entries.some((e) => e.status !== "ok");
  const hasOverlays = entries.some(
    (e) => e.figmaOverlays.length > 0,
  );

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
      >
        {open ? (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400" />
        )}
        <span
          style={{ fontSize: "14px" }}
          className="text-slate-800"
        >
          {component}
        </span>
        <span
          className="text-muted-foreground"
          style={{ fontSize: "12px" }}
        >
          ({entries.length} frame)
        </span>
        <div className="ml-auto flex items-center gap-2">
          {hasOverlays && (
            <span
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700"
              style={{ fontSize: "10px" }}
            >
              <EyeOff className="w-3 h-3" />
              oz
            </span>
          )}
          {hasIssues && (
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          )}
        </div>
      </button>
      {open && (
        <div className="space-y-2 pl-2 mt-1">
          {entries.map((entry, i) => (
            <ComparisonCard key={i} entry={entry} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ======================================================================= */
/* Schema Documentation Tab                                                 */
/* ======================================================================= */
function SchemaTab() {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <h2
          style={{ fontSize: "18px" }}
          className="text-slate-900 mb-2"
        >
          Proposta di estensione:{" "}
          <code className="text-blue-600">oz</code> (Overlay
          Zones)
        </h2>
        <p
          className="text-slate-600"
          style={{ fontSize: "13px", lineHeight: "1.7" }}
        >
          I frame Figma mostrano due tipi di zone che il config
          attuale non gestisce: l'<strong>Area Testi</strong>{" "}
          (dove il frontend sovrappone testo/gradient
          all'immagine) e l'<strong>Area Loghi</strong> (dove
          compaiono badge e loghi certificazioni). Queste zone
          sono "esclusioni" per il crop: il soggetto principale
          non dovrebbe finire sotto di esse.
        </p>
      </div>

      {/* Semantic Model */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Crosshair className="w-4 h-4 text-blue-600" />
            <span
              className="text-blue-900"
              style={{ fontSize: "14px" }}
            >
              <code>f</code> &mdash; Focus Area
            </span>
          </div>
          <p
            className="text-blue-800"
            style={{ fontSize: "12px", lineHeight: "1.6" }}
          >
            <strong>Dove METTERE il soggetto.</strong> Il crop
            tool centra e assicura che il soggetto rientri in
            quest'area. Esiste gi&agrave; nello schema.
          </p>
          <div
            className="mt-3 bg-blue-100/60 rounded p-2"
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
            }}
          >
            f: {"{"} x, y, w, h {"}"}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <ArrowRight className="w-6 h-6" />
            <span style={{ fontSize: "10px" }}>
              complementari
            </span>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <EyeOff className="w-4 h-4 text-yellow-700" />
            <span
              className="text-yellow-900"
              style={{ fontSize: "14px" }}
            >
              <code>oz</code> &mdash; Overlay Zones
            </span>
          </div>
          <p
            className="text-yellow-800"
            style={{ fontSize: "12px", lineHeight: "1.6" }}
          >
            <strong>Dove NON mettere il soggetto.</strong>{" "}
            Elementi UI (testi, loghi) coprono queste aree. Il
            crop tool le mostra come hint visivo.
            <strong> Nuova propriet&agrave;.</strong>
          </p>
          <div
            className="mt-3 bg-yellow-100/60 rounded p-2"
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
            }}
          >
            oz: [ {"{"} t, l, x, y, w, h {"}"} ]
          </div>
        </div>
      </div>

      {/* Schema Definition */}
      <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
        <div className="px-4 py-2 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
          <span
            className="text-slate-400"
            style={{
              fontSize: "12px",
              fontFamily: "monospace",
            }}
          >
            schema_oz.js
          </span>
          <span
            className="text-slate-500"
            style={{ fontSize: "11px" }}
          >
            Definizione proprietà
          </span>
        </div>
        <pre
          className="p-4 text-slate-200 overflow-auto"
          style={{
            fontSize: "12px",
            lineHeight: "1.6",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
          }}
        >{`/**
 * LEGENDA CHIAVI OVERLAY ZONE:
 * - oz:  (Overlay Zones) Array di zone di esclusione per il crop.
 *        Indica le aree coperte da elementi UI (testo, loghi).
 *        Il soggetto NON dovrebbe trovarsi in queste zone.
 *
 * Chiavi di ogni zona:
 * - t:   Tipo. "text" = Area Testi (gradient + copy).
 *                "badge" = Area Loghi (loghi/premi/certificazioni).
 * - l:   Label descrittiva della zona (per UI del cropper).
 * - x:   Coordinata X (left) in px, relativa all'asset @1x.
 * - y:   Coordinata Y (top) in px, relativa all'asset @1x.
 * - w:   Larghezza della zona in px @1x.
 * - h:   Altezza della zona in px @1x.
 */

// Esempio completo su un asset:
{
  id: "desktop",
  type: "img",
  label: "Desktop (LG+)",
  w: 2000,
  h: 400,
  d: false,
  fl: "Destra",
  f:  { x: 936, y: 0, w: 552, h: 400 },     // ← soggetto QUI
  oz: [                                        // ← soggetto NON qui
    { t: "text",  l: "Area Testi", x: 338,  y: 0,   w: 598, h: 400 },
    { t: "badge", l: "Area Loghi",  x: 1205, y: 272, w: 408, h: 108 }
  ],
  targetKB: 150
}`}</pre>
      </div>

      {/* Visual Explanation */}
      <div className="bg-white border border-slate-200 rounded-lg p-5">
        <h3
          style={{ fontSize: "14px" }}
          className="text-slate-800 mb-3"
        >
          Come funziona nel cropper
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Visual diagram */}
          <div className="flex-1">
            <div
              className="relative bg-slate-100 border border-slate-300 rounded-md overflow-hidden"
              style={{ height: "180px" }}
            >
              {/* Text overlay zone */}
              <div
                className="absolute bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center"
                style={{
                  left: "5%",
                  top: 0,
                  width: "35%",
                  height: "100%",
                }}
              >
                <span
                  className="text-yellow-800 rotate-[-90deg] whitespace-nowrap"
                  style={{ fontSize: "10px" }}
                >
                  oz: text
                </span>
              </div>
              {/* Badge overlay zone */}
              <div
                className="absolute bg-pink-400/20 border border-pink-400/50 flex items-center justify-center"
                style={{
                  right: "5%",
                  bottom: "10%",
                  width: "25%",
                  height: "25%",
                }}
              >
                <span
                  className="text-pink-800"
                  style={{ fontSize: "9px" }}
                >
                  oz: badge
                </span>
              </div>
              {/* Focus area */}
              <div
                className="absolute bg-blue-500/20 border-2 border-blue-500/60 border-dashed flex items-center justify-center"
                style={{
                  right: "3%",
                  top: 0,
                  width: "35%",
                  height: "100%",
                }}
              >
                <span
                  className="text-blue-700"
                  style={{ fontSize: "11px" }}
                >
                  f: focus
                </span>
              </div>
              {/* Subject placeholder */}
              <div
                className="absolute rounded-full bg-slate-400/30 border-2 border-slate-500/40 flex items-center justify-center"
                style={{
                  right: "10%",
                  top: "15%",
                  width: "20%",
                  height: "65%",
                }}
              >
                <span
                  className="text-slate-600"
                  style={{ fontSize: "9px" }}
                >
                  soggetto
                </span>
              </div>
            </div>
          </div>
          {/* Explanation */}
          <div
            className="flex-1 space-y-3"
            style={{ fontSize: "12px", lineHeight: "1.6" }}
          >
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 mt-0.5 rounded-sm bg-blue-400/40 border border-blue-500/60 flex-shrink-0" />
              <span className="text-slate-700">
                <strong className="text-blue-700">
                  f (focus):
                </strong>{" "}
                Il cropper guida l'utente a posizionare il
                soggetto entro quest'area.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 mt-0.5 rounded-sm bg-yellow-400/40 border border-yellow-400/60 flex-shrink-0" />
              <span className="text-slate-700">
                <strong className="text-yellow-700">
                  oz text:
                </strong>{" "}
                Zona coperta da titolo, sottotitolo e gradient.
                Il soggetto sotto risulterebbe illeggibile.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-3 h-3 mt-0.5 rounded-sm bg-pink-400/40 border border-pink-400/60 flex-shrink-0" />
              <span className="text-slate-700">
                <strong className="text-pink-700">
                  oz badge:
                </strong>{" "}
                Zona loghi/premi che copre l'immagine. Il
                soggetto sotto risulterebbe nascosto.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          label="Frame con overlay"
          count={overlayStats.totalWithOverlays}
          color="bg-yellow-50 border-yellow-200 text-yellow-800"
          icon={<EyeOff className="w-4 h-4 text-yellow-600" />}
        />
        <StatCard
          label="Zone testo"
          count={overlayStats.totalTextZones}
          color="bg-yellow-50 border-yellow-200 text-yellow-800"
          icon={
            <span className="w-4 h-4 rounded-sm bg-yellow-400/40 border border-yellow-400/60" />
          }
        />
        <StatCard
          label="Zone badge"
          count={overlayStats.totalBadgeZones}
          color="bg-pink-50 border-pink-200 text-pink-800"
          icon={
            <span className="w-4 h-4 rounded-sm bg-pink-400/40 border border-pink-400/60" />
          }
        />
      </div>

      {/* Integration Notes */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
        <h3
          style={{ fontSize: "14px" }}
          className="text-slate-800 mb-3"
        >
          Note di integrazione
        </h3>
        <div
          className="space-y-2"
          style={{ fontSize: "12px", lineHeight: "1.6" }}
        >
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5">1.</span>
            <span className="text-slate-700">
              <strong>Retrocompatibile:</strong> <code>oz</code>{" "}
              è opzionale. Gli asset senza overlay continuano a
              funzionare esattamente come prima.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5">2.</span>
            <span className="text-slate-700">
              <strong>Chiavi brevi:</strong> Segue la
              convenzione esistente (f, fl, d, m, w, h).
              <code> t</code> = tipo, <code>l</code> = label.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5">3.</span>
            <span className="text-slate-700">
              <strong>Coordinate assolute:</strong> x, y, w, h
              sono in px @1x relativi all'asset, stessa
              convenzione di <code>f</code>.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5">4.</span>
            <span className="text-slate-700">
              <strong>Rendering nel cropper:</strong> Le zone
              vanno disegnate come overlay semi-trasparenti con
              bordo. Suggerimento: giallo per <code>text</code>,
              rosa per <code>badge</code>.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-slate-400 mt-0.5">5.</span>
            <span className="text-slate-700">
              <strong>Estensibile:</strong> Il campo{" "}
              <code>t</code> può ospitare futuri tipi (es.
              "cta", "nav", "watermark") senza cambiare lo
              schema.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ======================================================================= */
/* Main App                                                                 */
/* ======================================================================= */
export default function App() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] =
    useState<TabType>("analysis");

  const stats = useMemo(() => {
    const s = {
      total: 0,
      ok: 0,
      mismatch: 0,
      focus_add: 0,
      new_component: 0,
      new_variant: 0,
    };
    analysisEntries.forEach((e) => {
      s.total++;
      s[e.status]++;
    });
    return s;
  }, []);

  const filteredEntries = useMemo(() => {
    if (filter === "all") return analysisEntries;
    return analysisEntries.filter((e) => e.status === filter);
  }, [filter]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof analysisEntries> = {};
    filteredEntries.forEach((e) => {
      const key =
        e.configComponent ||
        (e.status === "new_component"
          ? e.figmaFrame
              .replace(/-$/, "")
              .replace(/Corp/, "")
              .replace(/Nome/, "")
          : "Sconosciuto");
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });
    return groups;
  }, [filteredEntries]);

  const jsonString = useMemo(
    () => JSON.stringify(correctedCorporateConfig, null, 2),
    [],
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = jsonString;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs: {
    id: TabType;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: "analysis",
      label: "Analisi",
      icon: <Filter className="w-3.5 h-3.5" />,
    },
    {
      id: "schema",
      label: "Schema oz",
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
    {
      id: "preview",
      label: "Preview",
      icon: <Eye className="w-3.5 h-3.5" />,
    },
    {
      id: "json",
      label: "JSON Corretto",
      icon: <FileJson className="w-3.5 h-3.5" />,
    },
    {
      id: "code",
      label: "Codice Katana",
      icon: <Code2 className="w-3.5 h-3.5" />,
    },
    {
      id: "repo",
      label: "Repo",
      icon: <FolderGit2 className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <Crosshair className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1
              className="text-slate-900"
              style={{ fontSize: "16px" }}
            >
              Katana Frame Analyzer
            </h1>
            <p
              className="text-muted-foreground"
              style={{ fontSize: "11px" }}
            >
              Analisi misure Figma vs SITE_CONFIG &middot;
              Corporate &middot; con Overlay Zones
            </p>
          </div>
          {/* Tab switcher */}
          <div className="ml-auto flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-white shadow-sm text-slate-800"
                    : "text-slate-500 hover:text-slate-700"
                }`}
                style={{ fontSize: "12px" }}
              >
                <span className="flex items-center gap-1.5">
                  {tab.icon}
                  <span className="hidden sm:inline">
                    {tab.label}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === "analysis" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
              <StatCard
                label="Frame totali"
                count={stats.total}
                color="bg-white border-slate-200 text-slate-800"
                icon={
                  <Layers className="w-4 h-4 text-slate-500" />
                }
              />
              <StatCard
                label="Confermati"
                count={stats.ok}
                color="bg-emerald-50 border-emerald-200 text-emerald-800"
                icon={
                  <Check className="w-4 h-4 text-emerald-600" />
                }
              />
              <StatCard
                label="Mismatch"
                count={stats.mismatch}
                color="bg-red-50 border-red-200 text-red-800"
                icon={<X className="w-4 h-4 text-red-600" />}
              />
              <StatCard
                label="Focus"
                count={stats.focus_add}
                color="bg-blue-50 border-blue-200 text-blue-800"
                icon={
                  <Crosshair className="w-4 h-4 text-blue-600" />
                }
              />
              <StatCard
                label="Overlay Zones"
                count={overlayStats.totalWithOverlays}
                color="bg-yellow-50 border-yellow-200 text-yellow-800"
                icon={
                  <EyeOff className="w-4 h-4 text-yellow-600" />
                }
              />
              <StatCard
                label="Nuovi comp."
                count={stats.new_component}
                color="bg-violet-50 border-violet-200 text-violet-800"
                icon={
                  <Plus className="w-4 h-4 text-violet-600" />
                }
              />
              <StatCard
                label="Nuove var."
                count={stats.new_variant}
                color="bg-amber-50 border-amber-200 text-amber-800"
                icon={
                  <Plus className="w-4 h-4 text-amber-600" />
                }
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span
                className="text-muted-foreground mr-1"
                style={{ fontSize: "12px" }}
              >
                Filtra:
              </span>
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
                    filter === opt.value
                      ? "bg-slate-800 text-white border-slate-800"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                  }`}
                  style={{ fontSize: "12px" }}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Grouped entries */}
            <div>
              {Object.entries(grouped).map(
                ([component, entries]) => (
                  <GroupedEntries
                    key={component}
                    component={component}
                    entries={entries}
                  />
                ),
              )}
              {filteredEntries.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Nessun frame corrisponde al filtro
                  selezionato.
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "schema" && <SchemaTab />}

        {activeTab === "preview" && <KatanaPreviewTab />}

        {activeTab === "json" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2
                  style={{ fontSize: "16px" }}
                  className="text-slate-800"
                >
                  SITE_CONFIG Corporate &mdash; Corretto
                </h2>
                <p
                  className="text-muted-foreground mt-0.5"
                  style={{ fontSize: "12px" }}
                >
                  JSON con correzioni dimensionali, focus areas
                  e overlay zones (oz).
                </p>
              </div>
              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                  copied
                    ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-400"
                }`}
                style={{ fontSize: "13px" }}
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-4 h-4" />
                    Copiato!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copia JSON
                  </>
                )}
              </button>
            </div>

            {/* Change summary */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div
                  style={{ fontSize: "13px" }}
                  className="text-amber-900"
                >
                  <p className="mb-2">
                    <strong>
                      Riepilogo correzioni applicate:
                    </strong>
                  </p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>
                      <strong>Module Boxed Mobile:</strong> w:
                      575 &rarr; 535
                    </li>
                    <li>
                      <strong>Card Portrait 2:3:</strong>{" "}
                      800&times;1200 &rarr; 400&times;600
                    </li>
                    <li>
                      <strong>Card Portrait 4:5:</strong>{" "}
                      800&times;1000 &rarr; 400&times;500
                    </li>
                    <li>
                      <strong>Visual Minimal Desktop:</strong>{" "}
                      w: 2000 &rarr; 1728
                    </li>
                    <li>
                      <strong>Visual Multi col-6:</strong> w:
                      700 &rarr; 864
                    </li>
                    <li>
                      <strong>Aree focus (f):</strong> aggiunte
                      a 10 asset
                    </li>
                    <li className="text-yellow-800">
                      <strong>Overlay Zones (oz):</strong>{" "}
                      aggiunte a Module Photo Display (3
                      breakpoint) e Photo Alto (3 breakpoint)
                      &mdash; {overlayStats.totalTextZones} zone
                      testo + {overlayStats.totalBadgeZones}{" "}
                      zone badge
                    </li>
                    <li>
                      <strong>Nuova variante:</strong> Card
                      Portrait 9:10, Module Photo Alto
                    </li>
                    <li>
                      <strong>Nuovi componenti:</strong> Content
                      Evidence, Box Rack Badge Loghi
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* JSON output */}
            <div className="relative rounded-lg border border-slate-200 bg-slate-900 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <span
                  style={{ fontSize: "12px" }}
                  className="text-slate-400 font-mono"
                >
                  corporate_config_corrected.json
                </span>
                <span
                  style={{ fontSize: "11px" }}
                  className="text-slate-500"
                >
                  {(jsonString.length / 1024).toFixed(1)} KB
                </span>
              </div>
              <pre
                className="p-4 overflow-auto text-slate-200 max-h-[70vh]"
                style={{
                  fontSize: "12px",
                  lineHeight: "1.5",
                  fontFamily:
                    "'SF Mono', 'Fira Code', monospace",
                }}
              >
                {jsonString}
              </pre>
            </div>
          </div>
        )}

        {activeTab === "code" && <KatanaCodeTab />}

        {activeTab === "repo" && <KatanaRepoTab />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span
            className="text-muted-foreground"
            style={{ fontSize: "11px" }}
          >
            Katana Frame Analyzer &middot; {stats.total} frame
            &middot; {overlayStats.totalWithOverlays} con
            overlay zones
          </span>
          <span
            className="text-muted-foreground"
            style={{ fontSize: "11px" }}
          >
            {stats.mismatch} mismatch &middot;{" "}
            {stats.new_component + stats.new_variant} nuovi
            &middot; {stats.focus_add} focus &middot;{" "}
            {overlayStats.totalTextZones +
              overlayStats.totalBadgeZones}{" "}
            oz
          </span>
        </div>
      </footer>
    </div>
  );
}