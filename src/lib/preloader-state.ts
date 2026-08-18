/**
 * Mémorise si l'écran de chargement a déjà été joué.
 *
 * Il ne se joue qu'au premier chargement du site, jamais lors des navigations
 * entre pages. Les entrées du hero doivent donc l'attendre la première fois,
 * puis démarrer sans délai quand on revient sur l'accueil depuis une autre page.
 *
 * Une simple variable de module suffit : elle survit aux navigations côté
 * client (le module n'est pas rechargé) et repart à zéro à chaque
 * rafraîchissement complet, exactement comme l'écran de chargement lui-même.
 */
let preloaderPlayed = false;

export function markPreloaderPlayed() {
  preloaderPlayed = true;
}

export function hasPreloaderPlayed() {
  return preloaderPlayed;
}
