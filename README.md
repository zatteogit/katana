# Katana

Tool interno per il ritaglio e l'export di asset immagine per Poste.it Retail, Corporate e Social Media Kit.

## Struttura Repository

```
katana/
├── dist/           ← File deployabili (copia su Notion / hosting)
│   ├── data.js     ← STRINGS + SITE_CONFIG
│   ├── script.js   ← Logic, crop, smart detection, export
│   ├── style.css   ← Design system brutalist
│   └── index.html  ← Markup + dipendenze CDN
│
├── tool/           ← Dev tool React (analisi Figma vs Config)
│   ├── src/
│   │   └── app/
│   │       ├── App.tsx
│   │       └── components/
│   │           ├── analysis-data.ts
│   │           ├── ComparisonCard.tsx
│   │           ├── KatanaCodeTab.tsx
│   │           ├── KatanaPreviewTab.tsx
│   │           ├── KatanaRepoTab.tsx
│   │           └── katana-files/
│   │               ├── data-js-code.ts
│   │               ├── script-js-code.ts
│   │               ├── style-css-code.ts
│   │               └── index-html-code.ts
│   ├── package.json
│   └── vite.config.ts
│
├── build-dist.js   ← Script per rigenerare dist/ dai sorgenti TS
├── .gitignore
└── README.md
```

## dist/ — Katana App (Output)

I 4 file in `dist/` compongono l'applicazione Katana completa.
Per utilizzarla, apri `index.html` direttamente nel browser (funziona offline).

### Versione corrente: v3.0 Stable
- Smart Asset Detection (`detectAssetFromFile()`)
- Overlay Zones (oz) — Area Testi + Area Loghi
- Export PSD con layer (sorgente + overlay via ag-psd)
- Modale custom brutalist per conferma detection
- 3 canali: Poste.it Retail, Corporate, Social Media Kit

## tool/ — Frame Analyzer (Dev Tool)

App React (Vite + Tailwind) per analizzare le misure dei frame Figma
rispetto alla SITE_CONFIG corporate.

### Avvio
```bash
cd tool
pnpm install
pnpm dev
```

### Tab disponibili
- **Analisi**: Confronto Figma vs Config con filtri e statistiche
- **Schema oz**: Documentazione proposta Overlay Zones
- **Preview**: Live preview dei 4 file combinati in iframe
- **JSON Corretto**: SITE_CONFIG aggiornata con correzioni dimensionali
- **Codice Katana**: I 4 file pronti per copy-paste su Notion
- **Repository**: Struttura repo, download file e comandi git

## Rigenerare dist/

Dopo aver modificato i sorgenti TS in `tool/src/app/components/katana-files/`:

```bash
node build-dist.js
```

Questo script estrae il contenuto dai template literal TypeScript e scrive i 4 file in `dist/`.

## Commit Convention

- `feat(dist):` — Modifiche ai file output Katana
- `feat(tool):` — Modifiche al dev tool React
- `docs:` — Documentazione
