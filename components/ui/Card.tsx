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
 * The base surface for every panel in the AFRIQX terminal:
 * an obsidian card with a hairline border and a soft inner glow.
 */
export function Card(
  { title, action, flush = false, class: className = "", children }: CardProps,
) {
  return (
    <section
      class={`rounded-2xl border border-obsidian-500/70 bg-obsidian-800/80 backdrop-blur-sm shadow-xl shadow-black/30 ${className}`}
    >
      {(title || action) && (
        <header class="flex items-center justify-between gap-4 px-5 pt-4 pb-3 border-b border-obsidian-500/50">
          {typeof title === "string"
            ? (
              <h3 class="font-display font-semibold text-sm text-ivory tracking-wide">
                {title}
              </h3>
            )
            : title}
          {action && (
            <div class="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
              {action}
            </div>
          )}
        </header>
      )}
      <div class={flush ? "" : "p-5"}>{children}</div>
    </section>
  );
}
