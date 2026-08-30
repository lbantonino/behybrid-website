'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { CONTACT_TOPICS, type ContactTopic } from '@/lib/contact';

type Status = 'idle' | 'loading' | 'sent' | 'invalid' | 'error';

const MESSAGES: Record<Exclude<Status, 'idle' | 'loading'>, string> = {
  sent: 'Message sent. We usually reply within 24 hours.',
  invalid: 'Something is missing. Check the fields and try again.',
  error: 'Something went wrong on our side. Try again in a moment.',
};

const FIELD =
  'w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-body-sm text-ink placeholder:text-faint transition-colors focus:border-accent focus:outline-none disabled:opacity-60';
const LABEL =
  'mb-1.5 block font-display text-[10px] font-bold uppercase tracking-[1.5px] text-muted';

export function ContactForm() {
  const [topic, setTopic] = useState<ContactTopic>('joining');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          email: data.get('email'),
          message: data.get('message'),
          topic,
        }),
      });

      const result = (await response.json()) as { status?: Status };

      setStatus(result.status ?? 'error');
      if (result.status === 'sent') form.reset();
    } catch {
      setStatus('error');
    }
  }

  // Message parti : le formulaire n'a plus lieu d'être. Dans les autres cas on
  // le laisse en place, puisqu'il y a quelque chose à corriger ou à retenter.
  if (status === 'sent') {
    return <p className="text-body-sm font-medium text-accent">{MESSAGES.sent}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={LABEL} htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            placeholder="Jane"
            disabled={status === 'loading'}
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL} htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            placeholder="Doe"
            disabled={status === 'loading'}
            className={FIELD}
          />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@email.com"
          disabled={status === 'loading'}
          className={FIELD}
        />
      </div>

      <fieldset>
        <legend className={LABEL}>I&rsquo;m writing about</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_TOPICS.map((option) => {
            const isSelected = topic === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setTopic(option.value)}
                aria-pressed={isSelected}
                className={`rounded-full border px-3.5 py-2 font-display text-[10px] font-bold uppercase tracking-[1px] transition-colors phone-lg:text-[11px] ${
                  isSelected
                    ? 'border-accent bg-accent text-bg'
                    : 'border-white/15 text-muted hover:border-white/40 hover:text-ink'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label className={LABEL} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Tell us a bit about yourself and your goals&hellip;"
          disabled={status === 'loading'}
          className={`${FIELD} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 font-display text-body-sm font-extrabold uppercase tracking-wide text-bg transition hover:opacity-90 disabled:opacity-60"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
        {status === 'loading' ? null : <ArrowRight className="h-4 w-4" />}
      </button>

      {status === 'invalid' || status === 'error' ? (
        <p className="text-body-sm text-muted" role="status">
          {MESSAGES[status]}
        </p>
      ) : null}

      <p className="text-[11px] leading-[1.5] text-faint">
        By sending this message, you agree that we use your details to reply. See
        our{' '}
        <Link href="/privacy" className="underline hover:text-muted">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
