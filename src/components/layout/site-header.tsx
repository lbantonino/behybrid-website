"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { smoothScrollToTop } from "@/lib/smooth-scroll";
import {
  FOOTER_SOCIAL_LINKS,
  NAV_LINKS,
  SHOW_ACCOUNT_LINKS,
  activeLinks,
} from "@/lib/nav-links";
import { NavMenuLink, LogInLink, SignUpButton, AccountLink } from "./nav-items";
import { siteCopyright } from "@/lib/site";

// TODO: brancher sur la session Supabase une fois l'auth en place.
const isAuthenticated = false;

/**
 * Logos sociaux du menu mobile, posés à même le fond, sans pastille.
 *
 * Les trois fichiers ne sont pas construits pareil : Instagram et TikTok sont
 * des tuiles carrées entourées d'une marge transparente, Strava est un chevron
 * qui occupe toute la hauteur de son canevas. Rendus à la même taille, le
 * chevron paraîtrait bien plus gros, d'où une taille propre à chacun : 44px de
 * boîte pour les tuiles (soit 33px visibles) contre 28px pour le chevron.
 */
const SOCIAL_ICONS: Record<string, { src: string; size: string }> = {
  Instagram: { src: "/icons/instagram-menuHmg.png", size: "h-11 w-11" },
  TikTok: { src: "/icons/tiktok-menuHmg.png", size: "h-11 w-11" },
  Strava: { src: "/icons/strava-menuHmg.png", size: "h-7 w-7" },
};

const SOCIAL_LINKS = activeLinks(FOOTER_SOCIAL_LINKS).filter(
  (link) => link.label in SOCIAL_ICONS,
);

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * Bloque le défilement tant que le menu mobile est ouvert.
   *
   * `overflow: hidden` sur le body ne suffit pas : iOS Safari continue de
   * faire défiler la page. On fige donc le body en `position: fixed` à la
   * position courante, puis on la restaure à la fermeture. C'est la seule
   * méthode fiable sur iOS.
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    const scrollY = window.scrollY;
    const { body } = document;

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      // Le body figé a fait remonter la page en haut : on rend sa place.
      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
    <header
      className={`top-0 z-50 border-b border-line bg-bg ${
        // Le body figé casse `sticky` : on passe en `fixed` pendant l'ouverture
        // pour que le logo et la croix restent visibles, où qu'on ait scrollé.
        isMenuOpen ? "fixed inset-x-0" : "sticky"
      }`}
    >
      <div className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        <Logo onClick={handleNavClick("/")} />

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
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-opacity ${isMenuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-ink transition-transform ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col overflow-hidden bg-bg px-6 pb-9 md:hidden">
          {/*
            Halo vert diffus, repris du langage des sections de l'accueil.

            Centré : collé en bas, il était coupé par le bord de l'écran, et
            cette coupe nette trahissait la limite du halo au lieu de le laisser
            se dissiper. Le centrage passe par un conteneur en drapeau plutôt
            que par un décalage de la moitié de la hauteur, plus simple à lire
            et sans arithmétique à refaire si la taille change.

            Il passe dessous sans z-index : un élément positionné se peint
            au-dessus du contenu ordinaire, il a donc suffi de rendre les deux
            blocs qui suivent `relative` pour qu'ils repassent devant.
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div className="h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.13),transparent_66%)] blur-3xl" />
          </div>
          <div
            className={`relative flex flex-1 flex-col items-center gap-16 ${
              // Sans les liens de compte, la navigation est seule : on la centre.
              SHOW_ACCOUNT_LINKS
                ? "justify-between pb-24 pt-16"
                : "justify-center pb-8"
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
                    const isSamePage = pathname === link.href;
                    if (isSamePage) event.preventDefault();
                    setIsMenuOpen(false);

                    // Le body est encore figé, donc window.scrollY vaut 0 : on
                    // attend que la fermeture ait restauré la position réelle
                    // avant de lancer la remontée, sinon elle n'aurait rien à
                    // parcourir.
                    if (isSamePage) {
                      requestAnimationFrame(() =>
                        requestAnimationFrame(smoothScrollToTop),
                      );
                    }
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

          {/*
            Pied du menu, mobile uniquement (tout ce panneau est en md:hidden).
            Le menu était trois liens flottant dans un écran noir vide : un run
            club se suit sur Instagram et Strava, et le pied de page qui porte
            ces liens est à quatre écrans de défilement d'ici.
          */}
          <div className="relative flex flex-col items-center gap-5">
            {SOCIAL_LINKS.length > 0 ? (
              <ul className="flex items-center gap-5">
                {SOCIAL_LINKS.map((link) => {
                  const icon = SOCIAL_ICONS[link.label];

                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`BEHYBRID on ${link.label}`}
                        onClick={() => setIsMenuOpen(false)}
                        // Pas de pastille : les logos sont posés sur le fond.
                        // Le rembourrage n'est pas décoratif, il porte la zone
                        // tactile à 52px, au-delà des 44px recommandés.
                        className="flex items-center justify-center p-2 transition-opacity hover:opacity-70 active:opacity-70"
                      >
                        <Image
                          src={icon.src}
                          alt=""
                          width={96}
                          height={96}
                          className={icon.size}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}

            <p className="text-[11px] uppercase tracking-[1.5px] text-faint">
              {siteCopyright()}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
