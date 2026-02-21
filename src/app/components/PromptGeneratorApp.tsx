/**
 * Nigiri — Standalone App
 * "A fette come un backlog"
 * Centro di controllo per la gestione della produzione immagini.
 * Carica corporate-url.xlsx, cross-reference con Katana component catalog,
 * genera prompt AI, traccia progresso, calcola deadline.
 *
 * Header auto-hide su mobile scroll (threshold 8px, disabilitato >= 1024px)
 * — stessa logica di DesignSystemPage per coerenza cross-route.
 */

import { useState, useEffect, useRef } from "react";
import { ProductionHubTab } from "./ProductionHubTab";
import { NigiriLogo } from "./NigiriLogo";
import { APP } from "./nigiri/strings";
import { DS, LOGO_PRESET } from "./design-system";
import { S } from "./strings";
import { BentoFooter } from "./BentoFooter";
import { BentoHeader } from "./ds/BentoHeader";
import { useBentoTheme } from "./ds/ThemeContext";
import { DSVersionBadge } from "./ds/DSVersionBadge";
import { BentoPageShell } from "./ds/BentoPageShell";
import { BentoCoachmark, useCoachmark, NIGIRI_STEPS } from "./BentoCoachmark";
import { useFeatureFlag } from "./feature-flags";

export function PromptGeneratorApp() {
  const { isDark } = useBentoTheme();
  const coachmark = useCoachmark("nigiri-coachmark-seen");
  const ffCoachmarks = useFeatureFlag("bento.coachmarks");
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

  return (
    <BentoPageShell>
      {/* Header — BentoHeader condiviso */}
      <BentoHeader
        backTo="/"
        backLabel={APP.BACK_TITLE}
        icon={<NigiriLogo size={24} {...LOGO_PRESET.ON_DARK} />}
        iconBg={DS.ACCENT}
        title={APP.NAME}
        subtitle={APP.HEADER_SUBTITLE}
        visible={headerVisible}
        kanji={S.NIGIRI_KANJI}
      >
        <span className="hidden sm:inline-flex items-center gap-2">
          <span
            className="px-2 py-1"
            style={{ fontSize: DS.FONT_SMALL, fontFamily: DS.MONO, fontWeight: 700, backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BORDER_STRONG, color: DS.TEXT_INVERSE }}
          >
            {APP.VERSION}
          </span>
          <DSVersionBadge tag="beta" />
        </span>
      </BentoHeader>

      {/* Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-5 pt-10">
        <ProductionHubTab />
      </main>

      {/* Footer */}
      <BentoFooter
        dark={isDark}
        extraRight={
          ffCoachmarks ? (
            <button
              onClick={coachmark.reset}
              className="font-mono transition-colors hover:opacity-70"
              style={{ fontSize: DS.FONT_TINY, letterSpacing: DS.LS_NORMAL, textTransform: "uppercase" as const, color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_TERTIARY, backgroundColor: "transparent", border: "none", cursor: "pointer" }}
              title="Tour guidato Nigiri"
            >
              Tour
            </button>
          ) : undefined
        }
      />

      {/* ─── Coachmark ─── */}
      {ffCoachmarks && (
        <BentoCoachmark visible={coachmark.visible} onDismiss={coachmark.dismiss} steps={NIGIRI_STEPS} />
      )}
    </BentoPageShell>
  );
}