"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { NAV_LINKS } from "@/lib/nav-links";
import { NavMenuLink, LogInLink, SignUpButton, AccountLink } from "./nav-items";

// TODO: brancher sur la session Supabase une fois l'auth en place.
const isAuthenticated = false;

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavMenuLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={isLinkActive(link.href)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {isAuthenticated ? (
            <AccountLink />
          ) : (
            <>
              <LogInLink />
              <SignUpButton />
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
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col items-center justify-center gap-16 bg-bg px-6 md:hidden">
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavMenuLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isLinkActive(link.href)}
                size="lg"
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </nav>
          <div className="flex flex-col items-center gap-8">
            {isAuthenticated ? (
              <AccountLink size="lg" onClick={() => setIsMenuOpen(false)} />
            ) : (
              <>
                <LogInLink size="lg" onClick={() => setIsMenuOpen(false)} />
                <SignUpButton size="lg" onClick={() => setIsMenuOpen(false)} />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
