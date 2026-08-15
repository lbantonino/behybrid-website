'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Révèle son contenu (fondu + léger glissement vers le haut) quand il entre
 * dans l'écran au scroll. Basé sur IntersectionObserver, sans dépendance.
 *
 * Usage : <Reveal delay={100}><h2>Titre</h2></Reveal>
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect de l'accessibilité : pas d'animation si l'utilisateur la refuse.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect(); // une seule fois, on ne rejoue pas au re-scroll
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-shown' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
