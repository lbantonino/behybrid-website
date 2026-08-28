'use client';

import { useEffect } from 'react';

/**
 * Met en évidence l'événement désigné par l'ancre de l'URL.
 *
 * Pourquoi ne pas s'en remettre au seul sélecteur CSS `:target` : il n'est
 * réévalué que lors d'une vraie navigation par fragment. Next.js navigue via
 * l'API History, donc arriver depuis l'accueil (carte "Next Run") change bien
 * l'URL et fait défiler la page, sans jamais déclencher `:target`.
 *
 * Pourquoi surveiller l'URL au lieu de la lire une seule fois : lors d'une
 * navigation entre deux pages, rien ne garantit que l'ancre soit déjà inscrite
 * dans l'URL au moment où ce composant s'monte. On observe donc l'adresse
 * pendant la première seconde, puis on s'en remet aux événements du navigateur.
 */
const WATCH_DURATION = 1000;

export function EventHighlight() {
  useEffect(() => {
    let lastHash: string | null = null;

    const apply = () => {
      const hash = window.location.hash;
      // Rien à faire tant que l'adresse n'a pas changé.
      if (hash === lastHash) return;
      lastHash = hash;

      const targetId = hash.slice(1);
      document.querySelectorAll('.event-row').forEach((row) => {
        row.classList.toggle('is-target', row.id === targetId);
      });
    };

    apply();

    // Filet pour la navigation entre pages, où l'ancre peut arriver après le
    // premier rendu. On s'arrête dès qu'une ancre a été trouvée.
    const startedAt = Date.now();
    const watch = window.setInterval(() => {
      apply();
      if (lastHash || Date.now() - startedAt > WATCH_DURATION) {
        window.clearInterval(watch);
      }
    }, 50);

    window.addEventListener('hashchange', apply);
    window.addEventListener('popstate', apply);

    return () => {
      window.clearInterval(watch);
      window.removeEventListener('hashchange', apply);
      window.removeEventListener('popstate', apply);
    };
  }, []);

  return null;
}
