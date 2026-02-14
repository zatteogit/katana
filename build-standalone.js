#!/usr/bin/env node

/**
 * ============================================================================
 * KATANA STANDALONE BUILD SCRIPT
 * ============================================================================
 *
 * Genera la versione standalone di Katana estraendo i 4 sorgenti
 * (index.html, data.js, script.js, style.css) e salvandoli in dist/.
 *
 * DUE MODALITA':
 *   --stable   (default)  Estrae dalle COPIE GOLDEN in baseline/.
 *                          Output garantito identico al freeze v3.0.
 *   --dev                 Estrae dai FILE DI LAVORO in katana-files/.
 *                          Usare solo per test di build in sviluppo.
 *
 * In entrambe le modalita', il build esegue un integrity check completo
 * su tutti e 4 i file (CSS, JS, Data, HTML) confrontando working vs golden.
 *
 * USAGE:
 *   node build-standalone.js              # stable (default)
 *   node build-standalone.js --stable     # stable (esplicito)
 *   node build-standalone.js --dev        # dev (da file di lavoro)
 *
 * NPM SCRIPTS:
 *   npm run build:standalone              # alias per --stable
 *   npm run build:standalone:dev          # alias per --dev
 *
 * OUTPUT:  ./dist/katana-standalone/
 *
 * Compatibile con "type": "module" (ESM).
 * Eseguire dalla root del progetto.
 *
 * BASELINE v3.0 Stable (freeze 2026-02-14):
 *   Le copie golden in katana-files/baseline/ sono la source-of-truth.
 *   Il build --stable estrae ESCLUSIVAMENTE da li'.
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ─── ESM __dirname ──────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── PATHS ──────────────────────────────────────────────────────────────────
const KATANA_FILES_DIR = path.join(__dirname, 'src', 'app', 'components', 'katana-files');
const BASELINE_DIR = path.join(KATANA_FILES_DIR, 'baseline');
const OUTPUT_DIR = path.join(__dirname, 'dist', 'katana-standalone');

// ─── BUILD MODE ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const MODE = args.includes('--dev') ? 'dev' : 'stable';

// ─── VERSION ────────────────────────────────────────────────────────────────
const BUILD_VERSION = MODE === 'stable' ? '3.0.0' : '3.1.0-dev';
const BUILD_TAG = MODE === 'stable' ? 'v3.0.0' : 'v3.1.0-dev';
const BUILD_DATE = new Date().toISOString();

// ─── FILE MAP ───────────────────────────────────────────────────────────────
// Mappa: [outputFile, workingFile, workingExport, baselineFile, baselineExport]
const FILE_MAP = [
  {
    output:          'style.css',
    workingFile:     path.join(KATANA_FILES_DIR, 'style-css-code.ts'),
    workingExport:   'styleCssCode',
    baselineFile:    path.join(BASELINE_DIR, 'style-css.ts'),
    baselineExport:  'BASELINE_STYLE_CSS',
    label:           'CSS',
  },
  {
    output:          'script.js',
    workingFile:     path.join(KATANA_FILES_DIR, 'script-js-code.ts'),
    workingExport:   'scriptJsCode',
    baselineFile:    path.join(BASELINE_DIR, 'script-js.ts'),
    baselineExport:  'BASELINE_SCRIPT_JS',
    label:           'Script',
  },
  {
    output:          'data.js',
    workingFile:     path.join(KATANA_FILES_DIR, 'data-js-code.ts'),
    workingExport:   'dataJsCode',
    baselineFile:    path.join(BASELINE_DIR, 'data-js.ts'),
    baselineExport:  'BASELINE_DATA_JS',
    label:           'Data',
  },
  {
    output:          'index.html',
    workingFile:     path.join(KATANA_FILES_DIR, 'index-html-code.ts'),
    workingExport:   'indexHtmlCode',
    baselineFile:    path.join(BASELINE_DIR, 'index-html.ts'),
    baselineExport:  'BASELINE_INDEX_HTML',
    label:           'HTML',
  },
];

// ─── UTILITIES ──────────────────────────────────────────────────────────────

/**
 * Estrae il contenuto di un template literal (`...`) da un file TypeScript.
 * @param {string} filePath  - Percorso assoluto del file .ts
 * @param {string} exportName - Nome dell'export (es. "styleCssCode")
 * @returns {string} Contenuto estratto
 */
function extractTemplateContent(filePath, exportName) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File non trovato: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Strategy 1: backtick template  ->  export const NAME = `...`;
  const regexBacktick = new RegExp(
    `export const ${exportName}\\s*=\\s*\`([\\s\\S]*?)\`;`,
    'm'
  );
  const matchBt = content.match(regexBacktick);
  if (matchBt) return matchBt[1];

  // Strategy 2: single/double quoted string (raro)
  const regexQuote = new RegExp(
    `export const ${exportName}\\s*=\\s*(['"])([\\s\\S]*?)\\1;`,
    'm'
  );
  const matchQ = content.match(regexQuote);
  if (matchQ) return matchQ[2];

  throw new Error(`Export "${exportName}" non trovato in ${path.basename(filePath)}`);
}

/**
 * Formatta dimensione in KB con 1 decimale.
 */
function sizeKB(filePath) {
  return (fs.statSync(filePath).size / 1024).toFixed(1);
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN BUILD
// ═══════════════════════════════════════════════════════════════════════════

console.log('');
console.log('  ============================================');
console.log('  KATANA STANDALONE BUILD');
console.log('  ============================================');
console.log('');
console.log(`  Mode:      ${MODE.toUpperCase()}`);
console.log(`  Version:   ${BUILD_TAG}`);
console.log(`  Source:     ${MODE === 'stable' ? 'BASELINE golden copies' : 'Working files (dev)'}`);
console.log(`  Output:     ${OUTPUT_DIR}`);
console.log(`  Date:       ${BUILD_DATE}`);
console.log('');

try {
  // ─── VERIFY SOURCE DIRECTORIES ──────────────────────────────────────────
  if (!fs.existsSync(KATANA_FILES_DIR)) {
    throw new Error(
      `Directory sorgenti non trovata: ${KATANA_FILES_DIR}\n` +
      `Esegui lo script dalla root del progetto.`
    );
  }
  if (MODE === 'stable' && !fs.existsSync(BASELINE_DIR)) {
    throw new Error(
      `Directory baseline non trovata: ${BASELINE_DIR}\n` +
      `La baseline e' necessaria per il build --stable.`
    );
  }

  // ─── INTEGRITY CHECK (tutti e 4 i file) ────────────────────────────────
  console.log('  [1/4] INTEGRITY CHECK');
  console.log('  -------------------------------------------');

  const integrityIssues = [];

  for (const entry of FILE_MAP) {
    const hasWorking = fs.existsSync(entry.workingFile);
    const hasBaseline = fs.existsSync(entry.baselineFile);

    if (!hasWorking) {
      const msg = `${entry.label}: file di lavoro mancante (${path.basename(entry.workingFile)})`;
      integrityIssues.push(msg);
      console.log(`  MISS  ${entry.label} — working file mancante`);
      continue;
    }
    if (!hasBaseline) {
      const msg = `${entry.label}: copia golden mancante (${path.basename(entry.baselineFile)})`;
      integrityIssues.push(msg);
      console.log(`  MISS  ${entry.label} — golden copy mancante`);
      continue;
    }

    try {
      const workingContent = extractTemplateContent(entry.workingFile, entry.workingExport);
      const baselineContent = extractTemplateContent(entry.baselineFile, entry.baselineExport);

      if (workingContent === baselineContent) {
        console.log(`  OK    ${entry.label} — coincide con il baseline`);
      } else {
        const msg = `${entry.label}: DIVERGE dal baseline golden`;
        integrityIssues.push(msg);
        console.log(`  WARN  ${entry.label} — DIVERGE dal baseline!`);
      }
    } catch (e) {
      const msg = `${entry.label}: errore estrazione — ${e.message}`;
      integrityIssues.push(msg);
      console.log(`  ERR   ${entry.label} — ${e.message}`);
    }
  }

  console.log('');

  // In modalita' stable, le divergenze sono advisory (usiamo baseline comunque)
  // In modalita' dev, le divergenze sono normali (stiamo sviluppando)
  if (integrityIssues.length > 0) {
    if (MODE === 'stable') {
      console.log('  NOTE: Divergenze rilevate nei file di lavoro.');
      console.log('        Il build --stable usa le copie golden, quindi');
      console.log('        l\'output e\' comunque garantito corretto.');
    } else {
      console.log('  NOTE: Build --dev usa i file di lavoro (divergenze attese).');
    }
    console.log('');
  } else {
    console.log('  Tutti i file coincidono con il baseline.');
    console.log('');
  }

  // ─── VERIFY BASELINE FILES EXIST (stable mode) ─────────────────────────
  if (MODE === 'stable') {
    const missingBaseline = FILE_MAP.filter(e => !fs.existsSync(e.baselineFile));
    if (missingBaseline.length > 0) {
      throw new Error(
        `Build --stable impossibile: copie golden mancanti:\n` +
        missingBaseline.map(e => `  - ${e.baselineFile}`).join('\n')
      );
    }
  }

  // ─── CREATE OUTPUT DIR ──────────────────────────────────────────────────
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // ─── EXTRACT & WRITE FILES ──────────────────────────────────────────────
  console.log('  [2/4] EXTRACTION');
  console.log('  -------------------------------------------');

  const fileSizes = {};

  for (const entry of FILE_MAP) {
    const srcFile = MODE === 'stable' ? entry.baselineFile : entry.workingFile;
    const srcExport = MODE === 'stable' ? entry.baselineExport : entry.workingExport;

    const content = extractTemplateContent(srcFile, srcExport);
    const outPath = path.join(OUTPUT_DIR, entry.output);
    fs.writeFileSync(outPath, content, 'utf-8');

    const size = sizeKB(outPath);
    fileSizes[entry.output] = size;
    console.log(`  OK    ${entry.output.padEnd(14)} ${size.padStart(7)} KB  <-- ${path.basename(srcFile)}`);
  }

  console.log('');

  // ─── GENERATE README ────────────────────────────────────────────────────
  console.log('  [3/4] README');
  console.log('  -------------------------------------------');

  const releaseReadme = `# Katana ${BUILD_TAG} - Asset Export Tool per Poste.it

## Descrizione

Katana e' uno strumento standalone per il ritaglio e l'export di asset
immagine ottimizzati per il sito Poste.it.

## Come usare

1. Scarica questo archivio e estrailo in una cartella locale
2. Apri index.html in un browser moderno (Chrome, Firefox, Edge, Safari)
3. Seleziona il canale (Corporate/Consumer) e il componente
4. Carica la tua immagine sorgente (JPG, PNG, WebP)
5. Ritaglia e regola secondo le guide automatiche
6. Esporta gli asset ottimizzati in formato ZIP

## File inclusi

- **index.html** - Interfaccia principale dell'applicazione
- **data.js** - Configurazione componenti (SITE_CONFIG)
- **script.js** - Logica applicativa e funzioni di export
- **style.css** - Stili e tema brutalist Katana
- **README.md** - Questo file

## Caratteristiche

- Ritaglio assistito con guide visive e griglia
- Configurazione predefinita per componenti Corporate e Consumer
- Export multi-risoluzione (@1x, @2x, @3x)
- Compressione automatica con target KB configurabile
- Focus area e overlay zones per posizionamento soggetto
- Preview responsive dei componenti
- 100% offline - tutti i CDN hanno fallback inline
- Nessun tracking - tool completamente locale

## Requisiti

- Browser moderno con supporto ES6+ (Chrome 90+, Firefox 88+, Edge 90+, Safari 14+)
- JavaScript abilitato
- Non richiede connessione internet (tutti i CDN hanno fallback inline)
- Non richiede server - funziona aprendo direttamente index.html

## Componenti supportati

### Corporate (Poste.it Istituzionale)

- Visual (Minimal, Multi)
- Card Simple Reactive
- Card Picture Corporate
- Card Portrait
- Masonry Grid
- Module (Boxed, Photo, Photo Alto)
- Content Evidence
- Box Rack Badge

### Consumer (Poste.it Retail)

- Intro Concept (A, B)
- Card Trendy
- Card Picture (Orizzontale, Estesa, Verticale)
- Card Reactive
- Card Comparison
- Card Detailed BG
- Pills Showcase
- Banner Campaign Alfa

## Note tecniche

### CDN Fallback

Katana include stubs inline per tutte le dipendenze esterne.
Se i CDN non sono raggiungibili, l'applicazione continua a funzionare:

- tinycolor - Manipolazione colori e WCAG contrast
- JSZip - Creazione archivi ZIP
- Cropper.js - Interfaccia di ritaglio interattivo
- smartcrop.js - Ritaglio intelligente con rilevamento soggetto
- FileSaver.js - Download file lato client
- Bootstrap 5.3 - Modali e componenti UI

## Licenza

Copyright 2024-2026 Poste Italiane S.p.A.
Tool interno per uso esclusivo di Poste.it

---

Versione: ${BUILD_TAG}
Build: ${BUILD_DATE}
Mode: ${MODE.toUpperCase()}
Source: ${MODE === 'stable' ? 'Baseline golden copies (freeze 2026-02-14)' : 'Working files (dev)'}
Repository: https://github.com/zatteogit/katana
`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), releaseReadme, 'utf-8');
  console.log('  OK    README.md generato');
  console.log('');

  // ─── SUMMARY ────────────────────────────────────────────────────────────
  console.log('  [4/4] BUILD SUMMARY');
  console.log('  -------------------------------------------');
  console.log('');
  console.log(`  Version:    ${BUILD_TAG}`);
  console.log(`  Mode:       ${MODE.toUpperCase()}`);
  console.log(`  Source:     ${MODE === 'stable' ? 'baseline/ (golden copies)' : 'katana-files/ (working)'}`);
  console.log(`  Output:     ${OUTPUT_DIR}`);
  console.log('');
  console.log('  Files:');
  for (const entry of FILE_MAP) {
    const size = fileSizes[entry.output];
    console.log(`    ${entry.output.padEnd(14)} ${size.padStart(7)} KB`);
  }
  const totalKB = Object.values(fileSizes).reduce((s, v) => s + parseFloat(v), 0).toFixed(1);
  console.log(`    ${'TOTAL'.padEnd(14)} ${totalKB.padStart(7)} KB`);

  if (integrityIssues.length > 0) {
    console.log('');
    console.log('  Integrity warnings:');
    for (const issue of integrityIssues) {
      console.log(`    - ${issue}`);
    }
  }

  console.log('');
  console.log('  ============================================');
  console.log('  BUILD COMPLETATA');
  console.log('  ============================================');
  console.log('');

  // ─── NEXT STEPS ─────────────────────────────────────────────────────────
  if (MODE === 'stable') {
    console.log('  Prossimi passi per sovrascrivere la release v3.0.0:');
    console.log('');
    console.log('  1. Crea lo ZIP:');
    console.log('     cd dist && zip -r katana-v3.0.0.zip katana-standalone/');
    console.log('');
    console.log('  2. Vai su GitHub Releases:');
    console.log('     https://github.com/zatteogit/katana/releases');
    console.log('');
    console.log('  3. Trova la release v3.0.0 esistente e clicca "Edit"');
    console.log('');
    console.log('  4. Rimuovi il vecchio ZIP e carica katana-v3.0.0.zip');
    console.log('');
    console.log('  5. Aggiorna la description con:');
    console.log('     "Rebuilt from verified baseline golden copies (2026-02-14)"');
    console.log('');
    console.log('  6. Salva con "Update release"');
    console.log('');
  } else {
    console.log('  Build DEV completata. File pronti per test locale.');
    console.log('  Apri dist/katana-standalone/index.html nel browser.');
    console.log('');
  }

} catch (error) {
  console.error('');
  console.error('  ============================================');
  console.error('  BUILD FALLITA');
  console.error('  ============================================');
  console.error('');
  console.error(`  Errore: ${error.message}`);
  console.error('');
  if (error.stack) {
    console.error('  Stack:');
    error.stack.split('\n').slice(1, 5).forEach(l => console.error(`    ${l.trim()}`));
  }
  console.error('');
  process.exit(1);
}
