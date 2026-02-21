/**
 * Bento Launcher — Landing page
 * Hub for the Bento tools suite (Katana + Nigiri).
 * Design: Brutalist Japanese — coerente con Katana (dark) e Nigiri (grid + mono).
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 *
 * Section map (per navigazione AI con offset/limit):
 *   ~011-035   Imports
 *   ~037-242   Sub-components (ToolCard, Kanji, VersionBadge, ThemeToggle, etc.)
 *   ~244-end   Main component (Launcher export)
 *
 * Dev Tool access:
 *   - Keyboard shortcut: Ctrl+Shift+D (Cmd+Shift+D on Mac)
 *   - Direct link in footer
 */

import { useState, useEffect } from "react";
import {
  ArrowRight,
  X,
  Globe,
  Monitor,
  LayoutGrid,
  LayoutList,
} from "lucide-react";
import { Link } from "react-router";
import { DS, LOGO_PRESET, MOTION } from "./design-system";
import { motion } from "motion/react";
import { S } from "./strings";
import { BentoFooter, BentoLogo } from "./BentoFooter";
import { BentoHeader } from "./ds/BentoHeader";
import { useBentoTheme } from "./ds/ThemeContext";
import { BentoPageShell } from "./ds/BentoPageShell";
import { TOOL_CARDS, RECOMMENDED_BROWSERS, type ToolCardData } from "./launcher-data";
import { BentoCoachmark, useCoachmark, LAUNCHER_STEPS } from "./BentoCoachmark";
import { isAppEnabled, useFeatureFlag, FEATURE_FLAGS } from "./feature-flags";

/* ------------------------------------------------------------------ */
/* Safari detection                                                    */
/* ------------------------------------------------------------------ */

function isSafari(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(ua);
}

/* ------------------------------------------------------------------ */
/* Tool Card — Brutalist                                               */
/* ------------------------------------------------------------------ */

function ToolCard({
  to,
  href,
  onExternalClick,
  icon,
  accentColor,
  accentColorDark,
  title,
  kanji,
  subtitle,
  description,
  features,
  tag,
  version,
}: {
  to?: string;
  href?: string;
  onExternalClick?: () => void;
  icon: React.ReactNode;
  accentColor: string;
  accentColorDark?: string;
  title: string;
  kanji: string;
  subtitle: string;
  description: string;
  features: { icon: React.ReactNode; text: string }[];
  tag?: string;
  version?: string;
}) {
  const { isDark: d } = useBentoTheme();
  const [hovered, setHovered] = useState(false);

  /* Derive all visual values from state — zero imperative DOM */
  const resolvedAccent = d && accentColorDark ? accentColorDark : accentColor;
  const borderColor = hovered ? resolvedAccent : (d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER_STRONG);
  const cardBg = d ? DS.BG_CARD : DS.ON_LIGHT_BG;
  const boxShadow = hovered
    ? `8px 8px 0 ${resolvedAccent}22`
    : (d ? "none" : DS.BRUTALIST_SHADOW_LG);

  const cardStyle: React.CSSProperties = {
    backgroundColor: cardBg,
    border: `${DS.BRUTALIST_BORDER_WIDTH} solid ${borderColor}`,
    boxShadow,
    transition: `border-color ${DS.TRANSITION_NORMAL}, box-shadow ${DS.TRANSITION_NORMAL}, background-color ${DS.TRANSITION_NORMAL}`,
  };

  const content = (
    <div className="flex gap-5">
      {/* Left accent bar + icon */}
      <div className="hidden sm:flex flex-col items-center gap-3 flex-shrink-0">
        <div
          className="w-14 h-14 flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: d ? DS.ON_LIGHT_BORDER_STRONG : accentColor,
            border: `${DS.BORDER_WIDTH_MEDIUM} solid ${d ? DS.ON_LIGHT_BORDER_STRONG : accentColor}`,
            color: DS.ON_LIGHT_BG,
          }}
        >
          {icon}
        </div>
        <span
          className="font-mono"
          style={{
            fontSize: kanji.length > 1 ? DS.FONT_XLARGE : DS.FONT_DISPLAY,
            lineHeight: DS.LH_NONE,
            letterSpacing: kanji.length > 1 ? DS.LS_EXTRA_WIDE : DS.LS_NONE,
            color: d ? DS.BORDER_HOVER : DS.ON_LIGHT_BORDER,
          }}
        >
          {kanji}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h2
            className="font-mono font-black tracking-wider"
            style={{ fontSize: DS.FONT_XLARGE, letterSpacing: DS.LS_EXTRA_WIDE, textTransform: "uppercase", color: d ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG }}
          >
            {title}
          </h2>
          {version && (
            <span
              className="px-2 py-0.5 font-mono font-black"
              style={{
                fontSize: DS.FONT_TINY,
                letterSpacing: DS.LS_NORMAL,
                textTransform: "uppercase",
                color: resolvedAccent,
                border: `${DS.BORDER_WIDTH_MEDIUM} solid ${resolvedAccent}`,
                backgroundColor: `${resolvedAccent}10`,
              }}
            >
              {version}
            </span>
          )}
          {tag && (
            <span
              className="px-2 py-0.5 font-mono font-black"
              style={{
                fontSize: DS.FONT_MICRO,
                letterSpacing: DS.LS_NORMAL,
                textTransform: "uppercase",
                color: d ? DS.TEXT_TERTIARY : DS.TEXT_MUTED,
                border: `${DS.BORDER_WIDTH_MEDIUM} solid ${d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
              }}
            >
              {tag}
            </span>
          )}
        </div>

        <p
          className="font-mono mb-3"
          style={{ fontSize: DS.FONT_TINY, letterSpacing: DS.LS_WIDE, textTransform: "uppercase", color: d ? DS.TEXT_MUTED : DS.TEXT_DIM }}
        >
          {subtitle}
        </p>

        <p
          className="mb-4"
          style={{ fontFamily: DS.SANS, fontSize: DS.FONT_MEDIUM, lineHeight: DS.LH_PROSE, color: d ? DS.TEXT_SECONDARY : DS.TEXT_MUTED }}
        >
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {features.map((f, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono"
              style={{
                fontSize: DS.FONT_TINY,
                letterSpacing: DS.LS_TIGHT,
                textTransform: "uppercase",
                color: d ? DS.TEXT_TERTIARY : DS.TEXT_MUTED,
                backgroundColor: d ? DS.BG_ELEVATED : DS.ON_LIGHT_BG_ALT,
                border: `${DS.BORDER_WIDTH_THIN} solid ${d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
              }}
            >
              {f.icon}
              {f.text}
            </span>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div className="flex items-center flex-shrink-0">
        <ArrowRight
          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
          style={{ color: d ? DS.BORDER_HOVER : DS.ON_LIGHT_BORDER, transition: `transform ${DS.TRANSITION_NORMAL}` }}
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          if (onExternalClick) {
            e.preventDefault();
            onExternalClick();
          }
        }}
        className="group block p-4 sm:p-6"
        style={cardStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.012, y: -2 }}
        whileTap={{ scale: 0.985 }}
        transition={MOTION.SPRING_SNAPPY}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.012, y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={MOTION.SPRING_SNAPPY}
    >
      <Link
        to={to || "/"}
        className="group block p-4 sm:p-6"
        style={cardStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid Card — Compact tile for grid view                               */
/* ------------------------------------------------------------------ */

function GridCard({
  to, icon, accentColor, accentColorDark, title, kanji, version, tag,
}: {
  to?: string; icon: React.ReactNode; accentColor: string; accentColorDark?: string;
  title: string; kanji: string; version?: string; tag?: string;
}) {
  const { isDark: d } = useBentoTheme();
  const [hovered, setHovered] = useState(false);
  const resolvedAccent = d && accentColorDark ? accentColorDark : accentColor;
  const borderColor = hovered ? resolvedAccent : (d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER_STRONG);
  const cardBg = d ? DS.BG_CARD : DS.ON_LIGHT_BG;

  const cardStyle: React.CSSProperties = {
    backgroundColor: cardBg,
    border: `${DS.BRUTALIST_BORDER_WIDTH} solid ${borderColor}`,
    boxShadow: hovered ? `6px 6px 0 ${resolvedAccent}22` : (d ? "none" : DS.BRUTALIST_SHADOW_SM),
    transition: `border-color ${DS.TRANSITION_NORMAL}, box-shadow ${DS.TRANSITION_NORMAL}`,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={MOTION.SPRING_SNAPPY}
      className="h-full"
    >
      <Link
        to={to || "/"}
        className="group block p-4 sm:p-6 h-full text-center"
        style={cardStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="w-12 h-12 mx-auto mb-2 flex items-center justify-center"
          style={{
            backgroundColor: d ? DS.ON_LIGHT_BORDER_STRONG : accentColor,
            border: `${DS.BORDER_WIDTH_MEDIUM} solid ${d ? DS.ON_LIGHT_BORDER_STRONG : accentColor}`,
            color: DS.ON_LIGHT_BG,
          }}
        >
          {icon}
        </div>
        <span
          className="block font-mono"
          style={{ fontSize: DS.FONT_XLARGE, lineHeight: DS.LH_NONE, color: d ? DS.BORDER_HOVER : DS.ON_LIGHT_BORDER, marginBottom: DS.SPACE_2 }}
        >
          {kanji}
        </span>
        <h3
          className="font-mono font-black"
          style={{ fontSize: DS.FONT_BASE, letterSpacing: DS.LS_WIDE, textTransform: "uppercase", color: d ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG }}
        >
          {title}
        </h3>
        {version && (
          <span
            className="inline-block mt-1.5 px-1.5 py-0.5 font-mono font-black"
            style={{ fontSize: DS.FONT_MICRO, textTransform: "uppercase", color: resolvedAccent, border: `${DS.BORDER_WIDTH_THIN} solid ${resolvedAccent}`, backgroundColor: `${resolvedAccent}10` }}
          >
            {version}
          </span>
        )}
        {tag && (
          <span
            className="block mt-1 font-mono"
            style={{ fontSize: DS.FONT_MICRO, textTransform: "uppercase", color: d ? DS.TEXT_TERTIARY : DS.TEXT_DIM, letterSpacing: DS.LS_NORMAL }}
          >
            {tag}
          </span>
        )}
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Grid cols preference                                                */
/* ------------------------------------------------------------------ */

const LS_GRID_COLS = "bento-launcher-grid-cols";
const GRID_COL_OPTIONS: GridCols[] = [2, 3, 5];
type GridCols = 2 | 3 | 5;

/** Responsive grid classes — caps columns on smaller screens */
const GRID_RESPONSIVE: Record<GridCols, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};

function readGridCols(): GridCols {
  try {
    const v = parseInt(localStorage.getItem(LS_GRID_COLS) || "", 10);
    if (v === 2 || v === 3 || v === 5) return v;
  } catch { /* */ }
  return 3;
}

/* ------------------------------------------------------------------ */
/* Launcher                                                            */
/* ------------------------------------------------------------------ */

export function Launcher() {
  const [safariWarning, setSafariWarning] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [gridCols, setGridCols] = useState<GridCols>(readGridCols);
  const { isDark } = useBentoTheme();
  const coachmark = useCoachmark();
  const ffCoachmarks = useFeatureFlag("bento.coachmarks");

  /* #198: persist grid cols preference */
  const cycleGridCols = () => {
    const idx = GRID_COL_OPTIONS.indexOf(gridCols);
    const next = GRID_COL_OPTIONS[(idx + 1) % GRID_COL_OPTIONS.length];
    setGridCols(next);
    try { localStorage.setItem(LS_GRID_COLS, String(next)); } catch { /* */ }
  };

  // Subscribe to flag changes for reactive app filtering
  useFeatureFlag(FEATURE_FLAGS[0]?.id ?? "");
  const visibleCards = TOOL_CARDS.filter((card) => isAppEnabled(card.id));

  useEffect(() => {
    if (isSafari()) {
      setSafariWarning(true);
    }
  }, []);

  return (
    <BentoPageShell>
      {/* ─── Header ─── */}
      <BentoHeader
        icon={<BentoLogo size={24} color={isDark ? LOGO_PRESET.CHROME.color : LOGO_PRESET.ON_DARK.color} />}
        iconBg={DS.ON_LIGHT_BORDER_STRONG}
        iconBgDark={DS.BG_CARD}
        title={S.APP_NAME}
        subtitle={S.APP_SUBTITLE}
        kanji={S.APP_KANJI}
      />

      {/* ── Main ─── */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-5 py-6 sm:py-10 space-y-5">
        {/* Safari warning */}
        {safariWarning && (
          <div
            className="relative p-5"
            style={{
              border: `${DS.BORDER_WIDTH_MEDIUM} solid ${DS.STATUS_WARN_TEXT}`,
              backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
              transition: `background-color ${DS.TRANSITION_NORMAL}`,
            }}
          >
            <div
              className="absolute top-0 left-0 w-1.5 h-full"
              style={{ backgroundColor: DS.STATUS_WARN_TEXT }}
            />
            <div className="flex items-start gap-4 pl-3">
              <div
                className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: DS.STATUS_WARN_TEXT }}
              >
                <Globe
                  className="w-5 h-5"
                  style={{ color: isDark ? DS.BG_BASE : DS.ON_LIGHT_BG }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-mono font-black"
                    style={{ fontSize: DS.FONT_BASE, letterSpacing: DS.LS_NORMAL, textTransform: "uppercase", color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG }}
                  >
                    {S.SAFARI_TITLE}
                  </span>
                  <span
                    className="px-2 py-0.5 font-mono font-black"
                    style={{
                      fontSize: DS.FONT_MICRO,
                      letterSpacing: DS.LS_NORMAL,
                      textTransform: "uppercase",
                      color: DS.STATUS_WARN_TEXT,
                      border: `${DS.BORDER_WIDTH_MEDIUM} solid ${DS.STATUS_WARN_TEXT}`,
                    }}
                  >
                    {S.SAFARI_BADGE}
                  </span>
                </div>
                <p
                  style={{ fontFamily: DS.SANS, fontSize: DS.FONT_BASE, lineHeight: DS.LH_NORMAL, color: isDark ? DS.TEXT_SECONDARY : DS.TEXT_MUTED }}
                >
                  {S.SAFARI_BODY}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {RECOMMENDED_BROWSERS.map((b) => {
                    const clr = isDark && b.colorDark ? b.colorDark : b.color;
                    return (
                      <span
                        key={b.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono font-black"
                        style={{
                          fontSize: DS.FONT_TINY,
                          letterSpacing: DS.LS_NORMAL,
                          textTransform: "uppercase",
                          color: clr,
                          border: `${DS.BORDER_WIDTH_MEDIUM} solid ${clr}`,
                          backgroundColor: `${clr}10`,
                        }}
                      >
                        <Monitor className="w-3.5 h-3.5" />
                        {b.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button
                onClick={() => setSafariWarning(false)}
                aria-label="Chiudi avviso Safari"
                className="flex-shrink-0 p-1 transition-opacity hover:opacity-60"
                style={{ color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_BORDER }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Bento ecosystem notice — rimosso su richiesta ─── */}

        {/* ─── View Toggle + Tool Cards ─── */}
        <div className="flex items-center justify-end mb-1">
          <div className="flex items-center gap-0.5">
            {(["list", "grid"] as const).map((m) => {
              const active = viewMode === m;
              return (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className="p-1.5 ds-focus-ring"
                  style={{
                    backgroundColor: active ? (isDark ? DS.BG_ELEVATED : DS.ON_LIGHT_BG_ALT) : "transparent",
                    border: `${DS.BORDER_WIDTH_THIN} solid ${active ? (isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300) : "transparent"}`,
                    color: active ? (isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG) : (isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED),
                    cursor: "pointer",
                    transition: `all ${DS.TRANSITION_FAST}`,
                  }}
                  title={m === "list" ? "Vista lista" : "Vista griglia"}
                >
                  {m === "list" ? <LayoutList className="w-4 h-4" /> : <LayoutGrid className="w-4 h-4" />}
                </button>
              );
            })}
            {/* #198: grid cols cycle button — only visible in grid mode */}
            {viewMode === "grid" && (
              <button
                onClick={cycleGridCols}
                className="ml-1 px-2 py-1 font-mono font-black ds-focus-ring"
                style={{
                  fontSize: DS.FONT_MICRO,
                  color: isDark ? DS.TEXT_MUTED : DS.TEXT_DIM,
                  backgroundColor: isDark ? DS.BG_ELEVATED : DS.ON_LIGHT_BG_ALT,
                  border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                  cursor: "pointer",
                  letterSpacing: DS.LS_NORMAL,
                  textTransform: "uppercase",
                  fontWeight: 900,
                }}
                title={`Colonne: ${gridCols} → ${GRID_COL_OPTIONS[(GRID_COL_OPTIONS.indexOf(gridCols) + 1) % GRID_COL_OPTIONS.length]}`}
              >
                {gridCols} col
              </button>
            )}
          </div>
        </div>

        {viewMode === "list" ? (
          <div className="space-y-5">
            {visibleCards.map((card: ToolCardData) => (
              <div key={card.id} data-coachmark={card.id}>
                <ToolCard
                  to={card.to}
                  icon={card.icon}
                  accentColor={card.accentColor}
                  accentColorDark={card.accentColorDark}
                  kanji={card.kanji}
                  title={card.title}
                  version={card.version}
                  subtitle={card.subtitle}
                  description={card.description}
                  features={card.features}
                  tag={card.tag}
                />
              </div>
            ))}
          </div>
        ) : (
          /* #198: dynamic gridCols + grid-auto-rows:1fr for equal card heights */
          <div
            className={`grid ${GRID_RESPONSIVE[gridCols]}`}
            style={{
              gap: DS.SPACE_4,
              gridAutoRows: "1fr",
            }}
          >
            {visibleCards.map((card: ToolCardData) => (
              <div key={card.id} data-coachmark={card.id} className="h-full">
                <GridCard
                  to={card.to}
                  icon={card.icon}
                  accentColor={card.accentColor}
                  accentColorDark={card.accentColorDark}
                  kanji={card.kanji}
                  title={card.title}
                  version={card.version}
                  tag={card.tag}
                />
              </div>
            ))}
          </div>
        )}

      </main>

      {/* ─── Footer ─── */}
      <BentoFooter
        dark={isDark}
        extraRight={
          <div className="flex items-center gap-3" style={{ paddingRight: "56px" }}>
            {ffCoachmarks && (
              <button
                onClick={coachmark.reset}
                className="font-mono transition-colors hover:opacity-70"
                style={{ fontSize: DS.FONT_TINY, letterSpacing: DS.LS_NORMAL, textTransform: "uppercase", color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_TERTIARY, backgroundColor: "transparent", border: "none", cursor: "pointer" }}
                title="Rivedi il tour guidato"
              >
                Tour
              </button>
            )}
            <Link
              to="/design-system"
              className="font-mono transition-colors"
              style={{ fontSize: DS.FONT_TINY, letterSpacing: DS.LS_NORMAL, textTransform: "uppercase", color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_TERTIARY }}
              title="Design System Reference"
            >
              {S.NAV_DESIGN_SYSTEM}
            </Link>
            <Link
              to="/settings"
              className="font-mono transition-colors"
              style={{ fontSize: DS.FONT_TINY, letterSpacing: DS.LS_NORMAL, textTransform: "uppercase", color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_TERTIARY }}
              title="Gestione App e Preferenze"
            >
              Settings
            </Link>
          </div>
        }
      />

      {/* ─── Coachmark ─── */}
      <BentoCoachmark visible={coachmark.visible} onDismiss={coachmark.dismiss} steps={LAUNCHER_STEPS} />
    </BentoPageShell>
  );
}