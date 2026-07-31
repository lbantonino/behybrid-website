"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

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
      <p className="text-body-sm font-medium text-accent">
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
        className="w-full rounded-full border border-white/15 bg-bg px-4.5 py-3.5 text-body-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none md:w-[280px] md:bg-bg md:px-5.5 md:py-3.5 md:text-body-sm"
      />
      <Button type="submit" variant="primary" size="md" className="whitespace-nowrap">
        Subscribe
      </Button>
    </form>
  );
}
