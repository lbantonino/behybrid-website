'use client';

import { useEffect } from 'react';

/**
 * Au rechargement de la page, le navigateur restaure par défaut la position de
 * scroll précédente : on repartait donc au milieu du site. On désactive cette
 * restauration et on remonte en haut (le hero), sauf si l'URL vise une ancre.
 */
export function ScrollReset() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    if (window.location.hash) return;

    const toTop = () => window.scrollTo(0, 0);
    toTop();
    // Certains navigateurs restaurent la position après l'hydratation :
    // on repasse une fois au frame suivant et au chargement complet.
    const frame = requestAnimationFrame(toTop);
    window.addEventListener('load', toTop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', toTop);
    };
  }, []);

  return null;
}
