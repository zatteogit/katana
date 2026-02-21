/**
 * BentoPageShell — Shared page layout wrapper for all Bento routes.
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 *
 * Provides:
 *   - min-h-screen flex flex-col (footer always at bottom)
 *   - Background grid pattern (toggleable — DS page doesn't use it)
 *   - Theme-aware background color transition
 *   - Consistent structure: children flow naturally, footer sits at end
 *
 * Usage:
 *   <BentoPageShell>
 *     <BentoHeader ... />
 *     <main className="flex-1 ...">content</main>
 *     <BentoFooter ... />
 *   </BentoPageShell>
 *
 * DevToolsPage uses `fullHeight` to get h-screen + overflow-hidden behavior.
 */

import { DS } from "../design-system";
import { useBentoTheme } from "./ThemeContext";

interface BentoPageShellProps {
  children: React.ReactNode;
  /** Show the 40px grid background pattern (default: true) */
  grid?: boolean;
  /** Use h-screen + overflow-hidden instead of min-h-screen (IDE layout) */
  fullHeight?: boolean;
  /** Extra inline styles on the outer div */
  style?: React.CSSProperties;
  /** Extra className on the outer div */
  className?: string;
}

export function BentoPageShell({
  children,
  grid = true,
  fullHeight = false,
  style,
  className = "",
}: BentoPageShellProps) {
  const { isDark } = useBentoTheme();

  const bgColor = isDark ? DS.BG_SURFACE : DS.ON_LIGHT_BG;

  const gridBg = grid
    ? {
        backgroundImage: `linear-gradient(${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRID} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRID} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        backgroundPosition: "-1px -1px",
      }
    : {};

  return (
    <div
      className={`${fullHeight ? "h-screen overflow-hidden" : ""} flex flex-col flex-1 ${className}`}
      style={{
        backgroundColor: bgColor,
        ...gridBg,
        transition: `background-color ${DS.TRANSITION_NORMAL}`,
        /* feat-117 fix: 100% fills the absolute-positioned AnimatedOutlet parent,
           100dvh is a fallback for direct-render contexts (no flex parent).
           max() picks whichever is larger, so content can still grow beyond viewport. */
        ...(fullHeight ? {} : { minHeight: "max(100%, 100dvh)" }),
        ...style,
      }}
    >
      {children}
    </div>
  );
}