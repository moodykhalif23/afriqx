import { Icon, type IconName } from "./Icon.tsx";

/**
 * Mobile bottom navigation (shown below `lg`). Mirrors the app mock:
 * Home · Markets · centre Trade FAB · Portfolio · More (dropdown).
 * All targets are ≥56px tall for comfortable thumb reach.
 */
export function BottomNav({ active }: { active: string }) {
  const more: { label: string; icon: IconName; href: string }[] = [
    { label: "Watchlist", icon: "watchlist", href: "/watchlist" },
    { label: "Orders", icon: "orders", href: "/orders" },
    { label: "Analytics", icon: "analytics", href: "/analytics" },
    { label: "News & Insights", icon: "news", href: "/news" },
    { label: "AFX Explore", icon: "explore", href: "/explore" },
    { label: "Settings", icon: "settings", href: "/settings" },
  ];
  const moreActive = more.some((m) => m.label === active);

  return (
    <nav class="relative z-20 flex h-16 shrink-0 items-stretch border-t border-base-300/70 bg-base-200 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <Tab label="Home" icon="dashboard" href="/" active={active} />
      <Tab label="Markets" icon="markets" href="/markets" active={active} />

      {/* Centre Trade FAB */}
      <div class="relative flex w-1/5 items-start justify-center">
        <a
          href="/trade"
          aria-label="Trade"
          aria-current={active === "Trade" ? "page" : undefined}
          class="absolute -top-5 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-content shadow-lg shadow-emerald-900/50 ring-4 ring-base-200 active:bg-accent"
        >
          <Icon name="trade" size={24} />
        </a>
        <span class="mt-9 text-[10px] font-medium text-base-content/50">
          Trade
        </span>
      </div>

      <Tab
        label="Portfolio"
        icon="portfolio"
        href="/portfolio"
        active={active}
      />

      {/* More — dropdown opening upward */}
      <div class="dropdown dropdown-top dropdown-end w-1/5">
        <div
          tabindex={0}
          role="button"
          class={`flex h-full w-full flex-col items-center justify-center gap-1 text-[10px] font-medium ${
            moreActive ? "text-accent" : "text-base-content/50"
          }`}
        >
          <Icon name="orders" size={22} />
          <span>More</span>
        </div>
        <ul
          tabindex={0}
          class="dropdown-content menu z-30 mb-2 w-52 rounded-xl border border-base-300 bg-base-200 p-2 shadow-2xl"
        >
          {more.map((m) => (
            <li key={m.label}>
              <a
                href={m.href}
                class={m.label === active ? "menu-active text-accent" : ""}
              >
                <Icon name={m.icon} size={16} />
                {m.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
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
        isActive
          ? "text-accent"
          : "text-base-content/50 active:text-base-content"
      }`}
    >
      <Icon name={icon} size={22} />
      <span class="truncate">{label}</span>
    </a>
  );
}
