"use client";

import { ArrowDown } from "lucide-react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

/*
  Indicateur de défilement, en bas à droite d'une section plein écran.

  Une flèche de remontée symétrique a été essayée le 02/09 à la demande de
  l'équipe, puis retirée le jour même : Antonino a trouvé le rendu mauvais.
  Le code de la variante a été supprimé plutôt que laissé désactivé, pour ne
  pas laisser croire à une fonction disponible. La décision est notée ici afin
  que la question ne soit pas reposée sans connaître la réponse.
*/
export function ScrollCue({ targetId = "after-hero" }: { targetId?: string }) {
  const handleClick = () => smoothScrollTo(targetId);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to the next section"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-ink backdrop-blur-sm transition-colors [animation:cue-bounce_2.2s_ease-in-out_infinite] hover:border-accent hover:text-accent"
    >
      <ArrowDown className="h-5 w-5" />
    </button>
  );
}
