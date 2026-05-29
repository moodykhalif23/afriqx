import { PriceChange } from "./PriceChange.tsx";
import { Sparkline } from "./Sparkline.tsx";

export interface StatProps {
  /** Index / instrument name, e.g. "AFQX 50". */
  label: string;
  /** Current value, pre-formatted. */
  value: string;
  /** Signed percentage change. */
  change?: number;
  /** Optional sparkline series. */
  series?: number[];
  class?: string;
}

/**
 * A single market read-out — the unit repeated across the top index strip
 * and ticker bar: label, big tabular value, signed change, optional trend.
 */
export function Stat(
  { label, value, change, series, class: className = "" }: StatProps,
) {
  return (
    <div class={`flex items-center justify-between gap-4 ${className}`}>
      <div class="min-w-0">
        <div class="text-[11px] font-medium uppercase tracking-wider text-platinum-400 truncate">
          {label}
        </div>
        <div class="mt-1 flex items-baseline gap-2">
          <span class="nums text-lg font-semibold text-ivory">{value}</span>
          {change !== undefined && (
            <PriceChange value={change} percent arrow={false} class="text-xs" />
          )}
        </div>
      </div>
      {series && series.length > 1 && (
        <Sparkline data={series} width={72} height={28} />
      )}
    </div>
  );
}
