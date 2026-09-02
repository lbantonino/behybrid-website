"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "pending" | "already" | "invalid" | "error";

/**
 * Messages de fin de parcours. Le vert est réservé à ce qui a marché : une
 * adresse déjà inscrite n'est pas une erreur du visiteur, mais elle n'appelle
 * aucune action de sa part, d'où le gris.
 */
const MESSAGES: Record<
  Exclude<Status, "idle" | "loading">,
  { text: string; tone: string }
> = {
  pending: {
    text: "Almost there. Check your inbox and click the link to confirm.",
    tone: "text-accent",
  },
  already: {
    text: "You are already subscribed. Nothing else to do.",
    tone: "text-muted",
  },
  invalid: {
    text: "That address does not look right. Check it and try again.",
    tone: "text-muted",
  },
  error: {
    text: "Something went wrong on our side. Try again in a moment.",
    tone: "text-muted",
  },
};

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { status?: Status };

      setStatus(data.status ?? "error");
    } catch {
      // Le visiteur est hors ligne, ou la requête n'est jamais partie.
      setStatus("error");
    }
  }

  // Inscription confirmée : le formulaire n'a plus lieu d'être. Dans les
  // autres cas on le laisse en place, puisqu'il y a quelque chose à corriger
  // ou à retenter.
  if (status === "pending") {
    return (
      <p className={`text-body-sm font-medium ${MESSAGES.pending.tone}`}>
        {MESSAGES.pending.text}
      </p>
    );
  }

  const message =
    status === "already" || status === "invalid" || status === "error"
      ? MESSAGES[status]
      : null;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
      <div className="flex flex-col gap-2.5 md:flex-row md:gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            // Le message précédent ne parle plus de ce qui est saisi.
            if (status !== "idle") setStatus("idle");
          }}
          disabled={status === "loading"}
          aria-invalid={status === "invalid"}
          placeholder="you@example.com"
          className="w-full rounded-full border border-white/15 bg-bg px-4.5 py-3.5 text-body-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none disabled:opacity-60 md:w-[280px] md:bg-bg md:px-5.5 md:py-3.5 md:text-body-sm"
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={status === "loading"}
          className="whitespace-nowrap disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </Button>
      </div>

      {message ? (
        <p className={`text-body-sm ${message.tone}`} role="status">
          {message.text}
        </p>
      ) : null}

      {/*
        En mobile le texte se coupe tout seul, et donne deux lignes de l'iPhone
        SE au 430 px. En desktop, une coupure forcée met chaque phrase sur sa
        ligne, demandé par Antonino le 02/09.

        Les anciens retours à la ligne, posés pour du 11 px, produisaient une
        troisième ligne une fois le texte passé à 13 px. Celui-ci ne s'applique
        qu'au-delà du point de rupture, où la largeur est stable.
      */}
      <p className="max-w-[460px] text-body-sm leading-[1.5] text-faint">
        By subscribing, you agree to receive news and updates from BEHYBRID.
        <br className="hidden md:inline" /> You can unsubscribe at any time.
      </p>
    </form>
  );
}
