export interface PriceChangeProps {
  /** Signed change value. Sign drives the colour and the arrow. */
  value: number;
  /** Render as a percentage (appends %). */
  percent?: boolean;
  /** Show the ▲ / ▼ triangle. */
  arrow?: boolean;
  /** Decimal places. */
  decimals?: number;
  class?: string;
}

/** Coloured, signed delta — emerald for up, red for down — used everywhere prices move. */
export function PriceChange(
  {
    value,
    percent = false,
    arrow = true,
    decimals = 2,
    class: className = "",
  }: PriceChangeProps,
) {
  const up = value >= 0;
  const color = up ? "text-up" : "text-down";
  const sign = up ? "+" : "−";
  const magnitude = Math.abs(value).toFixed(decimals);

  return (
    <span
      class={`nums inline-flex items-center gap-1 font-medium ${color} ${className}`}
    >
      {arrow && <span class="text-[0.7em] leading-none">{up ? "▲" : "▼"}</span>}
      {sign}
      {magnitude}
      {percent && "%"}
    </span>
  );
}
