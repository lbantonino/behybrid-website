import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center rounded-full text-center font-display uppercase tracking-wide transition";

const VARIANT: Record<Variant, string> = {
  primary: "bg-accent text-bg font-extrabold hover:opacity-90",
  secondary: "border-2 border-white/60 bg-white/20 text-ink font-bold hover:bg-white/30",
  ghost: "border border-white/30 text-ink font-bold hover:border-white/60",
};

const SIZE: Record<Size, string> = {
  sm: "px-5 py-2 text-label",
  md: "px-7 py-3.5 text-body-sm",
  lg: "px-8.5 py-4 text-body",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & { href: string };

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className"> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className = "", children, ...rest } = props;
  const classes = `${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`.trim();

  if (rest.href != null) {
    return (
      <Link className={classes} {...(rest as Omit<ComponentPropsWithoutRef<typeof Link>, "className">)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<ComponentPropsWithoutRef<"button">, "className">)}>
      {children}
    </button>
  );
}
