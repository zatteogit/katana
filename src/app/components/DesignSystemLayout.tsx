/**
 * DesignSystemLayout — Multi-route Design System layout (feat-128)
 * ================================================================
 * Single wildcard route `/design-system/*` that internally renders
 * the correct section based on the URL sub-path. This avoids
 * AnimatedOutlet re-animating the entire layout on section changes.
 *
 * Navigation uses NavLink for route-based active state (feat-129).
 *
 * URL structure:
 *   /design-system             → Overview (DSPageHero)
 *   /design-system/colors      → 01 Colors
 *   /design-system/typography  → 02 Typography
 *   /design-system/spacing     → 03 Spacing & Shape
 *   /design-system/elevation   → 04 Depth & Elevation
 *   /design-system/interaction → 05 Interaction
 *   /design-system/motion      → 06 Motion
 *   /design-system/components  → 07 Components
 *   /design-system/data        → 08 Data & Status
 *   /design-system/assets      → 09 Assets & Branding
 *   /design-system/architecture → 10 Under the Hood
 */

import { useState, useCallback, lazy, Suspense } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  Palette, Type, LayoutGrid, Box, Menu, X,
  BarChart3, FolderGit2, Mountain, MousePointer,
  Zap, Grip, BookOpen,
} from "lucide-react";
import { DS, DS_VERSION, LOGO_PRESET } from "./design-system";
import { S } from "./strings";
import { BentoFooter, BentoLogo } from "./BentoFooter";
import { BentoHeader } from "./ds/BentoHeader";
import { useBentoTheme } from "./ds/ThemeContext";
import { BentoPageShell } from "./ds/BentoPageShell";
import { DSSubAccordion } from "./ds-page/helpers";

/* ── Lazy-loaded section components ────────────────────────────── */
const DSPageHero = lazy(() => import("./ds-page/DSPageHero").then((m) => ({ default: m.DSPageHero })));
const DSPageColors = lazy(() => import("./ds-page/DSPageColors").then((m) => ({ default: m.DSPageColors })));
const DSPageTypography = lazy(() => import("./ds-page/DSPageTypography").then((m) => ({ default: m.DSPageTypography })));
const DSPageLayout = lazy(() => import("./ds-page/DSPageLayout").then((m) => ({ default: m.DSPageLayout })));
const DSPageElevation = lazy(() => import("./ds-page/DSPageElevation").then((m) => ({ default: m.DSPageElevation })));
const DSPageStateLayers = lazy(() => import("./ds-page/DSPageStateLayers").then((m) => ({ default: m.DSPageStateLayers })));
const DSPageMotion = lazy(() => import("./ds-page/DSPageMotion").then((m) => ({ default: m.DSPageMotion })));
const DSPageActions = lazy(() => import("./ds-page/DSPageComponents").then((m) => ({ default: m.DSPageActions })));
const DSPageSelection = lazy(() => import("./ds-page/DSPageComponents").then((m) => ({ default: m.DSPageSelection })));
const DSPageTextInputs = lazy(() => import("./ds-page/DSPageComponents").then((m) => ({ default: m.DSPageTextInputs })));
const DSPageCommunication = lazy(() => import("./ds-page/DSPageComponents").then((m) => ({ default: m.DSPageCommunication })));
const DSPageContainment = lazy(() => import("./ds-page/DSPageComponents").then((m) => ({ default: m.DSPageContainment })));
const DSPageNavigation = lazy(() => import("./ds-page/DSPageComponents").then((m) => ({ default: m.DSPageNavigation })));
const DSPageNewPatterns = lazy(() => import("./ds-page/DSPageNewPatterns").then((m) => ({ default: m.DSPageNewPatterns })));
const DSPageDataViz = lazy(() => import("./ds-page/DSPageDataViz").then((m) => ({ default: m.DSPageDataViz })));
const DSPageIconography = lazy(() => import("./ds-page/DSPageIconography").then((m) => ({ default: m.DSPageIconography })));
const DSPageAvatars = lazy(() => import("./ds-page/DSPageAvatars").then((m) => ({ default: m.DSPageAvatars })));
const DSPageLogos = lazy(() => import("./ds-page/DSPageLogos").then((m) => ({ default: m.DSPageLogos })));
const DSPageArchitecture = lazy(() => import("./ds-page/DSPageArchitecture").then((m) => ({ default: m.DSPageArchitecture })));
const DSPageTokenArch = lazy(() => import("./ds-page/DSPageTokenArch").then((m) => ({ default: m.DSPageTokenArch })));

/* ================================================================== */
/* Navigation sections (route-based)                                    */
/* ================================================================== */

export const DS_NAV_SECTIONS = [
  { path: "",              num: "00", label: "Overview",           icon: BookOpen,      group: "Reference" },
  { path: "colors",        num: "01", label: "Colors",            icon: Palette,       group: "Foundations" },
  { path: "typography",    num: "02", label: "Typography",        icon: Type },
  { path: "spacing",       num: "03", label: "Spacing & Shape",   icon: LayoutGrid },
  { path: "elevation",     num: "04", label: "Depth & Elevation", icon: Mountain },
  { path: "interaction",   num: "05", label: "Interaction",       icon: MousePointer },
  { path: "motion",        num: "06", label: "Motion",            icon: Zap },
  { path: "components",    num: "07", label: "Components",        icon: Box,           group: "Components & Data" },
  { path: "data",          num: "08", label: "Data & Status",     icon: BarChart3 },
  { path: "assets",        num: "09", label: "Assets & Branding", icon: Grip,          group: "Assets & Dev" },
  { path: "architecture",  num: "10", label: "Under the Hood",    icon: FolderGit2 },
] as const;

type ThemeMode = "dark" | "light";

/* ── Derive active sub-path from URL ─────────────────────────────── */
function useActiveSection(): string {
  const { pathname } = useLocation();
  const sub = pathname.replace(/^\/design-system\/?/, "").split("/")[0] || "";
  return sub;
}

/* ── Navigation items component ── */
function NavItems({ isDark, onNavigate }: { isDark: boolean; onNavigate?: () => void }) {
  const active = useActiveSection();

  return (
    <>
      {DS_NAV_SECTIONS.map((sec) => {
        const Icon = sec.icon;
        const group = "group" in sec ? (sec as { group: string }).group : null;
        const to = sec.path === "" ? "/design-system" : `/design-system/${sec.path}`;
        const isActive = sec.path === active;

        return (
          <div key={sec.path}>
            {group && (
              <div
                className="px-3 pt-3 pb-1 font-mono font-black"
                style={{
                  fontSize: DS.FONT_NANO,
                  letterSpacing: DS.LS_EXTRA_WIDE,
                  color: DS.ACCENT,
                  textTransform: "uppercase",
                  borderWidth: group !== "Reference" ? `${DS.BORDER_WIDTH_THIN} 0 0 0` : 0,
                  borderStyle: "solid",
                  borderColor: isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_BORDER,
                  marginTop: group !== "Reference" ? 6 : 0,
                }}
              >
                {group}
              </div>
            )}
            <NavLink
              to={to}
              end={sec.path === ""}
              onClick={onNavigate}
              className="flex items-center gap-2.5 px-3 py-1.5 w-full text-left transition-all hover:opacity-80"
              style={{
                borderWidth: `0 ${DS.BORDER_WIDTH_THICK} 0 0`,
                borderStyle: "solid",
                borderColor: isActive ? DS.ACCENT : "transparent",
                backgroundColor: isActive ? (isDark ? DS.BG_ELEVATED : DS.ON_LIGHT_BG_ALT) : "transparent",
              }}
            >
              <Icon
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: isActive ? DS.ACCENT : DS.TEXT_DIM }}
              />
              <span
                className="font-mono font-black"
                style={{
                  fontSize: DS.FONT_TINY,
                  letterSpacing: DS.LS_TIGHT,
                  textTransform: "uppercase",
                  color: isActive
                    ? (isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG)
                    : DS.TEXT_DIM,
                }}
              >
                {sec.num} {sec.label}
              </span>
            </NavLink>
          </div>
        );
      })}
    </>
  );
}

/* ── Section content renderer ─────────────────────────────────────── */
function SectionContent({ section, isDark }: { section: string; isDark: boolean }) {
  const navigate = useNavigate();

  /* Route map for DSPageHero index navigation */
  const handleHeroNavigate = useCallback((id: string) => {
    const routeMap: Record<string, string> = {
      "sec-01": "/design-system/colors",
      "sec-02": "/design-system/typography",
      "sec-03": "/design-system/spacing",
      "sec-04": "/design-system/elevation",
      "sec-05": "/design-system/interaction",
      "sec-06": "/design-system/motion",
      "sec-07": "/design-system/components",
      "sec-08": "/design-system/data",
      "sec-09": "/design-system/assets",
      "sec-10": "/design-system/architecture",
    };
    const route = routeMap[id];
    if (route) navigate(route);
  }, [navigate]);

  /* Sub-accordion state for Components section */
  const [openSubs, setOpenSubs] = useState<Set<string>>(new Set());
  const toggleSub = useCallback((key: string) => {
    setOpenSubs((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }, []);

  switch (section) {
    case "":
      return <DSPageHero dark={isDark} onNavigate={handleHeroNavigate} />;
    case "colors":
      return <DSPageColors dark={isDark} />;
    case "typography":
      return <DSPageTypography dark={isDark} />;
    case "spacing":
      return <DSPageLayout dark={isDark} />;
    case "elevation":
      return <DSPageElevation dark={isDark} />;
    case "interaction":
      return <DSPageStateLayers dark={isDark} />;
    case "motion":
      return <DSPageMotion dark={isDark} />;
    case "components":
      return (
        <>
          <DSPageActions dark={isDark} />
          <DSSubAccordion label="Selection" isOpen={openSubs.has("sub-selection")} onToggle={() => toggleSub("sub-selection")} dark={isDark}>
            <DSPageSelection dark={isDark} />
          </DSSubAccordion>
          <DSSubAccordion label="Text Inputs" isOpen={openSubs.has("sub-inputs")} onToggle={() => toggleSub("sub-inputs")} dark={isDark}>
            <DSPageTextInputs dark={isDark} />
          </DSSubAccordion>
          <DSSubAccordion label="Feedback & Status" isOpen={openSubs.has("sub-feedback")} onToggle={() => toggleSub("sub-feedback")} dark={isDark}>
            <DSPageCommunication dark={isDark} />
          </DSSubAccordion>
          <DSSubAccordion label="Containers" isOpen={openSubs.has("sub-containers")} onToggle={() => toggleSub("sub-containers")} dark={isDark}>
            <DSPageContainment dark={isDark} />
          </DSSubAccordion>
          <DSSubAccordion label="Navigation" isOpen={openSubs.has("sub-navigation")} onToggle={() => toggleSub("sub-navigation")} dark={isDark}>
            <DSPageNavigation dark={isDark} />
          </DSSubAccordion>
          <DSSubAccordion label="New Patterns" isOpen={openSubs.has("sub-patterns")} onToggle={() => toggleSub("sub-patterns")} dark={isDark}>
            <DSPageNewPatterns dark={isDark} />
          </DSSubAccordion>
        </>
      );
    case "data":
      return <DSPageDataViz dark={isDark} />;
    case "assets":
      return (
        <>
          <DSPageIconography dark={isDark} />
          <DSPageAvatars dark={isDark} />
          <DSPageLogos dark={isDark} />
        </>
      );
    case "architecture":
      return (
        <>
          <DSPageArchitecture dark={isDark} />
          <DSPageTokenArch dark={isDark} />
        </>
      );
    default:
      return <DSPageHero dark={isDark} onNavigate={handleHeroNavigate} />;
  }
}

/* ================================================================== */
/* DesignSystemLayout                                                   */
/* ================================================================== */

export function DesignSystemLayout() {
  const { isDark, themeMode, setTheme } = useBentoTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeSection = useActiveSection();

  return (
    <BentoPageShell grid={false} style={{ fontFamily: DS.MONO }}>
      {/* ═════════════════════════════════════════════════════════════ */}
      {/* HEADER                                                        */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <BentoHeader
        backTo="/"
        backLabel={S.NAV_BACK_LAUNCHER}
        icon={<BentoLogo size={24} color={isDark ? LOGO_PRESET.CHROME.color : LOGO_PRESET.ON_DARK.color} />}
        iconBg={isDark ? DS.BG_CARD : DS.ON_LIGHT_BORDER_STRONG}
        title={S.DS_PAGE_TITLE}
        subtitle={S.DS_PAGE_SUBTITLE}
        zIndex={20}
        dark={isDark}
        kanji="弁"
      >
        {/* Hamburger — first item on right (mobile only) */}
        <button
          className="lg:hidden p-2 transition-opacity hover:opacity-70"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          aria-expanded={mobileNavOpen}
          aria-controls="ds-sidebar-nav"
          aria-label={mobileNavOpen ? "Chiudi navigazione" : "Apri navigazione"}
          style={{
            border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
            color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
          }}
        >
          {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
        {/* Badges */}
        <span
          className="hidden sm:inline-flex px-2 py-1 font-mono font-black"
          style={{
            fontSize: DS.FONT_TINY,
            color: DS.ACCENT,
            border: `${DS.BORDER_WIDTH_MEDIUM} solid ${DS.ACCENT}`,
            textTransform: "uppercase",
          }}
        >
          v{DS_VERSION}
        </span>
        <span
          className="hidden sm:inline-flex px-2 py-1 font-mono font-black"
          style={{
            fontSize: DS.FONT_TINY,
            color: isDark ? DS.INTERACTIVE : DS.ON_LIGHT_INTERACTIVE,
            border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.INTERACTIVE : DS.ON_LIGHT_INTERACTIVE}`,
            textTransform: "uppercase",
          }}
        >
          {Object.keys(DS).length} Tokens
        </span>
      </BentoHeader>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* MOBILE NAV OVERLAY                                            */}
      {/* ═════════════════════════════════════════════════════════════ */}
      {mobileNavOpen && (
        <nav
          id="ds-sidebar-nav"
          aria-label="Sezioni Design System"
          className="fixed inset-0 z-30 flex flex-col lg:hidden"
          style={{ width: "100%", backgroundColor: DS.OVERLAY_SCRIM, overflowY: "auto" }}
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            className="flex flex-col py-4 px-2"
            style={{
              backgroundColor: isDark ? DS.BG_SURFACE : DS.ON_LIGHT_BG,
              width: "100%",
              height: "100%",
              borderWidth: "0 0 0 1px",
              borderStyle: "solid",
              borderColor: isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 mb-4">
              <span
                className="font-mono font-black"
                style={{
                  fontSize: DS.FONT_BASE,
                  letterSpacing: DS.LS_NORMAL,
                  color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
                  textTransform: "uppercase",
                }}
              >
                Navigazione
              </span>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="p-1"
                aria-label="Chiudi navigazione"
                style={{ color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile theme toggle */}
            <div
              className="flex items-center gap-0 mx-3 mb-4"
              style={{ border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}` }}
            >
              {([
                { mode: "light" as ThemeMode, label: "L" },
                { mode: "dark" as ThemeMode, label: "D" },
              ]).map((t) => (
                <button
                  key={t.mode}
                  onClick={() => setTheme(t.mode)}
                  className="flex-1 py-1.5 font-mono font-black transition-all hover:opacity-80"
                  style={{
                    fontSize: DS.FONT_TINY,
                    textTransform: "uppercase",
                    backgroundColor: themeMode === t.mode
                      ? (isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG)
                      : (isDark ? DS.BG_SURFACE : DS.ON_LIGHT_BG),
                    color: themeMode === t.mode
                      ? (isDark ? DS.BG_SURFACE : DS.ON_LIGHT_BG)
                      : (isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG),
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <NavItems isDark={isDark} onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </nav>
      )}

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTENT + SIDEBAR                                        */}
      {/* ═════════════════════════════════════════════════════════════ */}
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <div className="lg:flex">
          <main className="flex-1 min-w-0">
            <Suspense fallback={
              <div className="flex items-center justify-center py-20">
                <span className="font-mono font-bold" style={{ fontSize: DS.FONT_BASE, color: DS.TEXT_DIM }}>
                  Caricamento...
                </span>
              </div>
            }>
              <SectionContent section={activeSection} isDark={isDark} />
            </Suspense>
          </main>

          {/* ── Desktop sidebar (sticky, follows route) ── */}
          <aside className="hidden lg:block w-[180px] flex-shrink-0" aria-label="Sezioni Design System">
            <div
              className="sticky top-[88px] h-[calc(100vh-88px)] overflow-y-auto flex flex-col py-6"
              style={{
                borderWidth: "0 0 0 1px",
                borderStyle: "solid",
                borderColor: isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER,
              }}
            >
              <NavItems isDark={isDark} />
            </div>
          </aside>
        </div>

        {/* Footer — static on DS page (not fixed) */}
        <div>
          <BentoFooter maxWidth="max-w-5xl" dark={isDark} />
        </div>
      </div>
    </BentoPageShell>
  );
}