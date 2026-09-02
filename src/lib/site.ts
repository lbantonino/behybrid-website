import { getClubToday } from "@/lib/club-time";

/**
 * Adresse publique du site, nécessaire dès qu'une URL doit être absolue :
 * données structurées lues par Google, plan du site, images de partage.
 *
 * Trois sources, dans cet ordre :
 *
 * 1. `NEXT_PUBLIC_SITE_URL`, le vrai domaine, à poser sur l'hébergeur ;
 * 2. `NEXT_PUBLIC_VERCEL_URL`, que Vercel renseigne tout seul à chaque
 *    déploiement. Elle permet à une préversion d'avoir des adresses justes
 *    sans qu'on ait à connaître son adresse d'avance, ce qui est impossible
 *    au premier déploiement puisqu'elle n'existe pas encore ;
 * 3. le serveur local, en développement.
 *
 * La valeur vide est traitée comme absente. Ce n'est pas une précaution
 * théorique : le premier déploiement Vercel du 02/09 a échoué là-dessus.
 * Une variable créée puis laissée vide passe `??` sans déclencher le repli,
 * `new URL("")` lève une erreur, et le build s'arrête sur un message qui ne
 * dit pas d'où vient le problème.
 */
function resolveSiteUrl() {
  const explicite = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercel = process.env.NEXT_PUBLIC_VERCEL_URL?.trim();

  const brut = explicite || (vercel ? `https://${vercel}` : "");
  if (!brut) return "http://localhost:3000";

  // Oubli fréquent : coller « behybridrunclub.com » sans le protocole.
  const avecProtocole = /^https?:\/\//i.test(brut) ? brut : `https://${brut}`;
  const sansBarreFinale = avecProtocole.replace(/\/$/, "");

  try {
    new URL(sansBarreFinale);
  } catch {
    /*
      Adresse présente mais illisible : on refuse de continuer. Retomber en
      silence sur le serveur local serait pire, le site partirait en
      production en annonçant `localhost` à Google.
    */
    throw new Error(
      `NEXT_PUBLIC_SITE_URL est illisible : ${JSON.stringify(brut)}. ` +
        "Attendu une adresse complète, par exemple https://www.behybridrunclub.com, " +
        "sans barre oblique finale.",
    );
  }

  return sansBarreFinale;
}

export const SITE_URL = resolveSiteUrl();

/**
 * Le site autorise-t-il les moteurs de recherche à l'indexer ?
 *
 * Volontairement fermé par défaut : il faut poser explicitement
 * `NEXT_PUBLIC_ALLOW_INDEXING=true` sur l'hébergeur de production. Toute autre
 * valeur, et l'absence de variable, valent non.
 *
 * Ce sens est le seul sûr. Une préversion Vercel (`*.vercel.app`) partagée à
 * un relecteur, ou n'importe quel déploiement d'essai, se retrouverait sinon
 * indexée avant le vrai domaine : Google garderait deux adresses pour le même
 * site, et le doublon survit longtemps à la correction. Oublier d'autoriser
 * coûte quelques jours de référencement ; oublier d'interdire coûte des mois.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

/** Transforme "/photos/x.jpg" en adresse absolue. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Adresse de contact publique du club, affichée sur la page contact.
 *
 * Sert aussi de destinataire par défaut du formulaire, `CONTACT_TO_EMAIL`
 * n'étant qu'une surcharge : sans cette valeur unique, l'adresse affichée et
 * celle qui reçoit les messages pourraient diverger sans que personne s'en
 * aperçoive.
 */
export const CLUB_EMAIL = "gianlucalobianco03@gmail.com";

/**
 * Mention de copyright, affichée dans le pied de page et dans le menu mobile.
 *
 * L'année est calculée, pas écrite en dur : elle figurait à deux endroits, et
 * le 1er janvier seul l'un des deux aurait été corrigé. Le calcul passe par le
 * fuseau du club, donc il donne le même résultat sur le serveur et dans le
 * navigateur, ce qui compte ici puisque le pied de page est rendu côté serveur
 * et le menu côté client.
 */
export function siteCopyright() {
  return `© ${getClubToday().year} BEHYBRID — Brussels`;
}
