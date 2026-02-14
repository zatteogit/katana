export const dataJsCode = `/**
 * ============================================================================
 * FILE: data.js
 * DESCRIZIONE: Configuration Layer
 *
 * Questo file funge da database statico per l'applicazione.
 * Contiene:
 * 1. STRINGS: Le etichette di testo per l'interfaccia (simil-i18n).
 * 2. SITE_CONFIG: Le specifiche tecniche per il ritaglio e l'export.
 *
 * NOTA ARCHITETTURALE:
 * I dati sono inclusi in un file .js invece che .json per permettere
 * l'esecuzione offline (aprendo index.html direttamente dal file system)
 * evitando errori di CORS (Cross-Origin Resource Sharing).
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/* 1. LOCALIZZAZIONE (STRINGS)                                                */
/* Dizionario chiave-valore per tutti i testi visibili nella UI.              */
/* -------------------------------------------------------------------------- */
const STRINGS = {
    appTitle: "Katana",
    versionTag: "v3.0 Stable",
    site: "Canale",
    processing: "Elaborazione...",
    zipping: "Creazione pacchetto",
    assetAnalysis: "Analisi asset",
    safariAlert: "Safari non è preciso. Dacci un taglio e usa Chrome.",
    newProject: "Nuovo Progetto",
    projectName: "Nome Progetto",
    exampleSlug: "es. promo-giappone",
    uiComponent: "Componente UI",
    variant: "Variante",
    noVariant: "Default",
    expectedAssets: "Asset previsti",
    uploadMaster: "Carica la prima immagine",
    dragOrClick: "Trascina qui o clicca per caricare (JPG, PNG, PSD...)",
    workspaceTitle: "Spazio di lavoro",
    reviewCuts: "Revisiona i tagli e scarica il pacchetto completo.",
    newButton: "Nuovo",
    downloadPackage: "Scarica pacchetto",
    editCrop: "Taglia",
    replace: "Sostituisci",
    add: "Aggiungi",
    modalHintGeneral: "Regola il taglio in modo da includere correttamente il soggetto.",
    modalHintFocus: "Ricorda: il soggetto deve rientrare nel riquadro di focus.",
    modalHintCircle: "Puoi mascherare l'immagine nel cerchio.",
    modalHintOz: "Le aree colorate indicano dove l'UI copre l'immagine. Evita di posizionare il soggetto sotto.",
    circleMaskToggle: "Taglia fuori dal cerchio",
    cancel: "Annulla",
    apply: "Applica",
    width: "Larghezza",
    height: "Altezza",
    zoom: "Zoom",
    fixButton: "Aumenta contrasto",
    themeLight: "on light",
    themeDark: "on dark",
    focusArea: "Area Focus",
    overlayZones: "Zone coperte",
    ozText: "Area Testi",
    ozBadge: "Area Loghi",
    dimensions: "Dimensioni @1x",
    targetWeight: "Peso target",
    focus: "Focus",
    labelImage: "Immagine",
    labelPalette: "Palette",
    svgTextPreview: "Anteprima testo",
    svgCtaPreview: "Button",
    iconImage: "image",
    iconPalette: "palette",
    psdToggleLabel: "Includi PSD con layer (sorgente + overlay)",
    psdLoading: "Caricamento libreria PSD...",
    psdReady: "PSD pronto",
    psdFail: "Libreria PSD non disponibile",
    psdGenerating: "Generazione PSD...",
    detectTitle: "Asset riconosciuto automaticamente",
    detectChannel: "Canale",
    detectComponent: "Componente",
    detectVariant: "Variante",
    detectSlug: "Progetto",
    detectConfirm: "Vuoi selezionare automaticamente questo componente?"
};

/* -------------------------------------------------------------------------- */
/* 2. CONFIGURAZIONE SITI E ASSET (SITE_CONFIG)                               */
/* */
/* Struttura Gerarchica:                                                      */
/* Site -> Components -> Variants -> Assets                                   */
/* */
/* LEGENDA CHIAVI ASSET:                                                      */
/* - type:      "img" (raster) o "svg" (vettoriale/palette)                   */
/* - w, h:      Dimensioni base di output (@1x) in pixel                      */
/* - d:         Boolean. Se true, esporta anche versione retina (@2x)         */
/* - targetKB:  Peso massimo desiderato in KB (per compressione WebP)         */
/* - fl:        (Focus Label) Etichetta descrittiva punto di interesse        */
/* - f:         (Focus Area) Coordinate {x,y,w,h} per overlay guida in crop   */
/* - m:         "circle" attiva la maschera di ritaglio circolare             */
/* - controlH:  Oggetto {min, max, step} per asset ad altezza variabile       */
/* - oz:        (Overlay Zones) Array di zone di esclusione per il crop.      */
/*              Indica dove l'UI copre l'immagine (testo, loghi).             */
/*              Il soggetto NON dovrebbe trovarsi in queste zone.             */
/*              Formato: [{ t, l, x, y, w, h }]                              */
/*              t: "text" (Area Testi) | "badge" (Area Loghi)                 */
/*              l: label descrittiva (nomi da Figma)                          */
/*              x, y, w, h: coordinate in px @1x relative all'asset          */
/* -------------------------------------------------------------------------- */
const SITE_CONFIG = {
    posteit: {
        label: "Poste.it (Retail)",
        styleDefaults: {
            light: { text: "#1A1C1E", btnBg: "#0047BB", btnLabel: "#FFFFFF" },
            dark:  { text: "#FFFFFF", btnBg: "#FFFFFF", btnLabel: "#0047BB" }
        },
        components: {
            intro_concept_b: {
                label: "Intro Concept B",
                filenamePrefix: "conceptB",
                assets: [
                    { id: "soggettoLg", type: "img", label: "Desktop LG", w: 580, maxW: 940, h: 470, d: true, fl: "Alto Sx", f: { x: 0, y: 0, w: 404, h: 448 }, targetKB: 110 },
                    { id: "soggettoMd", type: "img", label: "Tablet MD", w: 580, h: 470, d: true, fl: "Alto Sx", f: { x: 0, y: 0, w: 394, h: 435 }, targetKB: 90 },
                    { id: "soggettoXs", type: "img", label: "Mobile XS", w: 767, h: 270, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 345, h: 243 }, targetKB: 55 },
                    { id: "background", type: "svg", label: "Background", w: 4096, h: 470 }
                ]
            },
            intro_concept_a: {
                label: "Intro Concept A",
                filenamePrefix: "conceptA",
                variants: [
                    {
                        id: "base", label: "Base",
                        assets: [
                            { id: "main", type: "img", label: "Unico", w: 526, h: 526, d: true, m: "circle", fl: "Alto Sx", f: { x: 45, y: 87, w: 377, h: 303 }, targetKB: 70 }
                        ]
                    },
                    {
                        id: "promo", label: "Promo (SM + XS)",
                        assets: [
                            { id: "soggettoSm", type: "img", label: "Desktop SM", w: 526, h: 526, d: true, m: "circle", fl: "Alto Sx", f: { x: 45, y: 87, w: 377, h: 303 }, targetKB: 70 },
                            { id: "soggettoXs", type: "img", label: "Mobile XS", w: 767, h: 270, d: true, f: { x: 212, y: 0, w: 345, h: 243 }, targetKB: 50 }
                        ]
                    }
                ]
            },
            card_trendy: {
                label: "Card Trendy",
                filenamePrefix: "cardTrendy",
                variants: [
                    {
                        id: "color", label: "Sfondo colore",
                        assets: [
                            { id: "soggetto", type: "img", label: "Soggetto", w: 520, h: 360, d: true, targetKB: 55 },
                            { id: "background", type: "svg", label: "Background", w: 1138, h: 1138 }
                        ]
                    },
                    {
                        id: "pic", label: "Sfondo immagine",
                        assets: [
                            { id: "soggetto", type: "img", label: "Soggetto", w: 520, h: 360, d: true, targetKB: 55 },
                            { id: "background", type: "img", label: "Background", w: 1138, h: 1138, d: false, fl: "Basso Sx", f: { x: 0, y: 778, w: 334, h: 360 }, targetKB: 120 }
                        ]
                    }
                ]
            },
            card_picture: {
                label: "Card Picture",
                filenamePrefix: "cardPicture",
                assets: [
                    { id: "orizzontale", type: "img", label: "Orizzontale", w: 556, h: 275, d: true, fl: "Centro Alto", f: { x: 50, y: 0, w: 456, h: 212 }, targetKB: 40 },
                    { id: "estesa", type: "img", label: "Estesa", w: 743, h: 195, d: true, fl: "Centro Alto", f: { x: 204, y: 0, w: 274, h: 185 }, targetKB: 55 },
                    { id: "verticale", type: "img", label: "Verticale", w: 160, h: 280, d: true, fl: "Alto Sx", f: { x: 5, y: 0, w: 150, h: 186 }, targetKB: 30 }
                ]
            },
            card_reactive: {
                label: "Card Reactive",
                filenamePrefix: "cardReactive",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 743, h: 360, d: true, targetKB: 65 }
                ]
            },
            card_comparison: {
                label: "Card Comparison",
                filenamePrefix: "cardComparison",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 743, h: 195, d: true, fl: "Centro", f: { x: 235, y: 0, w: 274, h: 195 }, targetKB: 55 }
                ]
            },
            card_detailed_bg: {
                label: "Card Detailed BG",
                filenamePrefix: "cardDetailedBG",
                variants: [
                    {
                        id: "focus-top", label: "Focus Verticale (Alto)", initialFocus: "top",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Centro", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 500, d: true, fl: "Centro", controlH: { min: 500, max: 800, step: 50 }, f: { x: 9, y: 0, w: 291, h: 258 }, targetKB: 60 }
                        ]
                    },
                    {
                        id: "focus-center", label: "Focus Verticale (Centro)", initialFocus: "center",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Centro", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 500, d: true, fl: "Centro", controlH: { min: 500, max: 800, step: 50 }, f: { x: 9, y: 121, w: 291, h: 258 }, targetKB: 60 }
                        ]
                    },
                    {
                        id: "focus-bottom", label: "Focus Verticale (Basso)", initialFocus: "bottom",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Centro", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 500, d: true, fl: "Centro", controlH: { min: 500, max: 800, step: 50 }, f: { x: 9, y: 242, w: 291, h: 258 }, targetKB: 60 }
                        ]
                    }
                ]
            },
            pills_showcase: {
                label: "Pills Showcase",
                filenamePrefix: "pillsShowcase",
                variants: [
                    {
                        id: "focus-top", label: "Focus Verticale Alto", initialFocus: "top",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 650, d: true, fl: "Alto Cx", controlH: { min: 650, max: 1200, step: 50 }, f: { x: 16, y: 0, w: 278, h: 270 }, targetKB: 70 }
                        ]
                    },
                    {
                        id: "focus-center", label: "Focus Verticale Centro", initialFocus: "center",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 650, d: true, fl: "Alto Cx", controlH: { min: 650, max: 1200, step: 50 }, f: { x: 16, y: 190, w: 278, h: 270 }, targetKB: 70 }
                        ]
                    },
                    {
                        id: "focus-bottom", label: "Focus Verticale Basso", initialFocus: "bottom",
                        assets: [
                            { id: "estesa", type: "img", label: "Estesa", w: 743, h: 285, d: true, fl: "Alto Cx", f: { x: 204, y: 0, w: 334, h: 275 }, targetKB: 65 },
                            { id: "verticale", type: "img", label: "Verticale", w: 310, h: 650, d: true, fl: "Alto Cx", controlH: { min: 650, max: 1200, step: 50 }, f: { x: 16, y: 380, w: 278, h: 270 }, targetKB: 70 }
                        ]
                    }
                ]
            },
            banner_campaign_alfa: {
                label: "Banner Campaign Alfa",
                filenamePrefix: "bannerCampaignAlfa",
                assets: [
                    { id: "estesa", type: "img", label: "Estesa", w: 743, h: 360, d: true, targetKB: 70 },
                    { id: "orizzontale", type: "img", label: "Orizzontale", w: 520, h: 360, d: true, fl: "Centro", f: { x: 85, y: 0, w: 350, h: 360 }, targetKB: 50 }
                ]
            }
        }
    },
    corporate: {
        label: "Corporate",
        styleDefaults: {
            light: { text: "#1A1C1E", btnBg: "#0047BB", btnLabel: "#FFFFFF" },
            dark:  { text: "#FFFFFF", btnBg: "#FFFFFF", btnLabel: "#000000" }
        },
        components: {
            visual: {
                label: "Visual",
                filenamePrefix: "visual",
                variants: [
                    {
                        id: "minimal",
                        label: "Mode Minimal (Full Width)",
                        assets: [
                            { id: "desktop", type: "img", label: "Desktop (XL)", w: 1728, h: 400, d: false, fl: "Centro", f: { x: 630, y: 79, w: 469, h: 242 }, targetKB: 150 },
                            { id: "tablet",  type: "img", label: "Tablet (MD)",  w: 992,  h: 400, d: false, targetKB: 90 },
                            { id: "mobile",  type: "img", label: "Mobile (XS)",  w: 768,  h: 400, d: false, targetKB: 70 }
                        ]
                    },
                    {
                        id: "multi",
                        label: "Mode Multi (Grid)",
                        assets: [
                            { id: "col-6",  type: "img", label: "Colonna 1/2 (Tablet/Desktop)", w: 864, h: 400, d: true, fl: "Centro", f: { x: 265, y: 0, w: 334, h: 400 }, targetKB: 85 },
                            { id: "col-4",  type: "img", label: "Colonna 1/3 (Desktop XL)",     w: 460, h: 400, d: true, fl: "Centro", targetKB: 65 },
                            { id: "mobile", type: "img", label: "Mobile Stacked (XS)",          w: 768, h: 400, d: false, fl: "Centro", targetKB: 70 }
                        ]
                    }
                ]
            },
            card_simple_reactive: {
                label: "Card Simple - Reactive",
                filenamePrefix: "cardSimpleReactive",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 636, h: 358, d: true, targetKB: 70 }
                ]
            },
            card_picture_corp: {
                label: "Card Picture Corporate",
                filenamePrefix: "cardPicture",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 636, h: 315, d: true, fl: "Centro", f: { x: 130, y: 0, w: 376, h: 315 }, targetKB: 60 }
                ]
            },
            card_portrait: {
                label: "Card Portrait",
                filenamePrefix: "cardPortrait",
                variants: [
                    {
                        id: "ratio-2x3", label: "Ratio 2:3",
                        assets: [{ id: "main", type: "img", label: "Unico", w: 400, h: 600, d: false, fl: "Alto", f: { x: 0, y: 0, w: 400, h: 452 }, targetKB: 95 }]
                    },
                    {
                        id: "ratio-4x5", label: "Ratio 4:5",
                        assets: [{ id: "main", type: "img", label: "Unico", w: 400, h: 500, d: false, fl: "Alto", f: { x: 0, y: 0, w: 400, h: 341 }, targetKB: 90 }]
                    },
                    {
                        id: "ratio-9x10", label: "Ratio 9:10",
                        assets: [{ id: "main", type: "img", label: "Unico", w: 450, h: 500, d: false, fl: "Alto", f: { x: 0, y: 0, w: 450, h: 324 }, targetKB: 90 }]
                    }
                ]
            },
            masonry: {
                label: "Masonry Grid",
                filenamePrefix: "masonry",
                variants: [
                    { id: "1-1",  label: "Ratio 1:1",  assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 518, d: true, targetKB: 60 }] },
                    { id: "4-3",  label: "Ratio 4:3",  assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 388, d: true, targetKB: 55 }] },
                    { id: "3-4",  label: "Ratio 3:4",  assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 690, d: true, targetKB: 65 }] },
                    { id: "16-9", label: "Ratio 16:9", assets: [{ id: "main", type: "img", label: "Unico", w: 518, h: 291, d: true, targetKB: 50 }] }
                ]
            },
            module: {
                label: "Modules (Intro & Display)",
                filenamePrefix: "module",
                variants: [
                    {
                        id: "Boxed", label: "Concept Boxed",
                        assets: [
                            { id: "desktop", type: "img", label: "Desktop (LG+)", w: 912, h: 390, d: true, fl: "Sinistra", f: { x: 0, y: 0, w: 653, h: 390 }, targetKB: 90 },
                            { id: "tablet",  type: "img", label: "Tablet (MD)",   w: 720, h: 309, d: true, targetKB: 70 },
                            { id: "mobile",  type: "img", label: "Mobile (XS)",   w: 535, h: 309, d: true, targetKB: 55 }
                        ]
                    },
                    {
                        id: "Photo", label: "Concept Photo (Display)",
                        assets: [
                            {
                                id: "desktop", type: "img", label: "Desktop (LG+)", w: 2000, h: 400, d: true,
                                fl: "Destra", f: { x: 936, y: 0, w: 552, h: 400 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 338,  y: 0,   w: 598, h: 400 },
                                    { t: "badge", l: "Area Loghi",  x: 1205, y: 272, w: 408, h: 108 }
                                ],
                                targetKB: 150
                            },
                            {
                                id: "tablet", type: "img", label: "Tablet (MD)", w: 991, h: 400, d: true,
                                fl: "Destra", f: { x: 449, y: 0, w: 418, h: 400 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 125, y: 0,   w: 324, h: 400 },
                                    { t: "badge", l: "Area Loghi",  x: 498, y: 299, w: 320, h: 86 }
                                ],
                                targetKB: 90
                            },
                            {
                                id: "mobile", type: "img", label: "Mobile (XS)", w: 768, h: 300, d: true,
                                fl: "Centro", f: { x: 178, y: 0, w: 400, h: 300 },
                                oz: [
                                    { t: "badge", l: "Area Loghi", x: 0, y: 203, w: 768, h: 92 }
                                ],
                                targetKB: 60
                            }
                        ]
                    },
                    {
                        id: "PhotoAlto", label: "Concept Photo Alto (Intro)",
                        assets: [
                            {
                                id: "desktop", type: "img", label: "Desktop (LG+)", w: 2000, h: 470, d: true,
                                fl: "Destra", f: { x: 936, y: 0, w: 552, h: 470 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 338,  y: 0,   w: 598, h: 470 },
                                    { t: "badge", l: "Area Loghi",  x: 1205, y: 307, w: 408, h: 108 }
                                ],
                                targetKB: 150
                            },
                            {
                                id: "tablet", type: "img", label: "Tablet (MD)", w: 991, h: 470, d: true,
                                fl: "Destra", f: { x: 446, y: 0, w: 418, h: 470 },
                                oz: [
                                    { t: "text",  l: "Area Testi",  x: 122, y: 0,   w: 324, h: 470 },
                                    { t: "badge", l: "Area Loghi",  x: 495, y: 358, w: 320, h: 92 }
                                ],
                                targetKB: 90
                            },
                            {
                                id: "mobile", type: "img", label: "Mobile (XS)", w: 768, h: 300, d: true,
                                fl: "Centro", f: { x: 178, y: 0, w: 400, h: 300 },
                                oz: [
                                    { t: "badge", l: "Area Loghi", x: 0, y: 203, w: 768, h: 92 }
                                ],
                                targetKB: 60
                            }
                        ]
                    }
                ]
            },
            content_evidence: {
                label: "Content Evidence",
                filenamePrefix: "contentEvidence",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 696, h: 358, d: true, targetKB: 70 }
                ]
            },
            box_rack_badge: {
                label: "Box Rack Badge Loghi",
                filenamePrefix: "boxRackBadge",
                assets: [
                    { id: "main", type: "img", label: "Unica", w: 604, h: 139, d: false, targetKB: 30 }
                ]
            }
        }
    },
    social: {
        label: "Social Media Kit",
        styleDefaults: {
            light: { text: "#000000", btnBg: "#1D9BF0", btnLabel: "#FFFFFF" },
            dark:  { text: "#FFFFFF", btnBg: "#FFFFFF", btnLabel: "#000000" }
        },
        components: {
            instagram: {
                label: "Instagram",
                filenamePrefix: "ig",
                variants: [
                    {
                        id: "feed", label: "Feed Posts",
                        assets: [
                            { id: "portrait", type: "img", label: "Portrait (4:5) - Best Visibility", w: 1080, h: 1350, d: false, fl: "Centro", targetKB: 250 },
                            { id: "square", type: "img", label: "Square (1:1)", w: 1080, h: 1080, d: false, fl: "Centro", targetKB: 200 }
                        ]
                    },
                    {
                        id: "stories", label: "Stories & Reels Cover",
                        assets: [
                            { id: "story", type: "img", label: "Story (9:16)", w: 1080, h: 1920, d: false, fl: "Centro", targetKB: 300 }
                        ]
                    }
                ]
            },
            linkedin: {
                label: "LinkedIn",
                filenamePrefix: "li",
                assets: [
                    { id: "post-landscape", type: "img", label: "Post Landscape / Link (1.91:1)", w: 1200, h: 627, d: false, fl: "Centro", targetKB: 200 },
                    { id: "post-square", type: "img", label: "Post Square (1:1)", w: 1200, h: 1200, d: false, fl: "Centro", targetKB: 250 }
                ]
            },
            facebook: {
                label: "Facebook",
                filenamePrefix: "fb",
                assets: [
                    { id: "post-landscape", type: "img", label: "Post Landscape (1.91:1)", w: 1200, h: 630, d: false, fl: "Centro", targetKB: 200 },
                    { id: "story", type: "img", label: "Story (9:16)", w: 1080, h: 1920, d: false, fl: "Centro", targetKB: 300 }
                ]
            },
            youtube: {
                label: "YouTube",
                filenamePrefix: "yt",
                assets: [
                    { id: "thumbnail", type: "img", label: "Thumbnail Video (16:9)", w: 1280, h: 720, d: false, fl: "Centro", targetKB: 200 }
                ]
            },
            x_twitter: {
                label: "X (Twitter)",
                filenamePrefix: "x",
                assets: [
                    { id: "post", type: "img", label: "In-Stream Post (16:9)", w: 1600, h: 900, d: false, fl: "Centro", targetKB: 250 }
                ]
            }
        }
    }
};
`;