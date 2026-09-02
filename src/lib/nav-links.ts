/**
 * Navigation du site. Chaque lien porte un indicateur `enabled` : les pages
 * qui n'existent pas encore (boutique, comptes, pages légales) sont simplement
 * désactivées, pas supprimées. Le jour où elles sont prêtes, il suffit de
 * passer `enabled` à `true` pour qu'elles réapparaissent partout.
 */
export type NavLink = { label: string; href: string; enabled: boolean };

/** Les comptes n'ont de sens qu'une fois l'espace membre en place. */
export const SHOW_ACCOUNT_LINKS = false;

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", enabled: true },
  { label: "Calendar", href: "/calendar", enabled: true },
  { label: "Contact", href: "/contact", enabled: true },
  { label: "Shop", href: "/shop", enabled: false },
  { label: "Join Us", href: "/join-us", enabled: false },
];

export const FOOTER_EXPLORE_LINKS: NavLink[] = [
  { label: "Home", href: "/", enabled: true },
  { label: "Calendar", href: "/calendar", enabled: true },
  { label: "Contact", href: "/contact", enabled: true },
  { label: "Shop", href: "/shop", enabled: false },
];

export const FOOTER_CLUB_LINKS: NavLink[] = [
  { label: "Join Us", href: "/join-us", enabled: false },
  { label: "Log In", href: "/login", enabled: false },
  { label: "Sign Up", href: "/sign-up", enabled: false },
];

export const FOOTER_SOCIAL_LINKS: NavLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/behybrid.run/",
    enabled: true,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@behybrid.run.club",
    enabled: true,
  },
  {
    label: "Strava",
    href: "https://www.strava.com/clubs/1425856",
    enabled: true,
  },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Legal Notice", href: "/legal-notice", enabled: true },
  { label: "Privacy Policy", href: "/privacy", enabled: true },
  { label: "Cookie Policy", href: "/cookie-policy", enabled: true },
  // Les conditions générales n'ont d'objet qu'avec la boutique.
  { label: "Terms of Use", href: "/terms", enabled: false },
];

/**
 * Retrouve un réseau social par son nom.
 *
 * Sert à poser un lien dans une phrase (« Follow us on Instagram or TikTok »)
 * sans recopier l'adresse : elle ne vit qu'ici. Lève une erreur si le nom est
 * inconnu, plutôt que de rendre un lien vide qui ne se verrait qu'en cliquant.
 */
export function socialHref(label: string) {
  const link = FOOTER_SOCIAL_LINKS.find((item) => item.label === label);
  if (!link) throw new Error(`Réseau social inconnu : ${label}`);
  return link.href;
}

/** Ne garde que les liens dont la page existe. */
export function activeLinks(links: NavLink[]) {
  return links.filter((link) => link.enabled);
}
