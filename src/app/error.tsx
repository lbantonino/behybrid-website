"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

/*
  Filet de sécurité pour toute erreur survenant au rendu d'une page. Les
  frontières d'erreur de React sont forcément des composants client, d'où le
  "use client" : c'est une contrainte de React, pas un choix.

  Ce fichier ne couvre pas le layout racine, qui l'englobe. Une erreur dans le
  layout tombe dans `global-error.tsx`, à côté.
*/
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  /*
    Renommé depuis `reset` en Next 16.2 : `unstable_retry` refait la requête et
    le rendu, là où `reset` se contentait de vider l'état de la frontière. Sur
    une panne réseau passagère, c'est la première qui a une chance d'aboutir.
  */
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Seule trace exploitable : en production, le visiteur ne reçoit qu'un
    // identifiant, le message réel reste dans les journaux du serveur.
    console.error("Erreur de rendu :", error);
  }, [error]);

  return (
    <section className="relative flex flex-1 items-center overflow-x-clip py-16 md:min-h-[calc(100vh-5rem)] md:py-0">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px] md:h-[620px] md:w-[620px]"
      />

      <Container className="relative">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-2.5 md:gap-3.5">
            <span className="h-px w-6 bg-accent md:w-8" />
            <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
              Something Broke
            </span>
          </div>

          <h1 className="mt-6 font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:mt-5 md:text-[70px] md:leading-[0.9]">
            We Pulled
            <br className="md:hidden" /> A Muscle
          </h1>

          <p className="mt-4 max-w-[460px] text-body-sm text-muted md:mt-5 md:text-body">
            Something went wrong on our side. Trying again often fixes it. If it
            does not, the run is still on, and we are one message away.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center md:mt-10">
            <Button onClick={() => unstable_retry()} size="lg">
              Try Again →
            </Button>
            <Button href="/" variant="ghost" size="lg">
              Back Home
            </Button>
          </div>

          <p className="mt-7 text-body-sm text-faint md:mt-9">
            Still stuck?{" "}
            <Link
              href="/contact"
              className="text-ink underline decoration-accent decoration-2 underline-offset-4 transition hover:text-accent"
            >
              Tell us what happened
            </Link>
            .
          </p>

          {/*
            L'identifiant sert à retrouver l'erreur dans les journaux du
            serveur. Affiché discrètement : inutile au visiteur, précieux le
            jour où quelqu'un nous signale un problème.
          */}
          {error.digest ? (
            <p className="mt-6 font-display text-[10px] uppercase tracking-[1.5px] text-faint/70">
              Reference {error.digest}
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
