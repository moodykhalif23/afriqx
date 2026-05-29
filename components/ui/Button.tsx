import type { ComponentChildren, JSX } from "preact";

type Variant = "primary" | "gold" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<JSX.IntrinsicElements["button"], "size" | "class"> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  class?: string;
  children?: ComponentChildren;
}

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide rounded-lg " +
  "transition-all duration-150 select-none outline-none cursor-pointer " +
  "focus-visible:ring-2 focus-visible:ring-emerald-500/60 focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-obsidian-900 disabled:opacity-45 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Deep emerald — primary actions (Invest, Trade)
  primary:
    "bg-emerald-500 text-obsidian-950 hover:bg-emerald-400 active:bg-emerald-600 shadow-lg shadow-emerald-900/40",
  // Muted gold — premium / upsell (Upgrade to Pro)
  gold:
    "bg-gold-500 text-obsidian-950 hover:bg-gold-400 active:bg-gold-600 shadow-lg shadow-gold-700/30",
  // Bordered, low emphasis
  secondary:
    "border border-obsidian-500 bg-obsidian-700/60 text-ivory hover:bg-obsidian-600 hover:border-obsidian-400",
  // Text-only
  ghost: "text-platinum-300 hover:text-ivory hover:bg-obsidian-700/70",
  // Destructive / sell
  danger:
    "bg-[var(--color-down)] text-obsidian-950 hover:opacity-90 active:opacity-80",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button(
  {
    variant = "primary",
    size = "md",
    block = false,
    class: className = "",
    children,
    ...rest
  }: ButtonProps,
) {
  return (
    <button
      {...rest}
      class={`${base} ${variants[variant]} ${sizes[size]} ${
        block ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}
