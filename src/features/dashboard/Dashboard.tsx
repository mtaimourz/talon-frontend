import { AppShell } from "@/components/AppShell";
import { usePlatformStats } from "@/hooks/usePlatformStats";
import { useAssetLookup } from "@/hooks/useAssetLookup";
import { StatTiles } from "./StatTiles";
import { AuditForm } from "./AuditForm";
import { AuditResult } from "./AuditResult";

export default function Dashboard() {
  const stats = usePlatformStats();
  const { state, lookup } = useAssetLookup();

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <p className="font-mono text-[11px] uppercase tracking-widest text-text-3 mb-4">Live · SIAM</p>

        <StatTiles stats={stats} />

        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-widest text-text-3 mb-2">Submit a machine</p>
          <h1 className="font-disp font-extrabold text-4xl tracking-tight mb-8">Clear it or kill it.</h1>

          <AuditForm loading={state.phase === "loading"} onSubmit={lookup} />
          <AuditResult state={state} />
        </div>
      </div>
    </AppShell>
  );
}
