import type { LookupState } from "@/hooks/useAssetLookup";

export function AuditResult({ state }: { state: LookupState }) {
  if (state.phase === "not-found") {
    return (
      <div className="mt-6 border-l-[3px] border-bad bg-bad-wash px-5 py-4 shadow-sm">
        <div className="font-mono text-sm text-bad font-semibold">Not in SIAM</div>
        <div className="font-mono text-xs text-text-2 mt-1">
          {state.ip} isn't a known asset. Get it registered before it can be audited.
        </div>
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <div className="mt-6 border-l-[3px] border-bad bg-bad-wash px-5 py-4 shadow-sm font-mono text-sm text-bad">
        {state.message}
      </div>
    );
  }

  if (state.phase === "found") {
    const { asset } = state;
    const approved = asset.securityAuditApproved === "Yes";
    return (
      <div
        className={`mt-6 border-l-[3px] bg-surface px-5 py-4 shadow-sm ${approved ? "border-good" : "border-warn"}`}
      >
        <div className="flex items-baseline justify-between">
          <div className="font-mono font-bold text-lg">{asset.ip}</div>
          <div className="font-mono text-xs text-text-3">#{asset.siamAssetId}</div>
        </div>
        <div className="font-sans text-sm mt-1">{asset.name}</div>
        <div className="font-mono text-xs text-text-2 mt-3 space-y-1.5">
          <div>{asset.category} · {asset.company}</div>
          <div>status: {asset.statusLabel}</div>
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${approved ? "bg-good" : "bg-warn"}`} />
            security audit approved:{" "}
            <span className={approved ? "text-good" : "text-warn"}>
              {asset.securityAuditApproved || "no"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
