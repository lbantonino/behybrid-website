import type { MetadataRoute } from "next";
import { NAV_LINKS, FOOTER_LEGAL_LINKS, activeLinks } from "@/lib/nav-links";
import { SITE_URL } from "@/lib/site";

/*
  Plan du site : la liste des pages que Google doit connaître, sans avoir à
  les deviner en suivant les liens.

  Les adresses sont construites à partir de `SITE_URL`, donc ce fichier n'a pas
  eu besoin d'attendre le nom de domaine : le jour où `NEXT_PUBLIC_SITE_URL`
  est posée sur l'hébergeur, il devient juste tout seul. En développement il
  pointe vers localhost, ce qui n'a aucune conséquence puisque Google ne lit
  pas cette machine.

  La liste n'est pas recopiée à la main : elle est déduite de la navigation
  réelle. Le jour où la boutique ou l'espace membre passent à `enabled: true`,
  ils entrent ici sans que personne y pense, et surtout : tant qu'ils sont
  désactivés, ils ne peuvent pas y entrer par erreur.

  Deux pages sont volontairement absentes, et elles portent déjà un `noindex` :
  `/style-guide`, page de travail interne, et `/newsletter/confirmed`, qu'on
  n'atteint que par un lien privé reçu par email.
*/
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ...activeLinks(NAV_LINKS).map((link) => link.href),
    ...activeLinks(FOOTER_LEGAL_LINKS).map((link) => link.href),
  ];

  // Un lien peut figurer dans les deux listes : on ne le déclare qu'une fois.
  const uniques = [...new Set(pages)];

  return uniques.map((href) => ({
    url: `${SITE_URL}${href === "/" ? "" : href}`,
    /*
      L'accueil et le calendrier priment : ce sont les deux pages qu'un coureur
      cherche. Les pages légales existent pour être trouvées quand on les
      cherche, pas pour être proposées.

      Pas de `lastModified` : il faudrait une vraie date de dernière
      modification par page. Une date inventée, ou celle du dernier build,
      apprend à Google à ne plus faire confiance à ce champ.
    */
    priority: href === "/" ? 1 : href === "/calendar" ? 0.9 : 0.4,
    changeFrequency: href === "/calendar" ? "weekly" : "monthly",
  }));
}
