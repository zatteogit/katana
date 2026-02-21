/**
 * Bento — Design System Reference Page v5.1
 * Route: /design-system
 *
 * Pagina di riferimento agnostica rispetto ai consumer.
 * Mostra token, componenti e pattern in modo generico.
 *
 * v5.1 changelog — DS-027 SectionHeader Realignment:
 *   - All child SectionHeader num/category aligned to nav 01-10
 *   - Foundations (01-06): category "Fondamenta" → "Foundations"
 *   - Merged sections use sub-numbering: 07.1-07.7, 08.1-08.2, 09.1-09.3, 10.1-10.2
 *   Previous (v5.0): DS-021/DS-022 Section Merge (21→10 accordion groups)
 */

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Palette,
  Type,
  LayoutGrid,
  Box,
  Menu,
  X,
  BarChart3,
  FolderGit2,
  Mountain,
  MousePointer,
  Zap,
  Grip,
  BookOpen,
} from "lucide-react";
import { DS, DS_VERSION, LOGO_PRESET } from "./design-system";
import { S } from "./strings";
import { BentoFooter, BentoLogo } from "./BentoFooter";
import { BentoHeader } from "./ds/BentoHeader";
import { useBentoTheme } from "./ds/ThemeContext";
import { BentoPageShell } from "./ds/BentoPageShell";

/* ── Section components ── */
import { DSPageHero } from "./ds-page/DSPageHero";
import { DSPageColors } from "./ds-page/DSPageColors";
import { DSPageTypography } from "./ds-page/DSPageTypography";
import { DSPageLayout } from "./ds-page/DSPageLayout";
import {
  DSPageActions, DSPageSelection, DSPageTextInputs,
  DSPageCommunication, DSPageContainment, DSPageNavigation,
} from "./ds-page/DSPageComponents";
import { DSPageDataViz } from "./ds-page/DSPageDataViz";
import { DSPageArchitecture } from "./ds-page/DSPageArchitecture";
import { DSPageTokenArch } from "./ds-page/DSPageTokenArch";
import { DSPageElevation } from "./ds-page/DSPageElevation";
import { DSPageStateLayers } from "./ds-page/DSPageStateLayers";
import { DSPageMotion } from "./ds-page/DSPageMotion";
import { DSPageIconography } from "./ds-page/DSPageIconography";
import { DSPageLogos } from "./ds-page/DSPageLogos";
import { DSPageAvatars } from "./ds-page/DSPageAvatars";
import { DSPageNewPatterns } from "./ds-page/DSPageNewPatterns";
import { DSAccordionSection, DSSubAccordion } from "./ds-page/helpers";

/* ================================================================== */
/* Types                                                               */
/* ================================================================== */

type ThemeMode = "dark" | "light";

/* ================================================================== */
/* Navigation sections                                                 */
/* ================================================================== */

const NAV_SECTIONS = [
  /* ── Hero / Overview ── */
  { id: "sec-hero", num: "00", label: "Overview", icon: BookOpen, group: "Reference" },
  /* ── Foundations ── */
  { id: "sec-01", num: "01", label: "Colors", icon: Palette, group: "Foundations" },
  { id: "sec-02", num: "02", label: "Typography", icon: Type },
  { id: "sec-03", num: "03", label: "Spacing & Shape", icon: LayoutGrid },
  { id: "sec-04", num: "04", label: "Depth & Elevation", icon: Mountain },
  { id: "sec-05", num: "05", label: "Interaction", icon: MousePointer },
  { id: "sec-06", num: "06", label: "Motion", icon: Zap },
  /* ── Components & Data ── */
  { id: "sec-07", num: "07", label: "Components", icon: Box, group: "Components & Data" },
  { id: "sec-08", num: "08", label: "Data & Status", icon: BarChart3 },
  /* ── Assets & Dev ── */
  { id: "sec-09", num: "09", label: "Assets & Branding", icon: Grip, group: "Assets & Dev" },
  { id: "sec-10", num: "10", label: "Under the Hood", icon: FolderGit2 },
] as const;

/* ── Navigation items component ── */
function NavItems({ activeNav, scrollTo, isDark }: { activeNav: string, scrollTo: (id: string) => void, isDark: boolean }) {
  return (
    <>
      {NAV_SECTIONS.map((sec) => {
        const Icon = sec.icon;
        const isActive = activeNav === sec.id;
        const group = "group" in sec ? (sec as { group: string }).group : null;
        return (
          <div key={sec.id}>
            {group && (
              <div
                className="px-3 pt-3 pb-1 font-mono font-black uppercase"
                style={{
                  fontSize: DS.FONT_NANO,
                  letterSpacing: DS.LS_EXTRA_WIDE,
                  color: DS.ACCENT,
                  borderWidth: group !== "Reference" ? `${DS.BORDER_WIDTH_THIN} 0 0 0` : 0,
                  borderStyle: "solid",
                  borderColor: isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_BORDER,
                  marginTop: group !== "Reference" ? 6 : 0,
                }}
              >
                {group}
              </div>
            )}
            <button
              onClick={() => scrollTo(sec.id)}
              aria-current={isActive ? "true" : undefined}
              className="flex items-center gap-2.5 px-3 py-1.5 w-full text-left transition-all hover:opacity-80"
              style={{
                borderWidth: "0 3px 0 0",
                borderStyle: "solid",
                borderColor: isActive ? DS.ACCENT : "transparent",
                backgroundColor: isActive ? (isDark ? DS.BG_ELEVATED : DS.ON_LIGHT_BG_ALT) : "transparent",
              }}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isActive ? DS.ACCENT : DS.TEXT_DIM }} />
              <span
                className="font-mono font-black uppercase"
                style={{
                  fontSize: DS.FONT_TINY,
                  letterSpacing: DS.LS_TIGHT,
                  color: isActive ? (isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG) : DS.TEXT_DIM,
                }}
              >
                {sec.num} {sec.label}
              </span>
            </button>
          </div>
        );
      })}
    </>
  );
}

/* ================================================================== */
/* DesignSystemPage                                                    */
/* ================================================================== */

export function DesignSystemPage() {
  const { isDark, themeMode, setTheme } = useBentoTheme();
  const [activeNav, setActiveNav] = useState("sec-01");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  /* ── DS-025: Collapsed sections state (all open by default) ── */
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set(["sec-10"])); /* DS-031 #250: dev-only section collapsed by default */

  /* ── DS-022: Sub-accordion state for Components (all collapsed by default) ── */
  const [openSubSections, setOpenSubSections] = useState<Set<string>>(new Set());

  const toggleSection = useCallback((id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const toggleSubSection = useCallback((key: string) => {
    setOpenSubSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  /* ── Auto-hide header on mobile scroll ── */
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  useEffect(() => {
    const THRESHOLD = 8;
    const LG_BREAKPOINT = 1024;
    const handleScroll = () => {
      if (window.innerWidth >= LG_BREAKPOINT) {
        setHeaderVisible(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (delta > THRESHOLD) setHeaderVisible(false);
      else if (delta < -THRESHOLD) setHeaderVisible(true);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Scroll-based active nav tracking — getBoundingClientRect is immune
     to will-change/transform containing-block issues that break IO */
  useEffect(() => {
    const HEADER_H = 120; // header height + breathing room
    const handleScrollNav = () => {
      let current = NAV_SECTIONS[0].id;
      for (const sec of NAV_SECTIONS) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= HEADER_H) current = sec.id;
        }
      }
      setActiveNav(current);
    };
    window.addEventListener("scroll", handleScrollNav, { passive: true });
    handleScrollNav(); // initial check
    return () => window.removeEventListener("scroll", handleScrollNav);
  }, []);

  const scrollTo = useCallback((id: string) => {
    /* DS-025: auto-expand collapsed section before scrolling */
    setCollapsedSections((prev) => {
      if (prev.has(id)) {
        const next = new Set(prev);
        next.delete(id);
        return next;
      }
      return prev;
    });
    /* Wait for React render after potential expand, then scroll */
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    setMobileNavOpen(false);
  }, []);

  return (
    <BentoPageShell grid={false} style={{ fontFamily: DS.MONO }}>
      {/* ═════════════════════════════════════════════════════════════ */}
      {/* HEADER                                                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <BentoHeader
        backTo="/"
        backLabel={S.NAV_BACK_LAUNCHER}
        icon={<BentoLogo size={24} color={isDark ? LOGO_PRESET.CHROME.color : LOGO_PRESET.ON_DARK.color} />}
        iconBg={isDark ? DS.BG_CARD : DS.ON_LIGHT_BORDER_STRONG}
        title={S.DS_PAGE_TITLE}
        subtitle={S.DS_PAGE_SUBTITLE}
        visible={headerVisible}
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
          className="hidden sm:inline-flex px-2 py-1 font-mono font-black uppercase"
          style={{ fontSize: DS.FONT_TINY, color: DS.ACCENT, border: `${DS.BORDER_WIDTH_MEDIUM} solid ${DS.ACCENT}` }}
        >
          v{DS_VERSION}
        </span>
        <span
          className="hidden sm:inline-flex px-2 py-1 font-mono font-black uppercase"
          style={{ fontSize: DS.FONT_TINY, color: isDark ? DS.INTERACTIVE : DS.ON_LIGHT_INTERACTIVE, border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.INTERACTIVE : DS.ON_LIGHT_INTERACTIVE}` }}
        >
          {Object.keys(DS).length} Tokens
        </span>
      </BentoHeader>

      {/* ═════════════════════════════════════════════════════════════ */}
      {/* SIDEBAR NAV                                                   */}
      {/* ══════════════════════════════════════════════════════════════ */}

      {/* ── Mobile overlay (fixed full-screen, only when open) ── */}
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
                className="font-mono font-black uppercase"
                style={{
                  fontSize: DS.FONT_BASE,
                  letterSpacing: DS.LS_NORMAL,
                  color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
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
            <div className="flex items-center gap-0 mx-3 mb-4" style={{ border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}` }}>
              {([
                { mode: "light" as ThemeMode, label: "L" },
                { mode: "dark" as ThemeMode, label: "D" },
              ]).map((t) => (
                <button
                  key={t.mode}
                  onClick={() => setTheme(t.mode)}
                  className="flex-1 py-1.5 font-mono font-black uppercase transition-all hover:opacity-80"
                  style={{
                    fontSize: DS.FONT_TINY,
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

            <NavItems activeNav={activeNav} scrollTo={scrollTo} isDark={isDark} />
          </div>
        </nav>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MAIN CONTENT                                                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <div className="flex-1 max-w-5xl mx-auto w-full">
        <div className="lg:flex">
          <main className="flex-1 min-w-0">
            {/* ── HERO / OVERVIEW (always visible, not collapsible) ── */}
            <div id="sec-hero" className="scroll-mt-24">
              <DSPageHero dark={isDark} onNavigate={scrollTo} />
            </div>

            {/* ── FOUNDATIONS ── */}
            <DSAccordionSection id="sec-01" num="01" title="Colors" isOpen={!collapsedSections.has("sec-01")} onToggle={() => toggleSection("sec-01")} dark={isDark}>
              <DSPageColors dark={isDark} />
            </DSAccordionSection>
            <DSAccordionSection id="sec-02" num="02" title="Typography" isOpen={!collapsedSections.has("sec-02")} onToggle={() => toggleSection("sec-02")} dark={isDark}>
              <DSPageTypography dark={isDark} />
            </DSAccordionSection>
            <DSAccordionSection id="sec-03" num="03" title="Spacing & Shape" isOpen={!collapsedSections.has("sec-03")} onToggle={() => toggleSection("sec-03")} dark={isDark}>
              <DSPageLayout dark={isDark} />
            </DSAccordionSection>
            <DSAccordionSection id="sec-04" num="04" title="Depth & Elevation" isOpen={!collapsedSections.has("sec-04")} onToggle={() => toggleSection("sec-04")} dark={isDark}>
              <DSPageElevation dark={isDark} />
            </DSAccordionSection>
            <DSAccordionSection id="sec-05" num="05" title="Interaction" isOpen={!collapsedSections.has("sec-05")} onToggle={() => toggleSection("sec-05")} dark={isDark}>
              <DSPageStateLayers dark={isDark} />
            </DSAccordionSection>
            <DSAccordionSection id="sec-06" num="06" title="Motion" isOpen={!collapsedSections.has("sec-06")} onToggle={() => toggleSection("sec-06")} dark={isDark}>
              <DSPageMotion dark={isDark} />
            </DSAccordionSection>

            {/* ── COMPONENTS & DATA ── */}
            <DSAccordionSection id="sec-07" num="07" title="Components" isOpen={!collapsedSections.has("sec-07")} onToggle={() => toggleSection("sec-07")} dark={isDark}>
              {/* Actions always visible as lead content */}
              <DSPageActions dark={isDark} />
              <DSSubAccordion label="Selection" isOpen={openSubSections.has("sub-selection")} onToggle={() => toggleSubSection("sub-selection")} dark={isDark}>
                <DSPageSelection dark={isDark} />
              </DSSubAccordion>
              <DSSubAccordion label="Text Inputs" isOpen={openSubSections.has("sub-inputs")} onToggle={() => toggleSubSection("sub-inputs")} dark={isDark}>
                <DSPageTextInputs dark={isDark} />
              </DSSubAccordion>
              <DSSubAccordion label="Feedback & Status" isOpen={openSubSections.has("sub-feedback")} onToggle={() => toggleSubSection("sub-feedback")} dark={isDark}>
                <DSPageCommunication dark={isDark} />
              </DSSubAccordion>
              <DSSubAccordion label="Containers" isOpen={openSubSections.has("sub-containers")} onToggle={() => toggleSubSection("sub-containers")} dark={isDark}>
                <DSPageContainment dark={isDark} />
              </DSSubAccordion>
              <DSSubAccordion label="Navigation" isOpen={openSubSections.has("sub-navigation")} onToggle={() => toggleSubSection("sub-navigation")} dark={isDark}>
                <DSPageNavigation dark={isDark} />
              </DSSubAccordion>
              <DSSubAccordion label="New Patterns" isOpen={openSubSections.has("sub-patterns")} onToggle={() => toggleSubSection("sub-patterns")} dark={isDark}>
                <DSPageNewPatterns dark={isDark} />
              </DSSubAccordion>
            </DSAccordionSection>
            <DSAccordionSection id="sec-08" num="08" title="Data & Status" isOpen={!collapsedSections.has("sec-08")} onToggle={() => toggleSection("sec-08")} dark={isDark}>
              <DSPageDataViz dark={isDark} />
            </DSAccordionSection>

            {/* ── ASSETS & ARCHITECTURE ── */}
            <DSAccordionSection id="sec-09" num="09" title="Assets & Branding" isOpen={!collapsedSections.has("sec-09")} onToggle={() => toggleSection("sec-09")} dark={isDark}>
              <DSPageIconography dark={isDark} />
              <DSPageAvatars dark={isDark} />
              <DSPageLogos dark={isDark} />
            </DSAccordionSection>
            <DSAccordionSection id="sec-10" num="10" title="Under the Hood" isOpen={!collapsedSections.has("sec-10")} onToggle={() => toggleSection("sec-10")} dark={isDark}>
              <DSPageArchitecture dark={isDark} />
              <DSPageTokenArch dark={isDark} />
            </DSAccordionSection>
          </main>

          {/* ── Desktop sidebar (sticky, follows scroll) ── */}
          <aside className="hidden lg:block w-[180px] flex-shrink-0" aria-label="Sezioni Design System">
            <div
              className="sticky top-[88px] h-[calc(100vh-88px)] overflow-y-auto flex flex-col py-6"
              style={{
                borderWidth: "0 0 0 1px",
                borderStyle: "solid",
                borderColor: isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER,
              }}
            >
              <NavItems activeNav={activeNav} scrollTo={scrollTo} isDark={isDark} />
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