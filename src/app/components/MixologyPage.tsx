/**
 * MixologyPage — Accessible Gradient Generator
 * ==============================================
 * Full React port of Mixology v1.1beta (originally vanilla JS).
 * Generates WCAG-compliant background gradients with cocktail-themed naming.
 *
 * Architecture:
 *   MixologyPage (state + orchestration)
 *   ├── BentoHeader (app branding)
 *   ├── ControlsPanel (WCAG level, color inputs, buttons)
 *   ├── CocktailHero (name + contrast badge)
 *   ├── GradientGrid (5 gradient cards)
 *   │   └── GradientCard (preview + labels + download)
 *   └── BentoFooter
 *
 * feat-024 — Φ6 Integrazione Mixology.
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 */

import { useState, useCallback, useMemo, useEffect, useRef, memo } from "react";
import {
  Palette,
  Shuffle,
  Download,
  Copy,
  Check,
  ChevronDown,
  Droplets,
  SlidersHorizontal,
  ImageUp,
  Plus,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

import { DS, LOGO_PRESET } from "./design-system";
import { S } from "./strings";
import { BentoHeader } from "./ds/BentoHeader";
import { BentoPageShell } from "./ds/BentoPageShell";
import { BentoFooter } from "./BentoFooter";
import { useBentoTheme } from "./ds/ThemeContext";
import { MixologyLogo } from "./MixologyLogo";
import { DSActionButton } from "./ds/DSActionButton";
import { DSVersionBadge } from "./ds/DSVersionBadge";
import { DSToggle } from "./ds/DSToggle";
import { useFeatureFlag } from "./feature-flags";

import {
  WCAG_OPTIONS,
  DEFAULT_WCAG,
  getTargetContrast,
  BG_PALETTE,
  TEXT_PALETTE,
  type WCAGLevel,
  type TextSize,
} from "./mixology/mixology-data";

import {
  generateGradients,
  generateRandomSet,
  generateCocktailName,
  downloadGradientSVG,
  extractPaletteFromImage,
  type GradientResult,
  type AdjustDirection,
} from "./mixology/mixology-engine";

/* ------------------------------------------------------------------ */
/* Constants                                                            */
/* ------------------------------------------------------------------ */

const MX = {
  ACCENT: DS.DATA_TEAL,
} as const;

const DIRECTION_LABELS: Record<AdjustDirection, string> = {
  "↑": S.MIXOLOGY_LEGEND_LIGHTER,
  "↓": S.MIXOLOGY_LEGEND_DARKER,
  "✓": S.MIXOLOGY_LEGEND_UNCHANGED,
};

/* ── Preset persistence ────────────────────────────────────────────── */
const LS_KEY_BG = "bento-mixology-presets-bg";
const LS_KEY_FG = "bento-mixology-presets-fg";
const DEFAULT_BG_PRESETS = ["#EEDC00", "#0047BB"];
const DEFAULT_FG_PRESETS = ["#FFFFFF", "#1A1C1E"];

function loadPresets(key: string, fallback: string[]): string[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.every((s: unknown) => typeof s === "string")) return arr;
    }
  } catch { /* ignore */ }
  return [...fallback];
}
function savePresets(key: string, arr: string[]) {
  try { localStorage.setItem(key, JSON.stringify(arr)); } catch { /* ignore */ }
}

/* ------------------------------------------------------------------ */
/* Sub-Components                                                       */
/* ------------------------------------------------------------------ */

/** Section label — mono uppercase, used for control groups — Katana-aligned */
function SectionLabel({
  children,
  isDark,
}: {
  children: React.ReactNode;
  isDark: boolean;
}) {
  return (
    <label
      className="block font-mono font-black uppercase tracking-wider"
      style={{
        fontSize: DS.FONT_SMALL,
        color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
        marginBottom: DS.SPACE_2,
      }}
    >
      {children}
    </label>
  );
}

/** Compact color input — swatch + hex, no excess width */
function ColorInput({
  label,
  value,
  onChange,
  disabled,
  isDark,
}: {
  label: string;
  value: string;
  onChange: (hex: string) => void;
  disabled?: boolean;
  isDark: boolean;
}) {
  const formBg = isDark ? DS.BG_SURFACE : DS.BRUTALIST_INPUT_BG;
  return (
    <div
      className="flex items-center gap-2"
      style={{ opacity: disabled ? Number(DS.DISABLED_OPACITY) : 1 }}
    >
      <label
        className="relative flex-shrink-0 cursor-pointer"
        style={{
          width: 28,
          height: 28,
          backgroundColor: value,
          border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
        }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="absolute inset-0 opacity-0 cursor-pointer"
          style={{ width: "100%", height: "100%" }}
        />
      </label>
      <input
        type="text"
        value={value.toUpperCase()}
        onChange={(e) => {
          const v = e.target.value;
          if (/^#[0-9a-fA-F]{0,6}$/.test(v)) onChange(v);
        }}
        onBlur={(e) => {
          const v = e.target.value;
          if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v);
        }}
        disabled={disabled}
        maxLength={7}
        className="font-mono outline-none text-center"
        style={{
          fontSize: DS.FONT_SMALL,
          color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY,
          backgroundColor: formBg,
          border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
          padding: `2px ${DS.SPACE_2}`,
          width: 82,
        }}
      />
      <span
        className="font-mono font-bold uppercase flex-shrink-0"
        style={{
          fontSize: DS.FONT_MICRO,
          color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_TERTIARY,
          letterSpacing: DS.LS_WIDE,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Legend row — direction glyph meanings */
function Legend({ isDark }: { isDark: boolean }) {
  const items: { glyph: AdjustDirection; label: string }[] = [
    { glyph: "↑", label: S.MIXOLOGY_LEGEND_LIGHTER },
    { glyph: "↓", label: S.MIXOLOGY_LEGEND_DARKER },
    { glyph: "✓", label: S.MIXOLOGY_LEGEND_UNCHANGED },
  ];
  return (
    <div className="flex items-center gap-4 flex-wrap">
      {items.map((it) => (
        <div
          key={it.glyph}
          className="flex items-center gap-1 font-mono"
          style={{
            fontSize: DS.FONT_MICRO,
            color: isDark ? DS.TEXT_TERTIARY : DS.ON_LIGHT_TEXT_MUTED,
          }}
        >
          <span className="font-sans font-bold" style={{ fontSize: DS.FONT_SMALL }}>
            {it.glyph}
          </span>
          {it.label}
        </div>
      ))}
    </div>
  );
}

/** Single gradient card — brutalist flat, sharp corners */
const GradientCard = memo(function GradientCard({
  gradient,
  cocktailName,
  fgColor,
  index,
  isDark,
}: {
  gradient: GradientResult;
  cocktailName: string;
  fgColor: string;
  index: number;
  isDark: boolean;
}) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopyHex = useCallback((hex: string, idx: number) => {
    const doCopy = async () => {
      try {
        await navigator.clipboard.writeText(hex);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = hex;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopiedIdx(idx);
      toast.success(`${hex.toUpperCase()} ${S.MIXOLOGY_COPIED_SUFFIX}`);
      setTimeout(() => setCopiedIdx(null), 1500);
    };
    doCopy();
  }, []);

  const handleDownload = useCallback(() => {
    downloadGradientSVG(gradient, cocktailName);
    toast.success(S.MIXOLOGY_TOAST_SVG);
  }, [gradient, cocktailName]);

  const handleCopyCSS = useCallback(() => {
    const doCopy = async () => {
      try {
        await navigator.clipboard.writeText(gradient.css);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = gradient.css;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast.success("CSS gradiente copiato");
      try {
        localStorage.setItem("bento-mixology-gradient", JSON.stringify({
          css: gradient.css,
          colors: gradient.labels.map(l => l.hex),
          timestamp: Date.now(),
        }));
      } catch { /* ignore quota errors */ }
    };
    doCopy();
  }, [gradient]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", ...DS.SPRING_DEFAULT, delay: index * 0.05 }}
      className="relative overflow-hidden flex flex-col"
      style={{
        background: gradient.css,
        border: isDark
          ? `${DS.BORDER_WIDTH_REGULAR} solid ${DS.BORDER_DEFAULT}`
          : DS.BRUTALIST_BORDER,
        boxShadow: isDark ? DS.DARK_SHADOW_MD : DS.BRUTALIST_SHADOW_SM,
        minHeight: 200,
      }}
    >
      <div
        className="font-mono font-bold"
        style={{
          position: "absolute",
          top: DS.SPACE_2,
          right: DS.SPACE_2,
          fontSize: DS.FONT_NANO,
          color: fgColor,
          opacity: 0.4,
          letterSpacing: DS.LS_WIDE,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="flex-1 flex flex-col justify-between p-3 relative" style={{ zIndex: 1 }}>
        {gradient.labels.map((lbl, i) => (
          <button
            key={i}
            onClick={() => handleCopyHex(lbl.hex, i)}
            className="flex items-center gap-1.5 self-start group"
            style={{
              fontFamily: DS.MONO,
              fontSize: DS.FONT_MICRO,
              color: fgColor,
              cursor: "pointer",
              backgroundColor: "transparent",
              border: "none",
              padding: `2px ${DS.SPACE_2}`,
              transition: `background-color ${DS.TRANSITION_FAST}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
            title={`${DIRECTION_LABELS[lbl.direction]} — clicca per copiare`}
          >
            <span className="font-bold" style={{ fontSize: DS.FONT_SMALL }}>
              {lbl.hex.toUpperCase()}
            </span>
            <span className="font-sans" style={{ fontSize: DS.FONT_BASE }}>
              {lbl.direction}
            </span>
            {copiedIdx === i ? (
              <Check className="w-3 h-3" style={{ color: fgColor }} />
            ) : (
              <Copy
                className="w-3 h-3 opacity-0 group-hover:opacity-60"
                style={{ color: fgColor, transition: `opacity ${DS.TRANSITION_FAST}` }}
              />
            )}
          </button>
        ))}
      </div>

      <div
        className="flex"
        style={{ borderTop: `1px solid ${fgColor}22` }}
      >
        <button
          onClick={handleCopyCSS}
          className="flex-1 flex items-center justify-center gap-1.5 font-mono font-bold uppercase"
          style={{
            fontSize: DS.FONT_MICRO,
            letterSpacing: DS.LS_WIDE,
            color: fgColor,
            backgroundColor: "rgba(0,0,0,0.18)",
            border: "none",
            cursor: "pointer",
            padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
            transition: `background-color ${DS.TRANSITION_FAST}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.18)";
          }}
          title="Copia CSS gradiente in clipboard"
        >
          <Copy className="w-3 h-3" />
          CSS
        </button>
        <div style={{ width: 1, backgroundColor: `${fgColor}22` }} />
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-1.5 font-mono font-bold uppercase"
          style={{
            fontSize: DS.FONT_MICRO,
            letterSpacing: DS.LS_WIDE,
            color: fgColor,
            backgroundColor: "rgba(0,0,0,0.18)",
            border: "none",
            cursor: "pointer",
            padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
            transition: `background-color ${DS.TRANSITION_FAST}`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(0,0,0,0.18)";
          }}
        >
          <Download className="w-3 h-3" />
          SVG
        </button>
      </div>
    </motion.div>
  );
});

/* ------------------------------------------------------------------ */
/* MixologyPage                                                         */
/* ------------------------------------------------------------------ */

export function MixologyPage() {
  const { isDark } = useBentoTheme();

  /* ── Feature flags (#171) ──────────────────────────────────────── */
  const imgExtractEnabled = useFeatureFlag("mixology.extract-from-image");

  /* ── WCAG level state ──────────────────────────────────────────── */
  const [wcagValue, setWcagValue] = useState(DEFAULT_WCAG);
  const selectedOption = WCAG_OPTIONS.find((o) => o.value === wcagValue) || WCAG_OPTIONS[2];
  const targetContrast = getTargetContrast(selectedOption.level, selectedOption.size);
  const [wcagOpen, setWcagOpen] = useState(false);
  const wcagRef = useRef<HTMLDivElement>(null);

  /* feat-121: close WCAG dropdown on outside click */
  useEffect(() => {
    if (!wcagOpen) return;
    const handler = (e: MouseEvent) => {
      if (wcagRef.current && !wcagRef.current.contains(e.target as Node)) {
        setWcagOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [wcagOpen]);

  /* ── Color state ───────────────────────────────────────────────── */
  const [bg1, setBg1] = useState("#EEDC00");
  const [bg2, setBg2] = useState("#0047BB");
  const [bg3, setBg3] = useState("#003DA5");
  const [fg, setFg] = useState("#FFFFFF");
  const [useBg3, setUseBg3] = useState(false);

  /* ── Results ───────────────────────────────────────────────────── */
  const [gradients, setGradients] = useState<GradientResult[]>([]);
  const [cocktailName, setCocktailName] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  /* ── Logo shake counter ────────────────────────────────────────── */
  const [mixCount, setMixCount] = useState(0);

  /* ── Preset state (BG + FG) with localStorage persistence ──────── */
  const [bgPresets, setBgPresets] = useState<string[]>(() => loadPresets(LS_KEY_BG, DEFAULT_BG_PRESETS));
  const [fgPresets, setFgPresets] = useState<string[]>(() => loadPresets(LS_KEY_FG, DEFAULT_FG_PRESETS));

  const addBgPreset = useCallback((hex: string) => {
    const norm = hex.toUpperCase();
    setBgPresets((prev) => {
      if (prev.includes(norm)) return prev;
      const next = [...prev, norm];
      savePresets(LS_KEY_BG, next);
      return next;
    });
  }, []);
  const removeBgPreset = useCallback((hex: string) => {
    setBgPresets((prev) => {
      const next = prev.filter((p) => p !== hex);
      savePresets(LS_KEY_BG, next);
      return next;
    });
  }, []);
  const addFgPreset = useCallback((hex: string) => {
    const norm = hex.toUpperCase();
    setFgPresets((prev) => {
      if (prev.includes(norm)) return prev;
      const next = [...prev, norm];
      savePresets(LS_KEY_FG, next);
      return next;
    });
  }, []);
  const removeFgPreset = useCallback((hex: string) => {
    setFgPresets((prev) => {
      const next = prev.filter((p) => p !== hex);
      savePresets(LS_KEY_FG, next);
      return next;
    });
  }, []);

  /* ── Image extraction state ────────────────────────────────────── */
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgPalette, setImgPalette] = useState<string[]>([]);
  const [imgSelected, setImgSelected] = useState<string[]>([]);

  /* ── Handlers ──────────────────────────────────────────────────── */

  const handleMix = useCallback(() => {
    const colors = useBg3 ? [bg1, bg2, bg3] : [bg1, bg2];
    const results = generateGradients(colors, fg, targetContrast);
    setGradients(results);
    setCocktailName(generateCocktailName(bg1, bg2, useBg3 ? bg3 : null));
    setHasGenerated(true);
    setMixCount((c) => c + 1);
  }, [bg1, bg2, bg3, fg, useBg3, targetContrast]);

  const handleRandom = useCallback(() => {
    const rnd = generateRandomSet(BG_PALETTE, TEXT_PALETTE, targetContrast, true);
    setBg1(rnd.bg1);
    setBg2(rnd.bg2);
    setBg3(rnd.bg3);
    setFg(rnd.fg);
    setUseBg3(rnd.useBg3);
    const colors = rnd.useBg3 ? [rnd.bg1, rnd.bg2, rnd.bg3] : [rnd.bg1, rnd.bg2];
    setGradients(generateGradients(colors, rnd.fg, targetContrast));
    setCocktailName(generateCocktailName(rnd.bg1, rnd.bg2, rnd.useBg3 ? rnd.bg3 : null));
    setHasGenerated(true);
    setMixCount((c) => c + 1);
  }, [targetContrast]);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;
      try {
        const palette = await extractPaletteFromImage(dataUrl);
        setImgPreview(dataUrl);
        setImgPalette(palette.colors);
        setImgSelected([]);
        setFg(palette.suggestedFg);
        toast.success(S.MIXOLOGY_IMG_TOAST_OK);
      } catch {
        toast.error(S.MIXOLOGY_IMG_TOAST_ERR);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const toggleImgColor = useCallback((hex: string) => {
    setImgSelected((prev) => {
      if (prev.includes(hex)) return prev.filter((c) => c !== hex);
      if (prev.length >= 3) return prev;
      return [...prev, hex];
    });
  }, []);

  const handleImgApply = useCallback(() => {
    if (imgSelected.length === 0) return;
    setBg1(imgSelected[0]);
    if (imgSelected.length >= 2) setBg2(imgSelected[1]);
    if (imgSelected.length >= 3) {
      setBg3(imgSelected[2]);
      setUseBg3(true);
    } else {
      setUseBg3(false);
    }
    // Auto-mix
    const colors = imgSelected.length >= 3 ? imgSelected : imgSelected.slice(0, 2);
    if (colors.length >= 2) {
      setGradients(generateGradients(colors, fg, targetContrast));
      setCocktailName(generateCocktailName(colors[0], colors[1], colors[2] || null));
      setHasGenerated(true);
      setMixCount((c) => c + 1);
    }
  }, [imgSelected, fg, targetContrast]);

  /* ── Derived styles ────────────────────────────────────────────── */
  const panelBg = isDark ? DS.BG_CARD : DS.ON_LIGHT_BG;
  const panelBorder = `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER_STRONG}`;
  const panelShadow = isDark ? DS.DARK_SHADOW_MD : DS.BRUTALIST_SHADOW_MD;
  const formBg = isDark ? DS.BG_SURFACE : DS.BRUTALIST_INPUT_BG;

  return (
    <BentoPageShell>
      {/* Header */}
      <BentoHeader
        backTo="/"
        icon={
          <motion.div
            key={mixCount}
            animate={mixCount > 0 ? { rotate: [0, -10, 10, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <MixologyLogo size={22} color={isDark ? LOGO_PRESET.CHROME.color : LOGO_PRESET.ON_DARK.color} />
          </motion.div>
        }
        iconBg={isDark ? DS.BG_CARD : MX.ACCENT}
        iconBgDark={DS.BG_CARD}
        title={S.MIXOLOGY_TITLE}
        subtitle={S.MIXOLOGY_SUBTITLE}
        kanji={S.MIXOLOGY_KANJI}
      >
        <span className="hidden sm:inline-flex items-center gap-2">
          <span
            className="font-mono font-black uppercase"
            style={{
              fontSize: DS.FONT_SMALL,
              color: isDark ? DS.TEXT_SECONDARY : DS.TEXT_DIM,
            }}
          >
            {S.MIXOLOGY_VERSION}
          </span>
          <DSVersionBadge tag="beta" />
        </span>
      </BentoHeader>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-5 py-6 sm:py-10">
        {/* #190: 2-column layout — controls left, results right on lg+ */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left column: Controls + Image extraction ─── */}
          <div className="lg:w-[380px] flex-shrink-0 space-y-6">

        {/* ═════════════════════════════════════════════════════════ */}
        {/* CONTROLS PANEL                                             */}
        {/* ══════════════════════════════════════════════════════════ */}
        <div
          style={{
            backgroundColor: panelBg,
            border: panelBorder,
            boxShadow: panelShadow,
          }}
        >
          {/* Panel header */}
          <div
            className="flex items-center gap-2"
            style={{
              padding: `${DS.SPACE_3} ${DS.SPACE_5}`,
              borderBottom: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
            }}
          >
            <SlidersHorizontal className="w-4 h-4" style={{ color: MX.ACCENT }} />
            <span
              className="font-mono font-black uppercase"
              style={{
                fontSize: DS.FONT_SMALL,
                letterSpacing: DS.LS_WIDE,
                color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
              }}
            >
              {S.MIXOLOGY_CFG_TITLE}
            </span>
          </div>

          <div className="p-5 space-y-5">
            {/* WCAG Level selector */}
            <div>
              <SectionLabel isDark={isDark}>{S.MIXOLOGY_CFG_WCAG}</SectionLabel>
              <div className="relative" ref={wcagRef}>
                <button
                  onClick={() => setWcagOpen((p) => !p)}
                  className="flex items-center justify-between w-full font-mono font-bold"
                  style={{
                    padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
                    backgroundColor: formBg,
                    border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                    color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_TEXT_PRIMARY,
                    fontSize: DS.FONT_SMALL,
                    cursor: "pointer",
                  }}
                >
                  <span>{selectedOption.label}</span>
                  <ChevronDown
                    className="w-4 h-4"
                    style={{
                      color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
                      transform: wcagOpen ? "rotate(180deg)" : "none",
                      transition: `transform ${DS.TRANSITION_FAST}`,
                    }}
                  />
                </button>
                {wcagOpen && (
                  <div
                    className="absolute z-20 w-full mt-1"
                    style={{
                      backgroundColor: panelBg,
                      border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                      boxShadow: isDark ? DS.DARK_SHADOW_MD : DS.BRUTALIST_SHADOW_SM,
                    }}
                  >
                    {WCAG_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setWcagValue(opt.value); setWcagOpen(false); }}
                        className="block w-full text-left font-mono"
                        style={{
                          padding: `${DS.SPACE_2} ${DS.SPACE_3}`,
                          fontSize: DS.FONT_SMALL,
                          color: opt.value === wcagValue
                            ? MX.ACCENT
                            : (isDark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_PRIMARY),
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: opt.value === wcagValue ? 700 : 400,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span
                className="block font-mono mt-1"
                style={{ fontSize: DS.FONT_MICRO, color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}
              >
                {S.MIXOLOGY_CFG_CONTRAST_PREFIX} {targetContrast}:1
              </span>
            </div>

            {/* Color inputs */}
            <div>
              <SectionLabel isDark={isDark}>{S.MIXOLOGY_CFG_COLORS}</SectionLabel>
              <div className="space-y-2">
                <ColorInput label="BG1" value={bg1} onChange={setBg1} isDark={isDark} />
                <ColorInput label="BG2" value={bg2} onChange={setBg2} isDark={isDark} />
                <div className="flex items-center gap-3">
                  <DSToggle checked={useBg3} onChange={setUseBg3} label="BG3" />
                </div>
                {useBg3 && (
                  <ColorInput label="BG3" value={bg3} onChange={setBg3} isDark={isDark} />
                )}
                <ColorInput label="FG" value={fg} onChange={setFg} isDark={isDark} />
              </div>
            </div>

            {/* Preset swatches */}
            <div>
              <SectionLabel isDark={isDark}>{S.MIXOLOGY_PRESET_BG}</SectionLabel>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {bgPresets.map((hex) => (
                  <button
                    key={hex}
                    className="relative group"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: hex,
                      border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => setBg1(hex)}
                    onContextMenu={(e) => { e.preventDefault(); removeBgPreset(hex); }}
                    title={`${hex} — click per usare, right-click per rimuovere`}
                  >
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 items-center justify-center hidden group-hover:flex"
                      style={{
                        backgroundColor: DS.DATA_RED,
                        color: DS.TEXT_INVERSE,
                        fontSize: DS.FONT_NANO,
                        lineHeight: 1,
                      }}
                    >
                      <X className="w-2 h-2" />
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => addBgPreset(bg1)}
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: "transparent",
                    border: `${DS.BORDER_WIDTH_THIN} dashed ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                    cursor: "pointer",
                    padding: 0,
                    color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title={S.MIXOLOGY_PRESET_ADD}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              <SectionLabel isDark={isDark}>{S.MIXOLOGY_PRESET_FG}</SectionLabel>
              <div className="flex flex-wrap gap-1.5">
                {fgPresets.map((hex) => (
                  <button
                    key={hex}
                    className="relative group"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: hex,
                      border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => setFg(hex)}
                    onContextMenu={(e) => { e.preventDefault(); removeFgPreset(hex); }}
                    title={`${hex} — click per usare, right-click per rimuovere`}
                  >
                    <span
                      className="absolute -top-1 -right-1 w-3 h-3 items-center justify-center hidden group-hover:flex"
                      style={{
                        backgroundColor: DS.DATA_RED,
                        color: DS.TEXT_INVERSE,
                        fontSize: DS.FONT_NANO,
                        lineHeight: 1,
                      }}
                    >
                      <X className="w-2 h-2" />
                    </span>
                  </button>
                ))}
                <button
                  onClick={() => addFgPreset(fg)}
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: "transparent",
                    border: `${DS.BORDER_WIDTH_THIN} dashed ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                    cursor: "pointer",
                    padding: 0,
                    color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  title={S.MIXOLOGY_PRESET_ADD}
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2">
              <DSActionButton
                icon={<Palette className="w-4 h-4" />}
                onClick={handleMix}
                variant="custom"
                accentColor={MX.ACCENT}
              >
                Mix!
              </DSActionButton>
              <DSActionButton
                icon={<Shuffle className="w-4 h-4" />}
                onClick={handleRandom}
                variant="secondary"
              >
                Random
              </DSActionButton>
              {imgExtractEnabled && (
                <DSActionButton
                  icon={<ImageUp className="w-4 h-4" />}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const files = (e.target as HTMLInputElement).files;
                      if (files && files.length > 0) {
                        handleImageUpload(files[0]);
                      }
                    };
                    input.click();
                  }}
                  variant="secondary"
                >
                  Upload Image
                </DSActionButton>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════ */}
        {/* IMAGE EXTRACTION PANEL (#171 — gated by feature flag)     */}
        {/* ══════════════════════════════════════════════════════════ */}
        <AnimatePresence>
          {imgExtractEnabled && imgPreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", ...DS.SPRING_SNAPPY }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  backgroundColor: panelBg,
                  border: panelBorder,
                  boxShadow: panelShadow,
                }}
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: `${DS.SPACE_3} ${DS.SPACE_5}`,
                    borderBottom: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" style={{ color: MX.ACCENT }} />
                    <span
                      className="font-mono font-black uppercase"
                      style={{
                        fontSize: DS.FONT_SMALL,
                        letterSpacing: DS.LS_WIDE,
                        color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
                      }}
                    >
                      {S.MIXOLOGY_IMG_TITLE}
                    </span>
                    {imgSelected.length > 0 && (
                      <span
                        className="font-mono"
                        style={{
                          fontSize: DS.FONT_NANO,
                          color: MX.ACCENT,
                          padding: `1px ${DS.SPACE_2}`,
                          border: `${DS.BORDER_WIDTH_THIN} solid ${MX.ACCENT}44`,
                        }}
                      >
                        {imgSelected.length}/3 {S.MIXOLOGY_IMG_SELECTED}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => { setImgPreview(null); setImgPalette([]); setImgSelected([]); }}
                    className="ds-focus-ring"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: DS.SPACE_1,
                    }}
                    title={S.MIXOLOGY_IMG_CLOSE}
                  >
                    <X className="w-4 h-4" style={{ color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED }} />
                  </button>
                </div>

                {/* Body: thumbnail + palette */}
                <div
                  className="flex items-start gap-5 flex-wrap"
                  style={{ padding: DS.SPACE_5 }}
                >
                  {/* Image thumbnail */}
                  <div
                    className="flex-shrink-0 overflow-hidden"
                    style={{
                      width: 120,
                      height: 120,
                      border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                    }}
                  >
                    <img
                      src={imgPreview}
                      alt="Uploaded"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </div>

                  {/* Extracted palette swatches */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="block font-mono font-bold mb-2"
                      style={{
                        fontSize: DS.FONT_MICRO,
                        color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                        letterSpacing: DS.LS_WIDE,
                        textTransform: "uppercase",
                      }}
                    >
                      {S.MIXOLOGY_IMG_PICK_HINT}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {imgPalette.map((hex) => {
                        const idx = imgSelected.indexOf(hex);
                        const isActive = idx >= 0;
                        return (
                          <button
                            key={hex}
                            type="button"
                            onClick={() => toggleImgColor(hex)}
                            className="relative ds-focus-ring flex items-center justify-center"
                            style={{
                              width: 44,
                              height: 44,
                              backgroundColor: hex,
                              border: isActive
                                ? `3px solid ${MX.ACCENT}`
                                : `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                              cursor: "pointer",
                              padding: 0,
                              transition: `border-color ${DS.TRANSITION_FAST}`,
                            }}
                            title={hex.toUpperCase()}
                          >
                            {isActive && (
                              <span
                                className="font-mono font-bold"
                                style={{
                                  fontSize: DS.FONT_SMALL,
                                  color: DS.TEXT_INVERSE,
                                  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                                }}
                              >
                                {idx + 1}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Apply button */}
                    <div className="mt-3">
                      <DSActionButton
                        icon={<Droplets className="w-4 h-4" />}
                        onClick={handleImgApply}
                        variant="custom"
                        accentColor={MX.ACCENT}
                        disabled={imgSelected.length === 0}
                      >
                        {S.MIXOLOGY_IMG_APPLY}
                      </DSActionButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

          </div>{/* end left column */}

          {/* ── Right column: Results ─── */}
          <div className="flex-1 min-w-0 space-y-6">

        {/* ══════════════════════════════════════════════════════════ */}
        {/* RESULTS                                                    */}
        {/* ═════════════════════════════════════════════════════════ */}
        {hasGenerated && (
          <>
            {/* Cocktail name hero */}
            {cocktailName && (
              <div className="flex flex-col items-center" style={{ gap: DS.SPACE_2 }}>
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={cocktailName}
                    initial={{ opacity: 0, scale: 0.9, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    transition={{ type: "spring", ...DS.SPRING_SNAPPY }}
                    className="font-mono font-bold uppercase text-center"
                    style={{
                      fontSize: DS.FONT_XXLARGE,
                      letterSpacing: DS.LS_WIDE,
                      color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
                      margin: 0,
                      lineHeight: DS.LH_TIGHT,
                    }}
                  >
                    {cocktailName}
                  </motion.h2>
                </AnimatePresence>
                {/* Gradient underline */}
                <div
                  style={{
                    width: "120px",
                    height: DS.BRUTALIST_BORDER_WIDTH,
                    background: useBg3
                      ? `linear-gradient(90deg, ${bg1}, ${bg2}, ${bg3})`
                      : `linear-gradient(90deg, ${bg1}, ${bg2})`,
                  }}
                />
              </div>
            )}

            {/* Legend */}
            <div className="flex justify-center">
              <Legend isDark={isDark} />
            </div>

            {/* Gradient grid — #190: adapt cols for 2-column layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {gradients.map((g, i) => (
                <GradientCard
                  key={`${cocktailName}-${i}`}
                  gradient={g}
                  cocktailName={cocktailName}
                  fgColor={fg}
                  index={i}
                  isDark={isDark}
                />
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {!hasGenerated && (
          <div
            className="flex flex-col items-center justify-center py-16"
            style={{ color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}
          >
            <Droplets
              className="w-12 h-12 mb-4"
              style={{ opacity: 0.3 }}
            />
            <p
              className="font-mono text-center"
              style={{ fontSize: DS.FONT_SMALL, maxWidth: 300 }}
            >
              {S.MIXOLOGY_EMPTY}
            </p>
          </div>
        )}

          </div>{/* end right column */}

        </div>
      </main>

      {/* Footer */}
      <BentoFooter dark={isDark} />
    </BentoPageShell>
  );
}