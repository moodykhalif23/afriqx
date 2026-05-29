import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { Button } from "../components/ui/Button.tsx";
import { Column, DataTable } from "../components/ui/DataTable.tsx";
import { PriceChange } from "../components/ui/PriceChange.tsx";
import { Icon } from "../components/dashboard/Icon.tsx";
import { type Holding, WATCHLIST } from "../data/mock.ts";

const cols: Column<Holding>[] = [
  {
    id: "symbol",
    header: "Symbol",
    mobile: "primary",
    cell: (r) => <span class="font-semibold text-base-content">{r.symbol}
    </span>,
  },
  {
    id: "name",
    header: "Name",
    mobile: "sub",
    cell: (r) => <span class="text-base-content/60">{r.name}</span>,
  },
  {
    id: "price",
    header: "Last Price",
    align: "right",
    mobile: "stat",
    cell: (r) => <span class="nums text-base-content">{r.price}</span>,
  },
  {
    id: "change",
    header: "24h Change",
    align: "right",
    mobile: "trailing",
    cell: (r) => <PriceChange value={r.change} percent arrow={false} />,
  },
  {
    id: "action",
    header: "",
    align: "right",
    mobile: "hidden",
    cell: () => <Button variant="secondary" size="sm">Trade</Button>,
  },
];

export default define.page(function Watchlist() {
  return (
    <>
      <Head>
        <title>Watchlist · AFRIQX</title>
      </Head>
      <AppShell active="Watchlist" title="Watchlist">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 class="font-display text-xl font-bold text-base-content sm:text-2xl">
              Watchlist
            </h1>
            <p class="text-sm text-base-content/60">
              {WATCHLIST.length} instruments you're tracking.
            </p>
          </div>
          <Button variant="primary" size="sm">
            <Icon name="watchlist" size={16} />
            Add instrument
          </Button>
        </div>

        <Card flush>
          <DataTable
            columns={cols}
            rows={WATCHLIST}
            rowKey={(r) => r.symbol}
            minWidth={720}
            class="p-2 sm:p-3"
          />
        </Card>
      </AppShell>
    </>
  );
});
