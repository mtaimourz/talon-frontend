import { useContext } from "react";
import { AutomationsContext } from "@/providers/automationsContext";

export function useAutomations() {
  const ctx = useContext(AutomationsContext);
  if (!ctx) throw new Error("useAutomations must be used within AutomationsProvider");
  return ctx;
}
