"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";

/** Temps d'affichage de chaque personne, en ms. */
const AUTOPLAY_DELAY = 3000;

export type TeamMember = {
  name: string;
  role: string;
  /** Facultative : rien ne s'affiche si elle manque. */
  tagline?: string;
  /** Chemin de la photo, ex. "/photos/team-gianluca.jpg". */
  photo?: string;
};

/**
 * Les figures du club, une à la fois. Défile tout seul, se met en pause au
 * survol, et le minuteur repart à zéro dès que le visiteur clique : sans ça,
 * la personne qu'il vient de choisir disparaîtrait sous ses yeux.
 */
export function TeamSlider({ members }: { members: TeamMember[] }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Change à chaque clic pour relancer le minuteur depuis le début.
  const [timerKey, setTimerKey] = useState(0);

  const member = members[index];

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setIndex((current) => (current + 1) % members.length),
      AUTOPLAY_DELAY
    );
    return () => clearInterval(timer);
  }, [isPaused, members.length, timerKey]);

  const goTo = (next: number) => {
    setIndex((next + members.length) % members.length);
    setTimerKey((key) => key + 1);
  };

  return (
    <div
      className="flex w-full flex-col items-center gap-8 text-center md:flex-row md:gap-14 md:text-left"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Bulle photo */}
      <div
        key={`photo-${index}`}
        className="team-fade h-[170px] w-[170px] shrink-0 overflow-hidden rounded-full border-2 border-accent shadow-[0_0_50px_-12px_rgba(201,241,51,0.6)] md:h-[260px] md:w-[260px]"
      >
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            width={520}
            height={520}
            className="h-full w-full object-cover"
          />
        ) : (
          <PhotoPlaceholder label={member.name} className="h-full w-full" />
        )}
      </div>

      {/* Nom, rôle et accroche */}
      <div key={`text-${index}`} className="team-fade flex-1">
        <p className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
          {member.role}
        </p>
        <p className="mt-2.5 font-display text-[34px] font-black uppercase leading-none tracking-[-0.02em] md:mt-3 md:text-[56px]">
          {member.name}
        </p>
        {member.tagline ? (
          <p className="mt-3 text-[15px] leading-[1.6] text-muted md:mt-4 md:max-w-[440px] md:text-[18px]">
            {member.tagline}
          </p>
        ) : null}
      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-3">
          {/* La flèche gauche n'apparaît qu'une fois qu'on a avancé. */}
          {index > 0 ? (
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Personne précédente"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Personne suivante"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex gap-2">
          {members.map((m, i) => (
            <button
              key={m.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Voir ${m.name}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
