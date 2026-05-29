import { Button } from "../ui/Button.tsx";
import { PriceChange } from "../ui/PriceChange.tsx";
import { Icon, type IconName } from "./Icon.tsx";
import { CandlestickChart } from "./CandlestickChart.tsx";
import { ACTIVE_PAIR, CANDLES, TIMEFRAMES } from "../../data/mock.ts";

function HeaderStat({ label, value }: { label: string; value: string }) {
  return (
    <div class="leading-tight">
      <div class="text-[10px] uppercase tracking-wider text-platinum-400">
        {label}
      </div>
      <div class="nums text-sm font-medium text-ivory">{value}</div>
    </div>
  );
}

export function ChartPanel() {
  const p = ACTIVE_PAIR;
  return (
    <section class="flex flex-col overflow-hidden rounded-2xl border border-obsidian-500/60 bg-obsidian-800/80">
      {/* Pair header */}
      <div class="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-obsidian-500/50 px-5 py-4">
        <div class="flex items-center gap-3">
          <span class="grid h-9 w-9 place-items-center rounded-full bg-obsidian-700 text-lg">
            {p.flag}
          </span>
          <div class="leading-tight">
            <div class="font-display text-base font-bold text-ivory">
              {p.pair}
            </div>
            <div class="text-[11px] text-platinum-400">{p.name}</div>
          </div>
        </div>

        <div class="leading-tight">
          <div class="nums text-2xl font-bold text-ivory">
            {p.price.toFixed(4)}
          </div>
          <PriceChange value={p.changeAbs} class="text-xs" decimals={4} />
          <span class="ml-1 text-xs text-emerald-400">({p.change}%)</span>
        </div>

        <div class="flex items-center gap-6">
          <HeaderStat label="24h High" value={p.high24h.toFixed(4)} />
          <HeaderStat label="24h Low" value={p.low24h.toFixed(4)} />
          <HeaderStat label="24h Volume" value={p.volume24h} />
          <HeaderStat label="24h Change" value={`+${p.change}%`} />
        </div>

        <div class="ml-auto flex items-center gap-2">
          <button
            type="button"
            class="grid h-9 w-9 place-items-center rounded-lg text-gold-400 hover:bg-obsidian-700"
            aria-label="Add to watchlist"
          >
            <Icon name="star" size={18} />
          </button>
          <Button variant="secondary" size="sm">Add to Watchlist</Button>
        </div>
      </div>

      {/* Timeframe toolbar */}
      <div class="flex items-center gap-1 border-b border-obsidian-500/50 px-3 py-2">
        {TIMEFRAMES.map((tf) => (
          <button
            type="button"
            class={`nums rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              tf === "1D"
                ? "bg-emerald-500/20 text-emerald-300"
                : "text-platinum-400 hover:bg-obsidian-700 hover:text-ivory"
            }`}
          >
            {tf}
          </button>
        ))}
        <span class="mx-2 h-4 w-px bg-obsidian-500/60" />
        <ToolbarIcon name="indicators" label="Indicators" />
        <ToolbarIcon name="crosshair" />
        <div class="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="sm">TradingView</Button>
          <ToolbarIcon name="expand" />
          <ToolbarIcon name="camera" />
        </div>
      </div>

      {/* Chart */}
      <div class="afriqx-grid bg-obsidian-900/40 px-2 py-3">
        <CandlestickChart
          candles={CANDLES}
          lastPrice={ACTIVE_PAIR.price}
          height={400}
        />
      </div>
    </section>
  );
}

function ToolbarIcon({ name, label }: { name: IconName; label?: string }) {
  return (
    <button
      type="button"
      class="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-platinum-400 transition-colors hover:bg-obsidian-700 hover:text-ivory"
    >
      <Icon name={name} size={16} />
      {label && <span>{label}</span>}
    </button>
  );
}
