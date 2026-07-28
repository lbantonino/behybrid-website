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
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        className="w-full rounded-full border border-line bg-bg-raised px-5 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        className="whitespace-nowrap rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-90"
      >
        Subscribe
      </button>
    </form>
  );
}
