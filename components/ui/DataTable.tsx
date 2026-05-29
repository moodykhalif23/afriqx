import type { ComponentChildren } from "preact";

type Align = "left" | "right" | "center";
type Breakpoint = "sm" | "md" | "lg" | "xl";

/** Where a column appears in the mobile card layout. */
type MobileRole = "primary" | "sub" | "trailing" | "stat" | "hidden";

export interface Column<T> {
  id: string;
  header: string;
  cell: (row: T) => ComponentChildren;
  align?: Align;
  /** Hide the column on the desktop table until this breakpoint. */
  showFrom?: Breakpoint;
  /** Placement inside the stacked mobile card (default: "stat"). */
  mobile?: MobileRole;
  /** Extra classes for the desktop <td>/<th>. */
  cellClass?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  /** Min width before the desktop table scrolls horizontally. */
  minWidth?: number;
  /** Optional click handler / href per row (renders mobile card as a link). */
  href?: (row: T) => string;
  class?: string;
}

const alignText: Record<Align, string> = {
  left: "text-left",
  right: "text-right",
  center: "text-center",
};

const showFromClass: Record<Breakpoint, string> = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell",
  xl: "hidden xl:table-cell",
};

/**
 * Data-dense table that never overflows its container:
 * - md+  : real <table>, sticky header, horizontal scroll only if needed
 * - <md  : each row collapses to a stacked, tappable card (≥56px)
 */
export function DataTable<T>(
  { columns, rows, rowKey, minWidth = 720, href, class: className = "" }:
    DataTableProps<T>,
) {
  const primary = columns.find((c) => c.mobile === "primary");
  const sub = columns.find((c) => c.mobile === "sub");
  const trailing = columns.find((c) => c.mobile === "trailing");
  const stats = columns.filter((c) =>
    c.mobile !== "primary" && c.mobile !== "sub" && c.mobile !== "trailing" &&
    c.mobile !== "hidden"
  );

  return (
    <div class={className}>
      {/* ---------- Desktop / tablet table ---------- */}
      <div class="hidden overflow-x-auto md:block">
        <table
          class="table w-full text-sm"
          style={{ minWidth: `${minWidth}px` }}
        >
          <thead>
            <tr class="border-b border-obsidian-500/60">
              {columns.map((c) => (
                <th
                  key={c.id}
                  class={`sticky top-0 z-10 bg-obsidian-800 px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-platinum-400 ${
                    alignText[c.align ?? "left"]
                  } ${c.showFrom ? showFromClass[c.showFrom] : ""}`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="divide-y divide-obsidian-500/40">
            {rows.map((row) => (
              <tr
                key={rowKey(row)}
                class="transition-colors hover:bg-obsidian-700/50"
              >
                {columns.map((c) => (
                  <td
                    key={c.id}
                    class={`px-5 py-4 ${alignText[c.align ?? "left"]} ${
                      c.showFrom ? showFromClass[c.showFrom] : ""
                    } ${c.cellClass ?? ""}`}
                  >
                    {c.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- Mobile stacked cards ---------- */}
      <ul class="space-y-3 md:hidden">
        {rows.map((row) => {
          const inner = (
            <>
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0">
                  {primary && (
                    <div class="truncate text-sm font-semibold text-ivory">
                      {primary.cell(row)}
                    </div>
                  )}
                  {sub && (
                    <div class="mt-0.5 truncate text-xs text-platinum-400">
                      {sub.cell(row)}
                    </div>
                  )}
                </div>
                {trailing && (
                  <div class="shrink-0 text-right">{trailing.cell(row)}</div>
                )}
              </div>
              {stats.length > 0 && (
                <div class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-obsidian-500/40 pt-3 xs:grid-cols-3">
                  {stats.map((c) => (
                    <div key={c.id} class="min-w-0">
                      <div class="truncate text-[10px] uppercase tracking-wider text-platinum-400">
                        {c.header}
                      </div>
                      <div class="mt-0.5 truncate text-xs text-ivory">
                        {c.cell(row)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          );

          const cardClass =
            "block rounded-md border border-obsidian-500/50 bg-obsidian-800/80 p-4 active:bg-obsidian-700/70";

          return (
            <li key={rowKey(row)}>
              {href
                ? <a href={href(row)} class={cardClass}>{inner}</a>
                : <div class={cardClass}>{inner}</div>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
