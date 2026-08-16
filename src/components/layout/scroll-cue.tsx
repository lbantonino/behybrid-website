"use client";

import { ArrowDown } from "lucide-react";

/**
 * Indicateur de défilement en bas de section (desktop) : un rond avec une
 * flèche vers le bas qui scrolle en douceur vers la section suivante au clic.
 * `targetId` est l'ancre visée, par défaut celle qui suit le hero.
 */
export function ScrollCue({ targetId = "after-hero" }: { targetId?: string }) {
  const handleClick = () => {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Défiler vers la section suivante"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-ink backdrop-blur-sm transition-colors [animation:cue-bounce_2.2s_ease-in-out_infinite] hover:border-accent hover:text-accent"
    >
      <ArrowDown className="h-5 w-5" />
    </button>
  );
}
