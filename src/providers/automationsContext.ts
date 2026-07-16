import { createContext } from "react";

// An automation is a named side-effect a sidebar button (or anything else) can
// fire. Handlers get registered at runtime, so backend-backed automations can
// be plugged in later without touching the components that trigger them.
export interface Automation {
  key: string;
  label: string;
  run: () => void | Promise<void>;
}

export interface AutomationsContextValue {
  /** Register (or replace) the handler for an automation key. */
  register: (automation: Automation) => void;
  /** Fire an automation by key. No-ops with a console notice if unregistered. */
  run: (key: string) => Promise<void>;
  /** Key of the automation currently running, or null. */
  running: string | null;
  /** Whether a handler is registered for a key. */
  has: (key: string) => boolean;
}

export const AutomationsContext = createContext<AutomationsContextValue | null>(null);
