import type { AuthUser, PlatformStats, SiamLookupResult } from "@/types";
import type { ApiClient } from "./contract";

let refreshInFlight: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (!refreshInFlight) {
    refreshInFlight = fetch("/api/identity/auth/refresh", { method: "POST", credentials: "include" })
      .then((res) => res.ok)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

async function request<T>(path: string, init?: RequestInit, isRetry = false): Promise<T> {
  const res = await fetch(path, {
    credentials: "include",
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  // A 15-minute access token expiring mid-session shouldn't force a re-login —
  // try one silent refresh and replay the original request exactly once.
  if (res.status === 401 && !isRetry && !path.includes("/api/identity/auth/")) {
    const refreshed = await tryRefresh();
    if (refreshed) return request<T>(path, init, true);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `request failed: ${res.status}`);
  }

  return res.json();
}

// Talks to the identity/vmaudit services through the Vite proxy. Active only
// when VITE_USE_MOCKS=false.
export const realApi: ApiClient = {
  login: (username, password) =>
    request<{ user: AuthUser }>("/api/identity/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  logout: () => request<{ ok: boolean }>("/api/identity/auth/logout", { method: "POST" }),
  me: () => request<{ user: AuthUser }>("/api/identity/auth/me"),
  lookupIp: (ip) =>
    request<SiamLookupResult>("/api/vmaudit/audit/lookup", {
      method: "POST",
      body: JSON.stringify({ ip }),
    }),
  stats: () => request<PlatformStats>("/api/vmaudit/stats"),
};
