import type { ComponentType } from "react";
import { ShieldIcon, TableIcon, GridIcon } from "@/components/icons";

export type ChipVariant = "accent" | "good" | "warn";

export interface NavItem {
  key: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  variant: ChipVariant;
  active: boolean;
  /** Automation dispatched via useAutomations() when the item is clicked. */
  automation: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: ShieldIcon, variant: "accent", active: true, automation: "open-dashboard" },
  { key: "registry", label: "Registry", icon: TableIcon, variant: "good", active: false, automation: "sync-registry" },
  { key: "departments", label: "Departments", icon: GridIcon, variant: "warn", active: false, automation: "sync-departments" },
];

const CHIP_SHADOW = "shadow-[0_1px_2px_rgba(0,0,0,.14),inset_0_1px_0_rgba(255,255,255,.3)]";
const CHIP_GLOW = "shadow-[0_1px_2px_rgba(0,0,0,.14),inset_0_1px_0_rgba(255,255,255,.3),0_0_12px_var(--accent-wash)]";

export const CHIP_VARIANTS: Record<ChipVariant, string> = {
  accent: `bg-[var(--accent-wash)] text-accent ${CHIP_GLOW}`,
  good: `bg-[var(--good-wash)] text-good ${CHIP_SHADOW}`,
  warn: `bg-[var(--warn-wash)] text-warn ${CHIP_SHADOW}`,
};
