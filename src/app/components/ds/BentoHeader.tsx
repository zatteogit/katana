/**
 * BentoHeader — Header condiviso per tutte le route light-brutalist di Bento.
 *
 * Garantisce struttura identica (container, gap, sizing, token, transizioni)
 * su Launcher, Nigiri, DesignSystemPage e future pagine della suite.
 *
 * Layout:
 *   [Back?] [Icon w-10] [Title + Subtitle] --- ml-auto --- [children slot] [DarkToggle]
 *
 * Il container interno usa sempre `max-w-7xl mx-auto px-5` per garantire
 * che l'edge sinistro del titolo cada nello stesso punto indipendentemente
 * dalla pagina. Le aree di contenuto possono avere max-width diversi.
 *
 * Dark mode:
 *   Legge automaticamente dal ThemeContext globale.
 *   Il toggle Sun/Moon e' sempre visibile nell'header.
 *   Il prop `dark` puo' sovrascrivere il contesto (backward compat).
 *
 * Props:
 *   - backTo:    se presente, mostra freccia <- che linka a questa route
 *   - icon:      ReactNode da rendere dentro il box icona
 *   - iconBg:    colore bg del box icona (identita' app -- DS.ACCENT, DS.ON_LIGHT_BORDER_STRONG...)
 *   - iconBgDark: colore bg del box icona in dark mode (opzionale, default DS.BG_CARD)
 *   - title:     testo h1 (uppercase via CSS)
 *   - subtitle:  testo sotto il titolo
 *   - kanji:     testo kanji (opzionale) per DesignSystemPage
 *   - visible:   controlla auto-hide (default true)
 *   - zIndex:    override z-index (default 10; DS page usa 20 per sidebar)
 *   - dark:      override esplicito palette dark (ignora context)
 *   - showThemeToggle: mostra toggle dark/light (default true)
 *   - children:  slot libero per contenuti a destra (badge, toggle, kanji...)
 */

import { Link } from "react-router";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import { DS } from "../design-system";
import { S } from "../strings";
import { useBentoTheme } from "./ThemeContext";

interface BentoHeaderProps {
  backTo?: string;
  backLabel?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconBgDark?: string;
  title: string;
  subtitle: string;
  kanji?: string;
  visible?: boolean;
  zIndex?: number;
  dark?: boolean;
  showThemeToggle?: boolean;
  children?: React.ReactNode;
}

export function BentoHeader({
  backTo,
  backLabel = S.NAV_BACK_LAUNCHER,
  icon,
  iconBg,
  iconBgDark,
  title,
  subtitle,
  kanji,
  visible = true,
  zIndex = 10,
  dark: darkOverride,
  showThemeToggle = true,
  children,
}: BentoHeaderProps) {
  const { isDark: contextDark, toggleTheme } = useBentoTheme();
  const dark = darkOverride !== undefined ? darkOverride : contextDark;

  const resolvedIconBg = dark
    ? (iconBgDark ?? DS.BG_CARD)
    : iconBg;

  return (
    <header
      className="sticky top-0"
      style={{
        zIndex,
        backgroundColor: dark ? DS.BG_BASE : DS.BRUTALIST_HEADER_BG,
        borderWidth: `0 0 ${DS.BRUTALIST_BORDER_WIDTH} 0`,
        borderStyle: "solid",
        borderColor: dark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER_STRONG,
        padding: "16px 0",
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: `transform ${DS.TRANSITION_NORMAL}, background-color ${DS.TRANSITION_NORMAL}, border-color ${DS.TRANSITION_NORMAL}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-5 flex items-center gap-3">
        {/* -- Back button (sub-pages only) -- */}
        {backTo && (
          <Link
            to={backTo}
            className="w-10 h-10 flex items-center justify-center transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ backgroundColor: dark ? DS.BG_CARD : DS.ON_LIGHT_BORDER_STRONG }}
            title={backLabel}
            aria-label={backLabel}
          >
            <ArrowLeft
              className="w-5 h-5"
              style={{ color: dark ? DS.TEXT_PRIMARY : DS.TEXT_INVERSE }}
            />
          </Link>
        )}

        {/* -- App icon -- */}
        <div
          className="w-10 h-10 flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: resolvedIconBg }}
        >
          {icon}
        </div>

        {/* -- Title + subtitle -- */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <h1
              className="uppercase tracking-wider"
              style={{
                fontSize: DS.FONT_XXLARGE,
                lineHeight: DS.LH_TIGHT,
                letterSpacing: DS.LS_ULTRA_WIDE,
                color: dark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
                fontWeight: 900,
                fontFamily: DS.MONO,
              }}
            >
              {title}
            </h1>
            {kanji && (
              <span
                className="hidden sm:inline flex-shrink-0"
                aria-hidden="true"
                lang="ja"
                style={{
                  fontSize: DS.FONT_XLARGE,
                  lineHeight: DS.LH_NONE,
                  color: dark ? DS.BORDER_HOVER : DS.ON_LIGHT_BORDER,
                }}
              >
                {kanji}
              </span>
            )}
          </div>
          <p
            className="mt-0.5"
            style={{
              fontSize: DS.FONT_SMALL,
              lineHeight: DS.LH_TIGHT,
              letterSpacing: DS.LS_WIDE,
              fontFamily: DS.MONO,
              fontWeight: 700,
              textTransform: "uppercase",
              color: dark ? DS.TEXT_MUTED : DS.TEXT_DIM,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* -- Right slot (children) + Dark toggle -- */}
        <div className="ml-auto flex items-center gap-3 flex-shrink-0">
          {children}
          {showThemeToggle && (
            <button
              onClick={toggleTheme}
              className="hidden sm:flex items-center justify-center w-9 h-9 flex-shrink-0 transition-all group"
              style={{
                border: `${DS.BORDER_WIDTH_MEDIUM} solid ${dark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
                backgroundColor: dark ? DS.BG_CARD : DS.ON_LIGHT_BG_ALT,
                color: dark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
              }}
              title={dark ? "Passa a Light mode" : "Passa a Dark mode"}
              aria-label={dark ? "Passa a Light mode" : "Passa a Dark mode"}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = dark ? DS.BORDER_HOVER : DS.ON_LIGHT_BORDER_STRONG;
                e.currentTarget.style.backgroundColor = dark ? DS.BG_ELEVATED : DS.ON_LIGHT_GRAY_100;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = dark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER;
                e.currentTarget.style.backgroundColor = dark ? DS.BG_CARD : DS.ON_LIGHT_BG_ALT;
              }}
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}