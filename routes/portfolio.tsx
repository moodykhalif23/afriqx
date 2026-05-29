import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { PriceChange } from "../components/ui/PriceChange.tsx";
import { Column, DataTable } from "../components/ui/DataTable.tsx";
import { PortfolioOverview } from "../components/dashboard/PortfolioOverview.tsx";
import { PORTFOLIO_SUMMARY, type Position, POSITIONS } from "../data/mock.ts";

const positionCols: Column<Position>[] = [
  {
    id: "symbol",
    header: "Symbol",
    mobile: "primary",
    cell: (r) => <span class="font-semibold text-ivory">{r.symbol}</span>,
  },
  {
    id: "name",
    header: "Name",
    mobile: "sub",
    showFrom: "lg",
    cell: (r) => <span class="text-platinum-300">{r.name}</span>,
  },
  {
    id: "qty",
    header: "Qty",
    align: "right",
    mobile: "stat",
    cell: (r) => <span class="nums text-platinum-200">{r.qty}</span>,
  },
  {
    id: "avg",
    header: "Avg Cost",
    align: "right",
    showFrom: "md",
    mobile: "stat",
    cell: (r) => <span class="nums text-platinum-200">{r.avgCost}</span>,
  },
  {
    id: "last",
    header: "Last",
    align: "right",
    showFrom: "sm",
    mobile: "stat",
    cell: (r) => <span class="nums text-platinum-200">{r.last}</span>,
  },
  {
    id: "value",
    header: "Value",
    align: "right",
    mobile: "stat",
    cell: (r) => <span class="nums font-medium text-ivory">{r.value}</span>,
  },
  {
    id: "weight",
    header: "Weight",
    align: "right",
    showFrom: "xl",
    mobile: "stat",
    cell: (r) => <span class="nums text-platinum-300">{r.weight}%</span>,
  },
  {
    id: "pnl",
    header: "P&L",
    align: "right",
    mobile: "trailing",
    cell: (r) => (
      <div class="leading-tight">
        <PriceChange value={r.pnl} percent arrow={false} />
        <div class="nums text-[11px] text-platinum-400">{r.pnlAbs}</div>
      </div>
    ),
  },
];

export default define.page(function Portfolio() {
  const s = PORTFOLIO_SUMMARY;
  return (
    <>
      <Head>
        <title>Portfolio · AFRIQX</title>
      </Head>
      <AppShell active="Portfolio" title="Portfolio">
        <div class="mb-4">
          <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">
            Portfolio
          </h1>
          <p class="text-sm text-platinum-400">
            Your African holdings, valued in real time.
          </p>
        </div>

        {/* Summary cards */}
        <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <SummaryCard label="Total Value" value={s.totalValue}>
            <PriceChange value={s.dayChange} percent class="text-xs" />
            <span class="ml-1 text-xs text-platinum-400">today</span>
          </SummaryCard>
          <SummaryCard label="Total P&L" value={s.totalPnlAbs} accent>
            <PriceChange value={s.totalPnl} percent class="text-xs" />
          </SummaryCard>
          <SummaryCard label="Invested" value={s.invested} />
          <SummaryCard label="Buying Power" value={s.buyingPower} />
        </div>

        {/* Allocation + holdings */}
        <div class="mt-3 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-5 xl:grid-cols-[360px_1fr]">
          <PortfolioOverview />

          <Card title="Holdings" action={<a href="#">Export</a>} flush>
            <DataTable
              columns={positionCols}
              rows={POSITIONS}
              rowKey={(r) => r.symbol}
              minWidth={860}
              class="p-2 sm:p-3"
            />
          </Card>
        </div>
      </AppShell>
    </>
  );
});

function SummaryCard(
  { label, value, accent = false, children }: {
    label: string;
    value: string;
    accent?: boolean;
    children?: ComponentChildren;
  },
) {
  return (
    <div class="stats w-full rounded-2xl border border-base-300 bg-base-200/80 hover-lift">
      <div class="stat p-4">
        <div class="stat-title text-[11px] uppercase tracking-wider text-base-content/50">
          {label}
        </div>
        <div
          class={`stat-value nums text-lg font-bold sm:text-xl ${
            accent ? "text-accent" : "text-base-content"
          }`}
        >
          {value}
        </div>
        {children && (
          <div class="stat-desc mt-1 flex items-center">{children}</div>
        )}
      </div>
    </div>
  );
}
