import { Card } from "../ui/Card.tsx";
import { RECENT_ORDERS } from "../../data/mock.ts";

export function RecentOrders() {
  return (
    <Card title="Recent Orders" action={<a href="#">View all</a>}>
      <table class="w-full text-left">
        <thead>
          <tr class="text-[10px] uppercase tracking-wider text-platinum-400">
            <th class="pb-2 font-medium">Type</th>
            <th class="pb-2 font-medium">Symbol</th>
            <th class="pb-2 font-medium">Side</th>
            <th class="pb-2 font-medium">Status</th>
            <th class="pb-2 text-right font-medium">Price</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-obsidian-500/40">
          {RECENT_ORDERS.map((o) => (
            <tr class="text-xs">
              <td class="py-2 text-platinum-300">{o.type}</td>
              <td class="py-2 font-medium text-ivory">{o.symbol}</td>
              <td
                class={`py-2 font-semibold ${
                  o.side === "Buy"
                    ? "text-emerald-400"
                    : "text-[var(--color-down)]"
                }`}
              >
                {o.side}
              </td>
              <td class="py-2">
                <span
                  class={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    o.status === "Filled"
                      ? "bg-emerald-500/15 text-emerald-300"
                      : "bg-gold-500/15 text-gold-300"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td class="nums py-2 text-right text-platinum-200">{o.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
