/**
 * SettingsPage — Pannello Gestione App (fuori da DevTools)
 * =========================================================
 * Pagina /settings accessibile a tutti gli utenti (visibility: "utility"),
 * non gated da IS_DEV_ENV. Espone gli App Toggles (master ON/OFF per app)
 * con UX semplificata rispetto al pannello DevTools completo.
 *
 * Implementa #173 — Φ7 (feat-035)
 * feat-015 — Φ6: User role profiling wiring
 *   - Role selection triggers app recommendation dialog
 *   - Visual "recommended" badges on app cards
 *   - DevTools route gated by showDevTools (routes.ts)
 *
 * Sezioni:
 *   1. User Profile — Nome utente e ruolo con applicazione raccomandazioni
 *   2. App Toggles — Abilita/disabilita le mini-app, con badge raccomandazione
 *   3. Stats summary — Conteggi e stato sync
 */

import { useState, useCallback } from "react";
import {
  Settings,
  AppWindow,
  Power,
  RotateCcw,
  Info,
  ToggleRight,
  CloudOff,
  Shield,
  Layers,
  User,
  Sparkles,
  ShieldAlert,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import { DS, hexToRgba } from "./design-system";
import { DSToggle } from "./ds/DSToggle";
import { DSActionButton } from "./ds/DSActionButton";
import { DSDialog } from "./ds/DSDialog";
import { BentoHeader } from "./ds/BentoHeader";
import { BentoPageShell } from "./ds/BentoPageShell";
import { BentoFooter } from "./BentoFooter";
import { Link } from "react-router";
import { useBentoTheme } from "./ds/ThemeContext";
import { S } from "./strings";
import { IS_DEV_ENV } from "./bento-utils";
import {
  APP_TOGGLES,
  FEATURE_FLAGS,
  type AppToggleDef,
  useAppEnabled,
  setAppToggle,
  countDisabledApps,
  countDisabledFlags,
  resetAllFlags,
  useFeatureFlag,
  useIsPendingSync,
  getFlagsByApp,
  isFeatureEnabled,
} from "./feature-flags";
import {
  USER_ROLES,
  useUserProfile,
  setUserRole,
  setDisplayName,
  setAvatarId,
  applyRoleRecommendations,
  isAppRecommendedForRole,
  type UserRole,
} from "./user-profile";
import { DSInput } from "./ds/DSInput";
import { KatanaLogo } from "./KatanaLogo";
import { NigiriLogo } from "./NigiriLogo";
import { MixologyLogo } from "./MixologyLogo";
import { CodexLogo } from "./CodexLogo";
import { TempuraLogo } from "./TempuraLogo";
import { LOGO_PRESET } from "./design-system";
import { TEAM_AVATAR_REGISTRY, getAvatarEntry } from "./nigiri/avatars";
import { DEFAULT_TEAM_MEMBERS } from "./nigiri/constants";

/* ------------------------------------------------------------------ */
/* App Toggle Card — user-friendly version with role badge             */
/* ------------------------------------------------------------------ */

/** App metadata for user-friendly display */
const APP_DISPLAY: Record<string, { icon: React.ReactNode; color: string; description: string }> = {
  katana: {
    icon: <KatanaLogo size={22} {...LOGO_PRESET.ON_DARK} />,
    color: DS.DATA_AMBER,
    description: "Ritaglio e export asset immagine multi-breakpoint per i canali Poste.it.",
  },
  nigiri: {
    icon: <NigiriLogo size={22} {...LOGO_PRESET.ON_DARK} />,
    color: DS.INTERACTIVE,
    description: "Production Hub per gestione produzioni fotografiche e sincronizzazione cloud.",
  },
  mixology: {
    icon: <MixologyLogo size={22} {...LOGO_PRESET.ON_DARK} />,
    color: DS.DATA_TEAL,
    description: "Generatore di gradienti accessibili WCAG-compliant per i canali digital.",
  },
  codex: {
    icon: <CodexLogo size={22} {...LOGO_PRESET.ON_DARK} />,
    color: DS.DATA_GREEN,
    description: "Report Engine per generazione tabulari paginati da dati Excel.",
  },
  tempura: {
    icon: <TempuraLogo size={22} {...LOGO_PRESET.ON_DARK} accent={DS.DATA_AMBER} />,
    color: DS.DATA_AMBER,
    description: "Convertitore PPTX nel template corporate Poste Italiane.",
  },
};

function AppToggleCard({ toggle, currentRole }: { toggle: AppToggleDef; currentRole: UserRole }) {
  const enabled = useAppEnabled(toggle.appId);
  const { isDark: d } = useBentoTheme();
  const meta = APP_DISPLAY[toggle.appId];
  const accentColor = meta?.color || DS.INTERACTIVE;
  const isRecommended = isAppRecommendedForRole(toggle.appId, currentRole);

  // Count child flags for this app
  const grouped = getFlagsByApp();
  const flagApp = toggle.flagApp;
  const childFlags = flagApp ? grouped[flagApp] || [] : [];
  const childDisabled = childFlags.filter((f) => !isFeatureEnabled(f.id)).length;

  return (
    <div
      style={{
        backgroundColor: d ? DS.BG_CARD : DS.ON_LIGHT_BG,
        border: `${DS.BORDER_WIDTH_MEDIUM} solid ${enabled ? (d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER) : (d ? hexToRgba(DS.DATA_RED, 0.3) : hexToRgba(DS.DATA_RED, 0.4))}`,
        transition: `all ${DS.TRANSITION_NORMAL}`,
        opacity: enabled ? 1 : 0.75,
      }}
    >
      <div className="flex items-center gap-4 p-4">
        {/* App kanji + color dot */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{ minWidth: 48 }}>
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{
              backgroundColor: enabled ? accentColor : (d ? DS.BG_ELEVATED : DS.ON_LIGHT_GRAY_200),
              border: `${DS.BORDER_WIDTH_MEDIUM} solid ${enabled ? accentColor : (d ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300)}`,
              transition: `all ${DS.TRANSITION_NORMAL}`,
            }}
          >
            {meta?.icon || (
              <span
                className="font-mono font-bold"
                style={{
                  fontSize: DS.FONT_SMALL,
                  color: enabled ? DS.ON_LIGHT_BG : (d ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED),
                  letterSpacing: DS.LS_TIGHT,
                }}
              >
                —
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span
              className="font-mono font-black"
              style={{
                fontSize: DS.FONT_LARGE,
                letterSpacing: DS.LS_WIDE,
                textTransform: "uppercase",
                color: enabled ? (d ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG) : (d ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED),
                textDecoration: enabled ? "none" : "line-through",
                transition: `color ${DS.TRANSITION_FAST}`,
              }}
            >
              {toggle.label}
            </span>
            <div className="flex-1" />
            {/* feat-015: Role recommendation badge */}
            {isRecommended && (
              <span
                className="inline-flex items-center gap-1 font-mono font-bold px-1.5 py-px"
                style={{
                  fontSize: DS.FONT_NANO,
                  letterSpacing: DS.LS_TIGHT,
                  textTransform: "uppercase",
                  color: DS.DATA_GREEN,
                  backgroundColor: DS.BADGE_SUCCESS_BG,
                  border: `${DS.BORDER_WIDTH_THIN} solid ${DS.BADGE_SUCCESS_BORDER}`,
                }}
              >
                <Star className="w-2.5 h-2.5" />
                {S.SETTINGS_ROLE_RECOMMENDED}
              </span>
            )}
            {!isRecommended && (
              <span
                className="font-mono font-bold px-1.5 py-px"
                style={{
                  fontSize: DS.FONT_NANO,
                  letterSpacing: DS.LS_TIGHT,
                  textTransform: "uppercase",
                  color: d ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                  backgroundColor: d ? hexToRgba("#ffffff", 0.04) : hexToRgba("#000000", 0.04),
                  border: `${DS.BORDER_WIDTH_THIN} solid ${d ? DS.BORDER_SUBTLE : DS.ON_LIGHT_GRAY_200}`,
                }}
              >
                {S.SETTINGS_ROLE_NOT_RECOMMENDED}
              </span>
            )}
            {!enabled && (
              <span
                className="font-mono font-bold px-1.5 py-px"
                style={{
                  fontSize: DS.FONT_NANO,
                  letterSpacing: DS.LS_TIGHT,
                  textTransform: "uppercase",
                  color: DS.DATA_RED,
                  backgroundColor: DS.BADGE_DANGER_BG,
                  border: `${DS.BORDER_WIDTH_THIN} solid ${DS.BADGE_DANGER_BORDER}`,
                }}
              >
                Disabilitata
              </span>
            )}
            {enabled && childFlags.length > 0 && childDisabled > 0 && (
              <span
                className="font-mono font-bold px-1.5 py-px"
                style={{
                  fontSize: DS.FONT_NANO,
                  letterSpacing: DS.LS_TIGHT,
                  textTransform: "uppercase",
                  color: DS.DATA_AMBER,
                  backgroundColor: DS.BADGE_WARNING_BG,
                  border: `${DS.BORDER_WIDTH_THIN} solid ${DS.BADGE_WARNING_BORDER}`,
                }}
              >
                {childDisabled} flag off
              </span>
            )}
          </div>
          <p
            className="font-sans"
            style={{
              fontSize: DS.FONT_SMALL,
              lineHeight: DS.LH_PROSE,
              color: d ? DS.TEXT_TERTIARY : DS.TEXT_MUTED,
              margin: 0,
            }}
          >
            {meta?.description || toggle.description}
          </p>
        </div>

        {/* Toggle */}
        <DSToggle
          checked={enabled}
          onChange={(v) => setAppToggle(toggle.appId, v)}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export function SettingsPage() {
  const { isDark } = useBentoTheme();
  const pendingSync = useIsPendingSync();
  const totalDisabledApps = countDisabledApps();

  // Subscribe for reactivity
  useFeatureFlag(FEATURE_FLAGS[0]?.id ?? "");

  const totalDisabledFlags = countDisabledFlags();
  const totalFlags = FEATURE_FLAGS.length;
  const totalApps = APP_TOGGLES.length;

  const handleResetAll = useCallback(() => {
    resetAllFlags();
  }, []);

  const { displayName, role, avatarId } = useUserProfile();
  const currentRoleDef = USER_ROLES.find((r) => r.id === role) || USER_ROLES[3];

  const handleSetDisplayName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDisplayName(e.target.value);
    },
    []
  );

  /* feat-015: Role change with recommendation dialog */
  const [pendingRole, setPendingRole] = useState<UserRole | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  const handleSetRole = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRole = e.target.value as UserRole;
      setUserRole(newRole);
      // Show apply-recommendations dialog
      setPendingRole(newRole);
      setShowApplyDialog(true);
    },
    []
  );

  const handleApplyRecommendations = useCallback(() => {
    if (!pendingRole) return;
    const allAppIds = APP_TOGGLES.map((t) => t.appId);
    const result = applyRoleRecommendations(pendingRole, setAppToggle, allAppIds);
    const roleDef = USER_ROLES.find((r) => r.id === pendingRole);
    toast.success(S.SETTINGS_ROLE_APPLIED(roleDef?.label || pendingRole), {
      description: `${result.enabled} app attivate, ${result.disabled} disabilitate`,
    });
    setShowApplyDialog(false);
    setPendingRole(null);
  }, [pendingRole]);

  const handleDismissDialog = useCallback(() => {
    setShowApplyDialog(false);
    setPendingRole(null);
  }, []);

  /* feat-015: Apply role recommendations button (without changing role) */
  const handleApplyCurrentRole = useCallback(() => {
    const allAppIds = APP_TOGGLES.map((t) => t.appId);
    const result = applyRoleRecommendations(role, setAppToggle, allAppIds);
    toast.success(S.SETTINGS_ROLE_APPLIED(currentRoleDef.label), {
      description: `${result.enabled} app attivate, ${result.disabled} disabilitate`,
    });
  }, [role, currentRoleDef.label]);

  return (
    <BentoPageShell>
      {/* Header */}
      <BentoHeader
        backTo="/"
        icon={<Settings className="w-5 h-5" style={{ color: isDark ? DS.ACCENT : DS.ON_LIGHT_BG }} />}
        iconBg={DS.ON_LIGHT_BORDER_STRONG}
        iconBgDark={DS.BG_CARD}
        title={S.SETTINGS_TITLE}
        subtitle={S.SETTINGS_SUBTITLE}
      />

      {/* Main */}
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-5 py-6 sm:py-10 space-y-6">

        {/* ── Info banner ── */}
        <div
          className="flex items-start gap-3 p-4"
          style={{
            backgroundColor: isDark ? DS.BADGE_INFO_BG_DIM : DS.BADGE_INFO_BG,
            border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BADGE_INFO_BORDER_DIM : DS.BADGE_INFO_BORDER}`,
          }}
        >
          <Info
            className="w-4 h-4 shrink-0 mt-0.5"
            style={{ color: DS.DATA_BLUE }}
          />
          <div>
            <p
              className="font-sans"
              style={{
                fontSize: DS.FONT_SMALL,
                color: isDark ? DS.TEXT_SECONDARY : DS.TEXT_MUTED,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Gestisci la visibilità delle mini-app nel Launcher.
              Disabilitare un'app la nasconde dalla home e blocca l'accesso diretto via URL.
              Le modifiche si sincronizzano automaticamente con il backend.
            </p>
            {pendingSync && (
              <div
                className="inline-flex items-center gap-1.5 mt-2 font-mono font-bold px-2 py-1"
                style={{
                  fontSize: DS.FONT_TINY,
                  textTransform: "uppercase",
                  color: DS.DATA_AMBER,
                  backgroundColor: DS.BADGE_WARNING_BG,
                  border: `${DS.BORDER_WIDTH_THIN} solid ${DS.BADGE_WARNING_BORDER}`,
                }}
              >
                <CloudOff className="w-3 h-3" />
                Sync in attesa — le modifiche sono salvate localmente
              </div>
            )}
          </div>
        </div>

        {/* ── User profile section ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4" style={{ color: isDark ? DS.DATA_VIOLET : DS.ON_LIGHT_BORDER_STRONG }} />
            <h2
              className="font-mono font-bold"
              style={{
                fontSize: DS.FONT_BASE,
                letterSpacing: DS.LS_WIDE,
                textTransform: "uppercase",
                color: isDark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_BORDER_STRONG,
                margin: 0,
              }}
            >
              Profilo Utente
            </h2>
          </div>

          <div className="space-y-3">
            {/* Display name */}
            <div
              className="p-4"
              style={{
                backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
                border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: DS.FONT_SMALL,
                    letterSpacing: DS.LS_WIDE,
                    textTransform: "uppercase",
                    color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
                  }}
                >
                  Nome Utente
                </span>
              </div>
              <DSInput
                value={displayName}
                onChange={handleSetDisplayName}
                placeholder="Inserisci il tuo nome utente"
              />
            </div>

            {/* feat-130: Avatar picker */}
            <div
              className="p-4"
              style={{
                backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
                border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: DS.FONT_SMALL,
                    letterSpacing: DS.LS_WIDE,
                    textTransform: "uppercase",
                    color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
                  }}
                >
                  Avatar
                </span>
                {avatarId && (
                  <button
                    onClick={() => setAvatarId("")}
                    className="font-mono font-bold px-1.5 py-px transition-opacity hover:opacity-70"
                    style={{
                      fontSize: DS.FONT_NANO,
                      letterSpacing: DS.LS_TIGHT,
                      textTransform: "uppercase",
                      color: DS.DATA_RED,
                      backgroundColor: DS.BADGE_DANGER_BG,
                      border: `${DS.BORDER_WIDTH_THIN} solid ${DS.BADGE_DANGER_BORDER}`,
                    }}
                  >
                    Rimuovi
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {/* Guest option */}
                <button
                  onClick={() => setAvatarId("guest")}
                  className="relative flex-shrink-0 overflow-hidden transition-all hover:opacity-80"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: DS.RADIUS_AVATAR,
                    backgroundColor: isDark ? DS.BG_ELEVATED : DS.ON_LIGHT_GRAY_200,
                    border: avatarId === "guest"
                      ? `${DS.BORDER_WIDTH_THICK} solid ${DS.ACCENT}`
                      : `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                  }}
                  title="Guest"
                >
                  <User className="w-5 h-5 mx-auto" style={{ color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED }} />
                </button>
                {/* Team members */}
                {DEFAULT_TEAM_MEMBERS.map((member) => {
                  const entry = getAvatarEntry(member.id);
                  const isSelected = avatarId === member.id;
                  return (
                    <button
                      key={member.id}
                      onClick={() => setAvatarId(member.id)}
                      className="relative flex-shrink-0 overflow-hidden transition-all hover:opacity-80"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: DS.RADIUS_AVATAR,
                        backgroundColor: member.color,
                        backgroundImage: entry?.gradient || member.gradient || undefined,
                        border: isSelected
                          ? `${DS.BORDER_WIDTH_THICK} solid ${DS.ACCENT}`
                          : `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                      }}
                      title={member.name}
                    >
                      {entry?.img ? (
                        <img
                          src={entry.img}
                          alt={member.name}
                          className="max-w-none"
                          style={{
                            position: "absolute",
                            left: entry.crop?.left ?? "0%",
                            top: entry.crop?.top ?? "0%",
                            width: entry.crop?.width ?? "100%",
                            height: entry.crop?.height ?? "100%",
                            objectFit: "cover",
                            pointerEvents: "none",
                          }}
                        />
                      ) : (
                        <span
                          className="flex items-center justify-center font-mono font-black w-full h-full"
                          style={{ fontSize: 14, color: isDark ? DS.BG_DEEP : DS.ON_LIGHT_BG }}
                        >
                          {member.initials}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {avatarId && avatarId !== "guest" && (() => {
                const sel = DEFAULT_TEAM_MEMBERS.find((m) => m.id === avatarId);
                return sel ? (
                  <p className="font-mono mt-2" style={{ fontSize: DS.FONT_SMALL, color: isDark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_TEXT_SECONDARY }}>
                    {sel.name} — {sel.role || sel.team || "Team"}
                  </p>
                ) : null;
              })()}
            </div>

            {/* Role selector + apply recommendations */}
            <div
              className="p-4"
              style={{
                backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
                border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: DS.FONT_SMALL,
                    letterSpacing: DS.LS_WIDE,
                    textTransform: "uppercase",
                    color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
                  }}
                >
                  {S.SETTINGS_ROLE_CURRENT}
                </span>
                <span
                  className="font-mono font-bold px-1.5 py-px"
                  style={{
                    fontSize: DS.FONT_NANO,
                    letterSpacing: DS.LS_TIGHT,
                    textTransform: "uppercase",
                    color: DS.DATA_VIOLET,
                    backgroundColor: DS.BADGE_ACCENT_BG,
                    border: `${DS.BORDER_WIDTH_THIN} solid ${DS.BADGE_ACCENT_BORDER}`,
                  }}
                >
                  {currentRoleDef.kanji} {currentRoleDef.label}
                </span>
              </div>

              <select
                className="font-mono font-bold w-full cursor-pointer mb-3"
                style={{
                  fontSize: DS.FONT_BASE,
                  letterSpacing: DS.LS_NORMAL,
                  textTransform: "uppercase",
                  color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
                  backgroundColor: isDark ? DS.BG_SURFACE : DS.BRUTALIST_INPUT_BG,
                  border: `${DS.BORDER_WIDTH_MEDIUM} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_GRAY_300}`,
                  padding: "10px 14px",
                  outline: "none",
                }}
                value={role}
                onChange={handleSetRole}
              >
                {USER_ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.kanji} {r.label} — {r.description}
                  </option>
                ))}
              </select>

              {/* Role description + recommended apps preview */}
              <p
                className="font-sans mb-3"
                style={{
                  fontSize: DS.FONT_SMALL,
                  lineHeight: DS.LH_PROSE,
                  color: isDark ? DS.TEXT_TERTIARY : DS.TEXT_MUTED,
                  margin: 0,
                  marginBottom: DS.SPACE_3,
                }}
              >
                {currentRoleDef.description}
              </p>

              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: DS.FONT_TINY,
                    textTransform: "uppercase",
                    letterSpacing: DS.LS_WIDE,
                    color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED,
                  }}
                >
                  App consigliate:
                </span>
                {currentRoleDef.recommendedApps.map((appId) => {
                  const meta = APP_DISPLAY[appId];
                  return (
                    <span
                      key={appId}
                      className="font-mono font-bold px-1.5 py-px"
                      style={{
                        fontSize: DS.FONT_NANO,
                        letterSpacing: DS.LS_TIGHT,
                        textTransform: "uppercase",
                        color: meta?.color || DS.INTERACTIVE,
                        backgroundColor: `${meta?.color || DS.INTERACTIVE}18`,
                        border: `${DS.BORDER_WIDTH_THIN} solid ${meta?.color || DS.INTERACTIVE}40`,
                      }}
                    >
                      {appId}
                    </span>
                  );
                })}
              </div>

              {/* Apply recommendations button */}
              <DSActionButton
                icon={<Sparkles className="w-3 h-3" />}
                onClick={handleApplyCurrentRole}
                variant="secondary"
                style={{ padding: "6px 12px" }}
              >
                {S.SETTINGS_ROLE_APPLY_BTN}
              </DSActionButton>
            </div>

            {/* DevTools notice for non-dev roles */}
            {!currentRoleDef.showDevTools && (
              <div
                className="flex items-start gap-3 p-3"
                style={{
                  backgroundColor: isDark ? DS.BADGE_WARNING_BG_DIM : hexToRgba(DS.DATA_AMBER, 0.08),
                  border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BADGE_WARNING_BORDER_DIM : hexToRgba(DS.DATA_AMBER, 0.2)}`,
                }}
              >
                <ShieldAlert
                  className="w-3.5 h-3.5 shrink-0 mt-0.5"
                  style={{ color: DS.DATA_AMBER }}
                />
                <p
                  className="font-sans"
                  style={{
                    fontSize: DS.FONT_SMALL,
                    color: isDark ? DS.TEXT_SECONDARY : DS.TEXT_MUTED,
                    lineHeight: 1.5,
                    margin: 0,
                  }}
                >
                  {S.SETTINGS_ROLE_DEVTOOLS_NOTICE}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── App Toggles section ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AppWindow className="w-4 h-4" style={{ color: isDark ? DS.DATA_VIOLET : DS.ON_LIGHT_BORDER_STRONG }} />
            <h2
              className="font-mono font-bold"
              style={{
                fontSize: DS.FONT_BASE,
                letterSpacing: DS.LS_WIDE,
                textTransform: "uppercase",
                color: isDark ? DS.TEXT_SECONDARY : DS.ON_LIGHT_BORDER_STRONG,
                margin: 0,
              }}
            >
              App
            </h2>
            <span
              className="font-mono"
              style={{ fontSize: DS.FONT_TINY, color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}
            >
              {totalApps} disponibili
            </span>
            {totalDisabledApps > 0 && (
              <span
                className="font-mono font-bold px-1.5 py-px"
                style={{
                  fontSize: DS.FONT_NANO,
                  textTransform: "uppercase",
                  color: DS.DATA_RED,
                  backgroundColor: DS.BADGE_DANGER_BG,
                  border: `${DS.BORDER_WIDTH_THIN} solid ${DS.BADGE_DANGER_BORDER}`,
                }}
              >
                {totalDisabledApps} off
              </span>
            )}
            <div className="flex-1" />
            <DSActionButton
              icon={<RotateCcw className="w-3 h-3" />}
              onClick={handleResetAll}
              variant="secondary"
              style={{ padding: "4px 10px" }}
            >
              Reset
            </DSActionButton>
          </div>

          <div className="space-y-3">
            {APP_TOGGLES.map((toggle) => (
              <AppToggleCard key={toggle.id} toggle={toggle} currentRole={role} />
            ))}
          </div>
        </div>

        {/* ── Stats summary ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Active apps */}
          <div
            className="p-4"
            style={{
              backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
              border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Power className="w-3 h-3" style={{ color: DS.DATA_GREEN }} />
              <span
                className="font-mono font-bold"
                style={{
                  fontSize: DS.FONT_TINY,
                  letterSpacing: DS.LS_WIDE,
                  textTransform: "uppercase",
                  color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
                }}
              >
                App attive
              </span>
            </div>
            <span
              className="font-mono font-black"
              style={{
                fontSize: DS.FONT_XXLARGE,
                color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
              }}
            >
              {totalApps - totalDisabledApps}
            </span>
            <span
              className="font-mono ml-1"
              style={{ fontSize: DS.FONT_SMALL, color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}
            >
              / {totalApps}
            </span>
          </div>

          {/* Feature flags */}
          <div
            className="p-4"
            style={{
              backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
              border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <ToggleRight className="w-3 h-3" style={{ color: DS.INTERACTIVE }} />
              <span
                className="font-mono font-bold"
                style={{
                  fontSize: DS.FONT_TINY,
                  letterSpacing: DS.LS_WIDE,
                  textTransform: "uppercase",
                  color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
                }}
              >
                Feature flags
              </span>
            </div>
            <span
              className="font-mono font-black"
              style={{
                fontSize: DS.FONT_XXLARGE,
                color: isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG,
              }}
            >
              {totalFlags - totalDisabledFlags}
            </span>
            <span
              className="font-mono ml-1"
              style={{ fontSize: DS.FONT_SMALL, color: isDark ? DS.TEXT_DIM : DS.ON_LIGHT_TEXT_MUTED }}
            >
              / {totalFlags}
            </span>
          </div>

          {/* Sync status */}
          <div
            className="p-4 col-span-2 sm:col-span-1"
            style={{
              backgroundColor: isDark ? DS.BG_CARD : DS.ON_LIGHT_BG,
              border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BORDER_DEFAULT : DS.ON_LIGHT_BORDER}`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-3 h-3" style={{ color: DS.DATA_BLUE }} />
              <span
                className="font-mono font-bold"
                style={{
                  fontSize: DS.FONT_TINY,
                  letterSpacing: DS.LS_WIDE,
                  textTransform: "uppercase",
                  color: isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED,
                }}
              >
                Sync
              </span>
            </div>
            <span
              className="font-mono font-bold"
              style={{
                fontSize: DS.FONT_BASE,
                color: pendingSync ? DS.DATA_AMBER : DS.DATA_GREEN,
              }}
            >
              {pendingSync ? "Pendente" : "Sincronizzato"}
            </span>
          </div>
        </div>

        {/* ── DevTools hint ── */}
        {IS_DEV_ENV && currentRoleDef.showDevTools && (
          <div
            className="flex items-center gap-3 p-3"
            style={{
              backgroundColor: DS.BADGE_ACCENT_BG_DIM,
              border: `${DS.BORDER_WIDTH_THIN} solid ${isDark ? DS.BADGE_ACCENT_BORDER_DIM : hexToRgba(DS.DATA_VIOLET, 0.2)}`,
            }}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" style={{ color: DS.DATA_VIOLET }} />
            <p
              className="font-sans flex-1"
              style={{
                fontSize: DS.FONT_SMALL,
                color: isDark ? DS.TEXT_SECONDARY : DS.TEXT_MUTED,
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              Per la gestione granulare dei singoli feature flag, vai a{" "}
              <Link
                to="/devtools"
                className="font-mono font-bold"
                style={{ color: DS.DATA_VIOLET, textDecoration: "underline" }}
              >
                Dev Tools → Feature Flags
              </Link>
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <BentoFooter dark={isDark} />

      {/* feat-015: Role recommendation dialog */}
      <DSDialog
        open={showApplyDialog}
        onClose={handleDismissDialog}
        title={S.SETTINGS_ROLE_DIALOG_TITLE}
        description={S.SETTINGS_ROLE_DIALOG_DESC(
          USER_ROLES.find((r) => r.id === pendingRole)?.label || ""
        )}
      >
        {/* Preview of recommended apps */}
        <div className="space-y-2 mb-4">
          {APP_TOGGLES.map((toggle) => {
            const isRec = pendingRole
              ? isAppRecommendedForRole(toggle.appId, pendingRole)
              : false;
            const meta = APP_DISPLAY[toggle.appId];
            return (
              <div
                key={toggle.id}
                className="flex items-center gap-2 py-1.5 px-2"
                style={{
                  backgroundColor: isRec
                    ? (isDark ? hexToRgba(DS.DATA_GREEN, 0.08) : hexToRgba(DS.DATA_GREEN, 0.06))
                    : (isDark ? hexToRgba(DS.DATA_RED, 0.06) : hexToRgba(DS.DATA_RED, 0.04)),
                  border: `${DS.BORDER_WIDTH_THIN} solid ${isRec
                    ? (isDark ? hexToRgba(DS.DATA_GREEN, 0.2) : hexToRgba(DS.DATA_GREEN, 0.15))
                    : (isDark ? hexToRgba(DS.DATA_RED, 0.15) : hexToRgba(DS.DATA_RED, 0.1))}`,
                }}
              >
                <span
                  className="font-mono font-bold"
                  style={{
                    fontSize: DS.FONT_SMALL,
                    color: isRec
                      ? (isDark ? DS.TEXT_PRIMARY : DS.ON_LIGHT_BORDER_STRONG)
                      : (isDark ? DS.TEXT_MUTED : DS.ON_LIGHT_TEXT_MUTED),
                    textDecoration: isRec ? "none" : "line-through",
                    textTransform: "uppercase",
                  }}
                >
                  {toggle.label}
                </span>
                <div className="flex-1" />
                <span
                  className="font-mono font-bold px-1.5 py-px"
                  style={{
                    fontSize: DS.FONT_PICO,
                    letterSpacing: DS.LS_TIGHT,
                    textTransform: "uppercase",
                    color: isRec ? DS.DATA_GREEN : DS.DATA_RED,
                  }}
                >
                  {isRec ? "ON" : "OFF"}
                </span>
              </div>
            );
          })}
        </div>
        <DSDialog.Actions>
          <DSActionButton
            onClick={handleDismissDialog}
            variant="secondary"
            style={{ padding: "6px 14px" }}
          >
            {S.SETTINGS_ROLE_CANCEL}
          </DSActionButton>
          <DSActionButton
            icon={<Sparkles className="w-3 h-3" />}
            onClick={handleApplyRecommendations}
            variant="primary"
            style={{ padding: "6px 14px" }}
          >
            {S.SETTINGS_ROLE_APPLY}
          </DSActionButton>
        </DSDialog.Actions>
      </DSDialog>
    </BentoPageShell>
  );
}