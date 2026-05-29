import { Logo } from "../Logo.tsx";
import { PriceChange } from "../ui/PriceChange.tsx";
import { Icon } from "./Icon.tsx";
import { TICKER } from "../../data/mock.ts";

export function TickerBar() {
  return (
    <footer class="flex h-12 shrink-0 items-center gap-5 border-t border-obsidian-500/60 bg-obsidian-850 px-5">
      <div class="flex shrink-0 items-center gap-2">
        <Logo variant="mark" size={20} />
        <span class="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-platinum-400 xl:inline">
          African Markets. African Value.{" "}
          <span class="text-emerald-400">African Future.</span>
        </span>
      </div>

      <div class="flex flex-1 items-center gap-6 overflow-x-auto">
        {TICKER.map((t) => (
          <div class="flex shrink-0 items-center gap-2 text-xs">
            <span class="font-semibold text-platinum-300">{t.label}</span>
            <span class="nums text-ivory">{t.value}</span>
            <PriceChange value={t.change} percent class="text-[11px]" />
          </div>
        ))}
      </div>

      <button
        type="button"
        class="flex shrink-0 items-center gap-1.5 rounded-lg border border-obsidian-500/60 px-3 py-1.5 text-xs text-platinum-300 hover:border-obsidian-400 hover:text-ivory"
      >
        <Icon name="gear" size={14} />
        Customize Dashboard
      </button>
    </footer>
  );
}
