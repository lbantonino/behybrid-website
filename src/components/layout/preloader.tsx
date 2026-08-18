"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { markPreloaderPlayed } from "@/lib/preloader-state";

const TRACK_WIDTH = 260; // px
const RUNNER_WIDTH = 30; // px
const RUN_DURATION = 1300; // ms

/**
 * Écran de chargement "running" : le logo BH au-dessus, et un petit coureur
 * qui parcourt une barre de chargement (remplie en vert accent), puis fondu.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const fill = fillRef.current;
    const runner = runnerRef.current;
    if (!overlay || !fill || !runner) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 500 : RUN_DURATION;
    const easing = "cubic-bezier(0.45, 0, 0.55, 1)";

    // La barre se remplit
    fill.animate([{ width: "0px" }, { width: `${TRACK_WIDTH}px` }], {
      duration: dur,
      easing,
      fill: "forwards",
    });

    // Le coureur avance le long de la barre
    runner.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${TRACK_WIDTH - RUNNER_WIDTH}px)` },
      ],
      { duration: dur, easing, fill: "forwards" }
    );

    // Fondu de sortie une fois arrivé
    const fadeTimer = setTimeout(() => {
      overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      });
    }, dur + 120);

    const doneTimer = setTimeout(() => {
      markPreloaderPlayed(); // les entrées du hero n'ont plus à l'attendre
      setHidden(true);
    }, dur + 680);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-bg"
      aria-hidden
    >
      <div className="relative h-10" style={{ width: TRACK_WIDTH }}>
        {/* piste */}
        <div className="absolute bottom-0 h-[3px] w-full rounded-full bg-accent/20" />
        {/* remplissage */}
        <div
          ref={fillRef}
          className="absolute bottom-0 h-[3px] w-0 rounded-full bg-ink"
        />
        {/* coureur */}
        <div
          ref={runnerRef}
          className="absolute bottom-[3px] left-0"
          style={{ width: RUNNER_WIDTH }}
        >
          <Image
            src="/logo/runner-preoload.png"
            alt=""
            width={474}
            height={511}
            priority
            className="h-7 w-auto [animation:run-bob_0.4s_ease-in-out_infinite]"
          />
        </div>
      </div>
    </div>
  );
}
