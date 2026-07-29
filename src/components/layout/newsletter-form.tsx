"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  // TODO: brancher sur une table Supabase "newsletter_subscribers" une fois le backend en place.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <p className="text-sm font-medium text-accent">
        Merci, tu es inscrit à la newsletter BEHYBRID.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 md:flex-row md:gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-full border border-white/15 bg-bg px-[18px] py-[13px] text-[13px] text-ink placeholder:text-muted focus:border-accent focus:outline-none md:w-[280px] md:bg-bg-raised md:px-[22px] md:py-3.5 md:text-sm"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-full bg-accent px-7 py-[13px] text-center font-display text-[13px] font-extrabold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-90 md:py-3.5"
      >
        Subscribe
      </button>
    </form>
  );
}
