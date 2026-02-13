#!/usr/bin/env node
/**
 * build-dist.js
 * 
 * Estrae il contenuto dei 4 file Katana dai sorgenti TypeScript
 * in tool/src/app/components/katana-files/ e li scrive in dist/.
 *
 * Utilizzo:
 *   node build-dist.js
 *
 * I file TS esportano il codice come template literal:
 *   export const xxxCode = `...content...`;
 *
 * Questo script estrae il contenuto tra i backtick e lo scrive
 * come file .js / .css / .html pronti per il deploy.
 */

const fs = require('fs');
const path = require('path');

const SOURCES = [
    { ts: 'data-js-code.ts',     output: 'data.js' },
    { ts: 'script-js-code.ts',   output: 'script.js' },
    { ts: 'style-css-code.ts',   output: 'style.css' },
    { ts: 'index-html-code.ts',  output: 'index.html' },
];

const tsDir  = path.join(__dirname, 'tool', 'src', 'app', 'components', 'katana-files');
const outDir = path.join(__dirname, 'dist');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

console.log('\n  KATANA build-dist\n  =================\n');

SOURCES.forEach(({ ts, output }) => {
    const tsPath = path.join(tsDir, ts);
    if (!fs.existsSync(tsPath)) {
        console.error(`  \u2717 ${ts} non trovato in ${tsDir}`);
        return;
    }

    const src = fs.readFileSync(tsPath, 'utf8');

    // Estrai contenuto tra i backtick del template literal
    const startIdx = src.indexOf('`');
    const endIdx   = src.lastIndexOf('`');

    if (startIdx === -1 || endIdx === -1 || startIdx === endIdx) {
        console.error(`  \u2717 ${ts}: template literal non trovato`);
        return;
    }

    const content = src.substring(startIdx + 1, endIdx);
    const outPath = path.join(outDir, output);
    fs.writeFileSync(outPath, content, 'utf8');

    const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(1);
    console.log(`  \u2713 ${output.padEnd(12)} ${sizeKB} KB`);
});

console.log('\n  Fatto! File scritti in dist/\n');
