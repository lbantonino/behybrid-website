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
 * scroll. Basé sur IntersectionObserver, sans dépendance.
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
}: {
  children: ReactNode;
  className?: string;
  from?: Direction;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect(); // une seule fois, on ne rejoue pas au re-scroll
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${FROM_CLASS[from]} ${shown ? 'reveal-shown' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
