import { Card } from "../ui/Card.tsx";
import { Sparkline } from "../ui/Sparkline.tsx";
import { PriceChange } from "../ui/PriceChange.tsx";
import { MARKET_MOVERS } from "../../data/mock.ts";

const TABS = ["Top Gainers", "Top Losers", "Most Active"];

export function MarketMovers() {
  return (
    <Card
      title="Market Movers"
      action={
        <div class="flex gap-3 text-[11px]">
          {TABS.map((t, i) => (
            <span
              class={i === 0
                ? "font-semibold text-emerald-300"
                : "text-platinum-400 hover:text-ivory"}
            >
              {t}
            </span>
          ))}
        </div>
      }
    >
      <ul class="space-y-3">
        {MARKET_MOVERS.map((m, i) => (
          <li class="flex items-center gap-3">
            <span class="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-obsidian-600 text-[10px] font-bold text-platinum-200">
              {i + 1}
            </span>
            <div class="min-w-0 flex-1">
              <div class="truncate text-sm font-medium text-ivory">
                {m.name}
              </div>
              <div class="nums text-[11px] text-platinum-400">{m.price}</div>
            </div>
            <Sparkline data={m.series} width={56} height={24} tone="up" />
            <div class="w-14 text-right">
              <PriceChange
                value={m.change}
                percent
                arrow={false}
                class="text-xs"
              />
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
