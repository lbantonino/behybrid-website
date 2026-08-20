"use client";

import { ArrowDown } from "lucide-react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export function ScrollCue({ targetId = "after-hero" }: { targetId?: string }) {
  const handleClick = () => smoothScrollTo(targetId);

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
