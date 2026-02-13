# Katana v3.0 — Output Deployabile

Questi 4 file compongono l'applicazione Katana completa.

## Utilizzo

Apri `index.html` direttamente nel browser (funziona offline).

## File

| File | Descrizione |
|------|-------------|
| `data.js` | STRINGS (localizzazione) + SITE_CONFIG (3 canali, tutti i componenti) |
| `script.js` | Logic core: crop, smart asset detection, overlay zones, export ZIP/PSD |
| `style.css` | Design system brutalist: tokens, cards, modal, overlay zones |
| `index.html` | Markup HTML + dipendenze CDN (Bootstrap 5.3, CropperJS, SmartCrop, ag-psd) |

## Versione

v3.0 Stable — Smart Asset Detection, Overlay Zones (oz), Export PSD con layer.

## Aggiornamento

I file vengono generati dal dev tool React in `tool/`.
I sorgenti TypeScript sono in `tool/src/app/components/katana-files/`.
