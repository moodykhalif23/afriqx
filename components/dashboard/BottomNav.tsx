import { Icon, type IconName } from "./Icon.tsx";

/**
 * Mobile bottom navigation (shown below `lg`). Mirrors the app mock:
 * Home · Markets · centre Trade FAB · Portfolio · More.
 * All targets are ≥56px tall for comfortable thumb reach.
 */
export function BottomNav({ active }: { active: string }) {
  const items: { label: string; icon: IconName; href: string }[] = [
    { label: "Home", icon: "dashboard", href: "/" },
    { label: "Markets", icon: "markets", href: "/markets" },
    { label: "Portfolio", icon: "portfolio", href: "/portfolio" },
    { label: "More", icon: "orders", href: "#" },
  ];
  // Split around the centre FAB (Trade).
  const left = items.slice(0, 2);
  const right = items.slice(2);

  return (
    <nav class="relative z-20 flex h-16 shrink-0 items-stretch border-t border-obsidian-500/60 bg-obsidian-850 pb-[env(safe-area-inset-bottom)] lg:hidden">
      {left.map((it) => <Tab key={it.label} {...it} active={active} />)}

      {/* Centre Trade FAB */}
      <div class="relative flex w-1/5 items-start justify-center">
        <a
          href="/trade"
          aria-label="Trade"
          aria-current={active === "Trade" ? "page" : undefined}
          class="absolute -top-5 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-obsidian-950 shadow-lg shadow-emerald-900/50 ring-4 ring-obsidian-850 active:bg-emerald-400"
        >
          <Icon name="trade" size={24} />
        </a>
        <span class="mt-9 text-[10px] font-medium text-platinum-400">
          Trade
        </span>
      </div>

      {right.map((it) => <Tab key={it.label} {...it} active={active} />)}
    </nav>
  );
}

function Tab(
  { label, icon, href, active }: {
    label: string;
    icon: IconName;
    href: string;
    active: string;
  },
) {
  const isActive = label === active ||
    (label === "Home" && active === "Dashboard");
  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      class={`flex w-1/5 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors ${
        isActive ? "text-emerald-300" : "text-platinum-400 active:text-ivory"
      }`}
    >
      <Icon name={icon} size={22} />
      <span class="truncate">{label}</span>
    </a>
  );
}
