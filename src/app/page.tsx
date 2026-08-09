import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { ScrollCue } from '@/components/layout/scroll-cue';

const FEATURES = [
  {
    icon: Users,
    title: 'Community',
    description: ['Connect with runners who', 'push limits and never settle.'],
  },
  {
    icon: CalendarDays,
    title: 'Weekly Events',
    description: ['Perform & Connect runs every', 'week, rain or shine.'],
  },
  {
    icon: Dumbbell,
    title: 'Training',
    description: ['Programs built for runners', 'and hybrid athletes.'],
  },
  {
    icon: Gauge,
    title: 'For All Paces',
    description: ['Everyone is welcome. No ego.', 'Just the love of running.'],
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
      className={`flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded border-[1.6px] border-accent md:h-[30px] md:w-[30px] ${className}`}
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

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <span
          key={i}
          className="flex items-center gap-4 whitespace-nowrap pr-4 font-display text-[13px] font-extrabold uppercase tracking-[2px] text-ink/85"
        >
          BEHYBRID <span className="text-accent">ı</span> Run Club Brussels
          <span className="text-accent">ı</span>
        </span>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/65" />

        {/* Bandeau défilant */}
        <div className="absolute inset-x-0 top-5 z-20 overflow-hidden py-2.5">
          <div className="flex w-max animate-marquee">
            <MarqueeRow />
            <MarqueeRow />
          </div>
        </div>

        {/* Contenu */}
        <Container className="relative z-10 flex min-h-[620px] flex-col justify-center gap-10 pb-14 pt-24 md:h-[calc(100vh-5rem)] md:min-h-[600px] md:flex-row md:items-center md:justify-between md:gap-12 md:pb-16 md:pt-20">
          <div className="flex max-w-[640px] flex-col items-start gap-5 [animation:slide-in-left_3s_cubic-bezier(0.22,1,0.36,1)_2s_both] md:gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-display text-[12px] font-bold uppercase tracking-[1.5px] text-ink">
                Every Weeks
              </span>
            </span>

            <h1 className="font-display text-[53pxpx] font-black uppercase leading-[0.8] tracking-[-0.02em] md:text-[70px]">
              Perform
              <br />
              <span className="font-mont text-accent">&</span> Connect
            </h1>

            <p className="font-display text-[15px] font-medium leading-[1.2] text-ink/90 md:text-[17px]">
              Different paces. Different goals.
              <br />
              One crew moving forward together.
            </p>

            <div className="mt-1 flex flex-col gap-3 md:flex-row md:items-center md:gap-3.5">
              <Button
                href="/join-us"
                variant="primary"
                size="lg"
                className="text-[16px] font-extrabold"
              >
                Join The Club →
              </Button>
              <Button
                href="/calendar"
                variant="ghost"
                size="lg"
                className="text-[16px] font-extrabold"
              >
                See Calendar →
              </Button>
            </div>
          </div>

          {/* Encadré Next Run */}
          <div className="w-full rounded-2xl border border-white/15 bg-white/1 p-6 backdrop-blur-md [animation:slide-in-right_4s_cubic-bezier(0.22,1,0.36,1)_2.5s_both] md:w-[400px] md:shrink-0 md:p-7">
            <p className="font-display text-[12px] font-extrabold uppercase tracking-[2px] text-accent">
              → Next Run
            </p>
            <p className="mt-4 font-display text-[28px] font-black uppercase leading-[1.05] text-ink">
              Wednesday - 12/08
              <br />
              19:00
            </p>
            <p className="mt-2.5 font-display text-[15px] font-semibold uppercase tracking-wide text-ink/80">
              Parc du Cinquantenaire
            </p>

            <div className="my-6 h-px w-full bg-white/15" />

            <div className="flex items-end justify-between">
              <p className="font-display text-[21px] font-extrabold uppercase text-ink">
                Workout :
              </p>
              <p className="font-display text-[26px] font-black leading-none text-ink">
                8.0<span className="text-[15px] font-bold">km</span>
              </p>
            </div>
            <div className="mt-1.5 flex items-end justify-between">
              <p className="font-display text-[16px] font-light uppercase tracking-wide text-ink/80">
                4x 5min @treshold
              </p>
              <p className="font-display text-[11px] font-normal uppercase tracking-wide text-muted">
                Distance
              </p>
            </div>

            <p className="mt-6 font-display text-[11px] font-normal uppercase tracking-[1.5px] text-muted">
              For All Levels
            </p>
          </div>
        </Container>

        {/* Indicateur de défilement (desktop) */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:block">
          <ScrollCue />
        </div>
      </section>

      <div id="after-hero" aria-hidden className="scroll-mt-20" />

      <Container className="pt-12 text-center md:pt-18 md:text-left">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-16">
          <div className="mx-auto max-w-[900px] md:mx-0 md:max-w-none">
            <h2 className="font-display text-h2 font-black uppercase md:text-h1">
              What&apos;s BEHYBRID?
            </h2>
            <p className="mt-4 text-body-sm leading-[1.7] text-muted md:mt-5 md:max-w-[420px] md:text-body">
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
                <p className="font-display text-body-sm font-bold uppercase md:text-h3">
                  {feature.title}
                </p>
                <p className="text-body-sm leading-normal text-muted md:text-body">
                  {feature.description[0]} <br className="hidden md:block" />
                  {feature.description[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section className="relative mt-14 py-11 md:mt-18 md:py-14">
        <Image
          src="/photos/how-we-move-desktop-mobile.jpg"
          alt="Session de run BEHYBRID"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55 md:bg-black/60" />

        <Container className="relative">
          <p className="font-display text-body font-bold uppercase leading-none tracking-[2px] text-accent md:-mb-2 md:text-[18px]">
            Weekly Runs
          </p>
          <h2 className="mb-6 font-display text-h2 font-black uppercase md:mb-7 md:text-h1">
            How We Move
          </h2>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            <div className="rounded-xl border border-accent bg-bg/50 p-5.5 md:rounded-xl md:p-7">
              <Badge variant="accent" className="mb-3.5">
                1 Run / Week
              </Badge>
              <p className="mb-2.5 font-display text-h3 font-extrabold uppercase md:text-h3">
                Perform
              </p>
              <p className="text-body-sm leading-relaxed text-ink">
                Threshold efforts, VO₂ max intervals, race-specific workouts.
                Coach-led track sessions designed to push your limits.
              </p>
            </div>
            <div className="rounded-xl border border-white/40 bg-bg/50 p-5.5 md:rounded-xl md:p-7">
              <Badge variant="outline" className="mb-3.5">
                2 Runs / Month
              </Badge>
              <p className="mb-2.5 font-display text-h3 font-extrabold uppercase md:text-h3">
                Connect
              </p>
              <p className="text-body-sm leading-relaxed text-ink">
                The run that brings people together. Easy-paced group runs to
                create meaningful connections.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14 md:py-18">
        <h2 className="font-display text-h2 font-black uppercase md:text-h1">
          How To Become A Member
        </h2>
        <p className="mb-7 font-display text-body-sm font-bold uppercase text-faint md:mb-9 md:-mt-2 md:text-[18px] md:leading-none">
          And What Do I Get?
        </p>

        <div className="md:grid md:grid-cols-2 md:gap-16">
          <div className="mb-8 grid grid-cols-2 gap-5 md:mb-0 md:gap-x-10 md:gap-y-9">
            {MEMBER_STEPS.map((step) => (
              <div key={step.number}>
                <p className="mb-2 font-display text-body-sm font-extrabold text-accent md:mb-1 md:text-h3 md:leading-none">
                  {step.number}
                </p>
                <p className="mb-1 font-display text-body font-bold uppercase md:mb-1 md:text-h3 md:leading-none">
                  {step.title}
                </p>
                <p className="text-label leading-snug text-muted md:text-body-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4.5 rounded-xl border border-line p-6 md:grid md:grid-flow-col md:grid-rows-3 md:gap-x-8 md:gap-y-5 md:rounded-xl md:p-8">
            {MEMBER_BENEFITS.map((benefit) => (
              <div key={benefit.label} className="flex items-center gap-3">
                <CheckMark icon={benefit.icon} />
                <span className="text-body-sm text-ink md:text-body-sm">
                  {benefit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <section className="grid grid-cols-1 gap-0.5 md:grid-cols-3 md:gap-0">
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
