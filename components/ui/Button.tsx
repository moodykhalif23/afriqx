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

/** Brand variant → DaisyUI button modifier (theme tokens are AFRIQX colours). */
const variants: Record<Variant, string> = {
  primary: "btn-primary", // deep emerald
  gold: "btn-secondary", // muted gold
  secondary: "btn-outline btn-neutral text-base-content",
  ghost: "btn-ghost",
  danger: "btn-error",
};

const sizes: Record<Size, string> = {
  sm: "btn-sm",
  md: "",
  lg: "btn-lg",
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
      class={`btn font-display font-semibold tracking-wide ${
        variants[variant]
      } ${sizes[size]} ${block ? "btn-block" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
