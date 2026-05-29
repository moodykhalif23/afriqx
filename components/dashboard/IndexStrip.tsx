import { Sparkline } from "../ui/Sparkline.tsx";
import { PriceChange } from "../ui/PriceChange.tsx";
import { AFXI, INDEXES } from "../../data/mock.ts";

export function IndexStrip() {
  const items = [
    ...INDEXES.slice(0, 5).map((ix) => ({
      label: ix.symbol,
      value: ix.value.toLocaleString("en-US", { minimumFractionDigits: 2 }),
      change: ix.change,
      series: ix.series,
    })),
    {
      label: `${AFXI.symbol} (African FX Index)`,
      value: AFXI.value.toFixed(2),
      change: AFXI.change,
      series: [97.1, 97.6, 97.3, 98.0, 98.2, 97.9, 98.4, 98.65],
    },
  ];

  return (
    <div class="grid grid-cols-2 overflow-hidden rounded-xl border border-obsidian-500/60 bg-obsidian-800/80 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((it, idx) => (
        <div
          class={`flex items-center justify-between gap-2 px-5 py-4 ${
            idx % 2 === 0 ? "border-r border-obsidian-500/40" : ""
          } ${
            idx < items.length - 2
              ? "border-b border-obsidian-500/40 lg:border-b-0"
              : ""
          } lg:border-r lg:last:border-r-0`}
        >
          <div class="min-w-0">
            <div class="truncate text-[10px] font-semibold uppercase tracking-wider text-platinum-400">
              {it.label}
            </div>
            <div class="mt-0.5 nums text-sm font-semibold text-ivory">
              {it.value}
            </div>
            <PriceChange
              value={it.change}
              percent
              arrow={false}
              class="text-[11px]"
            />
          </div>
          <Sparkline data={it.series} width={56} height={26} />
        </div>
      ))}
    </div>
  );
}
