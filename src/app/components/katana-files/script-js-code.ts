export const scriptJsCode = `/* KATANA v3.0 Stable (No-Pica / Offline Version) */

const APP_VER = "v3.0 Local";
let STATE = { site: "posteit", comp: "", variant: "main", img: null, slug: "export", items: [], colors: { raw: [] }, exportPsd: false };

let cropper = null,
    editIdx = -1,
    repIdx = -1;
let dom = {};

// Helper per mostrare il loader
function showLoader(show, text) {
    const loader = document.getElementById("loadingOverlay");
    const txt = document.getElementById("loaderText");
    if (loader) loader.style.display = show ? "flex" : "none";
    if (text && txt) txt.innerText = text;
}

// Risoluzione stili e colori
function resolveStyles(siteConfig, assetSpec, theme) {
    const safeSiteConfig = siteConfig || {};
    const safeAssetSpec = assetSpec || {};
    const defaults = safeSiteConfig.styleDefaults?.[theme] || {};
    const overrides = safeAssetSpec.style?.[theme] || {};
    const btnType = safeAssetSpec.style?.btnType || "filled";
    const getVal = (key) =>
        overrides && overrides[key] ? overrides[key] : defaults && defaults[key] ? defaults[key] : "#FF00FF";
    return { btnType: btnType, text: getVal("text"), btnBg: getVal("btnBg"), btnLabel: getVal("btnLabel") };
}

// Controllo contrasto colori
function checkContrast(bgColors, styles) {
    let minRatio = 21,
        issues = [];
    bgColors.forEach((bg) => {
        // Se tinycolor non \u00e8 caricato, fallback dummy
        if (typeof tinycolor === "undefined") return { ok: true, val: 21 };

        const ratioText = tinycolor.readability(bg, styles.text);
        if (ratioText < 4.5) issues.push("text");
        if (ratioText < minRatio) minRatio = ratioText;
        if (styles.btnType === "text") {
            const ratioBtnLabel = tinycolor.readability(bg, styles.btnLabel);
            if (ratioBtnLabel < 4.5) issues.push("btnLabel");
            if (ratioBtnLabel < minRatio) minRatio = ratioBtnLabel;
        } else {
            if (tinycolor.readability(bg, styles.btnBg) < 3.0) issues.push("btnBox");
        }
    });
    return { ok: issues.length === 0, val: minRatio.toFixed(2) };
}

function enforceContrast(bgColors, styles) {
    if (typeof tinycolor === "undefined") return bgColors;
    const isTextLight = tinycolor(styles.text).isLight();
    return bgColors.map((bg) => {
        let c = tinycolor(bg),
            safety = 0;
        while (safety < 100) {
            let satisfied = true;
            const currentHex = c.toHexString();
            if (tinycolor.readability(currentHex, styles.text) < 4.5) satisfied = false;
            if (styles.btnType === "filled") {
                if (tinycolor.readability(currentHex, styles.btnBg) < 3.0) satisfied = false;
            } else {
                if (tinycolor.readability(currentHex, styles.btnLabel) < 4.5) satisfied = false;
            }
            if (satisfied) break;
            isTextLight ? c.darken(1) : c.lighten(1);
            safety++;
        }
        return c.toHexString();
    });
}

function extractColors(img) {
    const c = document.createElement("canvas");
    c.width = 1;
    c.height = 20;
    const x = c.getContext("2d");
    x.drawImage(img, 0, 0, 1, 20);
    const d = x.getImageData(0, 0, 1, 20).data;
    // Fallback sicuro se tinycolor manca
    const toHex = (r, g, b) => (typeof tinycolor !== "undefined" ? tinycolor({ r, g, b }).toHexString() : "#ffffff");

    return [toHex(d[0], d[1], d[2]), toHex(d[16], d[17], d[18]), toHex(d[36], d[37], d[38])];
}

function getFilename(item) {
    if (!SITE_CONFIG[STATE.site] || !SITE_CONFIG[STATE.site].components[STATE.comp]) return "error-" + STATE.slug;
    const componentConfig = SITE_CONFIG[STATE.site].components[STATE.comp];
    let baseCompName = componentConfig.filenamePrefix || STATE.comp;
    if (componentConfig.variants && STATE.variant && STATE.variant !== "main")
        baseCompName += STATE.variant.replace(/-/g, "");

    let assetId = item.type === "svg" ? "background" : item.assetSpec.id;
    let assetPart = assetId !== "main" ? "-" + assetId : "";
    let ext = item.type === "svg" ? ".svg" : item.assetSpec.d ? "@2x.webp" : ".webp";

    // Gestione suffisso slug vuoto
    let slugSuffix = STATE.slug ? "-" + STATE.slug : "";

    if (item.assetSpec.controlH) {
        ext = item.assetSpec.d ? "x" + item.currentH + "@2x.webp" : "x" + item.currentH + ".webp";
    }
    return (baseCompName + assetPart + slugSuffix + ext).replace(/--/g, "-");
}

function applyStrings() {
    if (typeof STRINGS === "undefined") return;
    document.title = STRINGS.appTitle;
    const vTag = document.getElementById("versionTag");
    if (vTag) vTag.innerText = STRINGS.versionTag;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (STRINGS[key]) el.textContent = STRINGS[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (STRINGS[key]) el.placeholder = STRINGS[key];
    });
}

function populateSiteSelector() {
    dom.site.innerHTML = "";
    if (typeof SITE_CONFIG === "undefined") return;
    var keys = Object.keys(SITE_CONFIG);
    if (!keys.length) return (dom.site.innerHTML = "<option disabled>No Config</option>");
    keys.forEach(function(key) {
        var option = document.createElement("option");
        option.value = key;
        option.text = SITE_CONFIG[key].label;
        dom.site.appendChild(option);
    });
    var saved = localStorage.getItem("katana_site");
    STATE.site = saved && keys.includes(saved) ? saved : (keys.includes("posteit") ? "posteit" : keys[0]);
    dom.site.value = STATE.site;
}

function updateCompList() {
    if (!SITE_CONFIG[STATE.site]) return;
    const components = SITE_CONFIG[STATE.site].components;
    dom.comp.innerHTML = "";
    Object.keys(components).forEach((k) => {
        const o = document.createElement("option");
        o.value = k;
        o.text = components[k].label;
        dom.comp.add(o);
    });
    STATE.comp = dom.comp.value;
    dom.variant && dom.variantContainer ? updateVariantList() : ((STATE.variant = "main"), updateSpecs());
}

function updateVariantList() {
    if (!dom.variant) return;
    const component = SITE_CONFIG[STATE.site].components[STATE.comp];
    const variants = component.variants;
    dom.variant.innerHTML = "";
    dom.variantContainer.style.opacity = variants && variants.length ? "1" : "0.5";
    dom.variant.disabled = !(variants && variants.length);
    STATE.variant = "main";
    if (variants && variants.length > 0) {
        variants.forEach((v) => {
            const o = document.createElement("option");
            o.value = v.id;
            o.text = v.label;
            dom.variant.add(o);
        });
        STATE.variant = dom.variant.value;
    } else {
        dom.variant.innerHTML = '<option value="main" selected disabled>' + STRINGS.noVariant + '</option>';
    }
    updateSpecs();
}

function getActiveAssets() {
    const component = SITE_CONFIG[STATE.site].components[STATE.comp];
    if (component.variants) {
        const activeVariant = component.variants.find((v) => v.id === STATE.variant);
        return activeVariant ? activeVariant.assets : [];
    }
    return component.assets || [];
}

function updateSpecs() {
    const assets = getActiveAssets();
    dom.specs.innerHTML = assets
        .map(
            (a) => '<span class="spec-chip" title="' + STRINGS.targetWeight + ': ' + a.targetKB + 'KB">'
                + '<span class="icon">' + (a.type === "svg" ? STRINGS.iconPalette : STRINGS.iconImage) + '</span> '
                + a.label + '</span>'
        )
        .join("");
}

// --- INIT ---
document.addEventListener("DOMContentLoaded", async () => {
    showLoader(true);
    applyStrings();

    dom = {
        site: document.getElementById("siteSelector"),
        comp: document.getElementById("componentType"),
        variant: document.getElementById("variantSelector"),
        variantContainer: document.getElementById("variantSelectContainer"),
        specs: document.getElementById("specsContainer"),
        drop: document.getElementById("dropZone"),
        file: document.getElementById("fileInput"),
        rep: document.getElementById("replaceInput"),
        slug: document.getElementById("fileDesc"),
        grid: document.getElementById("previewGrid"),
        step1: document.getElementById("step1"),
        step2: document.getElementById("step2"),
        btn: document.getElementById("processBtn"),
        modal: document.getElementById("editorModal"),
        modalImg: document.getElementById("editorImage"),
        range: document.getElementById("modalRangeGroup"),
        slider: document.getElementById("modalWidthSlider"),
        val: document.getElementById("modalWidthVal"),
        rangeLabel: document.getElementById("modalRangeLabel"),
        loader: document.getElementById("loadingOverlay"),
        loaderText: document.getElementById("loaderText"),
        safari: document.getElementById("safariAlert"),
        modalCircleGroup: document.getElementById("modalCircleGroup"),
        circleMaskToggle: document.getElementById("circleMaskToggle"),
        zoomSlider: document.getElementById("modalZoomSlider"),
        zoomGroup: document.getElementById("modalZoomGroup"),
        psdToggle: document.getElementById("psdToggle"),
        psdStatus: document.getElementById("psdStatus")
    };

    populateSiteSelector();
    updateCompList();

    dom.site.onchange = () => {
        STATE.site = dom.site.value;
        localStorage.setItem("katana_site", STATE.site);
        updateCompList();
        window.resetApp();
    };
    dom.comp.onchange = () => {
        STATE.comp = dom.comp.value;
        dom.variant ? updateVariantList() : updateSpecs();
        window.resetApp();
    };
    dom.variant.onchange = () => {
        STATE.variant = dom.variant.value;
        updateSpecs();
        window.resetApp();
    };

    dom.slug.oninput = () => {
        STATE.slug = dom.slug.value
            .trim()
            .replace(/[^a-z0-9-]/gi, "")
            .toLowerCase()
            .replace(/-/g, "_");
    };

    dom.drop.onclick = () => dom.file.click();
    dom.drop.ondragover = (e) => {
        e.preventDefault();
        dom.drop.classList.add("border-primary", "bg-light");
    };
    dom.drop.ondragleave = () => dom.drop.classList.remove("border-primary", "bg-light");
    dom.drop.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) loadMaster(e.dataTransfer.files[0]);
    };
    dom.file.onchange = () => {
        if (dom.file.files[0]) loadMaster(dom.file.files[0]);
    };
    dom.rep.onchange = () => {
        if (dom.rep.files[0]) replaceSrc(dom.rep.files[0]);
    };

    document.getElementById("saveCropBtn").onclick = () => {
        const item = STATE.items[editIdx];
        if (cropper) item.crop = cropper.getData(true);
        if (item.assetSpec.m === "circle") item.maskCircle = dom.circleMaskToggle.checked;
        window.closeModal();
        renderGrid();
    };

    dom.btn.onclick = downloadZip;

    if (dom.psdToggle) {
        dom.psdToggle.onchange = function() {
            STATE.exportPsd = this.checked;
            if (this.checked && !window.writePsd) {
                dom.psdStatus.style.display = "inline";
                dom.psdStatus.textContent = STRINGS.psdLoading;
                dom.psdStatus.style.color = "#6B7280";
                loadPsdLib().then(function(ok) {
                    if (ok) {
                        dom.psdStatus.textContent = STRINGS.psdReady;
                        dom.psdStatus.style.color = "#22C55E";
                        setTimeout(function() { dom.psdStatus.style.display = "none"; }, 2000);
                    } else {
                        dom.psdStatus.textContent = STRINGS.psdFail;
                        dom.psdStatus.style.color = "#EF4444";
                        dom.psdToggle.checked = false;
                        STATE.exportPsd = false;
                    }
                });
            } else if (!this.checked) {
                dom.psdStatus.style.display = "none";
            }
        };
    }

    dom.slider.oninput = function () {
        const item = STATE.items[editIdx],
            spec = item.assetSpec;
        if (!cropper) return;
        const newValue = parseInt(this.value);
        if (spec.controlH) {
            cropper.setAspectRatio(item.currentW / newValue);
            item.currentH = newValue;
            dom.val.innerText = newValue + " px";
            if (spec.f || spec.oz) updateOverlay(spec, item.currentW, newValue);
        } else if (spec.maxW) {
            cropper.setAspectRatio(newValue / spec.h);
            item.currentW = newValue;
            dom.val.innerText = newValue + " px";
            if (spec.f || spec.oz) updateOverlay(spec, newValue, spec.h);
        }
    };

    dom.zoomSlider.oninput = function () {
        if (cropper) cropper.zoomTo(parseFloat(this.value));
    };

    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent) && dom.safari) dom.safari.style.display = "block";
    showLoader(false);
});

// --- FUNZIONI GLOBALI ---
window.resetApp = function () {
    STATE.items = [];
    STATE.img = null;
    dom.step1.classList.remove("d-none");
    dom.step2.classList.add("d-none");
    dom.grid.innerHTML = "";
    dom.file.value = "";
};

window.closeModal = function () {
    const modal = bootstrap.Modal.getInstance(document.getElementById("editorModal"));
    if (modal) modal.hide();
};

window.updateCol = function (idx, i, val) {
    STATE.items[idx].svg.colors[i] = val;
    updateColorUI(idx);
};
window.manualHexObj = function (el, idx, i) {
    if (el.value.length === 7 && el.value.startsWith("#")) {
        STATE.items[idx].svg.colors[i] = el.value;
        updateColorUI(idx);
    }
};

function updateColorUI(idx) {
    renderGrid();
}

window.addCol = function (idx) {
    if (STATE.items[idx].svg.colors.length < 3) {
        STATE.items[idx].svg.colors.push("#FFFFFF");
        renderGrid();
    }
};

window.remCol = function (idx, colIndex) {
    typeof colIndex !== "undefined"
        ? STATE.items[idx].svg.colors.splice(colIndex, 1)
        : STATE.items[idx].svg.colors.pop();
    renderGrid();
};

window.setTheme = function (idx, t) {
    STATE.items[idx].svg.theme = t;
    window.autoFix(idx);
};

window.autoFix = function (idx) {
    const it = STATE.items[idx];
    const styles = resolveStyles(SITE_CONFIG[STATE.site], it.assetSpec, it.svg.theme);
    it.svg.colors = enforceContrast(it.svg.colors, styles);
    renderGrid();
};

window.editProjectName = function () {
    const newName = prompt("Modifica Nome Progetto:", STATE.slug);
    if (newName !== null) {
        STATE.slug = newName
            .trim()
            .replace(/[^a-z0-9-]/gi, "")
            .toLowerCase()
            .replace(/-/g, "_");
        document.getElementById("workspaceTitle").innerHTML =
            SITE_CONFIG[STATE.site].components[STATE.comp].label + " - " + (STATE.slug || "export") + ' <span class="icon icon-edit-slug" onclick="window.editProjectName()" title="Modifica nome">edit</span>';
        renderGrid();
    }
};

window.stepZoom = function (step) {
    if (cropper) cropper.zoom(step);
};

/* =========================================================================
   editCrop \u2014 MODIFICATA per supportare oz hint nel footer modale
   ========================================================================= */
window.editCrop = function (idx) {
    editIdx = idx;
    const item = STATE.items[idx],
        spec = item.assetSpec;
    dom.modalImg.src = "";
    if (cropper) cropper.destroy();

    // Hint text \u2014 aggiunto supporto oz
    let hintText = spec.f
        ? STRINGS.modalHintFocus
        : spec.m === "circle"
          ? STRINGS.modalHintCircle
          : STRINGS.modalHintGeneral;
    if (spec.oz && spec.oz.length > 0) {
        hintText += " " + STRINGS.modalHintOz;
    }
    document.getElementById("modalHintText").innerText = hintText;

    // Mostra/nascondi icone legenda oz nel footer
    const hasOzText  = spec.oz && spec.oz.some((z) => z.t === "text");
    const hasOzBadge = spec.oz && spec.oz.some((z) => z.t === "badge");
    const ozTextEl  = document.getElementById("modalOzTextHint");
    const ozBadgeEl = document.getElementById("modalOzBadgeHint");
    if (ozTextEl)  ozTextEl.style.display  = hasOzText  ? "inline-block" : "none";
    if (ozBadgeEl) ozBadgeEl.style.display = hasOzBadge ? "inline-block" : "none";

    dom.range.classList.remove("d-flex", "d-none");
    spec.m === "circle"
        ? (dom.modalCircleGroup.classList.remove("d-none"), (dom.circleMaskToggle.checked = item.maskCircle))
        : dom.modalCircleGroup.classList.add("d-none");

    if (spec.maxW || spec.controlH) {
        dom.range.classList.add("d-flex");
        dom.slider.min = spec.controlH ? spec.controlH.min : spec.w;
        dom.slider.max = spec.controlH ? spec.controlH.max : spec.maxW;
        dom.slider.step = spec.controlH ? spec.controlH.step : 1;
        dom.slider.value = spec.controlH ? item.currentH : item.currentW;
        dom.val.innerText = dom.slider.value + " px";
        dom.rangeLabel.innerText = spec.controlH ? STRINGS.height : STRINGS.width;
    } else dom.range.classList.add("d-none");

    dom.zoomSlider.value = 1;
    new bootstrap.Modal(dom.modal).show();
    setTimeout(() => {
        dom.modalImg.src = (item.customImg || STATE.img).src;
        dom.modalImg.onload = () => {
            cropper = new Cropper(dom.modalImg, {
                viewMode: 0,
                dragMode: "move",
                aspectRatio: item.currentW / (item.currentH || spec.h),
                autoCropArea: 1,
                guides: false,
                center: false,
                zoomable: true,
                scalable: true,
                toggleDragModeOnDblclick: false,
                data: item.crop,
                ready: () => {
                    if (spec.f || spec.oz) updateOverlay(spec, item.currentW, item.currentH);
                    if (spec.m === "circle") addCircleGuide();
                },
                zoom: (e) => {
                    dom.zoomSlider.value = e.detail.ratio;
                }
            });
        };
    }, 200);
};

/* =========================================================================
   updateOverlay \u2014 RISCRITTA per supportare Area Focus (f) + Overlay Zones (oz)
   ========================================================================= */
function updateOverlay(spec, w, h) {
    const box = document.querySelector(".cropper-crop-box");
    if (!box) return;

    // Rimuovi overlay precedenti
    let old = box.querySelector(".modal-focus-overlay");
    if (old) old.remove();
    box.querySelectorAll(".modal-oz-overlay").forEach((el) => el.remove());

    // Helper: crea un label overlay
    function makeLabel(text, bgColor) {
        const label = document.createElement("span");
        label.style.cssText = "font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:0.6px;"
            + "color:#fff;white-space:nowrap;padding:2px 6px;border-radius:3px;line-height:1;"
            + "text-shadow:0 1px 2px rgba(0,0,0,0.4);background:" + bgColor;
        label.textContent = text;
        return label;
    }

    // --- AREA FOCUS (f) \u2014 Verde ---
    if (spec.f) {
        const el = document.createElement("div");
        el.className = "modal-focus-overlay";
        let fY = spec.f.y,
            fH = spec.f.h;
        const deltaH = h - spec.h;
        if (deltaH > 0 && spec.controlH) {
            const initialFocus = SITE_CONFIG[STATE.site].components[STATE.comp].variants.find(
                (v) => v.id === STATE.variant
            )?.initialFocus;
            if (initialFocus === "center") fY += deltaH / 2;
            else if (initialFocus === "bottom") fY += deltaH;
        }
        el.style.position = "absolute";
        el.style.pointerEvents = "none";
        el.style.zIndex = "50";
        el.style.left = (spec.f.x / w) * 100 + "%";
        el.style.top = (fY / h) * 100 + "%";
        el.style.width = (spec.f.w / w) * 100 + "%";
        el.style.height = (fH / h) * 100 + "%";
        el.style.border = "2px solid rgba(34, 197, 94, 0.85)";
        el.style.background = "rgba(34, 197, 94, 0.08)";
        el.style.boxSizing = "border-box";
        el.style.display = "flex";
        el.style.alignItems = "flex-start";
        el.style.justifyContent = "center";
        el.style.padding = "4px";
        el.appendChild(makeLabel("Area Focus", "rgba(34, 197, 94, 0.55)"));
        box.appendChild(el);
    }

    // --- OVERLAY ZONES (oz) ---
    if (spec.oz && spec.oz.length > 0) {
        const palette = {
            text:  { border: "rgba(245, 158, 11, 0.90)", bg: "rgba(245, 158, 11, 0.15)", label: "rgba(245, 158, 11, 0.65)" },
            badge: { border: "rgba(239, 68, 68, 0.90)",  bg: "rgba(239, 68, 68, 0.15)",  label: "rgba(239, 68, 68, 0.65)" }
        };
        spec.oz.forEach((zone) => {
            const colors = palette[zone.t] || palette.text;
            const el = document.createElement("div");
            el.className = "modal-oz-overlay modal-oz-" + zone.t;
            el.style.position = "absolute";
            el.style.pointerEvents = "none";
            el.style.zIndex = "49";
            el.style.left   = (zone.x / w) * 100 + "%";
            el.style.top    = (zone.y / h) * 100 + "%";
            el.style.width  = (zone.w / w) * 100 + "%";
            el.style.height = (zone.h / h) * 100 + "%";
            el.style.border = "2px dashed " + colors.border;
            el.style.background = colors.bg;
            el.style.display = "flex";
            el.style.alignItems = "flex-end";
            el.style.justifyContent = "center";
            el.style.padding = "4px";
            el.style.boxSizing = "border-box";
            el.appendChild(makeLabel(zone.l, colors.label));
            box.appendChild(el);
        });
    }
}

function addCircleGuide() {
    const box = document.querySelector(".cropper-crop-box");
    if (box && !box.querySelector(".circle-guide-overlay")) {
        const guide = document.createElement("div");
        guide.className = "circle-guide-overlay";
        box.appendChild(guide);
    }
}

window.startReplace = function (idx) {
    repIdx = idx;
    dom.rep.click();
};

/* =========================================================================
   detectAssetFromFile(fileName, imgW, imgH)
   ========================================================================= */
function detectAssetFromFile(fileName, imgW, imgH) {
    var base = (fileName || "")
        .replace(/\\.(webp|png|jpg|jpeg|psd|tiff?)$/i, "")
        .replace(/x\\d+@2x$/i, "")
        .replace(/@2x$/i, "");
    var baseLower = base.toLowerCase();
    if (!baseLower) return null;

    var best = null;
    var bestScore = 0;

    var psdLayers = (window._lastPsdInfo && window._lastPsdInfo.layers) || [];

    Object.keys(SITE_CONFIG).forEach(function(siteKey) {
        var site = SITE_CONFIG[siteKey];
        Object.keys(site.components).forEach(function(compKey) {
            var comp = site.components[compKey];
            var prefix = (comp.filenamePrefix || compKey).toLowerCase();

            var combos = [];
            if (comp.variants) {
                comp.variants.forEach(function(v) {
                    var vs = v.id === "main" ? "" : v.id.replace(/-/g, "").toLowerCase();
                    v.assets.forEach(function(a) {
                        combos.push({ variant: v.id, varLabel: v.label, varSuffix: vs, asset: a });
                    });
                });
            } else if (comp.assets) {
                comp.assets.forEach(function(a) {
                    combos.push({ variant: "main", varLabel: "", varSuffix: "", asset: a });
                });
            }

            combos.forEach(function(c) {
                if (c.asset.type !== "img") return;
                var score = 0;
                var slug = "";

                var fullPrefix = prefix + c.varSuffix;

                if (c.varSuffix && baseLower.indexOf(fullPrefix) === 0) {
                    var nc = baseLower[fullPrefix.length];
                    if (!nc || nc === "-") {
                        score += 40 + 15;
                        var rest = base.substring(fullPrefix.length).replace(/^-/, "");
                        var parts = rest.split("-");
                        if (parts[0] && parts[0].toLowerCase() === c.asset.id.toLowerCase()) {
                            score += 20;
                            slug = parts.slice(1).join("_");
                        } else if (c.asset.id === "main") {
                            score += 5;
                            slug = parts.filter(Boolean).join("_");
                        }
                    }
                }
                else if (baseLower.indexOf(prefix) === 0) {
                    var nc2 = baseLower[prefix.length];
                    if (!nc2 || nc2 === "-") {
                        score += 40;
                        var rest2 = base.substring(prefix.length).replace(/^-/, "");
                        var parts2 = rest2.split("-");
                        if (parts2[0] && parts2[0].toLowerCase() === c.asset.id.toLowerCase()) {
                            score += 20;
                            slug = parts2.slice(1).join("_");
                        } else if (c.asset.id === "main") {
                            score += 5;
                            slug = parts2.filter(Boolean).join("_");
                        }
                    }
                }

                if (score > 0) {
                    var specW1 = c.asset.w;
                    var specH1 = c.asset.controlH ? c.asset.controlH.min : c.asset.h;
                    var specW2 = c.asset.d ? specW1 * 2 : specW1;
                    var specH2 = c.asset.d ? specH1 * 2 : specH1;

                    if (imgW === specW2 && imgH === specH2) score += 15;
                    else if (imgW === specW1 && imgH === specH1) score += 12;
                    else {
                        var specAR = specW1 / specH1;
                        var imgAR = imgW / imgH;
                        if (specAR > 0 && Math.abs(specAR - imgAR) / specAR < 0.03) score += 5;
                    }
                }

                if (score > 0 && psdLayers.length > 0) {
                    var assetLabel = c.asset.label.toLowerCase();
                    var compLabel = comp.label.toLowerCase();
                    psdLayers.forEach(function(ln) {
                        var lnLow = (ln || "").toLowerCase();
                        if (lnLow.indexOf(assetLabel) >= 0 || lnLow.indexOf(prefix) >= 0 || lnLow.indexOf(compLabel) >= 0) {
                            score += 8;
                        }
                    });
                }

                if (score > bestScore) {
                    bestScore = score;
                    best = {
                        score: score,
                        site: siteKey,
                        siteLabel: site.label,
                        comp: compKey,
                        compLabel: comp.label,
                        variant: c.variant,
                        varLabel: c.varLabel,
                        slug: slug.replace(/^_+|_+$/g, "")
                    };
                }
            });
        });
    });

    return best && bestScore >= 40 ? best : null;
}

function applyDetectedMatch(match) {
    STATE.site = match.site;
    dom.site.value = match.site;
    localStorage.setItem("katana_site", match.site);

    var components = SITE_CONFIG[match.site].components;
    dom.comp.innerHTML = "";
    Object.keys(components).forEach(function(k) {
        var o = document.createElement("option");
        o.value = k; o.text = components[k].label;
        dom.comp.add(o);
    });
    dom.comp.value = match.comp;
    STATE.comp = match.comp;

    updateVariantList();
    if (match.variant && match.variant !== "main" && dom.variant) {
        dom.variant.value = match.variant;
        STATE.variant = match.variant;
    }
    updateSpecs();

    if (match.slug) {
        STATE.slug = match.slug;
        dom.slug.value = match.slug;
    }
}

function showDetectModal(match, fileName, onConfirm, onCancel) {
    var prev = document.getElementById("detectOverlay");
    if (prev) prev.parentNode.removeChild(prev);

    var overlay = document.createElement("div");
    overlay.id = "detectOverlay";
    overlay.className = "detect-overlay";

    var dialog = document.createElement("div");
    dialog.className = "detect-dialog";

    var header = document.createElement("div");
    header.className = "detect-header";
    var hIcon = document.createElement("span");
    hIcon.className = "icon";
    hIcon.textContent = "auto_awesome";
    var hTitle = document.createElement("h5");
    hTitle.textContent = STRINGS.detectTitle;
    header.appendChild(hIcon);
    header.appendChild(hTitle);

    var body = document.createElement("div");
    body.className = "detect-body";

    function addRow(label, value) {
        var row = document.createElement("div");
        row.className = "detect-row";
        var lbl = document.createElement("span");
        lbl.className = "detect-label";
        lbl.textContent = label;
        var val = document.createElement("span");
        val.className = "detect-value";
        val.textContent = value;
        row.appendChild(lbl);
        row.appendChild(val);
        body.appendChild(row);
    }

    addRow(STRINGS.detectFileName, fileName);
    addRow(STRINGS.detectChannel, match.siteLabel);
    addRow(STRINGS.detectComponent, match.compLabel);
    if (match.varLabel) addRow(STRINGS.detectVariant, match.varLabel);
    if (match.slug) addRow(STRINGS.detectSlug, match.slug);

    var footer = document.createElement("div");
    footer.className = "detect-footer";

    var hint = document.createElement("span");
    hint.className = "detect-hint";
    hint.textContent = STRINGS.detectConfirm;

    var btnCancel = document.createElement("button");
    btnCancel.className = "detect-btn detect-btn-cancel";
    btnCancel.textContent = STRINGS.detectBtnCancel;

    var btnConfirm = document.createElement("button");
    btnConfirm.className = "detect-btn detect-btn-confirm";
    btnConfirm.textContent = STRINGS.detectBtnConfirm;

    footer.appendChild(hint);
    footer.appendChild(btnCancel);
    footer.appendChild(btnConfirm);

    dialog.appendChild(header);
    dialog.appendChild(body);
    dialog.appendChild(footer);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    function cleanup() {
        document.removeEventListener("keydown", onKey);
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }
    btnConfirm.onclick = function() { cleanup(); onConfirm(); };
    btnCancel.onclick  = function() { cleanup(); onCancel(); };
    overlay.onclick = function(e) { if (e.target === overlay) { cleanup(); onCancel(); } };
    function onKey(e) { if (e.key === "Escape") { cleanup(); onCancel(); } }
    document.addEventListener("keydown", onKey);
    setTimeout(function() { btnConfirm.focus(); }, 50);
}

function loadMaster(file) {
    showLoader(true, STRINGS.assetAnalysis);
    fileToDataUrl(file, function(dataUrl) {
        if (!dataUrl) { showLoader(false); return; }
        const img = new Image();
        img.onload = () => {
            STATE.img = img;
            STATE.colors.raw = extractColors(img);

            function finishLoad() {
                window._lastPsdInfo = null;
                setTimeout(runSmartCrop, 100);
            }

            var match = detectAssetFromFile(file.name, img.width, img.height);
            if (match) {
                var isSame = (match.site === STATE.site && match.comp === STATE.comp && match.variant === STATE.variant);
                if (!isSame) {
                    showDetectModal(match, file.name,
                        function() { applyDetectedMatch(match); finishLoad(); },
                        function() { finishLoad(); }
                    );
                    return;
                } else if (match.slug && match.slug !== STATE.slug) {
                    STATE.slug = match.slug;
                    dom.slug.value = match.slug;
                }
            }
            finishLoad();
        };
        img.src = dataUrl;
    });
}

function replaceSrc(file) {
    fileToDataUrl(file, function(dataUrl) {
        if (!dataUrl) return;
        const img = new Image();
        img.onload = () => {
            STATE.items[repIdx].customImg = img;
            renderGrid();
        };
        img.src = dataUrl;
    });
}

async function runSmartCrop() {
    const assets = getActiveAssets();
    STATE.items = [];
    const smCanvas = document.createElement("canvas");
    const scale = Math.min(1, 600 / STATE.img.width);
    smCanvas.width = STATE.img.width * scale;
    smCanvas.height = STATE.img.height * scale;
    smCanvas.getContext("2d").drawImage(STATE.img, 0, 0, smCanvas.width, smCanvas.height);

    for (let a of assets) {
        let item = {
            assetSpec: a,
            type: a.type,
            currentW: a.w,
            currentH: a.controlH ? a.controlH.min : a.h,
            initialH: a.h,
            currentD: a.d,
            customImg: null,
            currentFocus: "center",
            maskCircle: a.m === "circle"
        };
        if (a.type === "svg") {
            let cols = [STATE.colors.raw[0], STATE.colors.raw[2]];
            let theme = tinycolor(cols[0]).isLight() ? "light" : "dark";
            item.svg = {
                colors: enforceContrast(cols, resolveStyles(SITE_CONFIG[STATE.site], a.assetSpec, theme)),
                theme: theme
            };
        } else {
            const res = await smartcrop.crop(smCanvas, {
                width: item.currentW,
                height: item.currentH,
                ruleOfThirds: true
            });
            item.crop = {
                x: res.topCrop.x / scale,
                y: res.topCrop.y / scale,
                width: res.topCrop.width / scale,
                height: res.topCrop.height / scale
            };
        }
        STATE.items.push(item);
    }
    renderGrid();
    showLoader(false);
    dom.step1.classList.add("d-none");
    dom.step2.classList.remove("d-none");
    document.getElementById("workspaceTitle").innerHTML =
        SITE_CONFIG[STATE.site].components[STATE.comp].label + " - " + (STATE.slug || "export") + ' <span class="icon icon-edit-slug" onclick="window.editProjectName()" title="Modifica nome">edit</span>';
}

function renderGrid() {
    dom.grid.innerHTML = "";
    STATE.items.forEach((item, idx) => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-xl-4";
        const fname = getFilename(item);

        if (item.type === "svg") {
            const styles = resolveStyles(SITE_CONFIG[STATE.site], item.assetSpec, item.svg.theme);
            const fixBtn = !checkContrast(item.svg.colors, styles).ok
                ? '<button class="btn-fix-floating" onclick="window.autoFix(' + idx + ')"><span class="icon">auto_fix_high</span> ' + STRINGS.fixButton + '</button>'
                : "";
            let colorSlotsHTML = "";
            for (let i = 0; i < 3; i++) {
                colorSlotsHTML += item.svg.colors[i]
                    ? '<div class="color-slot"><div class="color-dot" style="background:' + item.svg.colors[i] + '"><input type="color" value="' + item.svg.colors[i] + '" oninput="window.updateCol(' + idx + ',' + i + ',this.value)"></div>' + (i > 0 ? '<div class="btn-remove-slot" onclick="window.remCol(' + idx + ', ' + i + ')"><span class="icon">close</span></div>' : '') + '<input type="text" class="hex-input" value="' + item.svg.colors[i] + '" onchange="window.manualHexObj(this, ' + idx + ', ' + i + ')"></div>'
                    : '<div class="color-slot"><div class="slot-placeholder" onclick="window.addCol(' + idx + ')" title="Aggiungi"><span class="icon">add</span></div><div class="slot-label">' + STRINGS.add + '</div></div>';
            }
            col.innerHTML =
                '<div class="asset-card">'
                + '<div class="card-header-custom"><span class="card-label">' + item.assetSpec.label + '</span><span class="icon">' + STRINGS.iconPalette + '</span></div>'
                + '<div class="workspace-area">'
                +     '<div class="bg-preview-box shadow-sm" style="background:linear-gradient(180deg, ' + item.svg.colors.join(", ") + '); width:100%; height:100%; display:flex; justify-content:center; align-items:center;">'
                +         '<div class="text-center p-2 d-flex flex-column align-items-center">'
                +             '<div class="text-preview mb-2" style="color:' + styles.text + '">' + STRINGS.svgTextPreview + '</div>'
                +             '<span class="cta-preview" style="background:' + styles.btnBg + '; color:' + styles.btnLabel + '">' + STRINGS.svgCtaPreview + '</span>'
                +         '</div>'
                +     '</div>' + fixBtn
                + '</div>'
                + '<div class="card-body-custom">'
                +     '<div class="d-flex gap-2 justify-content-center mb-2">'
                +         '<button class="btn-toggle ' + (item.svg.theme === "light" ? "active" : "") + '" onclick="window.setTheme(' + idx + ',&#39;light&#39;)"><span class="icon icon-sm">light_mode</span> ' + STRINGS.themeLight + '</button>'
                +         '<button class="btn-toggle ' + (item.svg.theme === "dark" ? "active" : "") + '" onclick="window.setTheme(' + idx + ',&#39;dark&#39;)"><span class="icon icon-sm">dark_mode</span> ' + STRINGS.themeDark + '</button>'
                +     '</div>'
                +     '<div class="color-row">' + colorSlotsHTML + '</div>'
                +     '<div class="filename-pill mt-auto">' + fname + '</div>'
                + '</div>'
                + '</div>';
        } else {
            const cvs = document.createElement("canvas");
            cvs.width = item.currentW;
            cvs.height = item.currentH;
            const ctx = cvs.getContext("2d");
            ctx.drawImage(
                item.customImg || STATE.img,
                item.crop.x, item.crop.y, item.crop.width, item.crop.height,
                0, 0, item.currentW, item.currentH
            );
            if (item.maskCircle) {
                ctx.globalCompositeOperation = "destination-in";
                ctx.beginPath();
                ctx.arc(item.currentW / 2, item.currentH / 2, Math.min(item.currentW, item.currentH) / 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
            }

            var ozHtml = (item.assetSpec.oz && item.assetSpec.oz.length > 0)
                ? '<div class="meta-item"><span class="meta-label">' + STRINGS.overlayZones + '</span><span class="meta-value">' + item.assetSpec.oz.map((z) => z.l).join(", ") + '</span></div>'
                : "";

            col.innerHTML =
                '<div class="asset-card">'
                + '<div class="card-header-custom"><span class="card-label">' + item.assetSpec.label + '</span><span class="icon">' + STRINGS.iconImage + '</span></div>'
                + '<div class="workspace-area"><div class="canvas-preview ' + (item.maskCircle ? "is-circle" : "") + '"></div></div>'
                + '<div class="card-body-custom">'
                +     '<div class="d-flex gap-2 mb-2">'
                +         '<button class="btn-action" onclick="window.editCrop(' + idx + ')"><span class="icon">crop</span> ' + STRINGS.editCrop + '</button>'
                +         '<button class="btn-action" onclick="window.startReplace(' + idx + ')"><span class="icon">folder_open</span> ' + STRINGS.replace + '</button>'
                +     '</div>'
                +     '<div class="meta-box">'
                +         '<div class="meta-item"><span class="meta-label">' + STRINGS.dimensions + '</span><span class="meta-value">' + item.currentW + 'x' + item.currentH + ' px</span></div>'
                +         '<div class="meta-item"><span class="meta-label">' + STRINGS.targetWeight + '</span><span class="meta-highlight">&lt; ' + item.assetSpec.targetKB + ' KB</span></div>'
                +         (item.assetSpec.fl ? '<div class="meta-item"><span class="meta-label">' + STRINGS.focus + '</span><span class="meta-value">' + item.assetSpec.fl + '</span></div>' : "")
                +         ozHtml
                +     '</div>'
                +     '<div class="filename-pill">' + fname + '</div>'
                + '</div>'
                + '</div>';
            setTimeout(() => col.querySelector(".canvas-preview").appendChild(cvs), 0);
        }
        dom.grid.appendChild(col);
    });
}

async function generatePsd(item) {
    if (typeof window.writePsd !== "function") return null;
    var spec = item.assetSpec;
    var w = spec.d ? item.currentW * 2 : item.currentW;
    var h = spec.d ? item.currentH * 2 : item.currentH;
    var s = spec.d ? 2 : 1;
    var src = item.customImg || STATE.img;

    var sx = w / item.crop.width;
    var sy = h / item.crop.height;
    var layerW = Math.round(src.width * sx);
    var layerH = Math.round(src.height * sy);
    var layerLeft = Math.round(-item.crop.x * sx);
    var layerTop = Math.round(-item.crop.y * sy);

    var cropCvs = document.createElement("canvas");
    cropCvs.width = layerW;
    cropCvs.height = layerH;
    var cropCtx = cropCvs.getContext("2d");
    cropCtx.imageSmoothingEnabled = true;
    cropCtx.imageSmoothingQuality = "high";
    cropCtx.drawImage(src, 0, 0, layerW, layerH);

    var cropLeft = layerLeft;
    var cropTop = layerTop;

    if (item.maskCircle) {
        var mcCvs = document.createElement("canvas");
        mcCvs.width = w; mcCvs.height = h;
        var mcCtx = mcCvs.getContext("2d");
        mcCtx.imageSmoothingEnabled = true;
        mcCtx.imageSmoothingQuality = "high";
        mcCtx.drawImage(src, item.crop.x, item.crop.y, item.crop.width, item.crop.height, 0, 0, w, h);
        var tmpCvs = document.createElement("canvas");
        tmpCvs.width = w; tmpCvs.height = h;
        var tmpCtx = tmpCvs.getContext("2d");
        tmpCtx.beginPath();
        tmpCtx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, 2 * Math.PI);
        tmpCtx.clip();
        tmpCtx.drawImage(mcCvs, 0, 0);
        cropCvs = tmpCvs;
        cropLeft = 0;
        cropTop = 0;
    }

    var srcCvs = document.createElement("canvas");
    srcCvs.width = src.width;
    srcCvs.height = src.height;
    var srcCtx = srcCvs.getContext("2d");
    srcCtx.drawImage(src, 0, 0);

    var ozCvs = document.createElement("canvas");
    ozCvs.width = w; ozCvs.height = h;
    var ozCtx = ozCvs.getContext("2d");
    var hasOverlay = false;

    if (spec.f) {
        hasOverlay = true;
        var fY = spec.f.y, fH = spec.f.h;
        var deltaH = item.currentH - spec.h;
        if (deltaH > 0 && spec.controlH) {
            var comp = SITE_CONFIG[STATE.site].components[STATE.comp];
            var activeVar = comp.variants ? comp.variants.find(function(v) { return v.id === STATE.variant; }) : null;
            var initF = activeVar ? activeVar.initialFocus : null;
            if (initF === "center") fY += deltaH / 2;
            else if (initF === "bottom") fY += deltaH;
        }
        ozCtx.fillStyle = "rgba(34,197,94,0.15)";
        ozCtx.strokeStyle = "#22C55E";
        ozCtx.lineWidth = 2 * s;
        ozCtx.fillRect(spec.f.x * s, fY * s, spec.f.w * s, fH * s);
        ozCtx.strokeRect(spec.f.x * s, fY * s, spec.f.w * s, fH * s);
        ozCtx.font = "bold " + (11 * s) + "px Inter, sans-serif";
        ozCtx.fillStyle = "#22C55E";
        ozCtx.fillText("Area Focus", (spec.f.x + 6) * s, (fY + 16) * s);
    }

    if (spec.oz && spec.oz.length > 0) {
        hasOverlay = true;
        var pal = {
            text:  { fill: "rgba(245,158,11,0.15)", stroke: "#F59E0B" },
            badge: { fill: "rgba(239,68,68,0.15)",  stroke: "#EF4444" }
        };
        spec.oz.forEach(function(zone) {
            var c = pal[zone.t] || pal.text;
            ozCtx.fillStyle = c.fill;
            ozCtx.strokeStyle = c.stroke;
            ozCtx.lineWidth = 2 * s;
            ozCtx.setLineDash([6 * s, 4 * s]);
            ozCtx.fillRect(zone.x * s, zone.y * s, zone.w * s, zone.h * s);
            ozCtx.strokeRect(zone.x * s, zone.y * s, zone.w * s, zone.h * s);
            ozCtx.setLineDash([]);
            ozCtx.font = "bold " + (11 * s) + "px Inter, sans-serif";
            ozCtx.fillStyle = c.stroke;
            ozCtx.fillText(zone.l, (zone.x + 6) * s, (zone.y + zone.h - 8) * s);
        });
    }

    var children = [];
    if (hasOverlay) {
        children.push({ name: "Overlay", canvas: ozCvs, hidden: true });
    }
    children.push({ name: "Ritaglio", canvas: cropCvs, left: cropLeft, top: cropTop });
    children.push({ name: "Sorgente", canvas: srcCvs, left: 0, top: 0, hidden: true });

    var compCvs = document.createElement("canvas");
    compCvs.width = w; compCvs.height = h;
    var compCtx = compCvs.getContext("2d");
    compCtx.imageSmoothingEnabled = true;
    compCtx.imageSmoothingQuality = "high";
    compCtx.drawImage(src, item.crop.x, item.crop.y, item.crop.width, item.crop.height, 0, 0, w, h);
    if (item.maskCircle) {
        var mcComp = document.createElement("canvas");
        mcComp.width = w; mcComp.height = h;
        var mcCompCtx = mcComp.getContext("2d");
        mcCompCtx.beginPath();
        mcCompCtx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, 2 * Math.PI);
        mcCompCtx.clip();
        mcCompCtx.drawImage(compCvs, 0, 0);
        compCvs = mcComp;
    }

    try {
        return window.writePsd({ width: w, height: h, canvas: compCvs, children: children });
    } catch (e) {
        console.warn("PSD generation failed:", e);
        return null;
    }
}

async function downloadZip() {
    showLoader(true, STRINGS.zipping);
    const zip = new JSZip();
    let zipSuffix =
        STATE.items.find((c) => c.type === "svg")?.svg.theme === "light"
            ? "_onLight"
            : STATE.items.find((c) => c.type === "svg")?.svg.theme === "dark"
              ? "_onDark"
              : "";
    let zipFolderName = (SITE_CONFIG[STATE.site].components[STATE.comp].filenamePrefix || STATE.comp) + "_" + (STATE.slug || "export") + zipSuffix;
    const folder = zip.folder(zipFolderName);

    for (let item of STATE.items) {
        const fname = getFilename(item);
        if (item.type === "svg") {
            const stops = item.svg.colors
                .map(
                    (c, i) =>
                        '<stop offset="' + Math.round((i / (item.svg.colors.length - 1)) * 100) + '%" stop-color="' + c + '"/>'
                )
                .join("");
            let svg =
                item.svg.colors.length === 1
                    ? '<svg xmlns="http://www.w3.org/2000/svg" width="' + item.assetSpec.w + '" height="' + item.assetSpec.h + '" viewBox="0 0 ' + item.assetSpec.w + ' ' + item.assetSpec.h + '"><rect width="100%" height="100%" fill="' + item.svg.colors[0] + '"/></svg>'
                    : '<svg xmlns="http://www.w3.org/2000/svg" width="' + item.assetSpec.w + '" height="' + item.assetSpec.h + '" viewBox="0 0 ' + item.assetSpec.w + ' ' + item.assetSpec.h + '"><defs><linearGradient id="g" x1="0%" y1="0%" x2="0%" y2="100%">' + stops + '</linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>';
            folder.file(fname, new Blob([svg], { type: "image/svg+xml" }));
        } else {
            const w = item.assetSpec.d ? item.currentW * 2 : item.currentW;
            const h = item.assetSpec.d ? item.currentH * 2 : item.currentH;

            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(
                item.customImg || STATE.img,
                item.crop.x, item.crop.y, item.crop.width, item.crop.height,
                0, 0, w, h
            );

            if (item.maskCircle) {
                const mC = document.createElement("canvas");
                mC.width = w;
                mC.height = h;
                const mCtx = mC.getContext("2d");
                mCtx.beginPath();
                mCtx.arc(w / 2, h / 2, w / 2, 0, 2 * Math.PI);
                mCtx.clip();
                mCtx.drawImage(canvas, 0, 0);
                folder.file(fname, await compressToTarget(mC, item.assetSpec.targetKB || 200));
            } else {
                folder.file(fname, await compressToTarget(canvas, item.assetSpec.targetKB || 200));
            }

            if (STATE.exportPsd) {
                const psdBuf = await generatePsd(item);
                if (psdBuf) {
                    folder.file(fname.replace(/\\.webp$/, ".psd"), psdBuf);
                }
            }
        }
    }
    zip.generateAsync({ type: "blob" }).then((c) => {
        saveAs(c, zipFolderName + ".zip");
        showLoader(false);
    });
}

function canvasToBlob(canvas, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, "image/webp", quality));
}

async function compressToTarget(canvas, maxKB) {
    let q = 0.9;
    let blob = await canvasToBlob(canvas, q);
    while (blob.size > maxKB * 1024 && q > 0.1) {
        q -= 0.05;
        blob = await canvasToBlob(canvas, Math.round(q * 100) / 100);
    }
    return blob;
}

async function loadPsdLib() {
    if (window.writePsd && window.readPsd) return true;
    try {
        var mod = await import("https://cdn.jsdelivr.net/npm/ag-psd/+esm");
        if (mod.initializeCanvas) {
            mod.initializeCanvas(function(w, h) {
                var c = document.createElement("canvas");
                c.width = w; c.height = h;
                return c;
            });
        }
        window.writePsd = mod.writePsd;
        window.readPsd = mod.readPsd;
        console.log("ag-psd loaded successfully");
        return true;
    } catch(e) {
        console.error("Failed to load ag-psd:", e);
        return false;
    }
}

function fileToDataUrl(file, callback) {
    var isPsd = file.name && file.name.toLowerCase().endsWith(".psd");
    window._lastPsdInfo = null;
    if (isPsd) {
        loadPsdLib().then(function(ok) {
            if (!ok) { callback(null); return; }
            file.arrayBuffer().then(function(buf) {
                try {
                    var psd = window.readPsd(new Uint8Array(buf));
                    if (psd.canvas) {
                        window._lastPsdInfo = {
                            layers: (psd.children || []).map(function(c) { return c.name || ""; }),
                            width: psd.width,
                            height: psd.height
                        };
                        callback(psd.canvas.toDataURL("image/png"));
                    } else {
                        console.error("PSD has no composite canvas");
                        callback(null);
                    }
                } catch(e) {
                    console.error("PSD parse error:", e);
                    callback(null);
                }
            });
        });
    } else {
        var reader = new FileReader();
        reader.onload = function(e) { callback(e.target.result); };
        reader.readAsDataURL(file);
    }
}
`;