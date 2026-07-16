# Talon Frontend

Standalone frontend for the **Nayatel SecOps** portal — extracted from the
`talon` monorepo. No microservices, no docker, no workspace: just the UI,
running on Vite + React + TypeScript + Tailwind.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

The app boots against an **in-browser mock API** by default, so it runs with no
backend. Sign in with *any* username/password to reach the dashboard.

- `npm run dev` — dev server (mock API)
- `npm run build` — typecheck + production build
- `npm run preview` — serve the production build
- `npm run typecheck` — types only

## Wiring the real backend later

The UI never imports HTTP directly — it depends on one `ApiClient` interface
(`src/lib/api/contract.ts`) with two implementations behind an env flag:

```bash
# .env
VITE_USE_MOCKS=false
```

With mocks off, requests hit the real endpoints through the Vite proxy in
`vite.config.ts` (`/api/identity` → :4001, `/api/vmaudit` → :4002).

## Structure

```
src/
  types/            Domain types (was @talon/shared-types)
  lib/api/          API layer — contract, real client, mock, env switch
  providers/        AuthProvider, AutomationsProvider (+ their contexts)
  hooks/            useAuth, useAutomations, useAssetLookup, usePlatformStats
  components/       Shared UI — AppShell, CyberBackground, icons, sidebar/
  features/         Screens — auth/ (Login), dashboard/ (split into tiles/form/result)
```

Every component stays well under the 300-line limit.

## Sidebar automations

Sidebar buttons dispatch **automations** through `AutomationsProvider` /
`useAutomations()`. Each button carries an automation key (see
`components/sidebar/navItems.ts`). Handlers are registered at runtime:

```ts
const { register } = useAutomations();
register({ key: "sync-registry", label: "Sync Registry", run: async () => { /* ... */ } });
```

Until a handler is registered, clicking a button is a no-op that logs a notice —
the plumbing is in place; the backend-backed handlers plug in later without
touching the sidebar UI.
