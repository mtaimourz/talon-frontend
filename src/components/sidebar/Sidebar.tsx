import type { AuthUser } from "@/types";
import { SidebarNav } from "./SidebarNav";
import { SidebarUser } from "./SidebarUser";

export function Sidebar({ user, onLogout }: { user: AuthUser | null; onLogout: () => void }) {
  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col border-r border-border bg-surface">
      <div className="px-5 py-5 relative">
        <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-accent/60 via-accent/10 to-transparent" />
        <div className="font-disp font-extrabold text-lg tracking-tight">Nayatel SecOps</div>
        <div className="font-mono text-[9.5px] uppercase tracking-[.15em] text-text-3 mt-1">
          Security Operations Portal
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-accent bg-[var(--accent-wash)] border border-accent/25 rounded px-1.5 py-0.5">
          <span className="w-1 h-1 rounded-full bg-accent" />
          Talon
        </div>
      </div>

      <SidebarNav />

      <div className="px-5 pb-2">
        <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-text-3">
          <span className="w-1.5 h-1.5 rounded-full bg-good shadow-[0_0_5px_var(--good)]" />
          systems operational
        </div>
      </div>

      <SidebarUser user={user} onLogout={onLogout} />
    </aside>
  );
}
