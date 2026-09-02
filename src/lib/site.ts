import { getClubToday } from "@/lib/club-time";

/**
 * Adresse publique du site, nécessaire dès qu'une URL doit être absolue :
 * données structurées lues par Google, images de partage sur les réseaux.
 *
 * À définir sur l'hébergeur (variable `NEXT_PUBLIC_SITE_URL`, sans barre
 * oblique finale). En développement, on retombe sur le serveur local, ce qui
 * n'a aucune conséquence : Google ne lit pas cette machine.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

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
