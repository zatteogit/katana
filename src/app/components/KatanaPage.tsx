/**
 * KatanaPage v4.0 — Native React (no iframe)
 * ============================================
 *
 * Complete rewrite: all UI is native React with DS tokens.
 * The crop engine (Cropper.js, smartcrop, tinycolor2, JSZip) runs
 * as normal npm imports — no iframe, no Bootstrap, no postMessage.
 *
 * Architecture:
 *   KatanaPage (state + routing)
 *   ├── BentoHeader
 *   ├── KatanaSetup (Step 1: config + upload)
 *   └── KatanaWorkspace (Step 2: grid + edit + export)
 *       ├── ImageCard (crop preview)
 *       ├── PaletteCard (SVG gradient)
 *       └── CropModal (Cropper.js editing)
 *
 * Nigiri bridge:
 *   URL params ?comp=X&variant=Y&slug=Z are read directly from
 *   React Router searchParams. No postMessage needed anymore.
 *
 * Dark mode:
 *   All components use useBentoTheme() + DS tokens.
 */

import { useState, useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Crop } from "lucide-react";
import { DS, LOGO_PRESET } from "./design-system";
import { S } from "./strings";
import { BentoHeader } from "./ds/BentoHeader";
import { useBentoTheme } from "./ds/ThemeContext";
import { DSVersionBadge } from "./ds/DSVersionBadge";
import { BentoPageShell } from "./ds/BentoPageShell";
import { BentoFooter } from "./BentoFooter";
import { KatanaLogo } from "./KatanaLogo";
import { BentoCoachmark, useCoachmark, KATANA_STEPS } from "./BentoCoachmark";
import { toast } from "sonner";

import { getSiteConfig, getKatanaStrings } from "./katana/katana-config";
import type { WorkspaceItem, SiteConfigMap, KatanaStrings } from "./katana/katana-types";
import {
  extractColors,
  getActiveAssets,
  runSmartCropForAssets,
  detectAssetFromFile,
  loadImageFromFile,
} from "./katana/katana-engine";
import { safeNewFile } from "./katana/safari-compat";
import { KatanaSetup } from "./katana/KatanaSetup";
import { KatanaWorkspace } from "./katana/KatanaWorkspace";
import { loadCustomTemplates, mergeConfigs } from "./katana/katana-templates";
import { useFeatureFlag } from "./feature-flags";

/* ── localStorage keys ── */
const LS_KATANA_SITE = "katana_site";

/* ------------------------------------------------------------------ */
/* KatanaPage                                                          */
/* ------------------------------------------------------------------ */

export function KatanaPage() {
  const [searchParams] = useSearchParams();
  const { isDark } = useBentoTheme();
  const coachmark = useCoachmark("katana-coachmark-seen");

  // Feature flags (dev-mode toggles)
  const ffTemplateWizard = useFeatureFlag("katana.template-wizard");
  const ffBatchUpload = useFeatureFlag("katana.batch-upload");
  const ffCoachmarks = useFeatureFlag("bento.coachmarks");

  // Load built-in config from data-js-code
  const builtInConfig: SiteConfigMap = useMemo(() => getSiteConfig(), []);
  const strings: KatanaStrings = useMemo(() => getKatanaStrings(), []);

  // feat-007: Custom templates — merge with built-in config
  const builtInKeys = useMemo(() => Object.keys(builtInConfig), [builtInConfig]);
  const [tplVersion, setTplVersion] = useState(0);
  const config: SiteConfigMap = useMemo(() => {
    const custom = loadCustomTemplates();
    return custom.length > 0 ? mergeConfigs(builtInConfig, custom) : builtInConfig;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [builtInConfig, tplVersion]);
  const handleTemplatesChanged = useCallback(() => {
    setTplVersion((v) => v + 1);
  }, []);

  // Get first site key
  const siteKeys = useMemo(() => Object.keys(config), [config]);
  const defaultSite = useMemo(() => {
    const saved = localStorage.getItem(LS_KATANA_SITE);
    if (saved && siteKeys.includes(saved)) return saved;
    return siteKeys.includes("posteit") ? "posteit" : siteKeys[0] || "";
  }, [siteKeys]);

  // State
  const [site, setSite] = useState(defaultSite);
  const [comp, setComp] = useState(() => {
    const components = config[defaultSite]?.components || {};
    return Object.keys(components)[0] || "";
  });
  const [variant, setVariant] = useState(() => {
    const components = config[defaultSite]?.components || {};
    const c = components[Object.keys(components)[0]];
    return c?.variants?.[0]?.id || "main";
  });
  const [slug, setSlug] = useState(S.KATANA_SLUG_FALLBACK);
  const [masterImg, setMasterImg] = useState<HTMLImageElement | null>(null);
  const [masterFile, setMasterFile] = useState<File | null>(null);
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [exportPsd, setExportPsd] = useState(false);

  // Derived
  const isWorkspace = masterImg !== null && items.length > 0;

  /* ── Preselect from Nigiri (URL params) ── */
  const preselectComp = searchParams.get("comp") || "";
  const preselectVariant = searchParams.get("variant") || "";
  const preselectSlug = searchParams.get("slug") || "";
  const hasPreselect = !!preselectComp;

  useEffect(() => {
    if (!hasPreselect) return;
    // Find which site has this component
    for (const [siteKey, siteVal] of Object.entries(config)) {
      if (siteVal.components[preselectComp]) {
        setSite(siteKey);
        setComp(preselectComp);
        if (preselectVariant) setVariant(preselectVariant);
        else {
          const c = siteVal.components[preselectComp];
          setVariant(c.variants?.[0]?.id || "main");
        }
        if (preselectSlug) setSlug(preselectSlug.replace(/-/g, "_"));
        break;
      }
    }
  }, [hasPreselect, preselectComp, preselectVariant, preselectSlug, config]);

  /* ── Handlers: selectors ── */

  const handleSiteChange = useCallback(
    (v: string) => {
      setSite(v);
      localStorage.setItem(LS_KATANA_SITE, v);
      const components = config[v]?.components || {};
      const firstComp = Object.keys(components)[0] || "";
      setComp(firstComp);
      const c = components[firstComp];
      setVariant(c?.variants?.[0]?.id || "main");
      // Reset workspace
      setMasterImg(null);
      setItems([]);
    },
    [config]
  );

  const handleCompChange = useCallback(
    (v: string) => {
      setComp(v);
      const c = config[site]?.components?.[v];
      setVariant(c?.variants?.[0]?.id || "main");
      // Reset workspace
      setMasterImg(null);
      setItems([]);
    },
    [config, site]
  );

  const handleVariantChange = useCallback(
    (v: string) => {
      setVariant(v);
      setMasterImg(null);
      setItems([]);
    },
    []
  );

  const handleReset = useCallback(() => {
    setMasterImg(null);
    setItems([]);
  }, []);

  /* ── Go to editor (empty workspace) — user will paste via clipboard ── */
  const handleGoToEditor = useCallback(() => {
    const activeAssets = getActiveAssets(config, site, comp, variant);
    const imgAssets = activeAssets.filter((a: any) => a.type !== "svg");
    if (imgAssets.length === 0) return;
    /* Create a tiny transparent placeholder as masterImg */
    const cvs = document.createElement("canvas");
    cvs.width = 1; cvs.height = 1;
    const placeholder = new Image();
    placeholder.onload = () => {
      setMasterImg(placeholder);
      setItems(
        imgAssets.map((a: any) => ({
          type: "img" as const,
          assetSpec: a,
          currentW: a.w,
          currentH: a.h,
          currentD: !!a.d,
          /* no crop — cards show blank; user pastes to fill */
        }))
      );
    };
    placeholder.src = cvs.toDataURL();
  }, [config, site, comp, variant]);

  /* ── File loading (single master) ── */

  const handleFileLoad = useCallback(
    async (file: File) => {
      setLoading(true);

      const img = await loadImageFromFile(file);

      if (!img) {
        setLoading(false);
        alert(strings.safariAlert || S.KATANA_FORMAT_UNSUPPORTED);
        return;
      }

      // Smart detection — track whether user accepted the suggestion
      const match = detectAssetFromFile(file.name, img.width, img.height, config);
      let accepted = false;

      if (match) {
        const isSame = match.site === site && match.comp === comp && match.variant === variant;
        if (!isSame) {
          const msg = [
            strings.detectTitle,
            "",
            `${strings.detectChannel}: ${match.siteLabel}`,
            `${strings.detectComponent}: ${match.compLabel}`,
            match.varLabel ? `${strings.detectVariant}: ${match.varLabel}` : "",
            match.slug ? `${strings.detectSlug}: ${match.slug}` : "",
            "",
            strings.detectConfirm,
          ]
            .filter(Boolean)
            .join("\n");

          if (confirm(msg)) {
            accepted = true;
            setSite(match.site);
            localStorage.setItem(LS_KATANA_SITE, match.site);
            setComp(match.comp);
            setVariant(match.variant);
            if (match.slug) setSlug(match.slug);
          }
        } else {
          // Same component — auto-accept, just update slug if detected
          accepted = true;
          if (match.slug && match.slug !== slug) {
            setSlug(match.slug);
          }
        }
      }

      // Use match values ONLY if user accepted; otherwise use current state
      const activeSite = accepted && match ? match.site : site;
      const activeComp = accepted && match ? match.comp : comp;
      const activeVariant = accepted && match ? match.variant : variant;
      const siteConfig = config[activeSite];
      const assets = getActiveAssets(config, activeSite, activeComp, activeVariant);

      const rawColors = extractColors(img);
      const newItems = await runSmartCropForAssets(img, assets, rawColors, siteConfig);

      setMasterImg(img);
      setMasterFile(file);
      setItems(newItems);
      setLoading(false);
    },
    [config, site, comp, variant, slug, strings]
  );

  /* ── feat-004: Clipboard paste ── */

  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      /* Only handle paste when Katana page is active and not in a text input */
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const blob = item.getAsFile();
          if (!blob) {
            toast.error(S.KATANA_PASTE_FAIL);
            return;
          }
          /* Create a File from the blob with a synthetic name */
          const ext = item.type.split("/")[1] || "png";
          const file = safeNewFile([blob], `clipboard-paste.${ext}`, { type: item.type });
          toast.success(S.KATANA_PASTE_OK);
          handleFileLoad(file);
          return;
        }
      }
      /* No image found in clipboard — don't interfere with normal paste */
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handleFileLoad]);

  /* ── feat-005: Multi-file upload ── */

  const handleMultiFileLoad = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;
      if (files.length === 1) {
        handleFileLoad(files[0]);
        return;
      }

      /* Strategy: sort files by size descending — largest becomes master.
         After workspace items are created, remaining files get auto-matched
         to cards via detectAssetFromFile or dimension matching. */
      const sorted = [...files].sort((a, b) => b.size - a.size);
      const masterCandidate = sorted[0];
      const extras = sorted.slice(1);

      /* Load master first (reuse handleFileLoad logic inline to get items ref) */
      setLoading(true);

      const img = await loadImageFromFile(masterCandidate);

      if (!img) {
        setLoading(false);
        toast.error(strings.safariAlert || S.KATANA_FORMAT_UNSUPPORTED);
        return;
      }

      /* Smart detection on master */
      const match = detectAssetFromFile(masterCandidate.name, img.width, img.height, config);
      let activeSite = site;
      let activeComp = comp;
      let activeVariant = variant;

      if (match) {
        const isSame = match.site === site && match.comp === comp && match.variant === variant;
        if (!isSame) {
          /* Auto-accept on multi-upload (no confirm dialog) */
          activeSite = match.site;
          activeComp = match.comp;
          activeVariant = match.variant;
          setSite(match.site);
          localStorage.setItem(LS_KATANA_SITE, match.site);
          setComp(match.comp);
          setVariant(match.variant);
          if (match.slug) setSlug(match.slug);
        } else if (match.slug) {
          setSlug(match.slug);
        }
      }

      const siteConfig = config[activeSite];
      const assets = getActiveAssets(config, activeSite, activeComp, activeVariant);
      const rawColors = extractColors(img);
      const newItems = await runSmartCropForAssets(img, assets, rawColors, siteConfig);

      /* Now match extras to workspace items by dimension matching */
      let assignedCount = 0;
      let unmatchedCount = 0;

      for (const extraFile of extras) {
        if (extraFile.type && !extraFile.type.startsWith("image/")) {
          unmatchedCount++;
          continue;
        }
        const extraImg = await loadImageFromFile(extraFile);
        if (!extraImg) { unmatchedCount++; continue; }

        /* Try to match by @2x dimensions first, then 1x */
        let bestIdx = -1;
        let bestScore = 0;
        for (let i = 0; i < newItems.length; i++) {
          const it = newItems[i];
          if (it.type !== "img" || it.customImg) continue; /* already assigned or SVG */
          const w2 = it.assetSpec.d ? it.currentW * 2 : it.currentW;
          const h2 = it.assetSpec.d ? it.currentH * 2 : it.currentH;
          let score = 0;
          if (extraImg.width === w2 && extraImg.height === h2) score = 100;
          else if (extraImg.width === it.currentW && extraImg.height === it.currentH) score = 80;
          else {
            const ar = it.currentW / it.currentH;
            const imgAr = extraImg.width / extraImg.height;
            if (ar > 0 && Math.abs(ar - imgAr) / ar < 0.05) score = 30;
          }
          if (score > bestScore) { bestScore = score; bestIdx = i; }
        }

        if (bestIdx >= 0 && bestScore > 0) {
          newItems[bestIdx] = {
            ...newItems[bestIdx],
            customImg: extraImg,
            customFile: extraFile,
          };
          assignedCount++;
        } else {
          unmatchedCount++;
        }
      }

      setMasterImg(img);
      setMasterFile(masterCandidate);
      setItems(newItems);
      setLoading(false);

      /* Feedback toasts */
      if (assignedCount > 0) {
        toast.success(S.KATANA_MULTI_ASSIGNED(assignedCount));
      }
      if (unmatchedCount > 0) {
        toast.warning(S.KATANA_MULTI_UNMATCHED(unmatchedCount));
      }
    },
    [config, site, comp, variant, strings, handleFileLoad]
  );

  /* ── Preselect badge ── */
  const preselectLabel = hasPreselect
    ? `${preselectComp}${preselectVariant ? ` / ${preselectVariant}` : ""}${preselectSlug ? ` / ${preselectSlug}` : ""}`
    : null;

  return (
    <BentoPageShell>
      {/* ─── Header ─── */}
      <BentoHeader
        backTo={hasPreselect ? "/nigiri" : "/"}
        backLabel={hasPreselect ? S.KATANA_BACK_NIGIRI : S.NAV_BACK_LAUNCHER}
        icon={<KatanaLogo size={24} color={isDark ? LOGO_PRESET.CHROME.color : LOGO_PRESET.ON_LIGHT.color} />}
        iconBg={DS.ON_LIGHT_BG}
        iconBgDark={DS.BG_CARD}
        title={S.KATANA_TITLE}
        subtitle={S.KATANA_SUBTITLE}
        kanji={S.KATANA_KANJI}
      >
        {/* Version badge */}
        <span className="hidden sm:inline-flex items-center gap-2">
          <span
            className="font-mono font-black uppercase"
            style={{
              fontSize: DS.FONT_SMALL,
              fontFamily: DS.MONO,
              color: isDark ? DS.TEXT_SECONDARY : DS.TEXT_DIM,
            }}
          >
            {S.KATANA_VERSION}
          </span>
          <DSVersionBadge tag="beta" />
        </span>

        {/* Preselect badge */}
        {preselectLabel && (
          <span
            className="hidden md:inline-flex items-center gap-1.5 px-2 py-1 font-mono uppercase"
            style={{
              fontSize: DS.FONT_TINY,
              letterSpacing: DS.LS_TIGHT,
              color: isDark ? DS.TEXT_TERTIARY : DS.TEXT_MUTED,
              border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
              backgroundColor: isDark ? DS.BG_ELEVATED : DS.ON_LIGHT_BG_ALT,
            }}
          >
            <Crop className="w-3 h-3" />
            {preselectLabel}
          </span>
        )}
      </BentoHeader>

      {/* ─── Content ─── */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 py-8">
        {loading && !isWorkspace ? (
          <div className="flex items-center justify-center py-24">
            <div
              className="flex items-center gap-3 px-6 py-4 font-mono font-bold uppercase"
              style={{
                fontSize: DS.FONT_LARGE,
                backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
                border: isDark ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}` : DS.BRUTALIST_BORDER,
                color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
              }}
            >
              <span className="animate-spin inline-block w-5 h-5 border-2 border-current border-t-transparent" style={{ borderRadius: "50%" }} />
              {strings.assetAnalysis}
            </div>
          </div>
        ) : isWorkspace ? (
          <KatanaWorkspace
            config={config}
            strings={strings}
            site={site}
            comp={comp}
            variant={variant}
            slug={slug}
            masterImg={masterImg!}
            masterFile={masterFile}
            items={items}
            exportPsd={exportPsd}
            onExportPsdChange={setExportPsd}
            onUpdateItems={setItems}
            onReset={handleReset}
            onSlugChange={setSlug}
          />
        ) : (
          <KatanaSetup
            config={config}
            strings={strings}
            site={site}
            comp={comp}
            variant={variant}
            slug={slug}
            onSiteChange={handleSiteChange}
            onCompChange={handleCompChange}
            onVariantChange={handleVariantChange}
            onSlugChange={setSlug}
            onFileLoad={handleFileLoad}
            onMultiFileLoad={ffBatchUpload ? handleMultiFileLoad : undefined}
            builtInKeys={builtInKeys}
            onTemplatesChanged={ffTemplateWizard ? handleTemplatesChanged : undefined}
            onGoToEditor={handleGoToEditor}
          />
        )}
      </div>

      {/* ─── Footer ─── */}
      <BentoFooter
        dark={isDark}
        extraRight={
          ffCoachmarks ? (
            <button
              onClick={coachmark.reset}
              className="font-mono transition-colors hover:opacity-70"
              style={{ fontSize: DS.FONT_TINY, letterSpacing: DS.LS_NORMAL, textTransform: "uppercase", color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_TERTIARY, backgroundColor: "transparent", border: "none", cursor: "pointer" }}
              title="Tour guidato Katana"
            >
              Tour
            </button>
          ) : undefined
        }
      />

      {/* ─── Coachmark ─── */}
      {ffCoachmarks && (
        <BentoCoachmark visible={coachmark.visible} onDismiss={coachmark.dismiss} steps={KATANA_STEPS} />
      )}
    </BentoPageShell>
  );
}