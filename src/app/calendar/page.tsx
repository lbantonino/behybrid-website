import Image from 'next/image';
import { MonthCalendar } from '@/components/calendar/month-calendar';
import { EventHighlight } from '@/components/calendar/event-highlight';
import { EventsJsonLd } from '@/components/calendar/events-json-ld';
import { Container } from '@/components/ui/container';
import { socialHref } from '@/lib/nav-links';
import { Reveal } from '@/components/ui/reveal';
import {
  eventAnchor,
  getUpcomingEvents,
  getCalendarEvents,
  type CalendarEvent,
} from '@/lib/calendar-events';
import { connection } from 'next/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendar — BEHYBRID Run Club Brussels',
  description:
    'The next Perform and Connect runs in Brussels. Join the event on Strava.',
};

/**
 * Galerie de bas de page. Même motif que celle de l'accueil : en desktop les
 * photos arrivent toutes par la gauche, en commençant par celle de droite ;
 * en mobile elles alternent gauche, droite, gauche.
 */
const CALENDAR_GALLERY = [
  {
    file: 'gallery-calendar-1.jpg',
    from: 'left' as const,
    delay: 'delay-[0ms] md:delay-[600ms]',
  },
  {
    file: 'gallery-calendar-4.jpg',
    from: 'right-phone' as const,
    delay: 'delay-[300ms]',
    /*
      Photo en portrait (1247 × 1600) dans un cadre large : les coureurs sont
      vus de dos, têtes et maillots dans la moitié haute. L'ancrage à 35 %
      garde les têtes et le nom du club dans le cadre.
    */
    position: 'object-[50%_35%]',
  },
  {
    file: 'gallery-calendar-3.jpg',
    from: 'left' as const,
    delay: 'delay-[600ms] md:delay-[0ms]',
  },
];

/**
 * Type de séance, sur la ligne de la date et à l'opposé du logo Strava pour
 * qu'on ne puisse pas les confondre. Du texte, pas un bouton : rien n'invite
 * à cliquer. Le vert accent va à Perform, la séance de performance, et le gris
 * à Connect, la sortie conviviale.
 */
function EventType({ tag }: { tag: CalendarEvent['tag'] }) {
  return (
    <span
      className={`font-display text-label font-bold uppercase tracking-wide ${
        tag === 'PERFORM' ? 'text-accent' : 'text-muted'
      }`}
    >
      {tag}
    </span>
  );
}

/*
  Plus de lien Strava par entraînement depuis le 03/09, décision de Gianluca et
  Antonino.

  Le mécanisme fonctionnait, il a été prouvé le 02/09 : un lien posé en base
  faisait apparaître le bouton sans redéploiement. Mais il demandait de créer
  l'event Strava et de coller son adresse chaque semaine, pour dix séances à
  l'avance, avec le risque d'en oublier. Un « Strava soon » qui traîne la veille
  d'une course est pire que pas de bouton du tout : il promet quelque chose qui
  n'arrive pas.

  Un lien unique vers le club, sous le calendrier, remplace les dix. Il est
  toujours juste, il ne demande aucun entretien, et un coureur qui suit le club
  sur Strava y voit toutes les séances.
*/
function EventRow({ event }: { event: CalendarEvent }) {
  const [dateDay, dateMonth] = event.date.split(' ');

  return (
    <div
      id={eventAnchor(event)}
      className="event-row scroll-mt-24 border-b border-line py-4.5 md:flex md:items-center md:gap-7 md:py-5.5"
    >
      {/* Mobile : le logo Strava est sorti de la première ligne pour être
          centré verticalement sur toute la hauteur de l'événement. */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-3">
            <span className="w-[84px] shrink-0 font-display text-h3 font-extrabold">
              {event.date}
            </span>
            <span className="w-[34px] shrink-0 text-label tracking-wide text-faint">
              {event.day}
            </span>
            <span aria-hidden className="text-label text-faint">
              ·
            </span>
            <EventType tag={event.tag} />
          </div>
          <h3 className="font-display text-body font-bold uppercase">
            {event.title}
          </h3>
          <p className="mt-0.5 text-label text-muted">{event.time}</p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden w-[70px] shrink-0 md:block">
        <p className="font-display text-h3 font-extrabold leading-none">
          <span className="block">{dateDay}</span>
          <span className="block">{dateMonth}</span>
        </p>
        <p className="text-label tracking-wide text-faint">{event.day}</p>
        <p className="mt-1">
          <EventType tag={event.tag} />
        </p>
      </div>
      <div className="hidden md:block md:flex-1">
        <h3 className="font-display text-h3 font-extrabold uppercase">
          {event.title}
        </h3>
        <p className="mt-0.5 text-body-sm text-muted">{event.time}</p>
      </div>
    </div>
  );
}

export default async function CalendarPage() {
  await connection();
  const allEvents = await getCalendarEvents();
  // La liste s'appelle "Next Runs" : elle ne montre que le futur, et se tient
  // donc à jour toute seule au fil des semaines.
  const events = getUpcomingEvents(allEvents);

  return (
    <>
      <EventsJsonLd events={events} />
      <EventHighlight />
      <Container className="pt-7 md:pt-14">
        <Reveal from="left">
          {/*
            En mobile, le badge Strava occupe la droite de cette ligne. Choix
            d'Antonino le 03/09, après comparaison des deux placements en
            capture (voir docs/apercus/).

            Centré sous la phrase d'accroche, il formait un troisième bloc dans
            la pile et repoussait le calendrier de 75 pixels. Ici il appartient
            à la ligne d'en-tête, motif déjà employé sur l'accueil où
            « About The Club » fait face à « Brussels · Est. 2024 ».
          */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 md:gap-3.5">
              <span className="h-px w-6 bg-accent md:w-8" />
              <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
                Never Miss A Run
              </span>
            </div>
            <a
              href={socialHref('Strava')}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Follow BEHYBRID Run Club Brussels on Strava"
              className="flex shrink-0 items-center rounded-full border border-line px-3 py-2 transition-colors hover:border-accent md:hidden"
            >
              <Image
                src="/icons/strava.png"
                alt=""
                width={9819}
                height={2048}
                className="h-3 w-auto"
              />
            </a>
          </div>
          <h1 className="mt-9 text-center font-display text-[42px] font-black uppercase leading-[0.92] tracking-[-0.02em] md:mt-4 md:text-left md:text-[70px] md:leading-[0.9]">
            Calendar
          </h1>
          <p className="mt-3 max-w-[440px] text-center text-body-sm text-muted md:mt-4 md:text-left md:text-body">
            The next Perform and Connect runs.{' '}
            <br className="md:hidden" />
            Follow us on Strava to join.
          </p>

          {/*
            Le logo seul, sans texte : la phrase juste au-dessus dit déjà
            « Follow us on Strava to join », le répéter à côté du badge ferait
            doublon.

            Desktop uniquement : aligné à gauche, il annonce le calendrier qui
            commence juste en dessous. En mobile, c'est celui de la ligne
            d'en-tête qui prend le relais.
          */}
          <a
            href={socialHref('Strava')}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Follow BEHYBRID Run Club Brussels on Strava"
            className="mt-5 hidden w-fit items-center rounded-full border border-line px-4 py-2.5 transition-colors hover:border-accent md:mt-6 md:flex"
          >
            <Image
              src="/icons/strava.png"
              alt=""
              width={9819}
              height={2048}
              className="h-3.5 w-auto md:h-4"
            />
          </a>
        </Reveal>

        <div className="mt-7 flex flex-col gap-8 md:mt-10 md:grid md:grid-cols-[400px_1fr] md:items-start md:gap-14">
          {/* Seul bloc animé en mobile : l'arrivée du calendrier lui-même. */}
          <Reveal
            from="left"
            delay={150}
            mobile
            className="rounded-xl border border-line p-5 md:p-7"
          >
            <MonthCalendar events={allEvents} upcomingEvents={events} />
          </Reveal>

          <div>
            <Reveal from="right" duration={2200} delay={150}>
              <h2 className="mb-4 font-display text-[12px] font-extrabold uppercase tracking-[2px] text-accent phone-lg:text-[14px] md:mb-5">
                <span aria-hidden>→ </span>Next Runs
              </h2>
            </Reveal>
            <div>
              {events.map((event, index) => (
                <Reveal
                  key={event.date + event.title}
                  from="right"
                  duration={2200}
                  // Le décalage en cascade est plafonné au cinquième événement.
                  // Chaque ligne déclenche sa propre révélation en entrant dans
                  // l'écran : sans plafond, le 50e run d'une saison complète
                  // resterait invisible sept secondes après être apparu.
                  delay={300 + Math.min(index, 4) * 140}
                >
                  <EventRow event={event} />
                </Reveal>
              ))}
            </div>
            {events.length === 0 ? (
              <Reveal from="up" duration={1800} delay={300}>
                <p className="py-6 text-center text-label uppercase tracking-wide text-faint md:py-8 md:text-label">
                  Next sessions coming soon
                </p>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>

      <section className="mt-9 grid grid-cols-1 gap-0.5 overflow-x-clip md:mt-14 md:grid-cols-3 md:gap-0">
        {CALENDAR_GALLERY.map((photo) => (
          <Reveal
            key={photo.file}
            from={photo.from}
            className={`relative h-[160px] w-full md:h-[340px] ${photo.delay}`}
          >
            <Image
              src={`/photos/${photo.file}`}
              alt="BEHYBRID Run Club Brussels"
              fill
              sizes="(min-width: 860px) 33vw, 100vw"
              className={`object-cover ${photo.position ?? ''}`}
            />
          </Reveal>
        ))}
      </section>
    </>
  );
}
