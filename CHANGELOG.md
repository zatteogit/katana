# Changelog

Tutte le modifiche importanti a questo progetto saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Build System (v3.0.0 rebuild) - 2026-02-14

- **Ricostruzione release v3.0.0 da baseline golden copies**
  - `build-standalone.js` riscritto con due modalita': `--stable` (default) e `--dev`
  - Modalita' `--stable` estrae esclusivamente dalle copie golden in `baseline/`
  - Modalita' `--dev` estrae dai file di lavoro per test in sviluppo
  - Integrity check completo su tutti e 4 i file (CSS, JS, Data, HTML)
  - La release v3.0.0 precedente era stata generata erroneamente dai file di lavoro
  - Nuovi npm scripts: `build:standalone` (stable) e `build:standalone:dev` (dev)
  - `RELEASE_GUIDE.md` v2.0 aggiornata con workflow --stable/--dev

### In Development (fork preview)

- [ ] Issue #1: Preview componenti Consumer (fork)
- [ ] Issue #2: Preview responsive componenti Corporate (fork)
- [ ] Issue #3: Sistema dual-mode STABLE/DEV (fork)
- [ ] Issue #5: FAB "Anteprima" fix (fork)
- [ ] Issue #7: Overlay Zones nella preview (fork)

### Added (v3.1.0-dev) - 2026-02-14

- **Tab Downloads (sostituisce Repo)**
  - Nuovo `KatanaDownloadsTab.tsx` al posto di `KatanaRepoTab.tsx`
  - Download Katana Standalone v3.0 Stable come ZIP (4 file + README)
  - Download Katana Dev Build v3.1.0-dev come ZIP (+ preview-inject-dev.js)
  - Download singoli file Katana (data.js, script.js, style.css, index.html)
  - Sezione Katana Tools Suite con deploy targets (dev / GitHub Pages)
  - Storico versioni con timeline (v3.1.0-dev, v3.0, v2.0, v1.0)
  - Note di deploy con struttura directory
  - `FrameAnalyzer.tsx` aggiornato: tab "Repo" → "Downloads" con icona Download

- **Preview full-width + header minimale + version switch**
  - `FrameAnalyzer.tsx`: header unico compatto (40px) con back, title, version switch, tab switcher, preview actions
  - Preview a tutta larghezza e altezza (100vw x 100vh - header), nessun max-w constraint
  - Tab code/repo mantengono layout max-w-5xl
  - `KatanaPreviewTab.tsx`: refactored con `forwardRef`/`useImperativeHandle`, espone `reload()` e `openNewTab()`
  - Rimossa toolbar duplicata dal preview (era dentro l'iframe wrapper)
  - Version switch `v3.0 STABLE` / `v3.0 DEV` sempre visibile nell'header con badge colorato
  - Iframe rendering diretto senza wrapper dark — massimo spazio per Katana

- **Issue #6**: GitHub Pages deploy
  - `routes.ts` supporta sia `createBrowserRouter` (dev) che `createHashRouter` (GitHub Pages)
  - `vite.config.ts` supporta `base: "./"` per GitHub Pages via `VITE_DEPLOY_TARGET`
  - Build command: `VITE_DEPLOY_TARGET=github-pages npm run build`

- **Issue #8**: Prompt Generator miglioramenti
  - Bottone "Genera tutti auto": auto-fill soggetti suggeriti + genera batch prompt
  - `handleBatchGenerate()` in `PromptGeneratorTab.tsx`
  - Migliore workflow: un click per generare tutti i prompt

- **Issue #9**: Frame Analyzer - Generazione SITE_CONFIG
  - `ConfigGenerator` component in `KatanaCodeTab.tsx`
  - Genera codice SITE_CONFIG corretto da `analysis-data.ts`
  - Include focus area (`f`) e overlay zones (`oz`) estratte da Figma
  - Sezione dedicata con copia rapida nel tab "Codice Katana"

- **Issue #10**: Social Media Kit
  - 13 formati social in `prompt-engine.ts`: Instagram (Feed, Portrait, Story, Carousel), LinkedIn (Post, Square, Cover), Facebook (Post, Story, Cover), YouTube (Thumbnail), X/Twitter (Post, Header)
  - `SOCIAL_FORMATS[]` con dimensioni, ratio, safe zones, note
  - `getSocialMediaList()` e `getAllComponentList()` per catalogo combinato
  - `generateSocialPrompt()` per prompt specifici per piattaforma social
  - Safe zones per UI overlay (username, CTA, duration badge)

### Verified

- **Issue #4**: Modale custom Detect Asset
  - Gia' implementata in script.js v3.0 (`showDetectModal()`)
  - CSS in style.css Sezione 10 (Detect Modal con animazioni)
  - Sostituisce `confirm()` nativo con modale brutalist custom

### Infrastructure

- `build-standalone.js` convertito a ESM (fix `require is not defined`)
  - Usa `import` instead of `require()`
  - Usa `fileURLToPath(import.meta.url)` instead of `__dirname`
  - Output corretto in `../dist/katana-standalone/` (repo root)
- Rimosso `build-standalone.mjs` (ridondante)

### Fixed (v3.0.0-dev+fix5)

- **Issue #5**: Bug FAB "Anteprima" non appare in modalità DEV (branch `feature/preview-inject`)
  - Implementato `preview-inject-dev.ts` con fix robusto
  - MutationObserver + retry logic con MAX_RETRIES=20
  - Multiple entry points (immediate, DOMContentLoaded, delayed fallbacks)
  - Check elementi chiave Katana (#mainContainer, #step1, [data-i18n])
  - Tracing migliorato per debugging
  - `KatanaPreviewTab.tsx` usa versione DEV solo in modalità DEV
  - Modalità STABLE = Katana pulita senza preview-inject

---

## [3.0.0-stable] - 2026-02-14

### Added

- **Sistema dual-mode STABLE/DEV** nel tab Preview (#3)
  - Badge toggle per switchare tra modalità STABLE (pulita) e DEV (diagnostica)
  - Modalità STABLE con solo CDN stubs e CSS ottimizzato
  - Modalità DEV con pannello diagnostico e FAB "Anteprima"

- **Preview responsive componenti Corporate** (#2)
  - Sistema completo di anteprima inline nell'iframe Katana
  - Bootstrap 5.3 per layout e grid responsive
  - Font Jost (headings) + Inter (body)
  - Design tokens fedeli dal kit Corporate: `#003DA5`, `#0047BB`, `#FFD100`
  - Navbar differenziata Corporate vs Consumer
  - Breakpoint: XS (375px) / MD (768px) / LG (992px) / XL (1200px) / Full
  - Componenti supportati: Visual, Card Simple Reactive, Card Picture Corporate, Card Portrait, Masonry Grid, Module (Boxed/Photo/Photo Alto), Content Evidence, Box Rack Badge

- **CDN Fallback robusti**
  - `buildCdnFallbackScript()` con stubs inline per tinycolor, JSZip, Cropper, smartcrop, FileSaver, Bootstrap
  - Stub tinycolor con `tinycolor.readability(c1,c2)` WCAG reale
  - Metodi `.darken(n)` e `.lighten(n)` con mutazione in-place
  - Parser robusto `parseToRgb()` per formati hex, rgb, rgba

- **Ottimizzazioni CSS modale**
  - `buildModalOptimizationCss()` iniettato come step 7 in `buildFullHtml`
  - Riduce dimensioni modali Bootstrap per interfaccia più compatta
  - Integrato prima di `</head>` per override degli stili CDN

- **Frame Analyzer avanzato** (#9)
  - Tab "Preview" per anteprima componenti nell'iframe
  - Tab "Codice Katana" per export SITE_CONFIG (in sviluppo)
  - Tab "Repo" con commit history e branch info
  - Usa `correctedCorporateConfig` da `analysis-data.ts`

- **Prompt Generator** (#8)
  - Legge `corporate-url.xlsx` alla root
  - Genera prompt AI ottimizzati per image generation
  - Engine `prompt-engine.ts` basato su SITE_CONFIG
  - Export prompt con contesto componente e dimensioni

- **Companion App Structure**
  - React Router con `createBrowserRouter`
  - 3 route: `/` (Launcher), `/analyzer` (Katana Dev Tool), `/prompt-generator` (Prompt Generator)
  - Package `react-router` (non `react-router-dom`)

- **Build System**
  - Script `build-standalone.js` per generare versione standalone
  - Estrae 4 file Katana (index.html, data.js, script.js, style.css)
  - Genera README.md automaticamente per la release
  - Comando npm: `npm run build:standalone`

- **Documentazione**
  - `RELEASE_GUIDE.md` - Guida completa per creare release su GitHub
  - `ISSUE_LABELS.md` - Mappatura label per le 10 issue aperte
  - `CHANGELOG.md` - Questo file

### Fixed

- **Pulizia repository**
  - Eliminati 46 file obsoleti e inutili
  - Rimossi file shadcn/ui vuoti (0 bytes)
  - Rimosso `fonts.css` vuoto
  - Rimosso `guidelines/Guidelines.md` obsoleto
  - Pulito build artifacts in `dist/` erroneamente versionati

- **Stub CDN migliorati**
  - tinycolor WCAG contrast fix: usa formula W3C corretta
  - JSZip stub con supporto blob e base64
  - Cropper.js stub con API essenziali
  - Bootstrap stub per modali funzionanti

### Changed

- **Refactor `katana-files/`**
  - Codice Katana organizzato in moduli TypeScript
  - File separati: `index-html-code.ts`, `data-js-code.ts`, `script-js-code.ts`, `style-css-code.ts`
  - File `katana-cdn-inline.ts` mantenuto come fallback (non importato)

- **Struttura progetto**
  - Codice dev in `tool/` → rimosso, ora tutto in `src/`
  - Output in `dist/` → ora generato da script, non versionato
  - Kit design in `kit/corporate/` e `kit/consumer/` (versionati)

### Documentation

- Guida completa release con checklist e istruzioni GitHub
- Documentazione label per issue tracking
- README dettagliato per versione standalone
- Istruzioni troubleshooting e browser support

---

## [2.0.0] - 2024-XX-XX

### Added
- Sistema di configurazione SITE_CONFIG per componenti Corporate
- Supporto per focus area (f) e overlay zones (oz)
- Export multi-risoluzione con compressione target KB
- Interfaccia brutalist con Material Symbols

### Changed
- Migrazione da Katana v1 (jQuery) a vanilla JavaScript
- Supporto per componenti modulari Poste.it

---

## [1.0.0] - 2023-XX-XX

### Added
- Versione iniziale di Katana
- Ritaglio base con Cropper.js
- Export singolo asset

---

## Legend

- **Added** - Nuove feature
- **Changed** - Modifiche a feature esistenti
- **Deprecated** - Feature che verranno rimosse
- **Removed** - Feature rimosse
- **Fixed** - Bug fix
- **Security** - Fix di sicurezza

---

**Formato:** [Tag versione] - Data YYYY-MM-DD

**Link issues:** https://github.com/zatteogit/katana/issues/[numero]
