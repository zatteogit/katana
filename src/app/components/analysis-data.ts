/**
 * Dati di analisi estratti dai frame Figma importati.
 * Ogni entry rappresenta un frame Figma mappato (o non mappato) a un asset nella SITE_CONFIG corporate.
 */

export type Status =
  | "ok"
  | "mismatch"
  | "new_component"
  | "new_variant"
  | "focus_add";

export interface FocusArea {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * Overlay Zone — zona di esclusione per il crop.
 * Indica dove l'UI copre l'immagine (testo, loghi, ecc.)
 * e dove NON posizionare il soggetto.
 *
 * t: tipo ("text" = Area Testi, "badge" = Area Loghi)
 * l: label descrittiva (come da Figma)
 * x, y, w, h: coordinate assolute rispetto all'asset
 */
export interface OverlayZone {
  t: "text" | "badge";
  l: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AnalysisEntry {
  figmaFrame: string;
  figmaW: number;
  figmaH: number;
  figmaFocus: FocusArea | null;
  figmaOverlays: OverlayZone[];
  configComponent: string | null;
  configComponentKey: string | null;
  configVariant: string | null;
  configVariantId: string | null;
  configAssetLabel: string | null;
  configAssetId: string | null;
  configW: number | null;
  configH: number | null;
  configFocus: FocusArea | null;
  status: Status;
  changes: string[];
}

export const analysisEntries: AnalysisEntry[] = [
  // =============================================
  // MODULE - CONCEPT PHOTO (Display)
  // =============================================
  {
    figmaFrame: "CorpModuleDisplay-S-Nome",
    figmaW: 768,
    figmaH: 300,
    figmaFocus: { x: 178, y: 0, w: 400, h: 300 },
    figmaOverlays: [
      {
        t: "badge",
        l: "Area Loghi",
        x: 0,
        y: 203,
        w: 768,
        h: 92,
      },
    ],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Photo",
    configVariantId: "Photo",
    configAssetLabel: "Mobile (XS)",
    configAssetId: "mobile",
    configW: 768,
    configH: 300,
    configFocus: null,
    status: "focus_add",
    changes: [
      "Aggiungere f: {x:178, y:0, w:400, h:300}",
      "Aggiungere oz: badge Area Loghi {x:0, y:203, w:768, h:92}",
    ],
  },
  {
    figmaFrame: "CorpModuleDisplay-M-Nome",
    figmaW: 991,
    figmaH: 400,
    figmaFocus: { x: 449, y: 0, w: 418, h: 400 },
    figmaOverlays: [
      {
        t: "text",
        l: "Area Testi",
        x: 125,
        y: 0,
        w: 324,
        h: 400,
      },
      {
        t: "badge",
        l: "Area Loghi",
        x: 498,
        y: 299,
        w: 320,
        h: 86,
      },
    ],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Photo",
    configVariantId: "Photo",
    configAssetLabel: "Tablet (MD)",
    configAssetId: "tablet",
    configW: 991,
    configH: 400,
    configFocus: null,
    status: "focus_add",
    changes: [
      "Aggiungere f: {x:449, y:0, w:418, h:400}",
      "Aggiungere oz: text Area Testi {x:125, y:0, w:324, h:400}",
      "Aggiungere oz: badge Area Loghi {x:498, y:299, w:320, h:86}",
    ],
  },
  {
    figmaFrame: "CorpModuleDisplay-L-Nome",
    figmaW: 2000,
    figmaH: 400,
    figmaFocus: { x: 936, y: 0, w: 552, h: 400 },
    figmaOverlays: [
      {
        t: "text",
        l: "Area Testi",
        x: 338,
        y: 0,
        w: 598,
        h: 400,
      },
      {
        t: "badge",
        l: "Area Loghi",
        x: 1205,
        y: 272,
        w: 408,
        h: 108,
      },
    ],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Photo",
    configVariantId: "Photo",
    configAssetLabel: "Desktop (LG+)",
    configAssetId: "desktop",
    configW: 2000,
    configH: 400,
    configFocus: null,
    status: "focus_add",
    changes: [
      "Aggiungere f: {x:936, y:0, w:552, h:400}",
      "Aggiungere oz: text Area Testi {x:338, y:0, w:598, h:400}",
      "Aggiungere oz: badge Area Loghi {x:1205, y:272, w:408, h:108}",
    ],
  },

  // =============================================
  // MODULE - INTRO PHOTO "ALTO" (variante taller)
  // =============================================
  {
    figmaFrame: "CorpIntroPhoto-S-Nome",
    figmaW: 768,
    figmaH: 300,
    figmaFocus: { x: 178, y: 0, w: 400, h: 300 },
    figmaOverlays: [
      {
        t: "badge",
        l: "Area Loghi",
        x: 0,
        y: 203,
        w: 768,
        h: 92,
      },
    ],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Photo",
    configVariantId: "Photo",
    configAssetLabel: "Mobile (XS)",
    configAssetId: "mobile",
    configW: 768,
    configH: 300,
    configFocus: null,
    status: "ok",
    changes: ["Mobile identico a Display-S (768\u00d7300)"],
  },
  {
    figmaFrame: "CorpModuleIntroPhoto-M-NomeFileALTO",
    figmaW: 991,
    figmaH: 470,
    figmaFocus: { x: 446, y: 0, w: 418, h: 470 },
    figmaOverlays: [
      {
        t: "text",
        l: "Area Testi",
        x: 122,
        y: 0,
        w: 324,
        h: 470,
      },
      {
        t: "badge",
        l: "Area Loghi",
        x: 495,
        y: 358,
        w: 320,
        h: 92,
      },
    ],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Photo",
    configVariantId: "Photo",
    configAssetLabel: "Tablet (MD)",
    configAssetId: "tablet",
    configW: 991,
    configH: 400,
    configFocus: null,
    status: "mismatch",
    changes: [
      "h: 400 \u2192 470 (variante ALTO, +70px)",
      "Aggiungere f: {x:446, y:0, w:418, h:470}",
      "Aggiungere oz: text Area Testi {x:122, y:0, w:324, h:470}",
      "Aggiungere oz: badge Area Loghi {x:495, y:358, w:320, h:92}",
    ],
  },
  {
    figmaFrame: "CorpModuleIntroPhoto-L-NomeFileALTO@2x",
    figmaW: 2000,
    figmaH: 470,
    figmaFocus: { x: 936, y: 0, w: 552, h: 470 },
    figmaOverlays: [
      {
        t: "text",
        l: "Area Testi",
        x: 338,
        y: 0,
        w: 598,
        h: 470,
      },
      {
        t: "badge",
        l: "Area Loghi",
        x: 1205,
        y: 307,
        w: 408,
        h: 108,
      },
    ],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Photo",
    configVariantId: "Photo",
    configAssetLabel: "Desktop (LG+)",
    configAssetId: "desktop",
    configW: 2000,
    configH: 400,
    configFocus: null,
    status: "mismatch",
    changes: [
      "h: 400 \u2192 470 (variante ALTO, +70px)",
      "Aggiungere f: {x:936, y:0, w:552, h:470}",
      "Aggiungere oz: text Area Testi {x:338, y:0, w:598, h:470}",
      "Aggiungere oz: badge Area Loghi {x:1205, y:307, w:408, h:108}",
    ],
  },

  // =============================================
  // MODULE - CONCEPT BOXED
  // =============================================
  {
    figmaFrame: "CorpModuleIntroBox-S-nome (Mobile)",
    figmaW: 535,
    figmaH: 309,
    figmaFocus: null,
    figmaOverlays: [],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Boxed",
    configVariantId: "Boxed",
    configAssetLabel: "Mobile (XS)",
    configAssetId: "mobile",
    configW: 575,
    configH: 309,
    configFocus: null,
    status: "mismatch",
    changes: ["w: 575 \u2192 535 (\u221240px)"],
  },
  {
    figmaFrame: "CorpModuleIntroBox-S-nome (Tablet)",
    figmaW: 720,
    figmaH: 309,
    figmaFocus: null,
    figmaOverlays: [],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Boxed",
    configVariantId: "Boxed",
    configAssetLabel: "Tablet (MD)",
    configAssetId: "tablet",
    configW: 720,
    configH: 309,
    configFocus: null,
    status: "ok",
    changes: [],
  },
  {
    figmaFrame: "CorpModuleIntroBox-L-nome",
    figmaW: 912,
    figmaH: 390,
    figmaFocus: { x: 0, y: 0, w: 653, h: 390 },
    figmaOverlays: [],
    configComponent: "Modules (Intro & Display)",
    configComponentKey: "module",
    configVariant: "Concept Boxed",
    configVariantId: "Boxed",
    configAssetLabel: "Desktop (LG+)",
    configAssetId: "desktop",
    configW: 912,
    configH: 390,
    configFocus: null,
    status: "focus_add",
    changes: [
      "Aggiungere f: {x:0, y:0, w:653, h:390}",
      'Aggiungere fl: "Sinistra"',
    ],
  },

  // =============================================
  // VISUAL - MINIMAL
  // =============================================
  {
    figmaFrame: "CorpVisualMinimal-nome-",
    figmaW: 1728,
    figmaH: 400,
    figmaFocus: { x: 630, y: 79, w: 469, h: 242 },
    figmaOverlays: [],
    configComponent: "Visual",
    configComponentKey: "visual",
    configVariant: "Mode Minimal (Full Width)",
    configVariantId: "minimal",
    configAssetLabel: "Desktop (XL)",
    configAssetId: "desktop",
    configW: 2000,
    configH: 400,
    configFocus: null,
    status: "mismatch",
    changes: [
      "w: 2000 \u2192 1728 (\u2212272px)",
      "Aggiungere f: {x:630, y:79, w:469, h:242}",
      'Aggiungere fl: "Centro"',
    ],
  },

  // =============================================
  // VISUAL - MULTI
  // =============================================
  {
    figmaFrame: "CorpVisualMulti-nome-",
    figmaW: 864,
    figmaH: 400,
    figmaFocus: { x: 265, y: 0, w: 334, h: 400 },
    figmaOverlays: [],
    configComponent: "Visual",
    configComponentKey: "visual",
    configVariant: "Mode Multi (Grid)",
    configVariantId: "multi",
    configAssetLabel: "Colonna 1/2 (Tablet/Desktop)",
    configAssetId: "col-6",
    configW: 700,
    configH: 400,
    configFocus: null,
    status: "mismatch",
    changes: [
      "w: 700 \u2192 864 (+164px) \u2014 verificare se il frame rappresenta col-6 o altro breakpoint",
      "Aggiungere f: {x:265, y:0, w:334, h:400}",
    ],
  },

  // =============================================
  // CARD SIMPLE REACTIVE
  // =============================================
  {
    figmaFrame: "CorpCardSimpleReactive-Nome-",
    figmaW: 636,
    figmaH: 358,
    figmaFocus: null,
    figmaOverlays: [],
    configComponent: "Card Simple - Reactive",
    configComponentKey: "card_simple_reactive",
    configVariant: null,
    configVariantId: null,
    configAssetLabel: "Unica",
    configAssetId: "main",
    configW: 636,
    configH: 358,
    configFocus: null,
    status: "ok",
    changes: [],
  },

  // =============================================
  // CARD PICTURE CORPORATE
  // =============================================
  {
    figmaFrame: "CorpCardPicture-nome-",
    figmaW: 636,
    figmaH: 315,
    figmaFocus: { x: 130, y: 0, w: 376, h: 315 },
    figmaOverlays: [],
    configComponent: "Card Picture Corporate",
    configComponentKey: "card_picture_corp",
    configVariant: null,
    configVariantId: null,
    configAssetLabel: "Unica",
    configAssetId: "main",
    configW: 636,
    configH: 315,
    configFocus: null,
    status: "focus_add",
    changes: ["Aggiungere f: {x:130, y:0, w:376, h:315}"],
  },

  // =============================================
  // CARD PORTRAIT
  // =============================================
  {
    figmaFrame: "CorpCardPortrait2x3-Nome-",
    figmaW: 400,
    figmaH: 600,
    figmaFocus: { x: 0, y: 0, w: 400, h: 452 },
    figmaOverlays: [],
    configComponent: "Card Portrait",
    configComponentKey: "card_portrait",
    configVariant: "Ratio 2:3",
    configVariantId: "ratio-2x3",
    configAssetLabel: "Unico",
    configAssetId: "main",
    configW: 800,
    configH: 1200,
    configFocus: null,
    status: "mismatch",
    changes: [
      "w: 800 \u2192 400 (dimezzato)",
      "h: 1200 \u2192 600 (dimezzato)",
      "Aggiungere f: {x:0, y:0, w:400, h:452}",
      'Aggiungere fl: "Alto"',
    ],
  },
  {
    figmaFrame: "CorpCardPortrait4x5-Nome-",
    figmaW: 400,
    figmaH: 500,
    figmaFocus: { x: 0, y: 0, w: 400, h: 341 },
    figmaOverlays: [],
    configComponent: "Card Portrait",
    configComponentKey: "card_portrait",
    configVariant: "Ratio 4:5",
    configVariantId: "ratio-4x5",
    configAssetLabel: "Unico",
    configAssetId: "main",
    configW: 800,
    configH: 1000,
    configFocus: null,
    status: "mismatch",
    changes: [
      "w: 800 \u2192 400 (dimezzato)",
      "h: 1000 \u2192 500 (dimezzato)",
      "Aggiungere f: {x:0, y:0, w:400, h:341}",
      'Aggiungere fl: "Alto"',
    ],
  },
  {
    figmaFrame: "CorpCardPortrait9x10-Nome-",
    figmaW: 450,
    figmaH: 500,
    figmaFocus: { x: 0, y: 0, w: 450, h: 324 },
    figmaOverlays: [],
    configComponent: "Card Portrait",
    configComponentKey: "card_portrait",
    configVariant: null,
    configVariantId: null,
    configAssetLabel: null,
    configAssetId: null,
    configW: null,
    configH: null,
    configFocus: null,
    status: "new_variant",
    changes: [
      "Nuova variante: Ratio 9:10",
      "Asset: w:450, h:500",
      "Focus f: {x:0, y:0, w:450, h:324}",
    ],
  },

  // =============================================
  // CONTENT EVIDENCE (NUOVO COMPONENTE)
  // =============================================
  {
    figmaFrame: "CorpContentEvidence-Nome-",
    figmaW: 696,
    figmaH: 358,
    figmaFocus: null,
    figmaOverlays: [],
    configComponent: null,
    configComponentKey: null,
    configVariant: null,
    configVariantId: null,
    configAssetLabel: null,
    configAssetId: null,
    configW: null,
    configH: null,
    configFocus: null,
    status: "new_component",
    changes: [
      "Nuovo componente: Content Evidence",
      "Asset unica: w:696, h:358",
    ],
  },

  // =============================================
  // BOX RACK BADGE LOGHI (NUOVO COMPONENTE)
  // =============================================
  {
    figmaFrame: "CorpBoxRack-BadgeLoghi-nome",
    figmaW: 604,
    figmaH: 139,
    figmaFocus: null,
    figmaOverlays: [],
    configComponent: null,
    configComponentKey: null,
    configVariant: null,
    configVariantId: null,
    configAssetLabel: null,
    configAssetId: null,
    configW: null,
    configH: null,
    configFocus: null,
    status: "new_component",
    changes: [
      "Nuovo componente: Box Rack Badge Loghi",
      "Asset unica: w:604, h:139",
      "Contiene 2 cerchi badge: 129\u00d7129px ciascuno",
    ],
  },
];

// =============================================
// CORRECTED SITE_CONFIG (solo sezione corporate)
// Include la nuova propriet\u00e0 oz (overlay zones)
// =============================================
export const correctedCorporateConfig = {
  corporate: {
    label: "Corporate",
    styleDefaults: {
      light: {
        text: "#1A1C1E",
        btnBg: "#0047BB",
        btnLabel: "#FFFFFF",
      },
      dark: {
        text: "#FFFFFF",
        btnBg: "#FFFFFF",
        btnLabel: "#000000",
      },
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
              {
                id: "desktop",
                type: "img",
                label: "Desktop (XL)",
                w: 1728,
                h: 400,
                d: false,
                fl: "Centro",
                f: { x: 630, y: 79, w: 469, h: 242 },
                targetKB: 150,
              },
              {
                id: "tablet",
                type: "img",
                label: "Tablet (MD)",
                w: 992,
                h: 400,
                d: false,
                targetKB: 90,
              },
              {
                id: "mobile",
                type: "img",
                label: "Mobile (XS)",
                w: 768,
                h: 400,
                d: false,
                targetKB: 70,
              },
            ],
          },
          {
            id: "multi",
            label: "Mode Multi (Grid)",
            assets: [
              {
                id: "col-6",
                type: "img",
                label: "Colonna 1/2 (Tablet/Desktop)",
                w: 864,
                h: 400,
                d: true,
                fl: "Centro",
                f: { x: 265, y: 0, w: 334, h: 400 },
                targetKB: 85,
              },
              {
                id: "col-4",
                type: "img",
                label: "Colonna 1/3 (Desktop XL)",
                w: 460,
                h: 400,
                d: true,
                fl: "Centro",
                targetKB: 65,
              },
              {
                id: "mobile",
                type: "img",
                label: "Mobile Stacked (XS)",
                w: 768,
                h: 400,
                d: false,
                fl: "Centro",
                targetKB: 70,
              },
            ],
          },
        ],
      },
      card_simple_reactive: {
        label: "Card Simple - Reactive",
        filenamePrefix: "cardSimpleReactive",
        assets: [
          {
            id: "main",
            type: "img",
            label: "Unica",
            w: 636,
            h: 358,
            d: true,
            targetKB: 70,
          },
        ],
      },
      card_picture_corp: {
        label: "Card Picture Corporate",
        filenamePrefix: "cardPicture",
        assets: [
          {
            id: "main",
            type: "img",
            label: "Unica",
            w: 636,
            h: 315,
            d: true,
            fl: "Centro",
            f: { x: 130, y: 0, w: 376, h: 315 },
            targetKB: 60,
          },
        ],
      },
      card_portrait: {
        label: "Card Portrait",
        filenamePrefix: "cardPortrait",
        variants: [
          {
            id: "ratio-2x3",
            label: "Ratio 2:3",
            assets: [
              {
                id: "main",
                type: "img",
                label: "Unico",
                w: 400,
                h: 600,
                d: false,
                fl: "Alto",
                f: { x: 0, y: 0, w: 400, h: 452 },
                targetKB: 95,
              },
            ],
          },
          {
            id: "ratio-4x5",
            label: "Ratio 4:5",
            assets: [
              {
                id: "main",
                type: "img",
                label: "Unico",
                w: 400,
                h: 500,
                d: false,
                fl: "Alto",
                f: { x: 0, y: 0, w: 400, h: 341 },
                targetKB: 90,
              },
            ],
          },
          {
            id: "ratio-9x10",
            label: "Ratio 9:10",
            assets: [
              {
                id: "main",
                type: "img",
                label: "Unico",
                w: 450,
                h: 500,
                d: false,
                fl: "Alto",
                f: { x: 0, y: 0, w: 450, h: 324 },
                targetKB: 90,
              },
            ],
          },
        ],
      },
      masonry: {
        label: "Masonry Grid",
        filenamePrefix: "masonry",
        variants: [
          {
            id: "1-1",
            label: "Ratio 1:1",
            assets: [
              {
                id: "main",
                type: "img",
                label: "Unico",
                w: 518,
                h: 518,
                d: true,
                targetKB: 60,
              },
            ],
          },
          {
            id: "4-3",
            label: "Ratio 4:3",
            assets: [
              {
                id: "main",
                type: "img",
                label: "Unico",
                w: 518,
                h: 388,
                d: true,
                targetKB: 55,
              },
            ],
          },
          {
            id: "3-4",
            label: "Ratio 3:4",
            assets: [
              {
                id: "main",
                type: "img",
                label: "Unico",
                w: 518,
                h: 690,
                d: true,
                targetKB: 65,
              },
            ],
          },
          {
            id: "16-9",
            label: "Ratio 16:9",
            assets: [
              {
                id: "main",
                type: "img",
                label: "Unico",
                w: 518,
                h: 291,
                d: true,
                targetKB: 50,
              },
            ],
          },
        ],
      },
      module: {
        label: "Modules (Intro & Display)",
        filenamePrefix: "module",
        variants: [
          {
            id: "Boxed",
            label: "Concept Boxed",
            assets: [
              {
                id: "desktop",
                type: "img",
                label: "Desktop (LG+)",
                w: 912,
                h: 390,
                d: false,
                fl: "Sinistra",
                f: { x: 0, y: 0, w: 653, h: 390 },
                targetKB: 90,
              },
              {
                id: "tablet",
                type: "img",
                label: "Tablet (MD)",
                w: 720,
                h: 309,
                d: false,
                targetKB: 70,
              },
              {
                id: "mobile",
                type: "img",
                label: "Mobile (XS)",
                w: 535,
                h: 309,
                d: false,
                targetKB: 55,
              },
            ],
          },
          {
            id: "Photo",
            label: "Concept Photo (Display)",
            assets: [
              {
                id: "desktop",
                type: "img",
                label: "Desktop (LG+)",
                w: 2000,
                h: 400,
                d: false,
                fl: "Destra",
                f: { x: 936, y: 0, w: 552, h: 400 },
                oz: [
                  {
                    t: "text",
                    l: "Area Testi",
                    x: 338,
                    y: 0,
                    w: 598,
                    h: 400,
                  },
                  {
                    t: "badge",
                    l: "Area Loghi",
                    x: 1205,
                    y: 272,
                    w: 408,
                    h: 108,
                  },
                ],
                targetKB: 150,
              },
              {
                id: "tablet",
                type: "img",
                label: "Tablet (MD)",
                w: 991,
                h: 400,
                d: false,
                fl: "Destra",
                f: { x: 449, y: 0, w: 418, h: 400 },
                oz: [
                  {
                    t: "text",
                    l: "Area Testi",
                    x: 125,
                    y: 0,
                    w: 324,
                    h: 400,
                  },
                  {
                    t: "badge",
                    l: "Area Loghi",
                    x: 498,
                    y: 299,
                    w: 320,
                    h: 86,
                  },
                ],
                targetKB: 90,
              },
              {
                id: "mobile",
                type: "img",
                label: "Mobile (XS)",
                w: 768,
                h: 300,
                d: false,
                fl: "Centro",
                f: { x: 178, y: 0, w: 400, h: 300 },
                oz: [
                  {
                    t: "badge",
                    l: "Area Loghi",
                    x: 0,
                    y: 203,
                    w: 768,
                    h: 92,
                  },
                ],
                targetKB: 60,
              },
            ],
          },
          {
            id: "PhotoAlto",
            label: "Concept Photo Alto (Intro)",
            assets: [
              {
                id: "desktop",
                type: "img",
                label: "Desktop (LG+)",
                w: 2000,
                h: 470,
                d: false,
                fl: "Destra",
                f: { x: 936, y: 0, w: 552, h: 470 },
                oz: [
                  {
                    t: "text",
                    l: "Area Testi",
                    x: 338,
                    y: 0,
                    w: 598,
                    h: 470,
                  },
                  {
                    t: "badge",
                    l: "Area Loghi",
                    x: 1205,
                    y: 307,
                    w: 408,
                    h: 108,
                  },
                ],
                targetKB: 150,
              },
              {
                id: "tablet",
                type: "img",
                label: "Tablet (MD)",
                w: 991,
                h: 470,
                d: false,
                fl: "Destra",
                f: { x: 446, y: 0, w: 418, h: 470 },
                oz: [
                  {
                    t: "text",
                    l: "Area Testi",
                    x: 122,
                    y: 0,
                    w: 324,
                    h: 470,
                  },
                  {
                    t: "badge",
                    l: "Area Loghi",
                    x: 495,
                    y: 358,
                    w: 320,
                    h: 92,
                  },
                ],
                targetKB: 90,
              },
              {
                id: "mobile",
                type: "img",
                label: "Mobile (XS)",
                w: 768,
                h: 300,
                d: false,
                fl: "Centro",
                f: { x: 178, y: 0, w: 400, h: 300 },
                oz: [
                  {
                    t: "badge",
                    l: "Area Loghi",
                    x: 0,
                    y: 203,
                    w: 768,
                    h: 92,
                  },
                ],
                targetKB: 60,
              },
            ],
          },
        ],
      },
      content_evidence: {
        label: "Content Evidence",
        filenamePrefix: "contentEvidence",
        assets: [
          {
            id: "main",
            type: "img",
            label: "Unica",
            w: 696,
            h: 358,
            d: true,
            targetKB: 70,
          },
        ],
      },
      box_rack_badge: {
        label: "Box Rack Badge Loghi",
        filenamePrefix: "boxRackBadge",
        assets: [
          {
            id: "main",
            type: "img",
            label: "Unica",
            w: 604,
            h: 139,
            d: false,
            targetKB: 30,
          },
        ],
      },
    },
  },
};

// =============================================
// Entries che contengono overlay zones (per statistiche)
// =============================================
export const overlayStats = {
  totalWithOverlays: analysisEntries.filter(
    (e) => e.figmaOverlays.length > 0,
  ).length,
  totalTextZones: analysisEntries.reduce(
    (sum, e) =>
      sum +
      e.figmaOverlays.filter((o) => o.t === "text").length,
    0,
  ),
  totalBadgeZones: analysisEntries.reduce(
    (sum, e) =>
      sum +
      e.figmaOverlays.filter((o) => o.t === "badge").length,
    0,
  ),
};