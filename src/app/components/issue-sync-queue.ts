/**
 * issue-sync-queue.ts — Buffer di sincronizzazione GitHub
 * ========================================================
 * Cuscinetto dichiarativo tra il lavoro locale (issue-tracker-data.ts)
 * e GitHub. Le operazioni si accumulano qui sessione dopo sessione;
 * periodicamente (o su richiesta) vengono flushate a GitHub via proxy.
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 *
 * ## Workflow
 *
 *   1. Durante ogni sessione AI, le operazioni vengono aggiunte a SYNC_QUEUE.
 *   2. L'utente (o l'AI) preme "Sincronizza" nella IssueTrackerTab.
 *   3. executeSyncQueue() itera la coda, skippa gli item già syncati (LS),
 *      esegue le API call via proxy, e marca i completati in localStorage.
 *   4. A inizio sessione successiva, l'AI pulisce gli item syncati dalla coda.
 *
 * ## Tipi di operazione
 *
 *   - create:       crea issue nuova su GitHub
 *   - close:        chiude issue esistente (by number)
 *   - create-close: crea e chiude subito (per item già completati localmente
 *                   che necessitano di una trace su GitHub)
 *   - relabel:      aggiorna i label di un'issue esistente (by number)
 *
 * ## Idempotenza
 *
 *   Ogni op ha un `opId` unico. Il localStorage key `bento-sync:{opId}`
 *   vale "1" se l'op è stata eseguita con successo. executeSyncQueue()
 *   skippa automaticamente le op già marcate.
 *
 * Section map:
 *   ~001-060   Header + Types
 *   ~062-100   SYNC_QUEUE (la coda — editata ogni sessione)
 *   ~102-200   Executor (executeSyncQueue) + helpers
 */

import { projectId, publicAnonKey } from "/utils/supabase/info";
import { S } from "./strings";

/* ================================================================== */
/* Types                                                               */
/* ================================================================== */

export interface SyncCreateOp {
  kind: "create";
  opId: string;       // Unique, e.g. "s28-create-117"
  localId: string;    // References issue-tracker-data entry id
  title: string;
  body: string;
  labels: string[];
}

export interface SyncCloseOp {
  kind: "close";
  opId: string;
  localId: string;
  issueNumber: number;
  reason: "completed" | "not_planned";
}

export interface SyncCreateCloseOp {
  kind: "create-close";
  opId: string;
  localId: string;
  title: string;
  body: string;
  labels: string[];
  reason: "completed" | "not_planned";
}

export interface SyncRelabelOp {
  kind: "relabel";
  opId: string;
  localId: string;
  issueNumber: number;
  /** Labels to ADD (appended to current set) */
  addLabels: string[];
  /** Labels to REMOVE (stripped from current set, case-insensitive match) */
  removeLabels: string[];
}

export type SyncOp = SyncCreateOp | SyncCloseOp | SyncCreateCloseOp | SyncRelabelOp;

export interface SyncResult {
  opId: string;
  ok: boolean;
  issueNumber?: number;
  error?: string;
}

export type SyncProgressFn = (done: number, total: number, current: SyncOp) => void;

/* ================================================================== */
/* localStorage helpers                                                */
/* ================================================================== */

const LS_PREFIX = "bento-sync:";

function isSynced(opId: string): boolean {
  try { return localStorage.getItem(`${LS_PREFIX}${opId}`) === "1"; }
  catch { return false; }
}

function markSynced(opId: string): void {
  try { localStorage.setItem(`${LS_PREFIX}${opId}`, "1"); }
  catch { /* sandbox */ }
}

/** Count how many ops in a queue are NOT yet synced */
export function countPending(queue: SyncOp[]): number {
  return queue.filter((op) => !isSynced(op.opId)).length;
}

/** Check if a specific op is already synced */
export function isOpSynced(opId: string): boolean {
  return isSynced(opId);
}

/* ================================================================== */
/* SYNC_QUEUE — la coda di operazioni pendenti                         */
/* ================================================================== */

/**
 * Operazioni in attesa di sync con GitHub.
 *
 * Convenzione opId: `s{session}-{kind}-{localId}`
 * Dopo flush riuscito, l'AI ripulisce gli item alla sessione successiva.
 */
export const SYNC_QUEUE: SyncOp[] = [
  /* ── Storico flush ──────────────────────────────────────────────────
   * s44: 11× close — DS-003/005/007/008/014/015/016/018/028/029/031
   * s45:  3× close — DS-010 #229, DS-009 #228, DS-012 #231
   * s47:  1× close — DS-011 #230
   * s48:  1× close — DS-030 #249
   * Tutte flushate e confermate su GitHub. Coda svuotata in s51.
   *
   * Backlog OPEN residuo (5 issue GitHub, richiedono setup esterno):
   *   #168 Φ8, #57 Φ7, #55 Φ7, #52 Φ8, #204 Φ7
   * ─────────────────────────────────────────────────────────────────── */

  /* ── s51: 16× create — user-reported backlog triage ────────────── */

  // Φ-Polish: UI bugs & refinements
  { kind: "create", opId: "s51-create-117", localId: "feat-117", title: "[Φ-Polish] Grid BG non arriva a fondo pagina — Katana + Launcher", body: "Il background pattern a griglia (BentoPageShell) non copre l'intera altezza del viewport quando il contenuto è corto. Segnalato su Katana e Home/Launcher. Nota: audit-117 (s28) lo dichiarava fixed ma il problema persiste — possibile regressione o edge-case non coperto (contenuto dinamico, viewport grande).", labels: ["bug", "katana", "Φ-Polish"] },
  { kind: "create", opId: "s51-create-118", localId: "feat-118", title: "[Φ-Polish] Footer links (Tour, DS, Settings) finiscono sotto il FAB", body: "I link di navigazione nel BentoFooter ('Tour guidato', 'Design System', 'Settings') sono coperti/sovrapposti dal BugReportFab. L'IntersectionObserver (audit-118) nasconde il FAB quando il footer è visibile, ma i link possono restare inaccessibili in viewport con altezza sufficiente a mostrare footer + FAB insieme. Possibile fix: aggiungere padding-right al footer o riposizionare i link.", labels: ["bug", "Φ-Polish"] },
  { kind: "create", opId: "s51-create-119", localId: "feat-119", title: "[Φ-Polish] FAB icon — cambiare da icona attuale a Bug (lucide)", body: "L'icona del BugReportFab dovrebbe essere l'icona Bug di lucide-react, più intuitiva per segnalare problemi. Attualmente usa un'icona diversa.", labels: ["enhancement", "Φ-Polish"] },
  { kind: "create", opId: "s51-create-120", localId: "feat-120", title: "[Φ-Polish] Header layout — kanji vicino al nome app, hamburger sempre primo a dx", body: "Nel BentoHeader i kanji (副題) dovrebbero essere posizionati accanto al nome dell'app (come decorazione del titolo), non separati. Il menu hamburger deve essere sempre il primo elemento a destra, prima di qualsiasi altro control (theme toggle, etc.). Attualmente l'ordine e il posizionamento non sono consistenti.", labels: ["enhancement", "design-system", "Φ-Polish"] },
  { kind: "create", opId: "s51-create-121", localId: "feat-121", title: "[Φ-Polish] Mixology layout — miglioramenti significativi necessari", body: "Il layout di MixologyPage necessita di miglioramenti sostanziali: spaziature, allineamenti, responsività, gerarchia visiva. Da analizzare nel dettaglio e proporre redesign.", labels: ["enhancement", "Φ-Polish"] },
  { kind: "create", opId: "s51-create-122", localId: "feat-122", title: "[Φ-Polish] Coachmark spento — nascondere link Tour nel footer", body: "Quando il feature flag bento.coachmarks è OFF (o il coachmark è stato completato/dimesso), il link 'Tour guidato' nel BentoFooter non deve apparire. Attualmente il link è sempre visibile indipendentemente dallo stato del coachmark.", labels: ["bug", "Φ-Polish"] },
  { kind: "create", opId: "s51-create-123", localId: "feat-123", title: "[Φ-Polish] Allineamenti logo / nome app / sottotitolo nell'header", body: "Verificare e correggere gli allineamenti verticali e orizzontali tra: (1) logo SVG dell'app, (2) nome app (testo), (3) sottotitolo/descrizione. Devono essere armonicamente allineati su tutte le pagine Bento.", labels: ["bug", "design-system", "Φ-Polish"] },
  { kind: "create", opId: "s51-create-124", localId: "feat-124", title: "[Φ-Polish] Settings — icone app devono corrispondere alla Home", body: "Nella SettingsPage le AppToggleCard usano icone diverse da quelle mostrate nel Launcher. Le icone devono essere le stesse (importate da launcher-data.tsx APP_DISPLAY) per consistenza visiva.", labels: ["bug", "enhancement", "Φ-Polish"] },

  // Φ-DS: Design System restructuring
  { kind: "create", opId: "s51-create-125", localId: "feat-125", title: "[Φ-DS] DS SectionHeader — titoli placeholder descrittivi", body: "I SectionHeader nelle pagine DS usano titoli che possono creare confusione con i contenuti reali. Sostituire con titoli placeholder chiari e descrittivi che indichino la funzione della sezione senza ambiguità.", labels: ["design-system", "enhancement", "Φ-DS"] },
  { kind: "create", opId: "s51-create-126", localId: "feat-126", title: "[Φ-DS] Components 07.7 — ridondanze + Figma Export da rimuovere", body: "La sezione Components 07.7 nel DS contiene: (1) elementi ridondanti già presenti in altre sezioni, (2) il pannello Figma Export che non c'entra con il DS reference e va spostato in DevTools o rimosso. Fare audit dei contenuti, integrare quelli utili nelle sezioni appropriate, eliminare duplicati.", labels: ["design-system", "enhancement", "Φ-DS"] },
  { kind: "create", opId: "s51-create-127", localId: "feat-127", title: "[Φ-DS] Team Avatars ripetuti due volte nella pagina DS", body: "I componenti Team Avatar appaiono duplicati nella pagina DS (probabilmente in DSPageAvatars e in un'altra sezione). Rimuovere la duplicazione, mantenere una sola istanza nella sezione più appropriata.", labels: ["design-system", "bug", "Φ-DS"] },
  { kind: "create", opId: "s51-create-128", localId: "feat-128", title: "[Φ-DS] Separare DS in pagine/route distinte — no paginone unico", body: "L'approccio single-page per il Design System non scala bene: la pagina è molto lunga, la navigazione è complessa, il caricamento è pesante. Proposta: separare in route distinte sotto /design-system/* (es. /design-system/colors, /design-system/typography, ecc.) con sidebar/nav persistente. Riutilizzare i componenti DSPage* esistenti come pagine autonome.", labels: ["design-system", "enhancement", "Φ-DS"] },
  { kind: "create", opId: "s51-create-129", localId: "feat-129", title: "[Φ-DS] Menu navigazione DS — active state segue lo scroll", body: "Il menu/sidebar di navigazione del Design System non evidenzia la sezione correntemente visibile durante lo scroll. Implementare IntersectionObserver sulle sezioni per aggiornare l'active state del menu in tempo reale (scroll spy).", labels: ["design-system", "bug", "Φ-DS"] },

  // Φ-Ops: User identity & app integration
  { kind: "create", opId: "s51-create-130", localId: "feat-130", title: "[Φ-Ops] Profilo utente — selezione team avatar con opzione guest", body: "Nella pagina profilo utente (o Settings) l'utente deve poter scegliere uno dei componenti Team Avatar esistenti come proprio avatar. Deve essere possibile aggiungersi come 'guest' (avatar generico). La selezione deve persistere in localStorage/KV.", labels: ["enhancement", "Φ-Ops"] },
  { kind: "create", opId: "s51-create-131", localId: "feat-131", title: "[Φ-Ops] Utente selezionato nell'header + influenza sulle app", body: "Una volta scelto un profilo utente (feat-130), questo deve: (1) apparire nell'header Bento (avatar + nome), (2) influenzare il comportamento delle app dove possibile — in primis Nigiri (filtro per referente, assegnazione automatica, vista personalizzata). Il sistema user-profile.ts ha già il ruolo; serve estenderlo con identità visiva.", labels: ["enhancement", "nigiri", "Φ-Ops"] },
  { kind: "create", opId: "s51-create-132", localId: "feat-132", title: "[Φ-Polish] Shīto — floating toolbar dopo generazione PDF", body: "In Shīto (ex Codex), dopo la generazione del report PDF, aggiungere una floating toolbar con azioni rapide: download PDF, stampa, nuova generazione, condividi. Attualmente l'utente deve scrollare per trovare i controlli.", labels: ["enhancement", "Φ-Polish"] },

  /* ── s54: close completed Φ-Polish issues ─────────────────────────── */
  // feat-118: Footer padding-right 56px to avoid FAB overlap
  // feat-119: FAB icon → Bug (lucide)
  // feat-120: BentoHeader kanji prop + migration across 4+2 pages (Codex, Tempura added s56)
  // feat-122: Tour link gated by bento.coachmarks FF
  // feat-123: Allineamenti header — solved by kanji inline with title (feat-120)
  // feat-124: Settings icons → real logo SVGs from launcher-data

  /* ── s56: close completed issues ──────────────────────────────────── */
  // feat-117: BentoPageShell minHeight max(100%, 100dvh) — grid BG now fills viewport
  // feat-121: Mixology layout — header kanji+version, WCAG dropdown click-outside-close
  // feat-132: Shīto floating toolbar (PDF/Stampa/Nuovo/Share) — fixed bottom bar

  /* ── s57: close 9 completed Φ-Polish issues (2nd batch: #329-344) ── */
  { kind: "close", opId: "s57-close-117", localId: "feat-117", issueNumber: 329, reason: "completed" },
  { kind: "close", opId: "s57-close-118", localId: "feat-118", issueNumber: 330, reason: "completed" },
  { kind: "close", opId: "s57-close-119", localId: "feat-119", issueNumber: 331, reason: "completed" },
  { kind: "close", opId: "s57-close-120", localId: "feat-120", issueNumber: 332, reason: "completed" },
  { kind: "close", opId: "s57-close-121", localId: "feat-121", issueNumber: 333, reason: "completed" },
  { kind: "close", opId: "s57-close-122", localId: "feat-122", issueNumber: 334, reason: "completed" },
  { kind: "close", opId: "s57-close-123", localId: "feat-123", issueNumber: 335, reason: "completed" },
  { kind: "close", opId: "s57-close-124", localId: "feat-124", issueNumber: 336, reason: "completed" },
  { kind: "close", opId: "s57-close-132", localId: "feat-132", issueNumber: 344, reason: "completed" },

  /* ── s57: close 16 duplicate issues (1st batch: #313-328) ───────── */
  // These were created by an earlier flush; the canonical issues are #329-344.
  { kind: "close", opId: "s57-dup-313", localId: "dup-117", issueNumber: 313, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-314", localId: "dup-118", issueNumber: 314, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-315", localId: "dup-119", issueNumber: 315, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-316", localId: "dup-120", issueNumber: 316, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-317", localId: "dup-121", issueNumber: 317, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-318", localId: "dup-122", issueNumber: 318, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-319", localId: "dup-123", issueNumber: 319, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-320", localId: "dup-124", issueNumber: 320, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-321", localId: "dup-125", issueNumber: 321, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-322", localId: "dup-126", issueNumber: 322, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-323", localId: "dup-127", issueNumber: 323, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-324", localId: "dup-128", issueNumber: 324, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-325", localId: "dup-129", issueNumber: 325, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-326", localId: "dup-130", issueNumber: 326, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-327", localId: "dup-131", issueNumber: 327, reason: "not_planned" },
  { kind: "close", opId: "s57-dup-328", localId: "dup-132", issueNumber: 328, reason: "not_planned" },
];

/* ================================================================== */
/* GitHub API helpers (via server proxy)                                */
/* ================================================================== */

const BASE = () =>
  `https://${projectId}.supabase.co/functions/v1/make-server-aeaf9218`;

const authHeaders = (): Record<string, string> => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
});

const RATE_LIMIT_MS = 500;
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** POST /github/issues — create a new issue, return { ok, issue_number } */
async function ghCreateIssue(
  title: string,
  body: string,
  labels: string[],
): Promise<{ ok: boolean; issue_number?: number; error?: string }> {
  const res = await fetch(`${BASE()}/github/issues`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ title, body, labels }),
  });
  const json = await res.json();
  if (!res.ok || !json.ok) return { ok: false, error: json.error || `HTTP ${res.status}` };
  return { ok: true, issue_number: json.data?.number ?? json.issue_number };
}

/** PATCH /github/issues — update issue (close, relabel, etc.) */
async function ghPatchIssue(
  issueNumber: number,
  patch: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch(`${BASE()}/github/issues`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ issue_number: issueNumber, ...patch }),
  });
  const json = await res.json();
  if (!res.ok || !json.ok) return { ok: false, error: json.error || `HTTP ${res.status}` };
  return { ok: true };
}

/** GET /github/issues/:number — fetch current labels for relabel ops */
async function ghGetIssueLabels(issueNumber: number): Promise<string[]> {
  const res = await fetch(`${BASE()}/github/issues/${issueNumber}`, {
    method: "GET",
    headers: authHeaders(),
  });
  const json = await res.json();
  if (!res.ok || !json.ok) return [];
  const labels: unknown[] = json.data?.labels ?? [];
  return labels.map((l: any) => (typeof l === "string" ? l : l?.name ?? "")).filter(Boolean);
}

/* ================================================================== */
/* Executor                                                            */
/* ================================================================== */

/**
 * Execute all pending ops in SYNC_QUEUE sequentially.
 * Returns SyncResult[] with per-op outcome.
 */
export async function executeSyncQueue(
  queue: SyncOp[],
  onProgress?: SyncProgressFn,
): Promise<SyncResult[]> {
  const pending = queue.filter((op) => !isSynced(op.opId));
  const results: SyncResult[] = [];

  for (let i = 0; i < pending.length; i++) {
    const op = pending[i];
    onProgress?.(i, pending.length, op);

    try {
      let result: SyncResult;

      switch (op.kind) {
        case "create": {
          const r = await ghCreateIssue(op.title, op.body, op.labels);
          result = { opId: op.opId, ok: r.ok, issueNumber: r.issue_number, error: r.error };
          break;
        }
        case "close": {
          const reason = op.reason === "not_planned" ? "not_planned" : "completed";
          const r = await ghPatchIssue(op.issueNumber, { state: "closed", state_reason: reason });
          result = { opId: op.opId, ok: r.ok, issueNumber: op.issueNumber, error: r.error };
          break;
        }
        case "create-close": {
          // Step 1: create
          const cr = await ghCreateIssue(op.title, op.body, op.labels);
          if (!cr.ok) {
            result = { opId: op.opId, ok: false, error: `create failed: ${cr.error}` };
            break;
          }
          await sleep(RATE_LIMIT_MS);
          // Step 2: close
          const num = cr.issue_number!;
          const reason = op.reason === "not_planned" ? "not_planned" : "completed";
          const cl = await ghPatchIssue(num, { state: "closed", state_reason: reason });
          result = { opId: op.opId, ok: cl.ok, issueNumber: num, error: cl.error };
          break;
        }
        case "relabel": {
          // Step 1: GET current labels
          const current = await ghGetIssueLabels(op.issueNumber);
          // Step 2: compute new set
          const removeLower = op.removeLabels.map((l) => l.toLowerCase());
          const kept = current.filter((l) => !removeLower.includes(l.toLowerCase()));
          const addNorm = op.addLabels.filter(
            (a) => !kept.some((k) => k.toLowerCase() === a.toLowerCase()),
          );
          const newLabels = [...kept, ...addNorm];
          await sleep(RATE_LIMIT_MS);
          // Step 3: PATCH
          const r = await ghPatchIssue(op.issueNumber, { labels: newLabels });
          result = { opId: op.opId, ok: r.ok, issueNumber: op.issueNumber, error: r.error };
          break;
        }
        default:
          result = { opId: (op as SyncOp).opId, ok: false, error: "Unknown op kind" };
      }

      if (result.ok) markSynced(op.opId);
      results.push(result);
    } catch (err: any) {
      results.push({ opId: op.opId, ok: false, error: err?.message || String(err) });
    }

    // Rate limit between ops
    if (i < pending.length - 1) await sleep(RATE_LIMIT_MS);
  }

  return results;
}

/**
 * Migrate old localStorage batch flags (`bento-batch-*`) to the new
 * `bento-sync:` prefix.  Safe to call multiple times — no-ops if
 * already migrated.  Returns count of migrated keys.
 */
export function migrateOldBatchFlags(): number {
  const OLD_PREFIX = "bento-batch-";
  let migrated = 0;
  try {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(OLD_PREFIX)) keys.push(k);
    }
    for (const k of keys) {
      const opId = k.slice(OLD_PREFIX.length);
      const newKey = `${LS_PREFIX}${opId}`;
      if (!localStorage.getItem(newKey)) {
        localStorage.setItem(newKey, "1");
        migrated++;
      }
      localStorage.removeItem(k);
    }
  } catch { /* sandbox / quota */ }
  return migrated;
}
