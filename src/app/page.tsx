import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  CalendarDays,
  Dumbbell,
  Gauge,
  Footprints,
  Lightbulb,
  Shirt,
  CalendarCheck,
  Percent,
} from 'lucide-react';
import { Container } from '@/components/ui/container';

const FEATURES = [
  {
    icon: Users,
    title: 'Community',
    description: 'Connect with runners who push limits and never settle.',
  },
  {
    icon: CalendarDays,
    title: 'Weekly Events',
    description: 'Perform & Connect runs every week, rain or shine.',
  },
  {
    icon: Dumbbell,
    title: 'Training',
    description: 'Programs built for runners and hybrid athletes.',
  },
  {
    icon: Gauge,
    title: 'For All Paces',
    description: 'Everyone is welcome. No ego. Just the love of running.',
  },
];

const MEMBER_STEPS = [
  {
    number: '01',
    title: 'Follow',
    description: 'Follow us on Instagram or TikTok.',
  },
  {
    number: '02',
    title: 'Reach Out',
    description: 'Send us a DM, tell us about yourself.',
  },
  {
    number: '03',
    title: 'Free Trial',
    description: 'Join a free run, no strings attached.',
  },
  {
    number: '04',
    title: 'Become A Member',
    description: 'Sign up and forge your legend.',
  },
];

const MEMBER_BENEFITS = [
  { icon: Footprints, label: '1 Track Session / Week' },
  { icon: Lightbulb, label: 'Weekly Training Tips' },
  { icon: Shirt, label: 'BEHYBRID Merch' },
  { icon: Dumbbell, label: '1 Free Strength Session' },
  { icon: CalendarCheck, label: 'Priority Access To Events' },
  { icon: Percent, label: '15% Off Club Coaching' },
];

function SquareMark({
  icon: Icon,
  className = '',
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div
      className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[5px] border-[1.6px] border-accent md:h-[30px] md:w-[30px] md:rounded-md ${className}`}
    >
      <Icon className="h-[13px] w-[13px] text-accent md:h-[16px] md:w-[16px]" />
    </div>
  );
}

function CheckMark({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border-[1.6px] border-accent">
      <Icon className="h-[10px] w-[10px] text-accent" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative h-[500px] md:h-[520px]">
        <Image
          src="/photos/hero-group-mobile.jpg"
          alt="Le groupe BEHYBRID lors d'un run à Bruxelles"
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src="/photos/hero-group-desktop.png"
          alt="Le groupe BEHYBRID lors d'un run à Bruxelles"
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 from-0% to-black/5 md:from-black/50 md:from-0% md:to-black/5" />

        <p className="absolute inset-x-0 top-5 z-10 text-center font-display text-body font-bold uppercase tracking-[3px] text-ink md:text-body-lg">
          BEHYBRID · Run Club Brussels
        </p>

        <Container className="absolute inset-0 flex flex-col justify-center gap-4 py-5 md:py-10">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-display text-h1 font-black uppercase leading-[0.98] md:text-display md:leading-[0.95]">
                <span className="text-accent">One</span> Club.
                <br />
                <span className="text-accent">One</span> Community.
              </h1>
            </div>
            <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:gap-3.5">
              <Link
                href="/join-us"
                className="rounded-full bg-accent px-[34px] py-[15px] text-center font-display text-body font-extrabold uppercase tracking-wide text-accent-ink md:py-4"
              >
                Join The Club →
              </Link>
              <Link
                href="/calendar"
                className="rounded-full border-2 border-white/60 bg-white/20 px-[34px] py-[15px] text-center font-display text-body font-bold uppercase tracking-wide text-ink md: border-2  border-white/60 md:py-4 bg-white/20"
              >
                See Calendar →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <div className="border-y border-line border-l-[3px] border-l-accent bg-bg-alt">
        <Container className="flex flex-col gap-1.5 py-[18px] md:flex-row md:items-center md:gap-7 md:py-5">
          <span className="font-display text-label font-bold uppercase tracking-[2px] text-accent md:text-body-sm">
            → Next Event
          </span>
          <span className="font-display text-body-lg font-bold uppercase">
            Hard Run 1-1
          </span>
          <span className="text-body-sm text-muted md:text-body-sm">
            1 July 2026 · 19:00 · Parc du Cinquantenaire
          </span>
          <button
            type="button"
            className="mt-2 self-start rounded-full border border-white/30 px-5 py-2 font-display text-label font-bold uppercase tracking-wide md:mt-0 md:ml-auto md:self-auto"
          >
            Add +
          </button>
        </Container>
      </div>

      <Container className="pt-12 text-center md:pt-[72px] md:text-left">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-16">
          <div className="mx-auto max-w-[900px] md:mx-0 md:max-w-none">
            <h2 className="font-display text-h2 font-black uppercase md:text-h1">
              What&apos;s <span className="text-accent">BEHYBRID</span>?
            </h2>
            <p className="mt-4 text-body-sm leading-[1.7] text-muted-light md:mt-5 md:text-body">
              BEHYBRID is a run club in Brussels bringing together runners of
              every level. A community of individuals pushing their limits, at
              their own pace, toward their own goals. Different paces, different
              ambitions, same spirit: run, improve and enjoy. BEHYBRID, it’s
              you, them and us.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-[900px] grid-cols-2 gap-6 md:mx-0 md:mt-0 md:max-w-none md:gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-1.5 text-center md:items-start md:text-left"
              >
                <SquareMark icon={feature.icon} />
                <p className="font-display text-body-sm font-bold uppercase md:text-body-lg">
                  {feature.title}
                </p>
                <p className="text-label leading-normal text-muted md:text-body-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section className="relative mt-14 py-11 md:mt-[72px] md:py-14">
        <Image
          src="/photos/how-we-move-desktop-mobile.jpg"
          alt="Session de run BEHYBRID"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55 md:bg-black/60" />

        <Container className="relative">
          <p className="mb-2 font-display text-label font-bold uppercase tracking-[2px] text-accent">
            Weekly Runs
          </p>
          <h2 className="mb-6 font-display text-h2 font-black uppercase md:mb-7 md:text-h1">
            How We <span className="text-accent">Move</span>
          </h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            <div className="rounded-lg border border-accent bg-bg/50 p-[22px] md:rounded-[10px] md:p-7">
              <span className="mb-3.5 inline-block rounded-full bg-accent px-3 py-1.5 font-display text-label font-extrabold tracking-wide text-accent-ink">
                1 Run / Week
              </span>
              <p className="mb-2.5 font-display text-h3 font-extrabold uppercase md:text-h3">
                Perform
              </p>
              <p className="text-body-sm leading-relaxed text-ink-soft">
                Threshold efforts, VO₂ max intervals, race-specific workouts.
                Coach-led track sessions designed to push your limits.
              </p>
            </div>
            <div className="rounded-lg border border-white/40 bg-bg/50 p-[22px] md:rounded-[10px] md:p-7">
              <span className="mb-3.5 inline-block rounded-full border border-white/50 px-3 py-1.5 font-display text-label font-extrabold tracking-wide">
                2 Runs / Month
              </span>
              <p className="mb-2.5 font-display text-h3 font-extrabold uppercase md:text-h3">
                Connect
              </p>
              <p className="text-body-sm leading-relaxed text-ink-soft">
                The run that brings people together. Easy-paced group runs to
                create meaningful connections.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-[72px]">
        <h2 className="font-display text-h2 font-black uppercase md:text-h1">
          How To Become A <span className="text-accent">Member</span>
        </h2>
        <p className="mb-7 font-display text-body-sm font-bold uppercase text-faintest md:mb-9 md:text-body">
          And What Do I Get?
        </p>

        <div className="md:grid md:grid-cols-2 md:gap-16">
          <div className="mb-8 grid grid-cols-2 gap-5 md:mb-0 md:gap-x-10 md:gap-y-17">
            {MEMBER_STEPS.map((step) => (
              <div key={step.number}>
                <p className="mb-2 font-display text-body-sm font-extrabold text-accent">
                  {step.number}
                </p>
                <p className="mb-1 font-display text-body font-bold uppercase md:text-body">
                  {step.title}
                </p>
                <p className="text-label leading-snug text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-[18px] rounded-lg border border-line p-6 md:grid md:grid-flow-col md:grid-rows-3 md:gap-x-8 md:gap-y-5 md:rounded-[10px] md:p-8">
            {MEMBER_BENEFITS.map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-3">
                <CheckMark icon={benefit.icon} />
                <span className="text-body-sm text-ink-soft md:text-body-sm">
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section className="grid grid-cols-1 gap-0.5 md:grid-cols-3">
        {['gallery-1.png', 'gallery-2.png', 'gallery-3.png'].map((file) => (
          <div key={file} className="relative h-[160px] w-full md:h-[340px]">
            <Image
              src={`/photos/${file}`}
              alt="Photo du club BEHYBRID"
              fill
              sizes="(min-width: 860px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </section>
    </>
  );
}
