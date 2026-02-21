/**
 * BentoFooter — Footer condiviso per tutte le route Bento.
 * Flow-based (non fixed): si posiziona naturalmente in fondo al flex-col layout.
 * Testo unificato + optional extras (link DS, DEV TOOLS).
 *
 * Props opzionali:
 *   - extraRight: contenuto aggiuntivo a destra
 *   - maxWidth: classe Tailwind per max-width (default: "max-w-7xl")
 *   - dark: boolean per abilitare lo stile scuro (default: false)
 *   - fixed: boolean per abilitare il posizionamento fisso (default: false)
 */

import { DS } from "./design-system";
import { useBentoTheme } from "./ds/ThemeContext";
import { useIsPendingSync, useIsOnline } from "./feature-flags";
import { WifiOff, CloudOff } from "lucide-react";

/* ── Bento Logo ─────────────────────────────────────────────────────── */

/**
 * BentoLogo — Fusione lettera "B" + griglia bento (お弁当).
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  ANALISI TIPOGRAFICA — perché la gobba inferiore è più grande      ║
 * ╠══════════════════════════════════════════════════════════════════════╣
 * ║                                                                    ║
 * ║  1. CENTRO OTTICO vs GEOMETRICO                                    ║
 * ║     L'occhio percepisce il centro di un glifo ~3-5% sopra il       ║
 * ║     centro matematico (bias gravitazionale). Se il traverso         ║
 * ║     della B è a metà esatta, la lettera appare top-heavy.          ║
 * ║     → Soluzione: il divisore orizzontale si posiziona SOPRA        ║
 * ║       il centro geometrico (y=23 vs y=24 su 48×48).               ║
 * ║                                                                    ║
 * ║  2. BOWL INFERIORE PIÙ AMPIO                                      ║
 * ║     In quasi tutti i typeface (Helvetica, Futura, DIN, Bodoni)     ║
 * ║     il bowl inferiore della B sporge 3-8% più a destra del         ║
 * ║     superiore. Questo:                                              ║
 * ║     a) bilancia il peso ottico (area inferiore > superiore)        ║
 * ║     b) ancora la lettera alla baseline, dando stabilità            ║
 * ║     c) crea ritmo visivo: la B "cresce" verso il basso             ║
 * ║                                                                    ║
 * ║  3. STRATEGIA PER IL LOGO BENTO                                    ║
 * ║     I D-shapes (rettangoli con semicerchio destro) formano i       ║
 * ║     bowl. Poiché il semicerchio ha r = altezza/2, un bowl più      ║
 * ║     alto implica automaticamente un semicerchio più ampio:         ║
 * ║                                                                    ║
 * ║       top bowl:    h=16, r=8   → rightmost x=42                   ║
 * ║       bottom bowl: h=18, r=9   → rightmost x=43                   ║
 * ║                                                                    ║
 * ║     La porzione rettilinea del D (dStraight) resta a x=34 per      ║
 * ║     entrambi — la differenza emerge SOLO dalla curva, non da       ║
 * ║     un allargamento artificiale. Questo è geometricamente           ║
 * ║     elegante: stessa struttura, curve diverse.                      ║
 * ║                                                                    ║
 * ║  4. RAPPORTI RISULTANTI                                            ║
 * ║     • Altezza bowls:  16 : 18  = 0.889  (bottom 12.5% più alto)   ║
 * ║     • Larghezza bowls: 18 : 19 = 0.947  (bottom 5.6% più largo)   ║
 * ║     • Sporgenza destra: Δ1px   (42→43, 2.4% del viewBox)          ║
 * ║     • Offset centro ottico: 1px sopra centro (y=23 vs y=24)       ║
 * ║     Range coerente con sans-serif geometrici (Futura: ~5-7%)       ║
 * ║                                                                    ║
 * ║  5. DOPPIA LETTURA PRESERVATA                                      ║
 * ║     • Come "B": spine rettilinee + 2 bowls asimmetrici ✓           ║
 * ║     • Come bento: 4 compartimenti di taglie diverse ✓              ║
 * ║       (i bento hanno sezioni irregolari by design)                  ║
 * ║     • Il gap a croce (4px) = separatore bento ✓                    ║
 * ║     • L'accent sul bowl inferiore = compartimento principale ✓     ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Grid su viewBox 48×48:
 *
 *   5    20 24  34  42                   Legenda:
 *   ┌─────┐  ┌──────╮── 5               ░ = color (spine + top bump)
 *   │░░░░░│  │░░░░░░ │  h=16, r=8       ▓ = accent (bottom bump)
 *   │░░░░░│  │░░░░░░ │                  ─ = gap (4px cross divider)
 *   └─────┘  └──────╯── 21
 *   ─ ─ ─ ─ ─ ─ ─ ─ ── gap=4
 *   ┌─────┐  ┌───────╮─ 25              43
 *   │░░░░░│  │▓▓▓▓▓▓▓ │  h=18, r=9      │
 *   │░░░░░│  │▓▓▓▓▓▓▓ │                  │
 *   └─────┘  └───────╯─ 43              ↓
 *
 * API identica a KatanaLogo / NigiriLogo (size, color, accent).
 */
export function BentoLogo({
  size = 32,
  color = DS.TEXT_INVERSE,
  accent,
}: {
  size?: number;
  color?: string;
  accent?: string;
}) {
  const a = accent || DS.ACCENT;

  /*
   * Grid geometry (48×48 viewBox):
   *
   *   margin_L  = 5     margin_R = 5 (bottom) / 6 (top)
   *   margin_T  = 5     margin_B = 5
   *   gap       = 4     (cross divider, uniforme h+v)
   *   spine     = 15    (left column width, uniforme)
   *   cr        = 2.5   (corner radius, tutti gli angoli interni)
   *
   *   Top row:    h = 16   → r_semicircle = 8    → rightmost = 42
   *   Bottom row: h = 18   → r_semicircle = 9    → rightmost = 43
   *   dStraight  = 34      (uguale per entrambi — solo la curva differisce)
   */

  const cr = 2.5;

  /* ── Spine (left column) ─────────────────────────────────────────── */
  const spineX = 5;
  const spineW = 15;

  /* ── Rows ────────────────────────────────────────────────────────── */
  const row1Y  = 5;
  const row1H  = 16;    // top row — shorter (optical correction)
  const gap    = 4;
  const row2Y  = row1Y + row1H + gap;  // 25
  const row2H  = 18;    // bottom row — taller (B bottom bowl)

  /* ── Bumps (right column D-shapes) ───────────────────────────────── */
  const bumpX  = spineX + spineW + gap; // 24

  /* D-shape path builder — parametrizzato su altezza (e quindi semicerchio) */
  const dPath = (y: number, h: number) => {
    const r  = h / 2;                     // semicircle radius = half height
    const ds = bumpX + (spineW - spineX); // 34 — punto di transizione retto→curva (uguale per entrambi)
    // rightmost = ds + r = 34 + 8 = 42 (top) / 34 + 9 = 43 (bottom)
    return (
      `M${bumpX + cr} ${y}` +                                    // top-left (dopo corner)
      `L${ds} ${y}` +                                             // top edge →
      `A${r} ${r} 0 0 1 ${ds} ${y + h}` +                        // semicerchio destro ↓
      `L${bumpX + cr} ${y + h}` +                                 // bottom edge ←
      `A${cr} ${cr} 0 0 1 ${bumpX} ${y + h - cr}` +              // bottom-left corner ↙
      `L${bumpX} ${y + cr}` +                                     // left edge ↑
      `A${cr} ${cr} 0 0 1 ${bumpX + cr} ${y}Z`                   // top-left corner ↗
    );
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      {/* Top-left — spine upper (shorter) */}
      <rect x={spineX} y={row1Y} width={spineW} height={row1H} rx={cr} fill={color} />
      {/* Bottom-left — spine lower (taller) */}
      <rect x={spineX} y={row2Y} width={spineW} height={row2H} rx={cr} fill={color} />
      {/* Top-right — bowl superiore (r=8, rightmost x=42) */}
      <path d={dPath(row1Y, row1H)} fill={color} />
      {/* Bottom-right — bowl inferiore, più ampio (r=9, rightmost x=43) — accent */}
      <path d={dPath(row2Y, row2H)} fill={a} />
    </svg>
  );
}

/* ── Footer ─────────────────────────────────────────────────────────── */

export function BentoFooter({
  extraRight,
  maxWidth = "max-w-7xl",
  dark,
  fixed = false,
}: {
  extraRight?: React.ReactNode;
  maxWidth?: string;
  /** @deprecated — auto-detected via useBentoTheme(). Kept for compat. */
  dark?: boolean;
  fixed?: boolean;
}) {
  const { isDark } = useBentoTheme();
  const d = dark ?? isDark;

  const isPendingSync = useIsPendingSync();
  const isOnline = useIsOnline();

  return (
    <footer
      data-bento-footer
      className={`${fixed ? "fixed bottom-0" : "md:sticky md:bottom-0"} w-full z-10`}
      style={{
        borderWidth: `${DS.BRUTALIST_BORDER_WIDTH} 0 0 0`,
        borderStyle: "solid",
        borderColor: d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER_STRONG,
        backgroundColor: d ? DS.BG_BASE : DS.BRUTALIST_HEADER_BG,
        transition: `background-color ${DS.TRANSITION_NORMAL}, border-color ${DS.TRANSITION_NORMAL}`,
        marginTop: fixed ? undefined : DS.SPACE_10,
      }}
    >
      <div className={`${maxWidth} mx-auto px-5 py-3 flex items-center justify-between`}>
        {/* Left — unified text */}
        <span
          className="font-mono uppercase hidden sm:inline"
          style={{ fontSize: DS.FONT_MICRO, letterSpacing: DS.LS_WIDE, color: d ? DS.TEXT_MUTED : DS.TEXT_TERTIARY }}
        >
          Bento &mdash; Digital Media &mdash; Poste Italiane. Riservato &mdash; Uso interno.
        </span>
        <span
          className="font-mono uppercase sm:hidden"
          style={{ fontSize: DS.FONT_MICRO, letterSpacing: DS.LS_WIDE, color: d ? DS.TEXT_MUTED : DS.TEXT_TERTIARY }}
        >
          Bento &mdash; Uso interno
        </span>

        {/* Right — optional extras + status indicators (#167) */}
        <div className="flex items-center gap-4">
          {extraRight}

          {/* Offline badge */}
          {!isOnline && (
            <div
              className="flex items-center gap-1.5 font-mono"
              style={{ fontSize: DS.FONT_MICRO, color: DS.ACCENT }}
              title="Connessione assente — le modifiche saranno sincronizzate al ritorno online"
            >
              <WifiOff className="w-3 h-3" />
              <span style={{ letterSpacing: DS.LS_WIDE, textTransform: "uppercase" }}>Offline</span>
            </div>
          )}

          {/* Sync pending badge (only when online — offline badge is more relevant when offline) */}
          {isOnline && isPendingSync && (
            <div
              className="flex items-center gap-1.5 font-mono"
              style={{ fontSize: DS.FONT_MICRO, color: DS.DATA_AMBER }}
              title="Modifiche locali in attesa di sincronizzazione"
            >
              <CloudOff className="w-3 h-3" />
              <span style={{ letterSpacing: DS.LS_WIDE, textTransform: "uppercase" }}>Sync</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}