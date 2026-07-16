import type { PlatformStats } from "@/types";
import { ServerIcon, TableIcon, GridIcon } from "@/components/icons";

const STAT_TILES = [
  { key: "totalAssets", label: "Assets in SIAM", icon: ServerIcon, variant: "accent" as const },
  { key: "totalDepartments", label: "Departments", icon: TableIcon, variant: "good" as const },
  { key: "totalCategories", label: "Categories", icon: GridIcon, variant: "warn" as const },
] as const;

const TILE_VARIANTS = {
  accent: "bg-[var(--accent-wash)] text-accent",
  good: "bg-[var(--good-wash)] text-good",
  warn: "bg-[var(--warn-wash)] text-warn",
} as const;

export function StatTiles({ stats }: { stats: PlatformStats | null }) {
  return (
    <div className="grid grid-cols-3 gap-4 mb-14">
      {STAT_TILES.map((tile) => {
        const Icon = tile.icon;
        const value = stats?.[tile.key];
        return (
          <div key={tile.key} className="border border-border bg-surface p-4 shadow-sm">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center mb-3 shadow-[0_1px_2px_rgba(0,0,0,.1),inset_0_1px_0_rgba(255,255,255,.3)] ${TILE_VARIANTS[tile.variant]}`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div className="font-disp font-extrabold text-2xl tabular-nums tracking-tight">
              {value ?? "—"}
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-wider text-text-3 mt-1">
              {tile.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
