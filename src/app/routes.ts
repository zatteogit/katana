/**
 * Bento — Router Configuration
 * =============================
 * Routes auto-generated from bento-app-registry.tsx (Φ6 feat-011).
 * RootLayout is static (shell), all page components use React Router
 * native `lazy` for proper loading states via `useNavigation()`.
 *
 * Pages:
 *   /                          -> Launcher (Bento hub)
 *   /katana                    -> Katana crop tool (accesso diretto)
 *   /nigiri                    -> Nigiri (Production Hub)
 *   /mixology                  -> Mixology (Accessible Gradient Generator)
 *   /shiito                    -> Shīto (Report Engine Pro, ex Codex)
 *   /codex                     -> alias per /shiito (#199)
 *   /tempura                   -> Tempura (PPTX Template Converter)
 *   /settings                  -> Settings (App management, #173)
 *   /design-system             -> Design System reference (multi-route, feat-128)
 *   /design-system/colors      -> DS Colors
 *   /design-system/typography  -> DS Typography
 *   /design-system/spacing     -> DS Spacing & Shape
 *   /design-system/elevation   -> DS Depth & Elevation
 *   /design-system/interaction -> DS Interaction
 *   /design-system/motion      -> DS Motion
 *   /design-system/components  -> DS Components
 *   /design-system/data        -> DS Data & Status
 *   /design-system/assets      -> DS Assets & Branding
 *   /design-system/architecture -> DS Under the Hood
 *   /devtools                  -> Bento Dev Tools (only in dev/preview)
 *   *                          -> redirect -> /
 */

import { createBrowserRouter, redirect } from "react-router";
import { RootLayout, HydrateFallback } from "./components/RootLayout";
import { IS_DEV_ENV } from "./components/bento-utils";
import { getRoutableApps, launcherLazy } from "./components/bento-app-registry";
import { loadRemoteFlags, isAppEnabled, setDisabledRedirect } from "./components/feature-flags";
import { getUserRoleDef } from "./components/user-profile";
import { RouteErrorFallback } from "./components/ds/DSErrorBoundary";

console.log("[Bento] routes.ts — all imports resolved OK");

/* ── Generate child routes from registry (exclude design-system — handled manually) ── */
const appRoutes = getRoutableApps(IS_DEV_ENV)
  .filter((app) => app.id !== "design-system")
  .map((app) => ({
    path: app.route.replace(/^\//, ""), // strip leading slash for child route
    lazy: app.lazy,
    ErrorBoundary: RouteErrorFallback,
    // Guard: redirect to launcher if app is disabled via app toggle (#174: toast)
    loader: () => {
      if (app.visibility === "launcher" && !isAppEnabled(app.id)) {
        setDisabledRedirect(app.id);
        return redirect("/");
      }
      // #59 feat-015: gate DevTools by user role (dev only, unless IS_DEV_ENV override)
      if (app.id === "devtools" && !IS_DEV_ENV && !getUserRoleDef().showDevTools) {
        return redirect("/settings");
      }
      return null;
    },
  }));

/* ── feat-128: Design System multi-route (replaces single-page) ── */
const dsLazy = () =>
  import("./components/DesignSystemLayout").then((m) => ({ Component: m.DesignSystemLayout }));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback,
    ErrorBoundary: RouteErrorFallback,
    /* Load feature flags from KV store before first render.
       This ensures flags are available when gated components mount.
       Errors are caught inside loadRemoteFlags — never blocks boot. */
    loader: async () => { await loadRemoteFlags(); return null; },
    children: [
      { index: true, lazy: launcherLazy, ErrorBoundary: RouteErrorFallback },
      ...appRoutes,
      /* feat-128: Design System — single wildcard route, internal section routing
         to avoid AnimatedOutlet re-animating the layout on sub-section changes */
      {
        path: "design-system/*",
        lazy: dsLazy,
        ErrorBoundary: RouteErrorFallback,
      },
      /* #199: /codex alias → redirect to canonical /shiito */
      { path: "codex", loader: () => redirect("/shiito") },
      /* admin/deploy removed in s57 — redirect stale bookmarks */
      { path: "admin/deploy", loader: () => redirect("/") },
      { path: "*", loader: () => redirect("/") },
    ],
  },
]);