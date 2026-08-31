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
