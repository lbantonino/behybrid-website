import { CLUB } from "@/lib/legal";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import { FOOTER_SOCIAL_LINKS, activeLinks } from "@/lib/nav-links";

/*
  Carte d'identité du club, destinée aux moteurs de recherche.

  Le calendrier déclare déjà chaque entraînement, mais rien ne disait ce
  qu'est BEHYBRID. Sans cette description, Google voit un site qui parle de
  course à pied sans savoir qu'il s'agit d'un club, ni où il se trouve : la
  recherche « run club Brussels » est précisément celle qu'on veut gagner.

  `SportsClub` plutôt que `Organization` : c'est le type exact, et il hérite
  de `LocalBusiness`, ce qui autorise l'adresse et la zone desservie.

  Les valeurs viennent des mêmes sources que les pages légales et le pied de
  page. Rien n'est recopié ici, donc rien ne peut diverger.
*/
export function ClubJsonLd() {
  const socials = activeLinks(FOOTER_SOCIAL_LINKS).map((link) => link.href);

  const club = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "@id": `${SITE_URL}/#club`,
    name: "BEHYBRID Run Club Brussels",
    alternateName: CLUB.tradingName,
    legalName: CLUB.legalName,
    description:
      "Perform and Connect runs every week in Brussels. All paces welcome, no ego, just the love of running.",
    url: SITE_URL,
    logo: absoluteUrl("/logo/logo-site.png"),
    image: absoluteUrl("/opengraph-image.jpg"),
    email: CLUB.contactEmail,
    sport: "Running",
    foundingDate: "2024",
    /*
      Le siège social, tel qu'il figure dans les mentions légales. Ce n'est pas
      un lieu d'entraînement : les séances ont lieu au Parc du Cinquantenaire et
      au Parc Royal, et elles sont déjà déclarées une par une sur `/calendar`.
    */
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rue des Alcyons 86",
      postalCode: "1082",
      addressLocality: "Berchem-Sainte-Agathe",
      addressRegion: "Brussels-Capital Region",
      addressCountry: "BE",
    },
    areaServed: {
      "@type": "City",
      name: "Brussels",
    },
    // `sameAs` sert à relier le site aux comptes officiels du club : c'est ce
    // qui évite qu'un compte tiers soit pris pour la source d'autorité.
    sameAs: socials,
  };

  return (
    <script
      type="application/ld+json"
      // Contenu entièrement écrit par nous, aucune donnée d'un visiteur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(club) }}
    />
  );
}
