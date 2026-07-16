import { createContext } from "react";
import type { AuthUser } from "@/types";

export interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Kept in its own module (no component export) so React Fast Refresh stays happy.
export const AuthContext = createContext<AuthContextValue | null>(null);
