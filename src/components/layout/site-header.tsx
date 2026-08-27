'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from './logo';
import { smoothScrollToTop } from '@/lib/smooth-scroll';
import { NAV_LINKS, SHOW_ACCOUNT_LINKS, activeLinks } from '@/lib/nav-links';
import { NavMenuLink, LogInLink, SignUpButton, AccountLink } from './nav-items';

// TODO: brancher sur la session Supabase une fois l'auth en place.
const isAuthenticated = false;

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Bloque le scroll de la page tant que le menu mobile est ouvert.
  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const isLinkActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  /**
   * Cliquer sur le lien de la page où l'on se trouve déjà ne déclenche aucune
   * navigation : on remonte donc en douceur en haut de page (le hero).
   */
  const handleNavClick = (href: string) => (event: React.MouseEvent) => {
    if (pathname !== href) return;
    event.preventDefault();
    smoothScrollToTop();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo onClick={handleNavClick('/')} />

        <nav className="hidden items-center gap-8 md:absolute md:left-1/2 md:top-1/2 md:flex md:-translate-x-1/2 md:-translate-y-1/2 md:gap-[60px]">
          {activeLinks(NAV_LINKS).map((link) => (
            <NavMenuLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={isLinkActive(link.href)}
              onClick={handleNavClick(link.href)}
            />
          ))}
        </nav>

        {SHOW_ACCOUNT_LINKS ? (
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
        ) : null}

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col items-center gap-16 bg-bg px-6 md:hidden ${
            // Sans les liens de compte, la navigation est seule : on la centre.
            SHOW_ACCOUNT_LINKS
              ? 'justify-between pb-40 pt-25'
              : 'justify-center pb-20'
          }`}
        >
          <nav className="flex flex-col items-center gap-8">
            {activeLinks(NAV_LINKS).map((link) => (
              <NavMenuLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={isLinkActive(link.href)}
                size="lg"
                onClick={(event) => {
                  handleNavClick(link.href)(event);
                  setIsMenuOpen(false);
                }}
              />
            ))}
          </nav>
          {SHOW_ACCOUNT_LINKS ? (
            <div className="flex flex-col items-center gap-8">
              {isAuthenticated ? (
                <AccountLink size="lg" onClick={() => setIsMenuOpen(false)} />
              ) : (
                <>
                  <LogInLink size="lg" onClick={() => setIsMenuOpen(false)} />
                  <SignUpButton
                    size="lg"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </>
              )}
            </div>
          ) : null}
        </div>
      )}
    </header>
  );
}
