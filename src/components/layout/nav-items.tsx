"use client";

import Link from "next/link";

type Size = "sm" | "lg";

const TEXT_SIZE: Record<Size, string> = {
  sm: "text-sm",
  lg: "text-3xl",
};

const SIGNUP_SIZE: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  lg: "px-10 py-4 text-2xl",
};

export function NavMenuLink({
  href,
  label,
  isActive,
  size = "sm",
  onClick,
}: {
  href: string;
  label: string;
  isActive: boolean;
  size?: Size;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${TEXT_SIZE[size]} font-extrabold uppercase tracking-wide transition-colors hover:text-accent ${
        isActive ? "text-accent" : "text-ink"
      }`}
    >
      {label}
    </Link>
  );
}

export function LogInLink({ size = "sm", onClick }: { size?: Size; onClick?: () => void }) {
  return (
    <Link
      href="/login"
      onClick={onClick}
      className={`${TEXT_SIZE[size]} font-extrabold uppercase tracking-wide text-ink transition-colors hover:text-accent`}
    >
      Log In
    </Link>
  );
}

export function SignUpButton({ size = "sm", onClick }: { size?: Size; onClick?: () => void }) {
  return (
    <Link
      href="/sign-up"
      onClick={onClick}
      className={`rounded-full bg-accent text-center font-extrabold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-90 ${SIGNUP_SIZE[size]}`}
    >
      Sign Up
    </Link>
  );
}

export function AccountLink({ size = "sm", onClick }: { size?: Size; onClick?: () => void }) {
  return (
    <Link
      href="/account"
      onClick={onClick}
      className={`${TEXT_SIZE[size]} font-extrabold uppercase tracking-wide text-accent`}
    >
      Mon compte
    </Link>
  );
}
