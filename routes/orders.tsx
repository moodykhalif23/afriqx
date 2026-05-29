import { Head } from "fresh/runtime";
import { define } from "../utils.ts";
import { AppShell } from "../components/dashboard/AppShell.tsx";
import { Card } from "../components/ui/Card.tsx";
import { Column, DataTable } from "../components/ui/DataTable.tsx";
import Tabs from "../islands/Tabs.tsx";
import { type OrderRow, ORDERS } from "../data/mock.ts";

const statusClass: Record<OrderRow["status"], string> = {
  Filled: "badge badge-sm badge-soft badge-success",
  Pending: "badge badge-sm badge-soft badge-warning",
  Cancelled: "badge badge-sm badge-soft badge-neutral",
};

const cols: Column<OrderRow>[] = [
  {
    id: "symbol",
    header: "Symbol",
    mobile: "primary",
    cell: (r) => <span class="font-semibold text-base-content">{r.symbol}
    </span>,
  },
  {
    id: "date",
    header: "Date",
    mobile: "sub",
    showFrom: "md",
    cell: (r) => <span class="nums text-base-content/60">{r.date}</span>,
  },
  {
    id: "type",
    header: "Type",
    mobile: "stat",
    cell: (r) => <span class="text-base-content/80">{r.type}</span>,
  },
  {
    id: "side",
    header: "Side",
    mobile: "stat",
    cell: (r) => (
      <span
        class={`font-semibold ${
          r.side === "Buy" ? "text-success" : "text-error"
        }`}
      >
        {r.side}
      </span>
    ),
  },
  {
    id: "qty",
    header: "Qty",
    align: "right",
    showFrom: "sm",
    mobile: "stat",
    cell: (r) => <span class="nums text-base-content/80">{r.qty}</span>,
  },
  {
    id: "price",
    header: "Price",
    align: "right",
    mobile: "stat",
    cell: (r) => <span class="nums text-base-content">{r.price}</span>,
  },
  {
    id: "status",
    header: "Status",
    align: "right",
    mobile: "trailing",
    cell: (r) => <span class={statusClass[r.status]}>{r.status}</span>,
  },
];

function Table({ rows }: { rows: OrderRow[] }) {
  return (
    <Card flush>
      <DataTable
        columns={cols}
        rows={rows}
        rowKey={(r) => r.date + r.symbol}
        minWidth={820}
        class="p-2 sm:p-3"
      />
    </Card>
  );
}

export default define.page(function Orders() {
  const open = ORDERS.filter((o) => o.status === "Pending");
  const filled = ORDERS.filter((o) => o.status === "Filled");
  return (
    <>
      <Head>
        <title>Orders · AFRIQX</title>
      </Head>
      <AppShell active="Orders" title="Orders">
        <div class="mb-4">
          <h1 class="font-display text-xl font-bold text-base-content sm:text-2xl">
            Orders
          </h1>
          <p class="text-sm text-base-content/60">
            Your order history across all African markets.
          </p>
        </div>

        <Tabs tabs={["All", "Open", "Filled"]}>
          <Table rows={ORDERS} />
          <Table rows={open} />
          <Table rows={filled} />
        </Tabs>
      </AppShell>
    </>
  );
});
