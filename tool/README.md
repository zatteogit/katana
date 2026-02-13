# Katana Frame Analyzer (Dev Tool)

App React (Vite + Tailwind CSS) per l'analisi dei frame Figma
rispetto alla SITE_CONFIG di Katana.

## Setup

```bash
pnpm install
pnpm dev
```

## Struttura

```
src/app/
├── App.tsx                      # Entry point, tabs, filtri, statistiche
└── components/
    ├── analysis-data.ts         # Dati analisi Figma vs SITE_CONFIG
    ├── ComparisonCard.tsx       # Card confronto singolo frame
    ├── KatanaCodeTab.tsx        # Tab "Codice Katana" (4 file)
    ├── KatanaPreviewTab.tsx     # Tab "Preview" (live iframe)
    ├── KatanaRepoTab.tsx        # Tab "Repo" (struttura GitHub)
    └── katana-files/            # Sorgenti TS dei 4 file output
        ├── data-js-code.ts      # → dist/data.js
        ├── script-js-code.ts    # → dist/script.js
        ├── style-css-code.ts    # → dist/style.css
        └── index-html-code.ts   # → dist/index.html
```

## Relazione con dist/

I file in `katana-files/` contengono il codice output come template literal TypeScript.
Per rigenerare `dist/` dopo una modifica:

```bash
cd ..
node build-dist.js
```
