/**
 * user-profile.ts — Profilazione utente Bento (#59 Φ6)
 * =====================================================
 * Sistema di ruoli utente per personalizzare la visibilità delle app
 * e l'esperienza complessiva. Persistenza localStorage + hook React.
 *
 * Ruoli:
 *   - designer:  Focus su Katana, Nigiri, Mixology (produzione asset)
 *   - producer:  Focus su Nigiri, Katana (gestione produzioni)
 *   - lead:      Tutto tranne DevTools (supervisione)
 *   - dev:       Tutto incluso DevTools (sviluppo)
 *
 * @bento-manual-edit — rileggere prima di qualsiasi modifica
 */

import { useSyncExternalStore } from "react";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type UserRole = "designer" | "producer" | "lead" | "dev";

export interface UserRoleDef {
  id: UserRole;
  label: string;
  kanji: string;
  description: string;
  /** Suggested app IDs to enable (all others get disabled) */
  recommendedApps: string[];
  /** Whether DevTools should be visible */
  showDevTools: boolean;
}

export interface UserProfile {
  role: UserRole;
  displayName: string;
  /** Team avatar ID from TEAM_AVATAR_REGISTRY, or "guest" for generic */
  avatarId: string;
  /** ISO timestamp of last role change */
  updatedAt: string;
}

/* ------------------------------------------------------------------ */
/* Role definitions                                                    */
/* ------------------------------------------------------------------ */

export const USER_ROLES: UserRoleDef[] = [
  {
    id: "designer",
    label: "Designer",
    kanji: "デザ",
    description: "Produzione asset: crop immagini, gradienti, template. Focus su qualità visiva.",
    recommendedApps: ["katana", "nigiri", "mixology"],
    showDevTools: false,
  },
  {
    id: "producer",
    label: "Producer",
    kanji: "プロデ",
    description: "Gestione produzioni fotografiche, tracking asset, reportistica.",
    recommendedApps: ["katana", "nigiri", "shiito"],
    showDevTools: false,
  },
  {
    id: "lead",
    label: "Lead",
    kanji: "リード",
    description: "Supervisione team, tutte le app attive, report avanzati.",
    recommendedApps: ["katana", "nigiri", "mixology", "shiito", "tempura"],
    showDevTools: false,
  },
  {
    id: "dev",
    label: "Developer",
    kanji: "デブ",
    description: "Accesso completo incluso DevTools, feature flags, regression suite.",
    recommendedApps: ["katana", "nigiri", "mixology", "shiito", "tempura"],
    showDevTools: true,
  },
];

/* ------------------------------------------------------------------ */
/* Persistence                                                         */
/* ------------------------------------------------------------------ */

const LS_KEY = "bento-user-profile";

const DEFAULT_PROFILE: UserProfile = {
  role: "dev",
  displayName: "",
  avatarId: "",
  updatedAt: new Date().toISOString(),
};

let _cache: UserProfile | null = null;
const _listeners = new Set<() => void>();

function _notify() {
  for (const cb of _listeners) cb();
}

function _load(): UserProfile {
  if (_cache) return _cache;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Migrate: older profiles may lack avatarId
      _cache = { ...DEFAULT_PROFILE, ...parsed };
      return _cache!;
    }
  } catch {
    // corrupt storage
  }
  _cache = { ...DEFAULT_PROFILE };
  return _cache;
}

function _save(profile: UserProfile) {
  _cache = profile;
  localStorage.setItem(LS_KEY, JSON.stringify(profile));
  _notify();
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/** Get current user profile */
export function getUserProfile(): UserProfile {
  return _load();
}

/** Get current role */
export function getUserRole(): UserRole {
  return _load().role;
}

/** Get role definition for current role */
export function getUserRoleDef(): UserRoleDef {
  const role = getUserRole();
  return USER_ROLES.find((r) => r.id === role) || USER_ROLES[3]; // fallback to dev
}

/** Set user role (triggers re-render in useUserProfile) */
export function setUserRole(role: UserRole) {
  const current = _load();
  _save({ ...current, role, updatedAt: new Date().toISOString() });
}

/** Set display name */
export function setDisplayName(name: string) {
  const current = _load();
  _save({ ...current, displayName: name, updatedAt: new Date().toISOString() });
}

/** Set avatar ID (team member id or "guest" or "" for none) — feat-130 */
export function setAvatarId(avatarId: string) {
  const current = _load();
  _save({ ...current, avatarId, updatedAt: new Date().toISOString() });
}

/** Get avatar ID */
export function getAvatarId(): string {
  return _load().avatarId;
}

/** Reset profile to defaults */
export function resetUserProfile() {
  _save({ ...DEFAULT_PROFILE, updatedAt: new Date().toISOString() });
}

/**
 * Apply role-based app recommendations.
 * Enables apps in the role's recommendedApps list, disables others.
 * @returns count of apps toggled
 */
export function applyRoleRecommendations(
  role: UserRole,
  setAppToggleFn: (appId: string, enabled: boolean) => void,
  allAppIds: string[],
): { enabled: number; disabled: number } {
  const roleDef = USER_ROLES.find((r) => r.id === role) || USER_ROLES[3];
  const recommended = new Set(roleDef.recommendedApps);
  let enabled = 0;
  let disabled = 0;
  for (const appId of allAppIds) {
    if (recommended.has(appId)) {
      setAppToggleFn(appId, true);
      enabled++;
    } else {
      setAppToggleFn(appId, false);
      disabled++;
    }
  }
  return { enabled, disabled };
}

/**
 * Check if an app is recommended for the given role.
 */
export function isAppRecommendedForRole(appId: string, role?: UserRole): boolean {
  const r = role || getUserRole();
  const roleDef = USER_ROLES.find((rd) => rd.id === r) || USER_ROLES[3];
  return roleDef.recommendedApps.includes(appId);
}

/* ------------------------------------------------------------------ */
/* React hooks                                                         */
/* ------------------------------------------------------------------ */

function subscribe(cb: () => void) {
  _listeners.add(cb);
  return () => { _listeners.delete(cb); };
}

/** Hook: reactive user profile */
export function useUserProfile(): UserProfile {
  return useSyncExternalStore(subscribe, getUserProfile, getUserProfile);
}

/** Hook: reactive user role */
export function useUserRole(): UserRole {
  return useSyncExternalStore(
    subscribe,
    getUserRole,
    getUserRole,
  );
}

/** Hook: reactive role definition */
export function useUserRoleDef(): UserRoleDef {
  return useSyncExternalStore(
    subscribe,
    getUserRoleDef,
    getUserRoleDef,
  );
}