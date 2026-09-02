import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_URL } from "@/lib/site";

/*
  Consignes données aux robots des moteurs de recherche.

  Ce fichier suit le même interrupteur que les balises `noindex` du layout,
  et ce n'est pas une coquetterie : laisser un `robots.txt` accueillant sur
  une préversion pendant que les pages disent « ne m'indexe pas » revient à
  donner deux ordres contradictoires. Les moteurs tranchent alors comme ils
  veulent, ce qui est exactement ce qu'on cherche à éviter.

  Tant que `NEXT_PUBLIC_ALLOW_INDEXING` ne vaut pas "true", tout est fermé.
*/
export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /*
        Ces deux pages portent déjà un `noindex`, mais un `noindex` doit être
        lu pour agir : le robot doit charger la page. Les écarter ici lui
        évite le détour, et évite surtout qu'un lien privé de confirmation
        d'inscription finisse exploré.

        Les routes d'API ne servent rien à lire et n'acceptent que des envois
        de formulaire.
      */
      disallow: ["/style-guide", "/newsletter/", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
