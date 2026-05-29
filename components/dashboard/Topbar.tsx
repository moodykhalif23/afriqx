import type { ComponentChildren } from "preact";
import { Icon } from "./Icon.tsx";
import { USER } from "../../data/mock.ts";

export function Topbar() {
  return (
    <header class="flex h-16 shrink-0 items-center gap-4 border-b border-obsidian-500/60 bg-obsidian-900/80 px-5 backdrop-blur-md">
      {/* Search */}
      <div class="relative mx-auto w-full max-w-md">
        <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-platinum-400">
          <Icon name="search" size={16} />
        </span>
        <input
          type="text"
          placeholder="Search markets, stocks, ETFs, currencies..."
          class="h-9 w-full rounded-lg border border-obsidian-500/70 bg-obsidian-800 pl-9 pr-3 text-sm text-ivory placeholder:text-platinum-400 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
        />
      </div>

      {/* Market status */}
      <div class="hidden items-center gap-2 lg:flex">
        <span class="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400/70" />
        <div class="leading-tight">
          <div class="text-xs font-semibold text-ivory">Market Open</div>
          <div class="nums text-[10px] text-platinum-400">09:45:32 EAT</div>
        </div>
      </div>

      {/* Actions */}
      <div class="flex items-center gap-1">
        <IconButton>
          <Icon name="bell" size={18} />
        </IconButton>
        <IconButton>
          <Icon name="mail" size={18} />
        </IconButton>
        <IconButton>
          <Icon name="gear" size={18} />
        </IconButton>
      </div>

      {/* User */}
      <button
        type="button"
        class="flex items-center gap-2 rounded-lg border border-obsidian-500/60 bg-obsidian-800 py-1 pl-1 pr-2 hover:border-obsidian-400"
      >
        <span class="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-emerald-500 to-gold-500 text-sm font-bold text-obsidian-950">
          {USER.name.split(" ").map((n) => n[0]).join("")}
        </span>
        <span class="hidden leading-tight sm:block">
          <span class="block text-xs font-semibold text-ivory">
            {USER.name}
          </span>
          <span class="block text-[10px] text-gold-400">{USER.tier}</span>
        </span>
        <span class="text-platinum-400">
          <Icon name="chevron" size={16} />
        </span>
      </button>
    </header>
  );
}

function IconButton({ children }: { children: ComponentChildren }) {
  return (
    <button
      type="button"
      class="grid h-9 w-9 place-items-center rounded-lg text-platinum-300 transition-colors hover:bg-obsidian-700 hover:text-ivory"
    >
      {children}
    </button>
  );
}
