'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Direction = 'left' | 'right' | 'up' | 'right-phone';

const FROM_CLASS: Record<Direction, string> = {
  left: 'reveal-from-left',
  right: 'reveal-from-right',
  up: 'reveal-from-up',
  // Arrive de la droite sur téléphone, de la gauche en desktop
  'right-phone': 'reveal-from-right-phone',
};

/** Doit rester synchronisé avec `--breakpoint-md` dans globals.css. */
const DESKTOP = '(min-width: 860px)';

/**
 * Révèle son contenu (fondu + glissement) quand il entre dans l'écran au
 * scroll. Basé sur IntersectionObserver, sans dépendance.
 *
 * Le composant ne fait que poser une classe une fois l'élément visible : la
 * distance, la courbe, la durée et le délai vivent en CSS (voir globals.css).
 * L'effet est neutralisé pour les visiteurs ayant demandé à réduire les
 * animations.
 *
 * Deux comportements distincts, mis en place le 02/09 après mesure :
 *
 * · en desktop, l'animation se rejoue à chaque retour du bloc à l'écran ;
 * · en mobile, elle ne se joue qu'une fois.
 *
 * Le mobile portait jusque-là exactement la même charge que le desktop, et
 * même davantage à l'usage : 48 révélations déclenchées sur un simple
 * aller-retour dans la page, contre 44 en desktop, parce qu'un écran de
 * 844 pixels de haut fait franchir bien plus de frontières. Remonter d'un cran
 * refaisait donc tout réapparaître en fondu.
 *
 * Correction au passage : ce commentaire affirmait que l'effet était
 * « désactivé en dessous du breakpoint desktop ». C'était faux, aucune règle
 * ne le coupait, et l'affirmation empêchait de chercher le problème au bon
 * endroit.
 *
 * Usage : <Reveal from="left" delay={120}><h2>Titre</h2></Reveal>
 */
export function Reveal({
  children,
  className = '',
  from = 'up',
  delay,
  duration = 3000,
  mobile = false,
}: {
  children: ReactNode;
  className?: string;
  from?: Direction;
  delay?: number;
  /** Durée de l'animation, en ms. 3000 comme le bloc gauche du hero. */
  duration?: number;
  /**
   * Anime aussi en mobile. Fermé par défaut depuis le 02/09 : Antonino a
   * choisi de ne garder que quelques moments forts par page. Il faut donc
   * demander l'animation explicitement, plutôt que d'avoir à la retirer
   * partout et à recommencer au prochain bloc ajouté.
   */
  mobile?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*
      Lu une fois au montage, pas à chaque intersection : la largeur d'écran ne
      change pas pendant qu'on fait défiler une page. Un visiteur qui pivote son
      téléphone garde le comportement du départ, ce qui est sans conséquence.
    */
    const rejoue = window.matchMedia(DESKTOP).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          return;
        }
        // En mobile on ne remasque pas : le bloc reste acquis une fois vu.
        if (rejoue) setShown(false);
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${FROM_CLASS[from]} ${mobile ? 'reveal-mobile' : ''} ${shown ? 'reveal-shown' : ''} ${className}`}
      style={
        {
          '--reveal-duration': `${duration}ms`,
          ...(delay === undefined ? {} : { '--reveal-delay': `${delay}ms` }),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
