export interface SparklineProps {
  /** Series of values. The trend (last vs first) picks the colour unless `tone` is set. */
  data: number[];
  width?: number;
  height?: number;
  tone?: "up" | "down" | "gold" | "auto";
  /** Fill the area under the line with a soft gradient. */
  area?: boolean;
  class?: string;
}

const stroke = {
  up: "#34d27b",
  down: "#e5565b",
  gold: "#d9b769",
};

/** Lightweight inline trend line — no dependencies, pure SVG. */
export function Sparkline(
  {
    data,
    width = 96,
    height = 32,
    tone = "auto",
    area = false,
    class: className = "",
  }: SparklineProps,
) {
  if (data.length < 2) return <svg width={width} height={height} />;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pad = 2;
  const w = width - pad * 2;
  const h = height - pad * 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * w;
    const y = pad + (1 - (v - min) / span) * h;
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");

  const key = tone === "auto"
    ? (data[data.length - 1] >= data[0] ? "up" : "down")
    : tone;
  const color = stroke[key];
  const gradId = `spark-${key}-${width}-${data.length}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      class={className}
      aria-hidden="true"
    >
      {area && (
        <>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color={color} stop-opacity="0.28" />
              <stop offset="1" stop-color={color} stop-opacity="0" />
            </linearGradient>
          </defs>
          <path
            d={`${line} L${(pad + w).toFixed(1)} ${height - pad} L${pad} ${
              height - pad
            } Z`}
            fill={`url(#${gradId})`}
          />
        </>
      )}
      <path
        d={line}
        stroke={color}
        stroke-width="1.75"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  );
}
