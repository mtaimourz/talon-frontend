// Domain types for the Talon SecOps portal. Inlined from the former
// @talon/shared-types workspace package so the frontend stands alone.

// Permission keys are the single vocabulary both backend (enforcement) and
// frontend (show/hide UI only — never the real gate) agree on.
export const PERMISSIONS = {
  AUDIT_SUBMIT: "audit:submit",
  AUDIT_REVIEW: "audit:review",
  RUBRIC_EDIT: "rubric:edit",
  USERS_MANAGE: "users:manage",
  BACKUP_MANAGE: "backup:manage",
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  displayName: string;
  groups: string[];
  permissions: PermissionKey[];
}

export interface SiamAssetSummary {
  siamAssetId: number;
  name: string;
  ip: string;
  category: string;
  company: string;
  statusLabel: string;
  securityAuditApproved: string;
}

export type SiamLookupResult =
  | { found: true; asset: SiamAssetSummary }
  | { found: false };

export interface PlatformStats {
  totalAssets: number;
  totalDepartments: number;
  totalCategories: number;
}
