"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhotoPlaceholder } from "@/components/ui/photo-placeholder";
import { Reveal } from "@/components/ui/reveal";

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
      AUTOPLAY_DELAY,
    );
    return () => clearInterval(timer);
  }, [isPaused, members.length, timerKey]);

  const goTo = (next: number) => {
    setIndex((next + members.length) % members.length);
    setTimerKey((key) => key + 1);
  };

  return (
    <div
      className="flex w-full flex-col gap-10 md:gap-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative flex w-full flex-col items-center gap-8 text-center md:flex-row md:gap-14 md:text-left">
        {/* Bulle photo, cernée d'anneaux qui évoquent les couloirs d'une piste */}
        <Reveal from="left" className="relative shrink-0">
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[240px] md:h-[380px] md:w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] md:h-[500px] md:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.07]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] md:h-[620px] md:w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/[0.04]"
          />
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
        </Reveal>

        {/* Nom, rôle et accroche : par la droite */}
        <Reveal from="right" delay={150} className="flex-1">
          <div key={`text-${index}`} className="team-fade">
            <p className="font-display text-[13px] font-bold uppercase tracking-[2.5px] text-accent md:text-[14px]">
              {member.role}
            </p>
            <p className="mt-2.5 font-display text-[34px] font-black uppercase leading-none tracking-[-0.02em] md:mt-3 md:text-[56px]">
              {member.name}
            </p>
            {member.tagline ? (
              <p className="mt-3 text-[13px] leading-[1.6] text-muted phone-lg:text-[15px] md:mt-4 md:max-w-[660px] md:text-[18px]">
                {member.tagline}
              </p>
            ) : null}
          </div>
        </Reveal>

        {/* Navigation */}
        <Reveal
          from="right"
          delay={300}
          className="flex flex-col items-center gap-5"
        >
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
        </Reveal>
      </div>

      {/* Les prénoms sur une ligne, comme les bandeaux du site. L'actif en
          vert, les autres en retrait. Un clic amène directement à la personne. */}
      <Reveal
        from="up"
        delay={450}
        className="grid grid-cols-3 justify-items-center gap-x-3 gap-y-2.5 md:flex md:flex-wrap md:items-center md:justify-center md:gap-x-4"
      >
        {members.map((m, i) => (
          <span key={m.name} className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Voir ${m.name}`}
              aria-current={i === index}
              className={`font-display text-[13px] font-extrabold uppercase tracking-[2px] transition-colors md:text-[15px] ${
                i === index
                  ? "text-accent"
                  : "text-white/30 hover:text-white/70"
              }`}
            >
              {m.name}
            </button>
            {i < members.length - 1 ? (
              <span aria-hidden className="hidden text-accent/50 md:inline">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </Reveal>
    </div>
  );
}
