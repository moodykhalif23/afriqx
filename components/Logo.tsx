type LogoVariant = "mark" | "full" | "stacked";

export interface LogoProps {
  /** mark = symbol only · full = symbol + wordmark inline · stacked = symbol over wordmark */
  variant?: LogoVariant;
  /** Pixel height of the mark. Wordmark scales to match. */
  size?: number;
  /** Show the "African Markets. African Value. African Future." tagline (stacked only). */
  tagline?: boolean;
  class?: string;
}

export function Logo(
  { variant = "full", size = 32, tagline = false, class: className = "" }:
    LogoProps,
) {
  const mark = <LogoMark size={size} />;

  if (variant === "mark") {
    return <span class={`inline-flex ${className}`}>{mark}</span>;
  }

  const wordmark = (
    <span
      class="font-display font-black tracking-[0.14em] leading-none text-ivory select-none"
      style={{ fontSize: `${size * 0.66}px` }}
    >
      AFRI<span class="text-emerald-500">Q</span>
      <span class="text-emerald-400">X</span>
    </span>
  );

  if (variant === "stacked") {
    return (
      <span class={`inline-flex flex-col items-center gap-3 ${className}`}>
        {mark}
        <span class="flex flex-col items-center gap-1.5">
          {wordmark}
          {tagline && (
            <span
              class="font-display font-medium tracking-[0.2em] text-platinum-400 uppercase"
              style={{ fontSize: `${Math.max(8, size * 0.16)}px` }}
            >
              African Markets. African Value.{" "}
              <span class="text-emerald-400">African Future.</span>
            </span>
          )}
        </span>
      </span>
    );
  }

  return (
    <span class={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      {wordmark}
    </span>
  );
}

/** The standalone symbol, sourced from the canonical `/logo.svg` asset. */
export function LogoMark({ size = 32, class: className = "" }: {
  size?: number;
  class?: string;
}) {
  return (
    <img
      src="/logo.svg"
      width={size}
      height={size}
      alt="AFRIQX"
      class={`shrink-0 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}
