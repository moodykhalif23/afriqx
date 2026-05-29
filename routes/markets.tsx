import type { ComponentChildren } from "preact";
import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Icon } from "../components/dashboard/Icon.tsx";
import { Column, DataTable } from "../components/ui/DataTable.tsx";
import { PriceChange } from "../components/ui/PriceChange.tsx";
import { Sparkline } from "../components/ui/Sparkline.tsx";
import { Badge } from "../components/ui/Badge.tsx";
import Tabs from "../islands/Tabs.tsx";
import {
  COMMODITIES,
  type Commodity,
  EQUITIES,
  type Equity,
  FX_PAIRS,
  type FxPair,
  INDEXES,
  type MarketIndex,
} from "../data/mock.ts";

const sym = (s: string) => <span class="font-semibold text-ivory">{s}</span>;

const indexCols: Column<MarketIndex>[] = [
  {
    id: "symbol",
    header: "Index",
    mobile: "primary",
    cell: (r) => sym(r.symbol),
  },
  {
    id: "name",
    header: "Name",
    mobile: "sub",
    showFrom: "lg",
    cell: (r) => <span class="text-platinum-300">{r.name}</span>,
  },
  {
    id: "value",
    header: "Value",
    align: "right",
    mobile: "stat",
    cell: (r) => (
      <span class="nums text-ivory">
        {r.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </span>
    ),
  },
  {
    id: "change",
    header: "24h",
    align: "right",
    mobile: "trailing",
    cell: (r) => <PriceChange value={r.change} percent arrow={false} />,
  },
  {
    id: "trend",
    header: "Trend",
    align: "right",
    showFrom: "sm",
    mobile: "hidden",
    cell: (r) => (
      <div class="flex justify-end">
        <Sparkline data={r.series} width={88} height={28} />
      </div>
    ),
  },
];

const equityCols: Column<Equity>[] = [
  {
    id: "symbol",
    header: "Symbol",
    mobile: "primary",
    cell: (r) => sym(r.symbol),
  },
  {
    id: "name",
    header: "Name",
    mobile: "sub",
    cell: (r) => <span class="text-platinum-300">{r.name}</span>,
  },
  {
    id: "exchange",
    header: "Exch.",
    showFrom: "md",
    mobile: "stat",
    cell: (r) => <Badge tone="neutral">{r.exchange}</Badge>,
  },
  {
    id: "sector",
    header: "Sector",
    showFrom: "xl",
    mobile: "stat",
    cell: (r) => <span class="text-platinum-300">{r.sector}</span>,
  },
  {
    id: "last",
    header: "Last",
    align: "right",
    mobile: "stat",
    cell: (r) => <span class="nums text-ivory">{r.last}</span>,
  },
  {
    id: "change",
    header: "24h",
    align: "right",
    mobile: "trailing",
    cell: (r) => <PriceChange value={r.change} percent arrow={false} />,
  },
  {
    id: "cap",
    header: "Mkt Cap",
    align: "right",
    showFrom: "lg",
    mobile: "stat",
    cell: (r) => <span class="nums text-platinum-300">{r.marketCap}</span>,
  },
  {
    id: "vol",
    header: "Volume",
    align: "right",
    showFrom: "lg",
    mobile: "stat",
    cell: (r) => <span class="nums text-platinum-300">{r.volume}</span>,
  },
  {
    id: "trend",
    header: "Trend",
    align: "right",
    showFrom: "md",
    mobile: "hidden",
    cell: (r) => (
      <div class="flex justify-end">
        <Sparkline data={r.series} width={80} height={26} />
      </div>
    ),
  },
];

const fxCols: Column<FxPair>[] = [
  { id: "pair", header: "Pair", mobile: "primary", cell: (r) => sym(r.pair) },
  {
    id: "name",
    header: "Name",
    mobile: "sub",
    showFrom: "md",
    cell: (r) => <span class="text-platinum-300">{r.name}</span>,
  },
  {
    id: "rate",
    header: "Rate",
    align: "right",
    mobile: "stat",
    cell: (r) => <span class="nums text-ivory">{r.rate}</span>,
  },
  {
    id: "change",
    header: "24h",
    align: "right",
    mobile: "trailing",
    cell: (r) => <PriceChange value={r.change} percent arrow={false} />,
  },
];

const commodityCols: Column<Commodity>[] = [
  {
    id: "name",
    header: "Commodity",
    mobile: "primary",
    cell: (r) => sym(r.name),
  },
  {
    id: "unit",
    header: "Unit",
    mobile: "sub",
    showFrom: "md",
    cell: (r) => <span class="text-platinum-400">{r.unit}</span>,
  },
  {
    id: "last",
    header: "Price",
    align: "right",
    mobile: "stat",
    cell: (r) => <span class="nums text-ivory">{r.last}</span>,
  },
  {
    id: "change",
    header: "24h",
    align: "right",
    mobile: "trailing",
    cell: (r) => <PriceChange value={r.change} percent arrow={false} />,
  },
  {
    id: "trend",
    header: "Trend",
    align: "right",
    showFrom: "sm",
    mobile: "hidden",
    cell: (r) => (
      <div class="flex justify-end">
        <Sparkline data={r.series} width={88} height={28} />
      </div>
    ),
  },
];

function Panel({ children }: { children: ComponentChildren }) {
  return (
    <div class="rounded-2xl border border-obsidian-500/60 bg-obsidian-800/60 p-2 sm:p-3">
      {children}
    </div>
  );
}

export default define.page(function Markets() {
  return (
    <>
      <Head>
        <title>Markets · AFRIQX</title>
      </Head>
      <AppShell active="Markets" title="Markets">
        {/* Header */}
        <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 class="font-display text-xl font-bold text-ivory sm:text-2xl">
              Markets
            </h1>
            <p class="text-sm text-platinum-400">
              African indices, equities, FX and commodities — priced in African
              value.
            </p>
          </div>
          <label class="relative w-full sm:w-72">
            <span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-platinum-400">
              <Icon name="search" size={16} />
            </span>
            <input
              type="text"
              placeholder="Search instruments..."
              class="h-10 w-full rounded-lg border border-obsidian-500/70 bg-obsidian-800 pl-9 pr-3 text-sm text-ivory placeholder:text-platinum-400 outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40"
            />
          </label>
        </div>

        <Tabs tabs={["Indices", "Equities", "FX", "Commodities"]}>
          <Panel>
            <DataTable
              columns={indexCols}
              rows={INDEXES}
              rowKey={(r) => r.symbol}
              minWidth={680}
            />
          </Panel>
          <Panel>
            <DataTable
              columns={equityCols}
              rows={EQUITIES}
              rowKey={(r) => r.symbol}
              minWidth={900}
            />
          </Panel>
          <Panel>
            <DataTable
              columns={fxCols}
              rows={FX_PAIRS}
              rowKey={(r) => r.pair}
              minWidth={520}
            />
          </Panel>
          <Panel>
            <DataTable
              columns={commodityCols}
              rows={COMMODITIES}
              rowKey={(r) => r.symbol}
              minWidth={620}
            />
          </Panel>
        </Tabs>
      </AppShell>
    </>
  );
});
