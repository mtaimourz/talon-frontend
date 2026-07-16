import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { AutomationsContext, type Automation } from "./automationsContext";

export function AutomationsProvider({ children }: { children: ReactNode }) {
  const registry = useRef<Map<string, Automation>>(new Map());
  const [running, setRunning] = useState<string | null>(null);

  const register = useCallback((automation: Automation) => {
    registry.current.set(automation.key, automation);
  }, []);

  const has = useCallback((key: string) => registry.current.has(key), []);

  const run = useCallback(async (key: string) => {
    const automation = registry.current.get(key);
    if (!automation) {
      // No handler wired yet — this is exactly where a backend-backed
      // automation will hook in once the services exist.
      console.info(`[automations] "${key}" has no handler yet (backend pending).`);
      return;
    }
    try {
      setRunning(key);
      await automation.run();
    } finally {
      setRunning(null);
    }
  }, []);

  const value = useMemo(
    () => ({ register, run, running, has }),
    [register, run, running, has]
  );

  return <AutomationsContext.Provider value={value}>{children}</AutomationsContext.Provider>;
}
