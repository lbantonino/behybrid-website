"use client";

import { ArrowDown } from "lucide-react";

/**
 * Indicateur de défilement en bas du hero (desktop) : un rond avec une flèche
 * vers le bas qui scrolle en douceur vers la section suivante au clic.
 */
export function ScrollCue() {
  const handleClick = () => {
    document
      .getElementById("after-hero")
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
