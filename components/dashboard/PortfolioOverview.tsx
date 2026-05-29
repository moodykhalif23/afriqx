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
      <div class="flex items-center gap-4">
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
        <ul class="min-w-0 flex-1 space-y-2.5">
          {PORTFOLIO.allocations.map((a) => (
            <li class="flex items-start gap-2">
              <span
                class="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: a.color }}
              />
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-2">
                  <span class="truncate text-sm text-platinum-200">
                    {a.label}
                  </span>
                  <span class="nums shrink-0 text-xs text-platinum-400">
                    {a.pct}%
                  </span>
                </div>
                <div class="nums truncate text-xs font-medium text-ivory">
                  {a.value}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
