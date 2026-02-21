/**
 * BugReportFab — Floating Action Button + Modal for structured feedback (#56).
 * ============================================================================
 * Accessible from all Bento pages via RootLayout.
 * Sends feedback directly to GitHub via the Hono proxy,
 * with fallback to localStorage if GitHub fails.
 *
 * #56 enhancements:
 *   - 4 feedback types: Bug, Feature Request, Improvement, Feedback
 *   - 4 severity levels: Low, Medium, High, Critical
 *   - Auto-detects: current URL path, browser UA, theme, timestamp, user role
 *   - Type-specific body placeholders and GitHub labels
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import { MessageSquare, Bug, Lightbulb, TrendingUp, Heart, X, Send, Loader2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { DS, MOTION } from "../design-system";
import { S } from "../strings";
import { useBentoTheme } from "./ThemeContext";
import type { BentoIssue, FeedbackType, FeedbackSeverity } from "../issue-tracker-types";
import { L_BUG, L_ENH, FEEDBACK_TYPE_LABELS, FEEDBACK_SEVERITY_LABELS } from "../issue-tracker-types";
import { projectId, publicAnonKey } from "/utils/supabase/info";

/* ── localStorage integration ─────────────────────────────────────── */

const LS_ISSUES_KEY = "bento-issues";

function appendBugReport(issue: BentoIssue): void {
  try {
    const raw = localStorage.getItem(LS_ISSUES_KEY);
    const issues: BentoIssue[] = raw ? JSON.parse(raw) : [];
    issues.push(issue);
    localStorage.setItem(LS_ISSUES_KEY, JSON.stringify(issues));
  } catch {
    /* localStorage unavailable — silently fail */
  }
}

/* ── Context detection ────────────────────────────────────────────── */

function detectContext(): string {
  const lines: string[] = [];
  try {
    const path = window.location.hash || window.location.pathname || "/";
    lines.push(`Pagina: ${path}`);
  } catch { /* */ }
  lines.push(`Browser: ${navigator.userAgent.slice(0, 120)}`);
  lines.push(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
  lines.push(`Timestamp: ${new Date().toISOString()}`);
  try {
    const profile = localStorage.getItem("bento-user-profile");
    if (profile) {
      const p = JSON.parse(profile);
      if (p.role) lines.push(`Ruolo: ${p.role}`);
      if (p.name) lines.push(`Utente: ${p.name}`);
    }
  } catch { /* */ }
  return lines.join("\n");
}

/* ── Feedback type config ─────────────────────────────────────────── */

const FEEDBACK_TYPES: { key: FeedbackType; label: string; icon: typeof Bug; color: string }[] = [
  { key: "bug", label: S.FB_TYPE_BUG, icon: Bug, color: DS.ACCENT },
  { key: "feature", label: S.FB_TYPE_FEATURE, icon: Lightbulb, color: DS.DATA_BLUE },
  { key: "improvement", label: S.FB_TYPE_IMPROVEMENT, icon: TrendingUp, color: DS.DATA_TEAL },
  { key: "feedback", label: S.FB_TYPE_FEEDBACK, icon: MessageSquare, color: DS.DATA_GREEN },
];

const SEVERITY_OPTIONS: { key: FeedbackSeverity; label: string; color: string }[] = [
  { key: "low", label: S.FB_SEV_LOW, color: DS.DATA_GREEN },
  { key: "medium", label: S.FB_SEV_MEDIUM, color: DS.DATA_AMBER },
  { key: "high", label: S.FB_SEV_HIGH, color: DS.DATA_ORANGE },
  { key: "critical", label: S.FB_SEV_CRITICAL, color: DS.ACCENT },
];

function getBodyPlaceholder(type: FeedbackType): string {
  switch (type) {
    case "bug": return S.BUG_FIELD_BODY_PLACEHOLDER;
    case "feature": return S.FB_PLACEHOLDER_FEATURE;
    case "improvement": return S.FB_PLACEHOLDER_IMPROVEMENT;
    case "feedback": return S.FB_PLACEHOLDER_FEEDBACK;
  }
}

function getTitlePrefix(type: FeedbackType): string {
  switch (type) {
    case "bug": return "[Bug Report]";
    case "feature": return "[Feature Request]";
    case "improvement": return "[Improvement]";
    case "feedback": return "[Feedback]";
  }
}

/* ── Component ────────────────────────────────────────────────────── */

export function BugReportFab() {
  const { isDark: d } = useBentoTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [fbType, setFbType] = useState<FeedbackType>("bug");
  const [severity, setSeverity] = useState<FeedbackSeverity>("medium");
  const [context] = useState(() => detectContext());
  const titleRef = useRef<HTMLInputElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("[data-bento-footer]");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (open && titleRef.current) {
      const t = setTimeout(() => titleRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open]);

  const handleSubmit = useCallback(() => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.error(S.BUG_EMPTY_TITLE);
      titleRef.current?.focus();
      return;
    }

    const now = new Date().toISOString();
    const issueTitle = `${getTitlePrefix(fbType)} ${trimmedTitle}`;

    const severityLabel = SEVERITY_OPTIONS.find((s) => s.key === severity)?.label || severity;
    const typeLabel = FEEDBACK_TYPES.find((t) => t.key === fbType)?.label || fbType;
    const bodyParts = [
      `**Tipo:** ${typeLabel}`,
      `**Severita:** ${severityLabel}`,
      "",
      body.trim() || "_Nessuna descrizione aggiuntiva_",
      "",
      "---",
      `**${S.BUG_FIELD_CONTEXT}**`,
      "```",
      context,
      "```",
    ];
    const issueBody = bodyParts.join("\n");

    const localLabel = fbType === "bug" ? L_BUG : L_ENH;
    const localIssue: BentoIssue = {
      id: `${fbType}-${Date.now()}`,
      title: issueTitle,
      body: issueBody,
      state: "open",
      labels: [localLabel],
      createdAt: now,
      updatedAt: now,
      source: "local",
    };

    setLoading(true);
    const GH_PROXY = `https://${projectId}.supabase.co/functions/v1/make-server-aeaf9218/github/issues`;

    const ghLabels = [
      "user-report",
      FEEDBACK_TYPE_LABELS[fbType],
      FEEDBACK_SEVERITY_LABELS[severity],
    ];

    fetch(GH_PROXY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ghLabels,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok && json.data) {
          localIssue.number = json.data.number;
          localIssue.htmlUrl = json.data.html_url;
          localIssue.source = "github";
          appendBugReport(localIssue);
          toast.success(`${typeLabel} #${json.data.number} creato su GitHub`);
          console.log(`[Feedback] Issue #${json.data.number} created (type=${fbType}, severity=${severity})`);
        } else {
          console.error("[Feedback] GitHub proxy error:", json.error);
          appendBugReport(localIssue);
          toast.success(S.BUG_SUCCESS + " (salvato localmente)");
        }
      })
      .catch((err) => {
        console.error("[Feedback] Network error:", err);
        appendBugReport(localIssue);
        toast.success(S.BUG_SUCCESS + " (salvato localmente)");
      })
      .finally(() => {
        setLoading(false);
        setTitle("");
        setBody("");
        setFbType("bug");
        setSeverity("medium");
        setOpen(false);
      });
  }, [title, body, context, fbType, severity]);

  /* ── Theme tokens ── */
  const modalBg = d ? DS.BG_CARD : DS.ON_LIGHT_BG;
  const border = d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300;
  const txtP = d ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG;
  const txtM = d ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED;
  const inputBg = d ? DS.BG_SURFACE : DS.BRUTALIST_INPUT_BG;

  const inputStyle: React.CSSProperties = {
    backgroundColor: inputBg,
    border: `${DS.BORDER_WIDTH_MEDIUM} solid ${border}`,
    borderRadius: DS.RADIUS_NONE,
    padding: "10px 14px",
    width: "100%",
    fontFamily: DS.MONO,
    fontSize: DS.FONT_BASE,
    color: txtP,
    outline: "none",
  };

  const activeTypeConfig = FEEDBACK_TYPES.find((t) => t.key === fbType)!;
  const ActiveIcon = activeTypeConfig.icon;

  // Hide FAB in DevTools (path starts with /dev)
  const isDevTools = location.pathname.startsWith("/dev");
  if (isDevTools) return null;

  return (
    <>
      {/* ── FAB button ── */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ opacity: footerVisible ? 0 : 1 }}
        transition={MOTION.SPRING_SNAPPY}
        title={S.BUG_FAB_TOOLTIP}
        aria-label={S.BUG_FAB_TOOLTIP}
        className="fixed z-50 flex items-center justify-center"
        style={{
          bottom: DS.SPACE_5,
          right: DS.SPACE_5,
          width: "48px",
          height: "48px",
          backgroundColor: DS.ACCENT,
          color: DS.TEXT_INVERSE,
          border: `${DS.BRUTALIST_BORDER_WIDTH} solid ${d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER_STRONG}`,
          boxShadow: d ? "none" : DS.BRUTALIST_SHADOW_LG,
          cursor: "pointer",
          pointerEvents: footerVisible ? "none" : "auto",
        }}
      >
        <Bug className="w-5 h-5" />
      </motion.button>

      {/* ── Modal overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="bug-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ backgroundColor: DS.OVERLAY_SCRIM, zIndex: DS.Z_OVERLAY }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={MOTION.SPRING_DEFAULT}
              className="w-full max-w-lg"
              style={{
                backgroundColor: modalBg,
                border: d
                  ? `${DS.BRUTALIST_BORDER_WIDTH} solid ${DS.BORDER_DEFAULT}`
                  : DS.BRUTALIST_BORDER,
                boxShadow: d ? "none" : DS.BRUTALIST_SHADOW_LG,
                maxHeight: "90vh",
                overflowY: "auto",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderBottom: `${DS.BORDER_WIDTH_MEDIUM} solid ${border}` }}
              >
                <div className="flex items-center gap-2">
                  <ActiveIcon className="w-4 h-4" style={{ color: activeTypeConfig.color }} />
                  <h3
                    className="font-mono font-black tracking-wider"
                    style={{ fontSize: DS.FONT_LARGE, color: txtP, textTransform: "uppercase" }}
                  >
                    {S.BUG_MODAL_TITLE}
                  </h3>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center"
                  style={{ width: "32px", height: "32px", backgroundColor: "transparent", border: "none", cursor: "pointer", color: txtM }}
                  aria-label={S.BUG_CANCEL}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Feedback type selector */}
                <div>
                  <label className="block font-mono font-black tracking-wider mb-2" style={{ fontSize: DS.FONT_SMALL, color: txtM, textTransform: "uppercase" }}>
                    {S.FB_CATEGORY}
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {FEEDBACK_TYPES.map((ft) => {
                      const Icon = ft.icon;
                      const isActive = fbType === ft.key;
                      return (
                        <button
                          key={ft.key}
                          onClick={() => setFbType(ft.key)}
                          className="inline-flex items-center gap-1.5 px-3 py-2 font-mono font-black transition-all"
                          style={{
                            fontSize: DS.FONT_SMALL,
                            textTransform: "uppercase",
                            fontWeight: 900,
                            backgroundColor: isActive ? `${ft.color}20` : "transparent",
                            color: isActive ? ft.color : txtM,
                            border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isActive ? ft.color : border}`,
                            cursor: "pointer",
                          }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {ft.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Severity selector (only for bug/improvement) */}
                {(fbType === "bug" || fbType === "improvement") && (
                  <div>
                    <label className="block font-mono font-black tracking-wider mb-2" style={{ fontSize: DS.FONT_SMALL, color: txtM, textTransform: "uppercase" }}>
                      {S.FB_SEVERITY}
                    </label>
                    <div className="flex gap-1.5 flex-wrap">
                      {SEVERITY_OPTIONS.map((sv) => {
                        const isActive = severity === sv.key;
                        return (
                          <button
                            key={sv.key}
                            onClick={() => setSeverity(sv.key)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 font-mono font-black transition-all"
                            style={{
                              fontSize: DS.FONT_MICRO,
                              textTransform: "uppercase",
                              fontWeight: 900,
                              letterSpacing: DS.LS_NORMAL,
                              backgroundColor: isActive ? `${sv.color}20` : "transparent",
                              color: isActive ? sv.color : txtM,
                              border: `${DS.BORDER_WIDTH_THIN} solid ${isActive ? sv.color : border}`,
                              cursor: "pointer",
                            }}
                          >
                            {sv.key === "critical" && <AlertTriangle className="w-3 h-3" />}
                            {sv.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block font-mono font-black tracking-wider mb-2" style={{ fontSize: DS.FONT_SMALL, color: txtM, textTransform: "uppercase" }}>
                    {S.BUG_FIELD_TITLE}
                  </label>
                  <input
                    ref={titleRef}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={S.BUG_FIELD_TITLE_PLACEHOLDER}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
                    }}
                    style={inputStyle}
                    className="ds-focus-ring"
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="block font-mono font-black tracking-wider mb-2" style={{ fontSize: DS.FONT_SMALL, color: txtM, textTransform: "uppercase" }}>
                    {S.BUG_FIELD_BODY}
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={getBodyPlaceholder(fbType)}
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                    className="ds-focus-ring"
                  />
                </div>

                {/* Auto-detected context */}
                <div>
                  <label className="block font-mono font-black tracking-wider mb-2" style={{ fontSize: DS.FONT_SMALL, color: txtM, textTransform: "uppercase" }}>
                    {S.BUG_FIELD_CONTEXT}
                  </label>
                  <pre
                    className="font-mono overflow-x-auto"
                    style={{
                      fontSize: DS.FONT_TINY,
                      color: d ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_SECONDARY,
                      backgroundColor: d ? DS.BG_SURFACE : DS.ON_LIGHT_GRAY_100,
                      border: `${DS.BORDER_WIDTH_THIN} solid ${border}`,
                      padding: DS.SPACE_3,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                    }}
                  >
                    {context}
                  </pre>
                </div>
              </div>

              {/* Footer actions */}
              <div
                className="flex items-center justify-between gap-3 px-5 py-3"
                style={{ borderTop: `${DS.BORDER_WIDTH_MEDIUM} solid ${border}` }}
              >
                <span className="font-mono" style={{ fontSize: DS.FONT_MICRO, color: txtM }}>
                  {getTitlePrefix(fbType)}
                  {(fbType === "bug" || fbType === "improvement")
                    ? ` · ${SEVERITY_OPTIONS.find((s) => s.key === severity)?.label}`
                    : ""}
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="font-mono font-bold tracking-wider px-4 py-2"
                    style={{
                      fontSize: DS.FONT_SMALL,
                      backgroundColor: "transparent",
                      border: `${DS.BORDER_WIDTH_MEDIUM} solid ${border}`,
                      color: txtM,
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    {S.BUG_CANCEL}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="font-mono font-bold tracking-wider px-4 py-2 flex items-center gap-2"
                    style={{
                      fontSize: DS.FONT_SMALL,
                      backgroundColor: activeTypeConfig.color,
                      border: `${DS.BORDER_WIDTH_MEDIUM} solid ${d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER_STRONG}`,
                      color: DS.TEXT_INVERSE,
                      cursor: loading ? "wait" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      textTransform: "uppercase",
                    }}
                  >
                    {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    {loading ? "Invio..." : S.BUG_SUBMIT}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}