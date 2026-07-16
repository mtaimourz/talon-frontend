import type { ReactNode } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Sidebar } from "@/components/sidebar/Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-bg text-text flex">
      <Sidebar user={user} onLogout={() => logout()} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
