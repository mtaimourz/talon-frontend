import { useState } from "react";
import type { SiamAssetSummary } from "@/types";
import { api } from "@/lib/api";

export type LookupState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "not-found"; ip: string }
  | { phase: "found"; asset: SiamAssetSummary }
  | { phase: "error"; message: string };

// Owns the SIAM lookup state machine so the Dashboard view stays declarative.
export function useAssetLookup() {
  const [state, setState] = useState<LookupState>({ phase: "idle" });

  async function lookup(rawIp: string) {
    const target = rawIp.trim();
    if (!target) return;

    setState({ phase: "loading" });
    try {
      const result = await api.lookupIp(target);
      setState(
        result.found
          ? { phase: "found", asset: result.asset }
          : { phase: "not-found", ip: target }
      );
    } catch (err) {
      setState({ phase: "error", message: err instanceof Error ? err.message : "lookup failed" });
    }
  }

  return { state, lookup };
}
