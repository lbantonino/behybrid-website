import Image from 'next/image';
import { MonthCalendar } from '@/components/calendar/month-calendar';
import { EventHighlight } from '@/components/calendar/event-highlight';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/ui/reveal';
import {
  eventAnchor,
  getCalendarEvents,
  type CalendarEvent,
} from '@/lib/calendar-events';
import { connection } from 'next/server';

/**
 * Galerie de bas de page. Même motif que celle de l'accueil : en desktop les
 * photos arrivent toutes par la gauche, en commençant par celle de droite ;
 * en mobile elles alternent gauche, droite, gauche.
 */
const CALENDAR_GALLERY = [
  {
    file: 'gallery-calendar-1.png',
    from: 'left' as const,
    delay: 'delay-[0ms] md:delay-[600ms]',
  },
  {
    file: 'gallery-calendar-2.png',
    from: 'right-phone' as const,
    delay: 'delay-[300ms]',
  },
  {
    file: 'gallery-calendar-3.png',
    from: 'left' as const,
    delay: 'delay-[600ms] md:delay-[0ms]',
  },
];

function EventRow({ event }: { event: CalendarEvent }) {
  const [dateDay, dateMonth] = event.date.split(' ');
  const action = event.stravaUrl ? (
    <a
      href={event.stravaUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Join ${event.title} on Strava`}
      className="strava-action inline-flex h-8 w-[92px] shrink-0 items-center justify-center rounded-full border border-[color:#FC4C02] px-4 transition-opacity hover:opacity-80 md:h-9 md:w-[104px] md:px-5"
    >
      <Image
        src="/icons/strava.png"
        alt=""
        width={9819}
        height={2048}
        className="h-3.5 w-auto md:h-4"
      />
    </a>
  ) : (
    <span className="shrink-0 font-display text-label font-bold uppercase tracking-wide text-faint">
      Strava soon
    </span>
  );

  return (
    <div
      id={eventAnchor(event.date)}
      className="event-row scroll-mt-24 border-b border-line py-4.5 md:flex md:items-center md:gap-7 md:py-5.5"
    >
      {/* Mobile */}
      <div className="md:hidden">
        <div className="mb-1 flex items-center gap-3 md:gap-2.5">
          <span className="font-display text-h3 font-extrabold">
            {event.date}
          </span>
          <span className="text-label tracking-wide text-faint">
            {event.day}
          </span>
          <span className="ml-auto">{action}</span>
        </div>
        <p className="font-display text-body font-bold uppercase">
          {event.title}
        </p>
        <p className="mt-0.5 text-label text-muted">{event.time}</p>
      </div>

      {/* Desktop */}
      <div className="hidden w-[70px] shrink-0 md:block">
        <p className="font-display text-h3 font-extrabold leading-none">
          <span className="block">{dateDay}</span>
          <span className="block">{dateMonth}</span>
        </p>
        <p className="text-label tracking-wide text-faint">{event.day}</p>
      </div>
      <div className="hidden md:block md:flex-1">
        <p className="font-display text-h3 font-extrabold uppercase">
          {event.title}
        </p>
        <p className="mt-0.5 text-body-sm text-muted">{event.time}</p>
      </div>
      <div className="hidden md:flex md:shrink-0">{action}</div>
    </div>
  );
}

export default async function CalendarPage() {
  await connection();
  const events = await getCalendarEvents();

  return (
    <>
      <EventHighlight />
      <Container className="pt-8 md:pt-14">
        <Reveal from="left">
          <div className="flex items-center gap-2.5 md:gap-3.5">
            <span className="h-px w-6 bg-accent md:w-8" />
            <span className="font-display text-label font-bold uppercase tracking-[2.5px] text-accent">
              Calendar
            </span>
          </div>
          <h1 className="mt-1 font-display text-h2 font-black uppercase md:text-h1">
            Never Miss A Run
          </h1>
          <p className="mt-2.5 max-w-[440px] text-body-sm text-muted md:mt-3 md:text-body">
            Every Perform and Connect session, scheduled weeks ahead. Reserve
            your spot and show up.
          </p>
        </Reveal>

        <div className="mt-7 flex flex-col gap-8 md:mt-10 md:grid md:grid-cols-[400px_1fr] md:items-start md:gap-14">
          <Reveal
            from="left"
            delay={150}
            className="rounded-xl border border-line p-5 md:p-7"
          >
            <MonthCalendar events={events} />
          </Reveal>

          <div>
            <Reveal from="right" duration={2200} delay={150}>
              <p className="mb-1 inline-block font-display text-h3 font-black uppercase text-accent md:border-b md:border-accent md:pb-3 md:text-body md:font-bold md:tracking-[1.5px] md:text-muted">
                Next Events
              </p>
            </Reveal>
            <div>
              {events.map((event, index) => (
                <Reveal
                  key={event.date + event.title}
                  from="right"
                  duration={2200}
                  delay={300 + index * 140}
                >
                  <EventRow event={event} />
                </Reveal>
              ))}
            </div>
            <Reveal from="up" duration={1800} delay={300 + events.length * 140}>
              <p className="py-6 text-center text-label uppercase tracking-wide text-faint md:py-8 md:text-label">
                Next month&apos;s session dates coming soon
              </p>
            </Reveal>
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
