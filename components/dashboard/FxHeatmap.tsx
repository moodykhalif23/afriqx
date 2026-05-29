import { Card } from "../ui/Card.tsx";
import { PriceChange } from "../ui/PriceChange.tsx";
import { FX_HEATMAP } from "../../data/mock.ts";

/** Stylised low-poly Africa silhouette with strength-coloured regions. */
function AfricaMap() {
  // Region blobs positioned over a simplified continent. Colour = FX strength.
  const regions = [
    { d: "M120 18 L168 26 L172 54 L150 64 L116 52 L108 30 Z", fill: "#15833f" }, // N Africa (EGP)
    { d: "M70 40 L116 52 L120 78 L92 92 L66 76 L58 52 Z", fill: "#1fae5f" }, // W Africa (NGN)
    {
      d: "M150 64 L172 54 L190 84 L168 104 L148 92 L150 64 Z",
      fill: "#0f6531",
    }, // E/Horn (ETB weak edge)
    {
      d: "M92 92 L120 78 L148 92 L150 120 L120 140 L96 122 Z",
      fill: "#34d27b",
    }, // Central (KES)
    {
      d: "M120 140 L150 120 L156 150 L138 178 L112 168 L108 146 Z",
      fill: "#15833f",
    }, // South-central
    { d: "M112 168 L138 178 L130 200 L106 196 L100 176 Z", fill: "#1fae5f" }, // South (ZAR)
    { d: "M148 92 L168 104 L172 132 L150 120 Z", fill: "#c79b3f" }, // E coast (GHS-ish neutral)
    { d: "M150 120 L172 132 L162 156 L156 150 Z", fill: "#e5565b" }, // weak pocket
  ];
  return (
    <svg viewBox="40 0 170 210" class="h-44 w-full" aria-hidden="true">
      <g stroke="#0a0e0c" stroke-width="1.2" stroke-linejoin="round">
        {regions.map((r) => <path d={r.d} fill={r.fill} opacity="0.92" />)}
      </g>
    </svg>
  );
}

function LegendGroup(
  { label, color, items }: {
    label: string;
    color: string;
    items: { code: string; change: number }[];
  },
) {
  return (
    <div>
      <div class="mb-1.5 flex items-center gap-1.5">
        <span class="h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />
        <span class="text-[10px] font-semibold uppercase tracking-wider text-platinum-300">
          {label}
        </span>
      </div>
      <ul class="space-y-1">
        {items.map((it) => (
          <li class="flex items-center justify-between gap-2">
            <span class="nums text-xs font-medium text-ivory">{it.code}</span>
            <PriceChange
              value={it.change}
              percent
              arrow={false}
              class="text-[11px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FxHeatmap() {
  return (
    <Card title="African FX Heatmap" action={<a href="#">View full map</a>}>
      <div class="flex gap-3">
        <div class="flex-1">
          <AfricaMap />
        </div>
        <div class="flex w-28 shrink-0 flex-col gap-3">
          <LegendGroup
            label="Strong"
            color="#1fae5f"
            items={FX_HEATMAP.strong}
          />
          <LegendGroup
            label="Neutral"
            color="#c79b3f"
            items={FX_HEATMAP.neutral}
          />
          <LegendGroup label="Weak" color="#e5565b" items={FX_HEATMAP.weak} />
        </div>
      </div>
    </Card>
  );
}
