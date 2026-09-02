import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Autorise l'accès au serveur de dev depuis d'autres appareils du réseau
  // local (ex. tester le site sur un vrai iPhone via l'IP du Mac).
  // Wildcard sur tout le réseau domestique 192.168.x.x : couvre n'importe
  // quel sous-réseau, donc pas besoin de remettre l'IP à jour à chaque
  // changement de box/routeur.
  allowedDevOrigins: ["192.168.*.*"],
  // Masque le petit indicateur de dev Next.js (bas de l'écran) pendant le dev.
  devIndicators: false,

  /*
    En-têtes de sécurité, ajoutés le 02/09 : le site n'en renvoyait aucun.
    Ce sont des instructions que le serveur donne au navigateur pour restreindre
    ce qu'une page a le droit de faire.

    Sur la politique de contenu (CSP), un choix est assumé. La version stricte
    demande un jeton unique par requête, ce qui oblige à rendre toutes les pages
    dynamiquement et retire à Next la possibilité de les pré-générer. Pour un
    site sans compte ni paiement, le coût dépasse le gain, d'où `unsafe-inline`
    sur les scripts et les styles : React injecte ses données d'hydratation en
    ligne, et les attributs `style` du code sont eux aussi en ligne.

    Les quatre directives qui gardent tout leur effet malgré cela sont
    `frame-ancestors`, `base-uri`, `form-action` et `object-src` : elles
    empêchent respectivement d'encadrer le site, de détourner ses liens
    relatifs, de rediriger l'envoi d'un formulaire, et de charger un greffon.
  */
  async headers() {
    /*
      En développement, le site est servi en clair : sur `localhost` comme sur
      l'adresse réseau du Mac quand on le teste depuis un vrai téléphone.

      `upgrade-insecure-requests` y est donc destructeur. Le navigateur
      réécrirait chaque feuille de style, chaque script et chaque image en
      `https://192.168.x.x:3000`, une adresse qui n'existe pas : la page reste
      blanche, et rien dans la console ne pointe vers la vraie cause.

      `Strict-Transport-Security` est écarté pour la même raison, en pire : le
      navigateur mémorise l'instruction pendant deux ans, y compris après le
      retrait de l'en-tête, ce qui rendrait le développement local inutilisable
      durablement.
    */
    const enProduction = process.env.NODE_ENV === "production";

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      // Le navigateur ne parle qu'à notre propre serveur : Brevo et Supabase
      // sont appelés depuis le serveur, jamais depuis la page.
      "connect-src 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      ...(enProduction ? ["upgrade-insecure-requests"] : []),
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          // Doublon volontaire de `frame-ancestors`, pour les navigateurs
          // anciens qui ignorent la politique de contenu.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // Deux ans, sous-domaines compris. Uniquement en production : voir
          // le commentaire ci-dessus, un navigateur qui l'a mémorisé refuse le
          // HTTP local pendant toute la durée annoncée.
          ...(enProduction
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains",
                },
              ]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
