"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { smoothScrollTo, smoothScrollToTop } from "@/lib/smooth-scroll";

/**
 * Indicateur de défilement, en bas à droite d'une section plein écran.
 *
 * La direction est un paramètre depuis le 02/09 : l'équipe voulait pouvoir
 * remonter, pas seulement descendre. Le rebond suit la direction, une flèche
 * vers le haut qui rebondit vers le bas dirait le contraire de ce qu'elle
 * montre.
 *
 * `targetId="top"` remonte tout en haut de la page. On passe par la fonction
 * dédiée plutôt que par une ancre posée sur le hero : viser une ancre laisse
 * le décalage de l'en-tête, et on s'arrêterait 80 pixels sous le haut réel.
 */
export function ScrollCue({
  targetId = "after-hero",
  direction = "down",
}: {
  targetId?: string;
  direction?: "down" | "up";
}) {
  const handleClick = () =>
    targetId === "top" ? smoothScrollToTop() : smoothScrollTo(targetId);
  const Arrow = direction === "up" ? ArrowUp : ArrowDown;
  const bounce =
    direction === "up"
      ? "[animation:cue-bounce-up_2.2s_ease-in-out_infinite]"
      : "[animation:cue-bounce_2.2s_ease-in-out_infinite]";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        direction === "up"
          ? "Scroll to the previous section"
          : "Scroll to the next section"
      }
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-ink backdrop-blur-sm transition-colors hover:border-accent hover:text-accent ${bounce}`}
    >
      <Arrow className="h-5 w-5" />
    </button>
  );
}
