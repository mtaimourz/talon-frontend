import { useEffect, useState } from "react";
import type { PlatformStats } from "@/types";
import { api } from "@/lib/api";

// Loads the SIAM headline counts once on mount; null until loaded or on error.
export function usePlatformStats() {
  const [stats, setStats] = useState<PlatformStats | null>(null);

  useEffect(() => {
    api
      .stats()
      .then(setStats)
      .catch(() => setStats(null));
  }, []);

  return stats;
}
