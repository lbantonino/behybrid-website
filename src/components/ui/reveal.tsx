'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'left' | 'right' | 'up';

const FROM_CLASS: Record<Direction, string> = {
  left: 'reveal-from-left',
  right: 'reveal-from-right',
  up: 'reveal-from-up',
};

/**
 * Révèle son contenu (fondu + glissement) quand il entre dans l'écran au
 * scroll, et rejoue l'animation à chaque retour. Basé sur IntersectionObserver,
 * sans dépendance.
 *
 * L'effet est désactivé en dessous du breakpoint desktop et si le visiteur a
 * demandé à réduire les animations : tout est géré en CSS (voir globals.css),
 * le composant se contente de poser la classe une fois l'élément visible.
 *
 * Usage : <Reveal from="left" delay={120}><h2>Titre</h2></Reveal>
 */
export function Reveal({
  children,
  className = '',
  from = 'up',
  delay = 0,
  duration = 3000,
}: {
  children: ReactNode;
  className?: string;
  from?: Direction;
  delay?: number;
  /** Durée de l'animation, en ms. 3000 comme le bloc gauche du hero. */
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      // L'observation continue : l'élément se remasque en sortant de l'écran,
      // pour que l'animation se rejoue à chaque retour sur la section.
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${FROM_CLASS[from]} ${shown ? 'reveal-shown' : ''} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
}
