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
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

## dist/ — Katana App

I 4 file in `dist/` compongono l'applicazione Katana completa.
Per utilizzarla, apri `index.html` direttamente nel browser (funziona offline).

### Versione corrente: v3.0 Stable
- Smart Asset Detection (`detectAssetFromFile()`)
- Overlay Zones (oz) — Area Testi + Area Loghi
- Export PSD con layer (sorgente + overlay)
- Modale custom brutalist per conferma detection

### Struttura SITE_CONFIG

```
Site → Components → Variants → Assets
```

**Canali:** Poste.it (Retail), Corporate, Social Media Kit

**Chiavi asset:**
| Chiave | Descrizione |
|--------|-------------|
| `w`, `h` | Dimensioni @1x in pixel |
| `d` | Se `true`, esporta anche @2x |
| `f` | Focus Area — dove METTERE il soggetto |
| `oz` | Overlay Zones — dove NON mettere il soggetto |
| `fl` | Focus Label descrittiva |
| `m` | `"circle"` per maschera circolare |
| `targetKB` | Peso massimo in KB |
| `controlH` | Altezza variabile {min, max, step} |

## tool/ — Frame Analyzer

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
- **JSON Corretto**: SITE_CONFIG aggiornata con correzioni
- **Codice Katana**: I 4 file pronti per copy-paste
- **Repository**: Struttura repo e export file

### Regola fondamentale
> Il codice Katana esistente (dist/) non va toccato né refactorizzato.
> Si interviene solo su ciò che viene esplicitamente richiesto.

## Note tecniche

- In `script-js-code.ts` i template literal JS sono convertiti in concatenazione di stringhe per compatibilità col wrapper TypeScript
- Attenzione critica all'escaping: regex `\\.` → `\.` nell'output, newline via `String.fromCharCode(10)`
- I file in `dist/` funzionano offline (no CORS) grazie a `data.js` invece di `.json`
