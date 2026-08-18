'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { hasPreloaderPlayed } from '@/lib/preloader-state';

/**
 * Rejoue l'animation CSS de son contenu à chaque fois qu'il revient à l'écran,
 * en le remontant (changement de `key`, qui relance l'animation).
 *
 * Pourquoi pas le composant Reveal ici : Reveal glisse le conteneur avec
 * `translate`, ce qui en fait un ancêtre transformé et prive la carte
 * "Next Run" de son backdrop-blur pendant toute l'animation. Ici, le conteneur
 * ne bouge pas : ce sont les enfants qui portent leur propre animation.
 *
 * Le délai d'entrée est exposé en variable CSS `--enter-delay` : long au
 * premier passage (le temps que l'écran de chargement s'efface), nul ensuite.
 */
export function ReplayOnView({
  children,
  className = '',
  initialDelay = 0,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  /** Délai avant la toute première animation, en ms. */
  initialDelay?: number;
  /** Délai avant chaque rejeu, en ms. */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInside = useRef(false);
  const [plays, setPlays] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Un seul déclenchement par entrée, pas à chaque micro-variation.
          if (isInside.current) return;
          isInside.current = true;
          setPlays((p) => p + 1);
        } else {
          isInside.current = false;
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Le délai long ne sert qu'à laisser passer l'écran de chargement. Dès qu'il
  // a été joué, ou lors d'un retour depuis une autre page, on démarre tout de
  // suite : la durée ressentie est ainsi la même dans les deux cas.
  const isFirstEntrance = plays <= 1 && !hasPreloaderPlayed();

  return (
    <div ref={ref} className={className}>
      <div
        key={plays}
        className="h-full"
        style={
          {
            '--enter-delay': `${isFirstEntrance ? initialDelay : delay}ms`,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}
