"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { NAV_LINKS } from "@/lib/nav-links";

// TODO: brancher sur la session Supabase une fois l'auth en place.
const isAuthenticated = false;

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-accent ${
                  isActive ? "text-accent" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <Link
              href="/account"
              className="text-sm font-bold uppercase tracking-wide text-accent"
            >
              Mon compte
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:text-accent"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-90"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span className={`block h-0.5 w-6 bg-ink transition-opacity ${isMenuOpen ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-line px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium uppercase tracking-wide ${
                    isActive ? "text-accent" : "text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            {isAuthenticated ? (
              <Link
                href="/account"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-wide text-accent"
              >
                Mon compte
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium uppercase tracking-wide text-ink"
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-full bg-accent px-5 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-accent-ink"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
