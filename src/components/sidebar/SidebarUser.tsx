import type { AuthUser } from "@/types";
import { LogoutIcon } from "@/components/icons";
import { CHIP_VARIANTS } from "./navItems";

export function SidebarUser({ user, onLogout }: { user: AuthUser | null; onLogout: () => void }) {
  return (
    <div className="px-3 py-4 border-t border-border">
      <div className="flex items-center gap-3 px-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center font-disp font-bold text-xs ${CHIP_VARIANTS.accent}`}
        >
          {(user?.displayName ?? user?.username ?? "?").slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="font-sans text-sm truncate">{user?.displayName}</div>
          <div className="font-mono text-[10.5px] text-text-3 truncate">{user?.username}</div>
        </div>
        <button
          onClick={onLogout}
          aria-label="Sign out"
          className="ml-auto text-text-3 hover:text-text transition-colors"
        >
          <LogoutIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
