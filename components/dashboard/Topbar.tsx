import type { ComponentChildren } from "preact";
import { Logo } from "../Logo.tsx";
import { Icon } from "./Icon.tsx";
import { Tooltip } from "../ui/Tooltip.tsx";
import { USER } from "../../data/mock.ts";

export function Topbar({ title }: { title?: string }) {
  return (
    <header class="flex h-14 shrink-0 items-center gap-3 border-b border-base-300/70 bg-base-100/80 px-3 backdrop-blur-md sm:h-16 sm:px-5">
      {/* Mobile: logo (no sidebar on mobile) */}
      <div class="lg:hidden">
        <Logo variant="mark" size={26} />
      </div>
      {title && (
        <h1 class="truncate font-display text-base font-bold text-base-content sm:hidden">
          {title}
        </h1>
      )}

      {/* Search — full on desktop, icon-only on mobile */}
      <label class="input input-sm relative mx-auto hidden h-9 w-full max-w-md items-center gap-2 rounded-lg border-base-300 bg-base-200 sm:flex">
        <Icon name="search" size={16} class="text-base-content/50" />
        <input
          type="text"
          placeholder="Search markets, stocks, ETFs, currencies..."
          class="grow text-sm"
        />
      </label>

      <div class="ml-auto flex items-center gap-1 sm:ml-0">
        <Tooltip tip="Search" class="sm:hidden">
          <IconButton>
            <Icon name="search" size={18} />
          </IconButton>
        </Tooltip>

        {/* Market status — desktop only */}
        <div class="mr-2 hidden items-center gap-2 lg:flex">
          <span class="h-2 w-2 rounded-full bg-success shadow-[0_0_8px] shadow-success/70" />
          <div class="leading-tight">
            <div class="text-xs font-semibold text-base-content">
              Market Open
            </div>
            <div class="nums text-[10px] text-base-content/50">
              09:45:32 EAT
            </div>
          </div>
        </div>

        <Tooltip tip="Notifications">
          <IconButton>
            <Icon name="bell" size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip tip="Messages" class="hidden sm:block">
          <IconButton>
            <Icon name="mail" size={18} />
          </IconButton>
        </Tooltip>
        <Tooltip tip="Settings" class="hidden sm:block">
          <IconButton>
            <Icon name="gear" size={18} />
          </IconButton>
        </Tooltip>

        {/* User dropdown */}
        <div class="dropdown dropdown-end">
          <div
            tabindex={0}
            role="button"
            class="btn btn-ghost h-auto min-h-0 items-center gap-2 rounded-lg border border-base-300 bg-base-200 py-1 pl-1 pr-1 sm:pr-2"
          >
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-emerald-500 to-gold-500 text-sm font-bold text-obsidian-950">
              {USER.name.split(" ").map((n) => n[0]).join("")}
            </span>
            <span class="hidden leading-tight md:block">
              <span class="block text-xs font-semibold text-base-content">
                {USER.name}
              </span>
              <span class="block text-[10px] text-gold-400">{USER.tier}</span>
            </span>
            <span class="hidden text-base-content/50 md:block">
              <Icon name="chevron" size={16} />
            </span>
          </div>
          <ul
            tabindex={0}
            class="dropdown-content menu z-30 mt-2 w-56 rounded-xl border border-base-300 bg-base-200 p-2 shadow-2xl"
          >
            <li class="menu-title px-3 pb-1">
              <span class="text-base-content/60">Signed in as {USER.name}</span>
            </li>
            <li>
              <a>
                <Icon name="portfolio" size={16} />Profile
              </a>
            </li>
            <li>
              <a href="/settings">
                <Icon name="gear" size={16} />Settings
              </a>
            </li>
            <li>
              <a>
                <Icon name="explore" size={16} />Upgrade plan
              </a>
            </li>
            <div class="divider my-1" />
            <li>
              <a class="text-error">
                <Icon name="trade" size={16} />Sign out
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

function IconButton({ children }: { children: ComponentChildren }) {
  return (
    <button
      type="button"
      class="btn btn-ghost btn-sm btn-square text-base-content/70"
    >
      {children}
    </button>
  );
}
