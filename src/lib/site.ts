/**
 * Adresse publique du site, nécessaire dès qu'une URL doit être absolue :
 * données structurées lues par Google, images de partage sur les réseaux.
 *
 * À définir sur l'hébergeur (variable `NEXT_PUBLIC_SITE_URL`, sans barre
 * oblique finale). En développement, on retombe sur le serveur local, ce qui
 * n'a aucune conséquence : Google ne lit pas cette machine.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');

/** Transforme "/photos/x.png" en adresse absolue. */
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
