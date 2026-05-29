import { Card } from "../ui/Card.tsx";
import { PriceChange } from "../ui/PriceChange.tsx";
import { PORTFOLIO } from "../../data/mock.ts";

export function PortfolioOverview() {
  const r = 52;
  const cx = 70;
  const cy = 70;
  const circ = 2 * Math.PI * r;
  let offset = 0;

  return (
    <Card
      title="Portfolio Overview"
      action={<a href="#">View full portfolio</a>}
    >
      <div class="flex items-center gap-6">
        {/* Donut */}
        <div class="relative shrink-0">
          <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            class="-rotate-90"
          >
            <circle
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke="#16201b"
              stroke-width="16"
            />
            {PORTFOLIO.allocations.map((a) => {
              const len = (a.pct / 100) * circ;
              const seg = (
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={a.color}
                  stroke-width="16"
                  stroke-dasharray={`${len} ${circ - len}`}
                  stroke-dashoffset={-offset}
                />
              );
              offset += len;
              return seg;
            })}
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="text-[10px] uppercase tracking-wider text-platinum-400">
              Total Value
            </span>
            <span class="nums text-base font-bold text-ivory">
              {PORTFOLIO.total}
            </span>
            <PriceChange value={PORTFOLIO.change} percent class="text-[11px]" />
          </div>
        </div>

        {/* Legend */}
        <ul class="flex-1 space-y-2.5">
          {PORTFOLIO.allocations.map((a) => (
            <li class="flex items-center gap-2.5">
              <span
                class="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: a.color }}
              />
              <span class="flex-1 text-sm text-platinum-200">{a.label}</span>
              <span class="text-xs text-platinum-400">{a.pct}%</span>
              <span class="nums w-24 text-right text-sm font-medium text-ivory">
                {a.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
