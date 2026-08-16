'use client';

import { useRef } from 'react';

/** Inclinaison maximale de la carte, en degrés, aux coins. */
const MAX_TILT = 8;

/**
 * Carte avec inclinaison 3D au survol : elle pivote vers le curseur et un
 * reflet vert accent suit la souris. Souris uniquement (ignoré au toucher),
 * et neutralisé si le visiteur a demandé à réduire les animations.
 */
export function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card || event.pointerType !== 'mouse') return;

    const bounds = card.getBoundingClientRect();
    // Position du curseur dans la carte, de 0 (haut/gauche) à 1 (bas/droite).
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;

    // Le haut de la carte bascule vers l'arrière quand la souris est en bas.
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 2 * MAX_TILT}deg`);
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 2 * MAX_TILT}deg`);
    card.style.setProperty('--tilt-mx', `${x * 100}%`);
    card.style.setProperty('--tilt-my', `${y * 100}%`);
  };

  const handleLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}
