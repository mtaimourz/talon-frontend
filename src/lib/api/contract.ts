import type { AuthUser, PlatformStats, SiamLookupResult } from "@/types";

// The single API surface the UI depends on. Both the real HTTP client and the
// in-browser mock implement this, so swapping between them changes nothing
// upstream in providers, hooks, or components.
export interface ApiClient {
  login(username: string, password: string): Promise<{ user: AuthUser }>;
  logout(): Promise<{ ok: boolean }>;
  me(): Promise<{ user: AuthUser }>;
  lookupIp(ip: string): Promise<SiamLookupResult>;
  stats(): Promise<PlatformStats>;
}
