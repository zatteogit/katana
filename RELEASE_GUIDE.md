# Katana Release Guide

Guida completa per creare e pubblicare una release stabile di Katana su GitHub.

---

## Checklist pre-release

Prima di creare una release, verifica:

- [ ] Le copie golden in `baseline/` sono intatte (NON modificate)
- [ ] Il codice e' committato su `main` o su un branch stabile
- [ ] Le issue critiche sono risolte
- [ ] La documentazione e' aggiornata

---

## Step 1: Build Katana Standalone

### Due modalita'

| Comando | Flag | Source | Uso |
|---------|------|--------|-----|
| `npm run build:standalone` | `--stable` (default) | `baseline/` golden copies | **Release ufficiali** |
| `npm run build:standalone:dev` | `--dev` | `katana-files/` working | Test di sviluppo |

### Build STABLE (da baseline — consigliato per release)

```bash
# Dalla root del progetto
npm run build:standalone

# oppure esplicitamente:
node build-standalone.js --stable
```

Lo script:
1. Verifica l'integrita' di tutti e 4 i file (CSS, JS, Data, HTML)
2. Estrae i sorgenti dalle **copie golden** in `baseline/`
3. Li salva in `dist/katana-standalone/`
4. Genera un README.md con metadati del build
5. Mostra dimensioni file e prossimi passi

Il build `--stable` **garantisce** che l'output sia identico al codice
verificato al momento del freeze, indipendentemente dallo stato dei
file di lavoro.

### Build DEV (da file di lavoro)

```bash
npm run build:standalone:dev

# oppure:
node build-standalone.js --dev
```

Usare solo per testare modifiche in sviluppo prima di congelarle nel baseline.

### Metodo manuale (fallback)

Se lo script fallisce, puoi estrarre i file manualmente:

1. Apri `src/app/components/katana-files/baseline/index-html.ts`
2. Copia il contenuto del template literal dopo `export const BASELINE_INDEX_HTML = \``
3. Incolla in un nuovo file `index.html`
4. Ripeti per gli altri 3 file:
   - `baseline/data-js.ts` (`BASELINE_DATA_JS`) -> `data.js`
   - `baseline/script-js.ts` (`BASELINE_SCRIPT_JS`) -> `script.js`
   - `baseline/style-css.ts` (`BASELINE_STYLE_CSS`) -> `style.css`

---

## Step 2: Crea l'archivio ZIP

### Su macOS/Linux:

```bash
cd dist
zip -r katana-v3.0.0.zip katana-standalone/
```

### Su Windows:

1. Naviga in `dist/`
2. Click destro su `katana-standalone/`
3. Invia a -> Cartella compressa
4. Rinomina in `katana-v3.0.0.zip`

### Verifica

Apri il file ZIP e assicurati contenga:
- `katana-standalone/index.html`
- `katana-standalone/data.js`
- `katana-standalone/script.js`
- `katana-standalone/style.css`
- `katana-standalone/README.md`

---

## Step 3: Sovrascrivere la release v3.0.0 su GitHub

La release v3.0.0 originale era stata pubblicata erroneamente
(build dai file di lavoro anziche' dal baseline verificato).

### 3.1 Vai alla pagina Releases

```
https://github.com/zatteogit/katana/releases
```

### 3.2 Modifica la release esistente

1. Trova **Katana v3.0.0** nella lista releases
2. Clicca **"Edit"** (icona matita)
3. Rimuovi il vecchio ZIP allegato
4. Carica il nuovo `katana-v3.0.0.zip`

### 3.3 Aggiorna la description

```markdown
## Katana v3.0.0 - Versione Stabile

Asset Export Tool standalone per Poste.it — Versione stabile e pronta per la produzione.

> **Nota**: Questa release e' stata ricostruita il 2026-02-14 dalle copie golden
> verificate (baseline freeze). Sostituisce la build precedente che era stata
> generata erroneamente dai file di lavoro.

### Caratteristiche

- Ritaglio assistito con guide visive
- Supporto componenti Corporate e Consumer
- Export multi-risoluzione (@1x, @2x, @3x)
- Compressione automatica con target KB
- Focus area e overlay zones
- Funziona 100% offline (CDN fallback inclusi)
- Nessun tracking, tool completamente locale

### Download

Scarica `katana-v3.0.0.zip`, estrailo e apri `index.html` in un browser moderno.

**Non richiede installazione, server o connessione internet.**

### Requisiti

- Browser moderno (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- JavaScript abilitato

### Componenti supportati

#### Corporate (Poste.it Istituzionale)
Visual, Card Simple Reactive, Card Picture Corporate, Card Portrait,
Masonry Grid, Module (Boxed/Photo/Photo Alto), Content Evidence, Box Rack Badge

#### Consumer (Poste.it Retail)
Intro Concept (A/B), Card Trendy, Card Picture, Card Reactive,
Card Comparison, Card Detailed BG, Pills Showcase, Banner Campaign Alfa

### Build info

- **Version:** 3.0.0
- **Source:** Baseline golden copies (freeze 2026-02-14)
- **Build mode:** STABLE
- **Repository:** https://github.com/zatteogit/katana
```

### 3.4 Opzioni

- Assicurati che **"Set as the latest release"** sia spuntato
- **NON** spuntare "Set as a pre-release"

### 3.5 Salva

Clicca **"Update release"**

---

## Step 4: Verifica la release

### 4.1 Verifica download

```
https://github.com/zatteogit/katana/releases/latest
```

Scarica il ZIP e testalo:
1. Estrai l'archivio
2. Apri `index.html`
3. Carica un'immagine di test
4. Verifica che crop modal, overlay zones, zoom e export funzionino
5. Testa l'export ZIP con multi-risoluzione

### 4.2 Confronto con baseline

Per confermare che l'output corrisponde al baseline:

```bash
# Estrai il CSS dal README del build e confronta
diff dist/katana-standalone/style.css <(node -e "
  import('./src/app/components/katana-files/baseline/style-css.ts')
    .then(m => process.stdout.write(m.BASELINE_STYLE_CSS))
")
```

Se il diff e' vuoto, l'output e' corretto.

---

## Step 5: Versioni future

Per release successive, usa il semantic versioning:

- **v3.0.1** - Patch (bug fix)
- **v3.1.0** - Minor (nuove feature backward-compatible)
- **v4.0.0** - Major (breaking changes)

### Workflow per nuove versioni

1. Sviluppa con `npm run build:standalone:dev` per testare
2. Quando stabile, aggiorna le copie golden in `baseline/`
3. Aggiorna `BASELINE_VERSION` in `baseline/README.ts` e `baseline/index.ts`
4. Esegui `npm run build:standalone` per il build da baseline
5. Crea la release su GitHub

---

## Troubleshooting

### Lo script build-standalone.js fallisce

**Errore:** "Export non trovato"

**Soluzione:** Verifica che i file usino esattamente questi nomi di export:
- Working: `styleCssCode`, `scriptJsCode`, `dataJsCode`, `indexHtmlCode`
- Baseline: `BASELINE_STYLE_CSS`, `BASELINE_SCRIPT_JS`, `BASELINE_DATA_JS`, `BASELINE_INDEX_HTML`

### Integrity check mostra divergenze in modo --stable

**Non e' un problema.** Il build `--stable` estrae sempre dal baseline,
quindi l'output e' corretto anche se i file di lavoro sono stati modificati.
Le divergenze sono segnalate a scopo informativo.

### Il ZIP e' troppo grande (>10MB)

**Soluzione:** GitHub permette file fino a 2GB, ma:
1. Verifica di non aver incluso `node_modules/` o `.git/`
2. Comprimi solo la directory `katana-standalone/`

---

## Risorse

- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

---

**Ultimo aggiornamento:** 14 Febbraio 2026
**Versione guida:** 2.0
