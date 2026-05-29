import type { ComponentChildren } from "preact";

export interface CardProps {
  /** Optional header title shown top-left. */
  title?: ComponentChildren;
  /** Optional action shown top-right (e.g. a "View all" link). */
  action?: ComponentChildren;
  /** Remove inner padding (e.g. for charts / tables that bleed to the edge). */
  flush?: boolean;
  class?: string;
  children?: ComponentChildren;
}

/**
 * Base surface for every panel — a DaisyUI `card` on the AFRIQX theme
 * (base-200 surface, hairline base-300 border) with an optional header.
 */
export function Card(
  { title, action, flush = false, class: className = "", children }: CardProps,
) {
  return (
    <section
      class={`card border border-base-300 bg-base-200/80 shadow-xl shadow-black/30 ${className}`}
    >
      {(title || action) && (
        <header class="flex items-center justify-between gap-4 border-b border-base-300/70 px-6 pt-5 pb-4">
          {typeof title === "string"
            ? (
              <h3 class="font-display text-sm font-semibold tracking-wide text-base-content">
                {title}
              </h3>
            )
            : title}
          {action && (
            <div class="text-xs text-accent transition-colors hover:text-emerald-300">
              {action}
            </div>
          )}
        </header>
      )}
      <div class={flush ? "" : "p-6"}>{children}</div>
    </section>
  );
}
