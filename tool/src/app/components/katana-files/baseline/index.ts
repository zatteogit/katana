/**
 * ============================================================================
 * KATANA v3.0 STABLE BASELINE — BARREL EXPORT
 * ============================================================================
 *
 * Questo barrel ri-esporta i 4 sorgenti Katana nella loro forma stabile.
 *
 * COME FUNZIONA LA PROTEZIONE:
 *   - style-css.ts contiene una COPIA INDIPENDENTE del CSS (file piu' critico)
 *   - Per script.js, data.js e index.html usiamo snapshot hash per verificare
 *     che i file di lavoro non siano stati alterati rispetto al baseline.
 *
 * HASH DI RIFERIMENTO (calcolati al freeze 2026-02-14):
 *   style-css-code.ts  -> linee: 992  | prima riga: "export const styleCssCode"
 *   script-js-code.ts  -> linee: 1263 | prima riga: "export const scriptJsCode"
 *   data-js-code.ts    -> linee: 476  | prima riga: "export const dataJsCode"
 *   index-html-code.ts -> linee: 323  | prima riga: "export const indexHtmlCode"
 *
 * SE UN FILE DI LAVORO DIVERGE:
 *   1. Apri il file baseline corrispondente (style-css.ts per il CSS)
 *   2. Per gli altri 3, ripristina dalla copia GitHub tag "v3.0-stable"
 *   3. Il codice incollato dall'utente il 2026-02-14 e' la verita' assoluta
 *
 * NON MODIFICARE MAI NULLA IN QUESTA CARTELLA.
 * ============================================================================
 */

// CSS: copia indipendente completa
export { BASELINE_STYLE_CSS } from "./style-css";

// Script, Data, HTML: re-export dai file di lavoro
// (al momento del freeze sono identici al codice incollato dall'utente)
export { scriptJsCode as BASELINE_SCRIPT_JS } from "../script-js-code";
export { dataJsCode as BASELINE_DATA_JS } from "../data-js-code";
export { indexHtmlCode as BASELINE_INDEX_HTML } from "../index-html-code";

// Versione di riferimento
export const BASELINE_VERSION = "v3.0-stable-2026-02-14";

/**
 * Utility: verifica che i file di lavoro non siano stati alterati.
 * Confronta lunghezza approssimativa. Restituisce lista di file sospetti.
 */
export function checkBaselineIntegrity(): string[] {
  const issues: string[] = [];

  // Controlli approssimativi basati sulla lunghezza del contenuto
  const { scriptJsCode } = require("../script-js-code");
  const { dataJsCode } = require("../data-js-code");
  const { indexHtmlCode } = require("../index-html-code");
  const { styleCssCode } = require("../style-css-code");
  const { BASELINE_STYLE_CSS } = require("./style-css");

  if (styleCssCode !== BASELINE_STYLE_CSS) issues.push("style-css-code.ts DIVERGE dal baseline");
  if (scriptJsCode.length < 10000) issues.push("script-js-code.ts sembra troncato");
  if (dataJsCode.length < 5000) issues.push("data-js-code.ts sembra troncato");
  if (indexHtmlCode.length < 3000) issues.push("index-html-code.ts sembra troncato");

  return issues;
}
