import { useAutomations } from "@/hooks/useAutomations";
import { NAV_ITEMS, CHIP_VARIANTS } from "./navItems";

// Renders the nav exactly as designed. Each item dispatches its automation
// through the provider on click — handlers are stubbed until the backend lands.
export function SidebarNav() {
  const { run } = useAutomations();

  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.key}
            onClick={() => run(item.automation)}
            className={`flex items-center gap-3 px-2 py-2 rounded-md ${
              item.active ? "bg-[var(--accent-wash)]" : "opacity-60 cursor-default"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${CHIP_VARIANTS[item.variant]}`}>
              <Icon className="w-4 h-4" />
            </div>
            <span className={`font-sans text-sm ${item.active ? "text-accent font-semibold" : "text-text-2"}`}>
              {item.label}
            </span>
            {!item.active && (
              <span className="ml-auto font-mono text-[9.5px] uppercase tracking-wide text-text-3 border border-border rounded-full px-1.5 py-0.5">
                soon
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
