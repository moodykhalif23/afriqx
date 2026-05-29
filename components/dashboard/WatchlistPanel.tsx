import { Card } from "../ui/Card.tsx";
import { PriceChange } from "../ui/PriceChange.tsx";
import { WATCHLIST } from "../../data/mock.ts";

const DOT_COLORS = [
  "#e5565b",
  "#c79b3f",
  "#1fae5f",
  "#34d27b",
  "#5fd99a",
  "#8b9694",
  "#15833f",
  "#d9b769",
];

export function WatchlistPanel() {
  return (
    <Card title="Watchlist" action={<a href="#">View all</a>}>
      <div class="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-platinum-400">
        <span>Symbol</span>
        <div class="flex gap-8">
          <span>Last Price</span>
          <span>24h Change</span>
        </div>
      </div>
      <ul class="space-y-2.5">
        {WATCHLIST.map((h, i) => (
          <li class="flex items-center gap-3">
            <span
              class="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-bold text-obsidian-950"
              style={{ backgroundColor: DOT_COLORS[i % DOT_COLORS.length] }}
            >
              {h.symbol.slice(0, 2)}
            </span>
            <div class="min-w-0 flex-1">
              <div class="truncate text-sm font-medium text-ivory">
                {h.name}
              </div>
            </div>
            <div class="nums text-right text-sm text-platinum-200">
              {h.price}
            </div>
            <div class="w-16 text-right">
              <PriceChange
                value={h.change}
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
