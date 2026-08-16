import type { ReactNode } from "react";

type Variant = "accent" | "outline";
type Size = "xs" | "sm" | "md";

const BASE = "inline-block rounded-full font-display text-label font-extrabold tracking-wide";

const VARIANT: Record<Variant, string> = {
  accent: "bg-accent text-bg",
  outline: "border border-white/50 text-ink",
};

const SIZE: Record<Size, string> = {
  // Compact en mobile, identique à `md` au-dessus du breakpoint.
  xs: "px-2.5 py-1 text-[10px] md:px-3 md:py-1.5 md:text-label",
  sm: "px-2.5 py-1 text-label md:px-3.5 md:py-1.5 md:text-label",
  md: "px-3 py-1.5 text-label",
};

export function Badge({
  variant = "accent",
  size = "md",
  uppercase = false,
  className = "",
  children,
}: {
  variant?: Variant;
  size?: Size;
  uppercase?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${uppercase ? "uppercase" : ""} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
