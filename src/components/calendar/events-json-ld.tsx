import {
  CLUB_TIME_ZONE,
  eventAnchor,
  type CalendarEvent,
} from '@/lib/calendar-events';
import { absoluteUrl, SITE_URL } from '@/lib/site';

/**
 * Décalage horaire de Bruxelles à une date donnée, au format "+02:00".
 *
 * Il change deux fois par an (heure d'été et heure d'hiver), on ne peut donc
 * pas l'écrire en dur. `Intl` connaît le calendrier des changements.
 */
function getClubOffset(startsAt: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CLUB_TIME_ZONE,
    timeZoneName: 'longOffset',
  }).formatToParts(new Date(`${startsAt}Z`));

  const label =
    parts.find((part) => part.type === 'timeZoneName')?.value ?? 'GMT+00:00';

  // "GMT+02:00" devient "+02:00", et "GMT" seul devient "+00:00".
  return label === 'GMT' ? '+00:00' : label.replace('GMT', '');
}

/** Ajoute une durée en minutes à un horaire "2026-09-02T19:30:00". */
function addMinutes(startsAt: string, minutes: number) {
  const end = new Date(`${startsAt}Z`);
  end.setUTCMinutes(end.getUTCMinutes() + minutes);

  return end.toISOString().slice(0, 19);
}

const ORGANIZER = {
  '@type': 'SportsClub',
  name: 'BEHYBRID Run Club Brussels',
  url: SITE_URL,
};

function buildEvent(event: CalendarEvent) {
  const offset = getClubOffset(event.startsAt);

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.title,
    description:
      event.tag === 'PERFORM'
        ? `Perform session with BEHYBRID Run Club Brussels at ${event.location}.`
        : `Connect run with BEHYBRID Run Club Brussels at ${event.location}.`,
    startDate: `${event.startsAt}${offset}`,
    endDate: `${addMinutes(event.startsAt, event.durationMinutes)}${offset}`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    sport: 'Running',
    url: `${SITE_URL}/calendar#${eventAnchor(event)}`,
    image: [absoluteUrl('/photos/gallery-calendar-1.png')],
    isAccessibleForFree: true,
    // Google n'affiche de résultat enrichi que si le prix est déclaré. Les
    // séances du club sont gratuites, on le dit explicitement.
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: event.stravaUrl ?? `${SITE_URL}/calendar`,
    },
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brussels',
        addressCountry: 'BE',
      },
    },
    organizer: ORGANIZER,
    performer: ORGANIZER,
  };
}

/**
 * Décrit les entraînements à venir dans le vocabulaire de schema.org, pour que
 * Google puisse les afficher en résultat enrichi (nom, date, lieu) plutôt que
 * comme une simple page de texte.
 *
 * Invisible pour le visiteur : ce bloc ne sert qu'aux moteurs de recherche.
 */
export function EventsJsonLd({ events }: { events: CalendarEvent[] }) {
  if (events.length === 0) return null;

  const payload = JSON.stringify(events.map(buildEvent))
    // Empêche qu'un titre contenant "</script>" ne referme la balise.
    .replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
