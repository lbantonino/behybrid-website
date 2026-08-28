import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollButton } from '@/components/ui/scroll-button';
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
import { TeamSlider, type TeamMember } from '@/components/layout/team-slider';
import { TiltCard } from '@/components/ui/tilt-card';
import { Reveal } from '@/components/ui/reveal';
import { ReplayOnView } from '@/components/ui/replay-on-view';
import {
  eventAnchor,
  FALLBACK_EVENTS,
  getCalendarEvents,
  type CalendarEvent,
} from '@/lib/calendar-events';
import { connection } from 'next/server';

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
  { value: '300+', label: 'Runners' },
  { value: 'Every', label: 'Week' },
  { value: '2024', label: 'Since' },
];

/** Pastilles des cartes de la section "How We Move" (desktop uniquement). */
const PERFORM_TAGS = ['Track Sessions', 'VO₂ Max', 'Coach-Led'];
const CONNECT_TAGS = ['Easy Pace', 'Social', 'All Welcome'];

/** Bandeau défilant en bas de "How We Move". */
const MOVE_MARQUEE_ITEMS = [
  'Perform',
  'Tuesday 19:00',
  'Parc du Cinquantenaire',
  'All Paces Welcome',
  'Free To Test',
];

/**
 * Galerie de bas de page. En desktop les photos arrivent toutes par la gauche,
 * en commençant par celle de droite ; en mobile elles sont empilées et
 * alternent gauche, droite, gauche. D'où les délais inversés entre les deux
 * formats, posés en classes pour pouvoir varier au point de rupture.
 */
const GALLERY = [
  {
    file: 'gallery-1.png',
    from: 'left' as const,
    delay: 'delay-[0ms] md:delay-[600ms]',
  },
  {
    file: 'gallery-2.png',
    from: 'right-phone' as const,
    delay: 'delay-[300ms]',
  },
  {
    file: 'gallery-3.png',
    from: 'left' as const,
    delay: 'delay-[600ms] md:delay-[0ms]',
  },
];

/**
 * Figures du club, affichées une à une. Les photos manquent encore : déposer
 * les fichiers dans public/photos/ puis renseigner `photo` ci-dessous.
 */
const TEAM: TeamMember[] = [
  {
    name: 'Gianluca',
    role: 'Running Coach & Founder',
    tagline: 'Beyond the limits. Go further. Together.',
    photo: '/photos/team-gianluca.jpeg',
  },
  {
    name: 'Clara',
    role: 'Manager',
    tagline: 'If it happens at BEHYBRID, she said yes first.',
    photo: '/photos/team-clara.png',
  },
  {
    name: 'Emie',
    role: 'Mastermind',
    tagline: 'Plans every session to the second, and still makes it fun.',
    photo: '/photos/team-emie.png',
  },
  {
    name: 'André',
    role: 'Merch Master',
    tagline: 'Older than most, faster than many. And he prints the kit.',
    photo: '/photos/team-andre.png',
  },
  {
    name: 'Antonino',
    role: 'Digital Producer',
    tagline: 'Builds the club online, then chases it down on the road.',
    photo: '/photos/team-antonino.png',
  },
  {
    name: 'Adrien',
    role: 'The Treasurer',
    tagline: 'Counts the money and the kilometres. Both add up.',
    photo: '/photos/team-adrien.png',
  },
  {
    name: 'Gaëtan',
    role: 'Digital Producer',
    tagline: 'Behind the lens, ahead of the pack.',
    photo: '/photos/team-gaetan.png',
  },
  {
    name: 'Olivia',
    role: 'The Stylist',
    tagline: 'Makes sure we look as good as we run.',
    photo: '/photos/team-olivia.png',
  },
  {
    name: 'Anaïs',
    role: 'Pacer',
    tagline: 'Sets the rhythm, keeps the mood. Nobody gets dropped.',
    photo: '/photos/team-anais.png',
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
    description: 'Tell the coach and you are in.',
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

/** Icône des avantages membres (desktop) : carré plein teinté accent. */
function BenefitMark({
  icon: Icon,
}: {
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/12 md:h-11 md:w-11 md:rounded-xl">
      <Icon className="h-3.5 w-3.5 text-accent md:h-5 md:w-5" />
    </span>
  );
}

/** Pastille de la section "How We Move" : contour vert ou neutre. */
function Tag({
  tone = 'accent',
  children,
}: {
  tone?: 'accent' | 'neutral';
  children: React.ReactNode;
}) {
  const tones = {
    accent: 'border-accent/70 text-accent',
    neutral: 'border-white/35 text-ink/85',
  };
  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-display text-[9px] font-extrabold uppercase tracking-[1px] phone-lg:text-[10px] md:px-4 md:py-2 md:text-[11px] md:tracking-[1.5px] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function MoveMarqueeRow() {
  return (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex shrink-0 items-center">
          {MOVE_MARQUEE_ITEMS.map((item) => (
            <span
              key={item}
              className="flex items-center gap-4 whitespace-nowrap pr-4 font-display text-[12px] font-extrabold uppercase tracking-[2.5px] text-ink/85"
            >
              {item} <span className="text-accent">•</span>
            </span>
          ))}
        </div>
      ))}
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

function getNextRun(events: CalendarEvent[]) {
  const now = new Date();
  const futureEvents = events.filter((event) => new Date(event.startsAt) >= now);

  return futureEvents[0] ?? events[0] ?? FALLBACK_EVENTS[0];
}

function formatNextRunDate(event: CalendarEvent) {
  const date = new Date(event.startsAt);
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(
    date,
  );
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const time = event.time.split(' · ')[0];

  return `${weekday} ${day}/${month} - ${time}`;
}

export default async function Home() {
  await connection();
  const events = await getCalendarEvents();
  const nextRun = getNextRun(events);

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
        <Container className="relative z-10 flex h-[calc(100svh-5rem)] flex-col justify-between gap-3 pb-8 pt-20 phone-lg:justify-center phone-lg:gap-6 phone-lg:pb-20 md:h-[calc(100vh-5rem)] md:min-h-[600px] md:flex-row md:items-center md:justify-between md:gap-12 md:pb-16 md:pt-20">
          <ReplayOnView initialDelay={2000} className="phone-lg:mt-8">
            <div className="flex max-w-[640px] flex-col items-center gap-3 text-center [animation:slide-in-left_3s_cubic-bezier(0.22,1,0.36,1)_var(--enter-delay,0ms)_both] md:items-start md:gap-6 md:text-left">
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
                <ScrollButton
                  targetId="become-a-member"
                  variant="primary"
                  size="lg"
                  className="w-full text-[16px] font-extrabold md:w-auto"
                >
                  Join The Club →
                </ScrollButton>
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
          </ReplayOnView>

          {/* Encadré Next Run. L'entrée passe par `translate` (et non
              `transform`) pour cohabiter avec l'inclinaison 3D sans parent
              animé, qui priverait la carte de son backdrop-blur. */}
          <ReplayOnView
            initialDelay={2500}
            className="w-full flex-1 max-h-[430px] phone-lg:flex-none md:max-h-none md:w-[400px] md:flex-none md:shrink-0"
          >
            <Link
              href={`/calendar#${eventAnchor(nextRun.date)}`}
              aria-label={`See ${nextRun.title} in the calendar`}
              className="block h-full"
            >
              <TiltCard className="tilt-card--flat relative flex h-full w-full flex-col rounded-2xl border border-white/15 bg-white/1 p-5 backdrop-blur-md phone-lg:p-8 [animation:slide-in-right-translate_4s_cubic-bezier(0.22,1,0.36,1)_var(--enter-delay,0ms)_both] md:p-7">
                <div className="flex h-full flex-col justify-between md:block">
                  <p className="font-display text-[12px] font-extrabold uppercase tracking-[2px] text-accent phone-lg:text-[14px]">
                    → Next Run
                  </p>
                  <p className="mt-3 font-display text-[16px] font-black uppercase leading-[1.05] text-ink phone-lg:text-[18px] md:mt-4 md:text-[28px]">
                    {formatNextRunDate(nextRun)}
                  </p>
                  <p className="font-display text-[13px] font-semibold uppercase tracking-wide text-ink/80 phone-lg:text-[15px]">
                    {nextRun.location}
                  </p>

                  <div className="my-2 h-px w-full bg-white/15 phone-lg:my-5 md:my-6" />

                  <div className="flex items-end justify-between">
                    <p className="font-display text-[15px] font-extrabold uppercase text-ink phone-lg:text-[17px] md:text-[21px]">
                      Workout :
                    </p>

                    {/* Visible uniquement sur mobile */}
                    <p className="font-display text-[10px] font-normal uppercase tracking-[1.5px] text-muted phone-lg:text-[12px] md:hidden">
                      For All Levels
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <p className="font-display text-[12px] font-light uppercase tracking-wide text-ink/80 phone-lg:text-[14px] md:text-[16px]">
                      {nextRun.title}
                    </p>
                  </div>

                  {/* Visible uniquement sur desktop */}
                  <p className="mt-6 hidden font-display text-[11px] font-normal uppercase tracking-[1.5px] text-muted md:block">
                    For All Levels
                  </p>
                </div>
              </TiltCard>
            </Link>
          </ReplayOnView>
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

        <Container className="relative flex flex-1 items-stretch pb-8 pt-9 text-center phone-lg:pb-14 md:items-center md:pb-0 md:pt-0 md:text-left">
          <div className="flex w-full flex-col justify-between gap-8 phone-lg:gap-10 md:grid md:grid-cols-2 md:items-center md:gap-16">
            <Reveal
              from="left"
              className="mx-auto max-w-[900px] md:mx-0 md:max-w-none"
            >
              <h2 className="font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:text-[70px]">
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
            <div className="grid auto-rows-fr grid-cols-1 gap-4 phone-lg:gap-5 md:auto-rows-auto md:grid-cols-2 md:gap-6">
              {FEATURES.map((feature, index) => (
                <Reveal
                  key={feature.title}
                  from="right"
                  duration={4000}
                  delay={index * 120}
                >
                  <TiltCard className="relative flex flex-row items-center gap-4 rounded-2xl border border-line bg-bg-alt p-5 text-left md:h-[31vh] md:max-h-[330px] md:min-h-[200px] md:flex-col md:items-stretch md:gap-0 md:p-7">
                    <div className="tilt-layer-deep flex items-start justify-between">
                      <CardMark icon={feature.icon} />
                      <span className="hidden font-display text-[22px] font-black leading-none text-white/10 md:block md:text-[30px]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="tilt-layer flex-1 md:mt-auto md:flex-none">
                      <p className="font-display text-[17px] font-black uppercase leading-[1.1] md:text-h3">
                        {feature.title}
                      </p>
                      <p className="mt-1.5 text-[15px] leading-[1.45] text-muted phone-lg:text-[17px] md:mt-2.5 md:text-body-sm md:leading-[1.6]">
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
        className="relative flex min-h-[calc(100lvh-5rem)] scroll-mt-20 flex-col overflow-hidden md:h-[calc(100vh-5rem)] md:min-h-0"
      >
        <Image
          src="/photos/how-we-move-desktop-mobile.jpg"
          alt="Session de run BEHYBRID"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55 md:bg-black/72" />

        {/* Trame technique très discrète (desktop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden md:block"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '160px 160px',
          }}
        />

        <Container className="relative flex flex-1 flex-col pt-7 md:justify-between md:pb-16 md:pt-14">
          <Reveal from="left">
            <div className="flex items-center gap-2.5 md:gap-3.5">
              <span className="h-px w-6 bg-accent md:w-8" />
              <p className="font-display text-label font-bold uppercase leading-none tracking-[2.5px] text-accent">
                Weekly Runs
              </p>
            </div>
            <h2 className="mt-9 text-center font-display text-[40px] font-black uppercase leading-none tracking-[-0.02em] md:mb-5 md:mt-4 md:text-left md:text-[70px] md:leading-[0.9]">
              How We Move
            </h2>

            {/* Sous-titre, version mobile : centré, retours à la ligne calés */}
            <p className="mt-4 text-center text-[14px] leading-[1.3] text-ink/75 phone-lg:text-[15px] md:hidden">
              Two ways to run with us.
              <br />
              one to push your limits,
              <br />
              one to bring people together.
            </p>

            <p className="hidden text-[17px] leading-[1.6] text-ink/75 md:block md:max-w-[480px]">
              Two ways to run with us — one to push your limits, one to bring
              people together.
            </p>
          </Reveal>

          <div className="my-auto grid auto-rows-fr grid-cols-1 gap-6 md:my-0 md:auto-rows-auto md:grid-cols-2 md:gap-20">
            <ReplayOnView>
              <TiltCard className="tilt-card--flat relative flex h-full flex-col rounded-[20px] border border-accent bg-black/25 p-5 backdrop-blur-md phone-lg:px-8 phone-lg:py-[37px] [animation:slide-in-right-translate_3s_cubic-bezier(0.22,1,0.36,1)_var(--enter-delay,0ms)_both] md:rounded-3xl md:p-12 md:[animation:slide-in-left-translate_3s_cubic-bezier(0.22,1,0.36,1)_var(--enter-delay,0ms)_both]">
                <div className="flex items-start justify-between">
                  <Badge variant="accent" size="xs" className="mb-2 md:mb-0">
                    1 Run / Week
                  </Badge>
                  <span className="font-display text-[22px] font-black leading-none text-white/20 md:text-[30px]">
                    01
                  </span>
                </div>
                <p className="mb-1.5 mt-2 font-display text-[21px] font-black uppercase leading-none md:mb-4 md:mt-7 md:text-[46px]">
                  Perform
                </p>
                {/* Version courte en mobile, texte complet en desktop */}
                <p className="text-[13px] leading-[1.45] text-ink/80 phone-lg:text-[14px] md:hidden">
                  Threshold efforts, VO₂ max intervals, race-specific workouts.
                </p>
                <p className="hidden text-ink/80 md:block md:text-[16px] md:leading-[1.75]">
                  Threshold efforts, VO₂ max intervals, race-specific workouts.
                  Coach-led track sessions designed to push your limits.
                </p>
                <div className="mt-auto flex flex-wrap justify-between gap-2 pt-3.5 md:mt-8 md:justify-start md:pt-0 md:gap-3">
                  {PERFORM_TAGS.map((tag) => (
                    <Tag key={tag} tone="accent">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </TiltCard>
            </ReplayOnView>

            <ReplayOnView>
              <TiltCard className="tilt-card--flat relative flex h-full flex-col rounded-[20px] border border-white/40 bg-black/25 p-5 backdrop-blur-md phone-lg:px-8 phone-lg:py-[37px] [animation:slide-in-right-translate_4s_cubic-bezier(0.22,1,0.36,1)_var(--enter-delay,0ms)_both] md:rounded-3xl md:border-white/25 md:p-12">
                <div className="flex items-start justify-between">
                  <Badge variant="white" size="xs" className="mb-2 md:mb-0">
                    1 Run / Month
                  </Badge>
                  <span className="font-display text-[22px] font-black leading-none text-white/20 md:text-[30px]">
                    02
                  </span>
                </div>
                <p className="mb-1.5 mt-2 font-display text-[21px] font-black uppercase leading-none md:mb-4 md:mt-7 md:text-[46px]">
                  Connect
                </p>
                <p className="text-[13px] leading-[1.45] text-ink/80 phone-lg:text-[14px] md:text-[16px] md:leading-[1.75]">
                  The run that brings people together. Easy-paced group runs to
                  create meaningful connections.
                </p>
                <div className="mt-auto flex flex-wrap justify-between gap-2 pt-3.5 md:mt-8 md:justify-start md:pt-0 md:gap-3">
                  {CONNECT_TAGS.map((tag) => (
                    <Tag key={tag} tone="neutral">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </TiltCard>
            </ReplayOnView>
          </div>
        </Container>

        {/* Bandeau défilant, calé sur le bord bas */}
        <div className="relative overflow-hidden border-t border-white/10 bg-black/60 py-3.5 backdrop-blur-sm">
          <div className="flex w-max animate-marquee">
            <MoveMarqueeRow />
            <MoveMarqueeRow />
          </div>
        </div>

        {/* Indicateur de défilement, au-dessus du bandeau (desktop) */}
        <div className="absolute bottom-14 right-8 z-20 hidden md:block">
          <ScrollCue targetId="the-crew" />
        </div>
      </section>

      <div id="the-crew" aria-hidden className="scroll-mt-20" />

      <section className="relative flex min-h-[calc(100lvh-5rem)] flex-col overflow-x-clip md:h-[calc(100vh-5rem)] md:min-h-0 md:overflow-hidden">
        {/* Fond propre à cette section : couloirs de piste en diagonale et un
            seul halo, pour ne pas ressembler aux deux sections voisines. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, rgba(255,255,255,0.045) 0px, rgba(255,255,255,0.045) 1px, transparent 1px, transparent 84px)',
            }}
          />
          <div className="absolute -left-24 top-1/4 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.13),transparent_66%)] blur-3xl md:h-[680px] md:w-[680px]" />
        </div>

        <Container className="relative pt-7 md:pt-14">
          <Reveal from="left">
            <div className="flex items-center gap-2.5 md:gap-3.5">
              <span className="h-px w-6 bg-accent md:w-8" />
              <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
                Behind The Club
              </span>
            </div>
            <h2 className="mt-9 text-center font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:mt-4 md:text-left md:text-[70px] md:leading-[0.9]">
              The Crew
            </h2>
          </Reveal>
        </Container>

        <Container className="relative flex flex-1 items-center pb-10 pt-10 md:pb-0 md:pt-0">
          <TeamSlider members={TEAM} />
        </Container>

        {/* Indicateur de défilement (desktop) */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:block">
          <ScrollCue targetId="become-a-member" />
        </div>
      </section>

      <div id="become-a-member" aria-hidden className="scroll-mt-20" />

      <section className="relative flex min-h-[calc(100lvh-5rem)] flex-col overflow-x-clip md:h-[calc(100vh-5rem)] md:min-h-0 md:overflow-hidden">
        {/* Halos verts diffus */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.14),transparent_68%)] blur-3xl md:-top-32 md:h-[620px] md:w-[620px]" />
          <div className="absolute -bottom-24 left-1/4 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(201,241,51,0.10),transparent_68%)] blur-3xl md:-bottom-40 md:h-[520px] md:w-[520px]" />
        </div>

        {/* Bloc de titre, ancré en haut comme dans les autres sections */}
        <Container className="relative pt-7 md:pt-14">
          <Reveal from="left">
            <div className="flex items-center gap-2.5 md:mb-4 md:gap-3.5">
              <span className="h-px w-6 bg-accent md:w-8" />
              <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
                Join The Club
              </span>
            </div>

            <h2 className="mt-6 text-center font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:mt-0 md:text-left md:text-[70px] md:leading-[0.9]">
              Become A <br className="md:hidden" />
              Member
            </h2>

            <p className="mt-3 text-center font-display text-label font-bold uppercase tracking-[2.5px] text-faint md:mt-4 md:text-left">
              In Four Steps · And What Do I Get?
            </p>
          </Reveal>
        </Container>

        {/* Étapes et avantages */}
        <Container className="relative flex flex-1 flex-col pb-8 pt-8 phone-lg:justify-center phone-lg:pb-12 md:justify-center md:pb-0 md:pt-0">
          <div className="flex flex-1 flex-col justify-between phone-lg:flex-none md:grid md:w-full md:flex-none md:grid-cols-2 md:items-stretch md:gap-16">
            <div className="md:flex md:items-center">
              {/* Fil vertical numéroté, révélé une étape après l'autre */}
              <div className="relative mx-auto w-fit max-w-full md:w-full">
                <span
                  aria-hidden
                  className="absolute bottom-3 left-[13px] top-3 w-px bg-accent/40 md:left-[17px]"
                />
                {MEMBER_STEPS.map((step, index) => {
                  const isLast = index === MEMBER_STEPS.length - 1;
                  return (
                    <Reveal
                      key={step.number}
                      from="left"
                      delay={150 + index * 220}
                      className={`relative flex gap-3 md:gap-4 ${isLast ? '' : 'mb-5 phone-lg:mb-6 md:mb-11'}`}
                    >
                      <span
                        className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-display text-[12px] font-black text-bg md:h-9 md:w-9 md:text-[15px] ${
                          isLast
                            ? 'shadow-[0_0_26px_rgba(201,241,51,0.55)]'
                            : ''
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="md:pt-1">
                        <p
                          className={`font-display text-[17px] font-black uppercase leading-none md:text-[24px] ${
                            isLast ? 'text-accent' : 'text-ink'
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="mt-1.5 text-[16px] leading-snug text-muted md:mt-2 md:text-[15px]">
                          {step.description}
                        </p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Panneau des avantages */}
            <Reveal
              from="right"
              duration={4000}
              className="mt-7 md:mt-0 md:h-full"
            >
              <TiltCard className="relative rounded-2xl border border-line bg-bg-alt px-5 py-[25px] phone-lg:px-6 phone-lg:py-[34px] md:flex md:h-full md:flex-col md:rounded-3xl md:px-9 md:py-10">
                {/* En-tête de carte, même motif que les en-têtes de section */}
                <div className="tilt-layer mb-3.5 flex items-center justify-center gap-2.5 md:mb-9 md:justify-start md:gap-3.5">
                  <span className="h-px w-5 bg-accent md:w-8" />
                  <span className="font-display text-[9px] font-bold uppercase tracking-[2px] text-accent md:text-label md:tracking-[2.5px]">
                    What You Get As A Member
                  </span>
                </div>

                <div className="mx-auto grid w-fit max-w-full grid-cols-1 gap-y-4 md:mx-0 md:w-auto md:flex-1 md:auto-rows-fr md:grid-cols-2 md:items-center md:gap-x-8 md:gap-y-0">
                  {MEMBER_BENEFITS.map((benefit) => (
                    <div
                      key={benefit.label}
                      className="tilt-layer flex items-center gap-2 md:gap-4"
                    >
                      <BenefitMark icon={benefit.icon} />
                      <span className="text-[13px] font-bold leading-tight text-ink phone-lg:text-[14px] md:text-[12px]">
                        {benefit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </Container>

        {/* Indicateur de défilement (desktop) */}
        <div className="absolute bottom-8 right-8 z-20 hidden md:block">
          <ScrollCue targetId="gallery" />
        </div>
      </section>

      <div id="gallery" aria-hidden className="scroll-mt-20" />

      <section className="grid grid-cols-1 gap-0.5 overflow-x-clip md:grid-cols-3 md:gap-0">
        {GALLERY.map((photo) => (
          <Reveal
            key={photo.file}
            from={photo.from}
            className={`relative h-[160px] w-full md:h-[340px] ${photo.delay}`}
          >
            <Image
              src={`/photos/${photo.file}`}
              alt="Photo du club BEHYBRID"
              fill
              sizes="(min-width: 860px) 33vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        ))}
      </section>
    </>
  );
}
