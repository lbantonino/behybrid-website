import Image from "next/image";
import Link from "next/link";
import {
  Users,
  CalendarClock,
  Dumbbell,
  Gauge,
  Footprints,
  Lightbulb,
  Shirt,
  CalendarCheck,
  Percent,
} from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Community",
    description: "Connect with runners who push limits and never settle.",
  },
  {
    icon: CalendarClock,
    title: "Weekly Events",
    description: "Perform & Connect runs every week, rain or shine.",
  },
  {
    icon: Dumbbell,
    title: "Training",
    description: "Programs built for runners and hybrid athletes.",
  },
  {
    icon: Gauge,
    title: "For All Paces",
    description: "Everyone is welcome. No ego. Just the love of running.",
  },
];

const MEMBER_STEPS = [
  {
    number: "01",
    title: "Follow",
    description: "Follow us on Instagram or TikTok.",
  },
  {
    number: "02",
    title: "Reach Out",
    description: "Send us a DM, tell us about yourself.",
  },
  {
    number: "03",
    title: "Free Trial",
    description: "Join a free run, no strings attached.",
  },
  {
    number: "04",
    title: "Become A Member",
    description: "Sign up and forge your legend.",
  },
];

const MEMBER_BENEFITS = [
  { icon: Footprints, label: "1 Track Session / Week" },
  { icon: Lightbulb, label: "Weekly Training Tips" },
  { icon: Shirt, label: "BEHYBRID Merch" },
  { icon: Dumbbell, label: "1 Free Strength Session" },
  { icon: CalendarCheck, label: "Priority Access To Events" },
  { icon: Percent, label: "15% Off Club Coaching" },
];

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[560px] items-center border-b border-line">
        <Image
          src="/photos/hero-group-desktop.png"
          alt="Le groupe BEHYBRID lors d'un run à Bruxelles"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover brightness-75 md:block"
        />
        <Image
          src="/photos/hero-group-mobile.jpg"
          alt="Le groupe BEHYBRID lors d'un run à Bruxelles"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-75 md:hidden"
        />
        <div className="absolute inset-0 bg-bg/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 py-24 md:px-10">
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl">
            <span className="text-accent">One</span> Club.
            <br />
            <span className="text-accent">One</span> Community.
          </h1>
          <p className="max-w-xl text-sm text-muted sm:text-base">
            BEHYBRID RUN CLUB BRUSSELS brings together runners of every level
            pushing limits, together. Perform, connect and forge your legend.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/join-us"
              className="rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-accent-ink transition-opacity hover:opacity-90"
            >
              Join The Club →
            </Link>
            <Link
              href="/calendar"
              className="rounded-full border border-ink px-6 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
            >
              See Calendar →
            </Link>
          </div>
        </div>
      </section>

      <div className="border-b border-line px-6 py-4 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-accent">→</span>
            <span className="font-bold uppercase tracking-wide text-accent">
              Next Event
            </span>
            <span className="font-medium">Hard Run 1-1</span>
            <span className="text-muted">
              1 July 2026 · 19:00 · Parc du Cinquantenaire
            </span>
          </div>
          <button
            type="button"
            className="self-start rounded-full border border-ink px-4 py-1.5 text-xs font-bold uppercase tracking-wide sm:self-auto"
          >
            Add +
          </button>
        </div>
      </div>

      <section className="border-b border-line px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl">
            What&apos;s <span className="text-accent">BEHYBRID</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-muted">
            BEHYBRID is a group of individuals pushing their limits, at their
            own level, toward their own goals. Different paces, same spirit:
            run, improve and enjoy. BEHYBRID, it&apos;s you, them and us.
          </p>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-x-12 gap-y-10 text-left sm:grid-cols-2">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <feature.icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                <p className="font-bold uppercase tracking-wide">
                  {feature.title}
                </p>
                <p className="text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-line px-6 py-20 md:px-10">
        <Image
          src="/photos/how-we-move-desktop-mobile.jpg"
          alt="Session de run BEHYBRID"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg/70" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-wide text-accent">
            Weekly Runs
          </p>
          <h2 className="font-display text-3xl font-bold uppercase">
            How We <span className="text-accent">Move</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-accent bg-bg/60 p-6">
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-ink">
                1 Run / Week
              </span>
              <p className="mt-4 font-display text-xl font-bold uppercase">
                Perform
              </p>
              <p className="mt-2 text-sm text-muted">
                Threshold efforts, VO₂ max intervals, race-specific workouts.
                Coach-led track sessions designed to push your limits and
                unlock new levels of performance.
              </p>
            </div>
            <div className="rounded-lg border border-ink bg-bg/60 p-6">
              <span className="rounded-full border border-ink px-3 py-1 text-xs font-bold uppercase">
                2 Runs / Month
              </span>
              <p className="mt-4 font-display text-xl font-bold uppercase">
                Connect
              </p>
              <p className="mt-2 text-sm text-muted">
                The run that brings people together. Easy-paced group runs
                designed to create meaningful connections and make every mile
                more enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line px-6 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-2xl font-bold uppercase sm:text-3xl">
            How To Become A <span className="text-accent">Member</span>
          </h2>
          <p className="mt-1 text-sm uppercase tracking-wide text-muted">
            And what do I get?
          </p>

          <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {MEMBER_STEPS.map((step) => (
              <div key={step.number}>
                <p className="text-xs font-bold text-accent">{step.number}</p>
                <p className="mt-1 font-bold uppercase tracking-wide">
                  {step.title}
                </p>
                <p className="mt-1 text-sm text-muted">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 rounded-lg border border-line p-6 sm:grid-cols-2 lg:grid-cols-3">
            {MEMBER_BENEFITS.map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-3">
                <benefit.icon className="h-5 w-5 shrink-0 text-accent" strokeWidth={1.5} />
                <span className="text-sm font-medium uppercase tracking-wide">
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3">
        {["gallery-1.png", "gallery-2.png", "gallery-3.png"].map((file) => (
          <div key={file} className="relative h-64 w-full">
            <Image
              src={`/photos/${file}`}
              alt="Photo du club BEHYBRID"
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>
    </>
  );
}
