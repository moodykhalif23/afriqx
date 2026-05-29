import type { Candle } from "../../data/mock.ts";

export interface CandlestickChartProps {
  candles: Candle[];
  /** Last price to highlight on the axis. */
  lastPrice: number;
  width?: number;
  height?: number;
  class?: string;
}

const UP = "#34d27b";
const DOWN = "#e5565b";
const GRID = "rgba(40,56,47,0.55)";
const AXIS_TEXT = "#8b9694";

/**
 * Dependency-free candlestick chart: price candles with wicks, a volume
 * histogram beneath, a right-hand price axis and a bottom time axis —
 * the centrepiece of the AFRIQX terminal.
 */
export function CandlestickChart(
  {
    candles,
    lastPrice,
    width = 760,
    height = 420,
    class: className = "",
  }: CandlestickChartProps,
) {
  const padR = 56; // price axis
  const padB = 28; // time axis
  const padT = 8;
  const plotW = width - padR;
  const volH = 70; // volume histogram height
  const gap = 10; // gap between price plot and volume
  const priceH = height - padB - volH - gap - padT;

  const highs = candles.map((c) => c.high);
  const lows = candles.map((c) => c.low);
  const max = Math.max(...highs);
  const min = Math.min(...lows);
  const span = max - min || 1;
  const maxVol = Math.max(...candles.map((c) => c.volume));

  const n = candles.length;
  const step = plotW / n;
  const bodyW = Math.max(2, step * 0.6);

  const yPrice = (p: number) => padT + (1 - (p - min) / span) * priceH;
  const volTop = padT + priceH + gap;
  const yVol = (v: number) => volTop + (1 - v / maxVol) * volH;

  // Price gridlines / labels (5 steps)
  const ticks = 5;
  const priceTicks = Array.from({ length: ticks + 1 }, (_, k) => {
    const p = min + (span * k) / ticks;
    return { p, y: yPrice(p) };
  });

  // Time axis labels — month markers across the series
  const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const timeTicks = months.map((m, k) => ({
    m,
    x: (plotW / (months.length - 1)) * k,
  }));

  const lastY = yPrice(lastPrice);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height={height}
      class={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* horizontal gridlines + price labels */}
      {priceTicks.map((t) => (
        <g>
          <line
            x1={0}
            x2={plotW}
            y1={t.y}
            y2={t.y}
            stroke={GRID}
            stroke-width="1"
          />
          <text
            x={plotW + 8}
            y={t.y + 3}
            fill={AXIS_TEXT}
            font-size="10"
            font-family="JetBrains Mono, monospace"
          >
            {t.p.toFixed(4)}
          </text>
        </g>
      ))}

      {/* volume histogram */}
      {candles.map((c) => {
        const x = c.i * step + step / 2;
        const up = c.close >= c.open;
        const vy = yVol(c.volume);
        return (
          <rect
            x={x - bodyW / 2}
            y={vy}
            width={bodyW}
            height={volTop + volH - vy}
            fill={up ? UP : DOWN}
            opacity="0.25"
          />
        );
      })}

      {/* candles */}
      {candles.map((c) => {
        const x = c.i * step + step / 2;
        const up = c.close >= c.open;
        const color = up ? UP : DOWN;
        const yo = yPrice(c.open);
        const yc = yPrice(c.close);
        const top = Math.min(yo, yc);
        const bodyH = Math.max(1, Math.abs(yc - yo));
        return (
          <g>
            <line
              x1={x}
              x2={x}
              y1={yPrice(c.high)}
              y2={yPrice(c.low)}
              stroke={color}
              stroke-width="1"
            />
            <rect
              x={x - bodyW / 2}
              y={top}
              width={bodyW}
              height={bodyH}
              fill={color}
              rx="0.5"
            />
          </g>
        );
      })}

      {/* last-price marker line + tag */}
      <line
        x1={0}
        x2={plotW}
        y1={lastY}
        y2={lastY}
        stroke={UP}
        stroke-width="1"
        stroke-dasharray="4 3"
        opacity="0.8"
      />
      <g>
        <rect
          x={plotW + 2}
          y={lastY - 9}
          width={padR - 4}
          height="18"
          rx="3"
          fill={UP}
        />
        <text
          x={plotW + padR / 2}
          y={lastY + 3}
          fill="#06120b"
          font-size="10"
          font-weight="700"
          text-anchor="middle"
          font-family="JetBrains Mono, monospace"
        >
          {lastPrice.toFixed(4)}
        </text>
      </g>

      {/* time axis */}
      {timeTicks.map((t) => (
        <text
          x={t.x}
          y={height - 8}
          fill={AXIS_TEXT}
          font-size="10"
          font-family="Inter, sans-serif"
          text-anchor={t.x === 0 ? "start" : "middle"}
        >
          {t.m}
        </text>
      ))}
    </svg>
  );
}
