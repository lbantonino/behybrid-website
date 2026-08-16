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
import { TiltCard } from '@/components/ui/tilt-card';
import { Reveal } from '@/components/ui/reveal';

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

/** Chiffres clés de la section "What's BEHYBRID" (desktop uniquement). */
const CLUB_STATS = [
  { value: '100+', label: 'Runners' },
  { value: 'Every', label: 'Week' },
  { value: '2024', label: 'Since' },
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

/** Icône des cartes "What's BEHYBRID" : carré plein teinté accent. */
function CardMark({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/12 md:h-12 md:w-12 md:rounded-xl">
      <Icon className="h-[17px] w-[17px] text-accent md:h-[22px] md:w-[22px]" />
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
        <Container className="relative z-10 flex h-[calc(100svh-5rem)] flex-col justify-between gap-2 pb-8 pt-20 md:h-[calc(100vh-5rem)] md:min-h-[600px] md:flex-row md:items-center md:justify-between md:gap-12 md:pb-16 md:pt-20">
          <div className="flex max-w-[640px] flex-col items-center gap-3 text-center [animation:slide-in-left_3s_cubic-bezier(0.22,1,0.36,1)_2s_both] md:items-start md:gap-6 md:text-left">
            <span className="inline-flex mb-3 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-display text-[12px] font-bold uppercase tracking-[1.5px] text-ink">
                Every Week
              </span>
            </span>

            <h1 className="font-display text-[45px] font-black uppercase leading-[0.82] tracking-[-0.02em] md:text-[70px] md:leading-[0.8]">
              Perform
              <br />
              <span className="font-mont text-accent">&</span> Connect
            </h1>

            <p className="font-display text-[15px] font-medium leading-[1.2] text-ink/90 md:text-[17px]">
              Different paces. Different goals.
              <br />
              One crew moving forward together.
            </p>

            <div className="mt-1 flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-3.5">
              <Button
                href="/join-us"
                variant="primary"
                size="lg"
                className="w-full text-[16px] font-extrabold md:w-auto"
              >
                Join The Club →
              </Button>
              <Button
                href="/calendar"
                variant="ghost"
                size="lg"
                className="w-full text-[16px] font-extrabold md:w-auto"
              >
                See Calendar →
              </Button>
            </div>
          </div>

          {/* Encadré Next Run. L'entrée passe par `translate` (et non
              `transform`) pour cohabiter avec l'inclinaison 3D sans parent
              animé, qui priverait la carte de son backdrop-blur. */}
          <TiltCard className="tilt-card--flat relative w-full rounded-2xl border border-white/15 bg-white/1 p-5 backdrop-blur-md [animation:slide-in-right-translate_4s_cubic-bezier(0.22,1,0.36,1)_2.5s_both] md:w-[400px] md:shrink-0 md:p-7">
            <div>
              <p className="font-display text-[12px] font-extrabold uppercase tracking-[2px] text-accent">
                → Next Run
              </p>
              <p className="mt-3 font-display text-[16px] font-black uppercase leading-[1.05] text-ink md:mt-4 md:text-[28px]">
                Wednesday <span className="md:hidden">-</span>{' '}
                <br className="hidden md:block" /> 12/08 - 19:00
              </p>
              <p className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink/80">
                Parc du Cinquantenaire
              </p>

              <div className="my-2 h-px w-full bg-white/15 md:my-6" />

              <div className="flex items-end justify-between">
                <p className="font-display text-[15px] font-extrabold uppercase text-ink md:text-[21px]">
                  Workout :
                </p>

                {/* Visible uniquement sur mobile */}
                <p className="font-display text-[10px] font-normal uppercase tracking-[1.5px] text-muted md:hidden">
                  For All Levels
                </p>
              </div>

              <div className="flex items-end justify-between">
                <p className="font-display text-[12px] font-light uppercase tracking-wide text-ink/80 md:text-[16px]">
                  4x 5min @treshold
                </p>
              </div>

              {/* Visible uniquement sur desktop */}
              <p className="mt-6 hidden font-display text-[11px] font-normal uppercase tracking-[1.5px] text-muted md:block">
                For All Levels
              </p>
            </div>
          </TiltCard>
        </Container>

        {/* Indicateur de défilement (desktop) */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:block">
          <ScrollCue />
        </div>
      </section>

      <div id="after-hero" aria-hidden className="scroll-mt-20" />

      <section className="relative flex min-h-[calc(100lvh-5rem)] flex-col overflow-x-clip md:h-[calc(100vh-5rem)] md:overflow-hidden">
        {/* Halos verts diffus : un fort en haut à droite, un discret en bas à gauche */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.20),transparent_68%)] blur-3xl md:-top-32 md:h-[700px] md:w-[700px]" />
          <div className="absolute -bottom-24 -left-24 h-[340px] w-[340px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.13),transparent_68%)] blur-3xl md:-bottom-32 md:h-[620px] md:w-[620px]" />
        </div>

        {/* Barre d'en-tête de section */}
        <Container className="relative pt-7 md:pt-10">
          <Reveal className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 md:gap-3.5">
              <span className="h-px w-6 bg-accent md:w-8" />
              <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
                About The Club
              </span>
            </div>
            <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-faint">
              <span className="hidden md:inline">Brussels · </span>Est. 2024
            </span>
          </Reveal>
        </Container>

        <Container className="relative flex flex-1 items-stretch pb-4 pt-9 text-center md:items-center md:pb-0 md:pt-0 md:text-left">
          <div className="flex w-full flex-col justify-between md:grid md:grid-cols-2 md:items-center md:gap-16">
            <Reveal
              from="left"
              className="mx-auto max-w-[900px] md:mx-0 md:max-w-none"
            >
              <h2 className="font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:text-[68px]">
                What&apos;s <br />
                BEHYBRID?
              </h2>
              {/* Version courte (mobile) : le texte long ne tient pas dans un écran */}
              <p className="mt-4 text-[13px] leading-[1.55] text-muted md:hidden">
                BEHYBRID is a run club in Brussels bringing together runners of
                every level. A community of individuals pushing their limits.
              </p>

              <p className="mt-4 hidden text-[13px] leading-[1.55] text-muted md:mt-6 md:block md:max-w-[470px] md:text-[16px] md:leading-[1.65]">
                BEHYBRID is a run club in Brussels bringing together runners of
                every level. A community of individuals pushing their limits, at
                their own pace, toward their own goals. Different paces,
                different ambitions, same spirit:{' '}
                <span className="font-bold text-ink">
                  run, improve and enjoy.
                </span>{' '}
                BEHYBRID, it’s you, them and us.
              </p>

              {/* Chiffres clés (desktop) : dans la colonne de gauche */}
              <div className="mt-9 hidden text-left md:flex md:items-stretch">
                {CLUB_STATS.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col justify-center ${
                      index > 0 ? 'border-l border-line pl-10' : ''
                    } ${index < CLUB_STATS.length - 1 ? 'pr-10' : ''}`}
                  >
                    <p className="font-display text-h1 font-black uppercase leading-none text-accent">
                      {stat.value}
                    </p>
                    <p className="mt-3 font-display text-label font-bold uppercase tracking-[2px] text-faint">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Chiffres clés (mobile) : bloc autonome, pour être réparti en
                hauteur entre le paragraphe et les cartes */}
            <Reveal
              from="left"
              delay={150}
              className="flex justify-between text-left md:hidden"
            >
              {CLUB_STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col justify-center">
                  <p className="font-display text-[30px] font-black uppercase leading-none text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-display text-label font-bold uppercase tracking-[2px] text-faint">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>

            {/* Features : cartes numérotées */}
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              {FEATURES.map((feature, index) => (
                <Reveal
                  key={feature.title}
                  from="right"
                  delay={300 + index * 200}
                >
                  <TiltCard className="relative flex h-[21svh] max-h-[220px] min-h-[120px] flex-col rounded-2xl border border-line bg-bg-alt p-4 text-left md:h-[31vh] md:max-h-[330px] md:min-h-[200px] md:p-7">
                    <div className="tilt-layer-deep flex items-start justify-between">
                      <CardMark icon={feature.icon} />
                      <span className="font-display text-[22px] font-black leading-none text-white/10 md:text-[30px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="tilt-layer mt-auto">
                      <p className="font-display text-[15px] font-black uppercase leading-[1.1] md:text-h3">
                        {feature.title}
                      </p>
                      <p className="mt-1.5 text-[11px] leading-[1.45] text-muted md:mt-2.5 md:text-body-sm md:leading-[1.6]">
                        {feature.description[0]} {feature.description[1]}
                      </p>
                    </div>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>

        {/* Indicateur de défilement vers "How We Move" (desktop) */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:block">
          <ScrollCue targetId="how-we-move" />
        </div>
      </section>

      <section
        id="how-we-move"
        className="relative mt-14 scroll-mt-20 py-11 md:mt-0 md:py-14"
      >
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
