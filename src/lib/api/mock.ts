import { PERMISSIONS, type AuthUser, type PlatformStats, type SiamAssetSummary } from "@/types";
import type { ApiClient } from "./contract";

// In-browser stand-in for the backend so the whole UI runs from `npm run dev`
// with nothing else booted. Swap for the real client via VITE_USE_MOCKS=false.

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_USER: AuthUser = {
  id: "u_1001",
  username: "operator",
  email: "operator@nayatel.com",
  displayName: "SecOps Operator",
  groups: ["secops", "analysts"],
  permissions: [PERMISSIONS.AUDIT_SUBMIT, PERMISSIONS.AUDIT_REVIEW],
};

const MOCK_STATS: PlatformStats = {
  totalAssets: 1287,
  totalDepartments: 42,
  totalCategories: 17,
};

const SAMPLE_ASSET: SiamAssetSummary = {
  siamAssetId: 40255,
  name: "core-fw-dc1",
  ip: "10.20.240.55",
  category: "Network / Firewall",
  company: "Nayatel",
  statusLabel: "Active",
  securityAuditApproved: "Yes",
};

export const mockApi: ApiClient = {
  async login(username) {
    await delay(400);
    return { user: { ...MOCK_USER, username: username.trim() || MOCK_USER.username } };
  },

  async logout() {
    await delay(150);
    return { ok: true };
  },

  async me() {
    // No persisted session in mock mode, so the app opens on the Login screen
    // first — the full designed flow (login -> dashboard) stays visible.
    await delay(150);
    throw new Error("unauthenticated");
  },

  async lookupIp(ip) {
    await delay(500);
    // Deterministic demo rules so every result state is reachable by hand:
    //   *.0  -> not found        *.1 -> found but audit NOT approved
    //   else -> found + approved
    if (ip.endsWith(".0") || ip === "0.0.0.0") return { found: false };
    return {
      found: true,
      asset: {
        ...SAMPLE_ASSET,
        ip,
        securityAuditApproved: ip.endsWith(".1") ? "No" : "Yes",
      },
    };
  },

  async stats() {
    await delay(300);
    return MOCK_STATS;
  },
};
