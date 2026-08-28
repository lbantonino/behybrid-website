export type EventTag = 'PERFORM' | 'CONNECT';

export type CalendarEvent = {
  slug: string;
  date: string;
  day: string;
  title: string;
  time: string;
  tag: EventTag;
  startsAt: string;
  durationMinutes: number;
  location: string;
  stravaUrl?: string;
};

type SupabaseEventRow = {
  slug: string;
  event_date: string;
  start_time: string;
  duration_minutes: number;
  title: string;
  location: string;
  event_type: EventTag;
  strava_url: string | null;
};

const MONTH_LABELS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
];
const DAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export const FALLBACK_EVENTS: CalendarEvent[] = [
  {
    slug: 'sprints-2026-09-02',
    date: '2 SEP',
    day: 'WED',
    title: 'Sprints',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-09-02T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: 'intervals-2026-09-09',
    date: '9 SEP',
    day: 'WED',
    title: 'Intervals',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-09-09T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: 'intervals-2026-09-16',
    date: '16 SEP',
    day: 'WED',
    title: 'Intervals',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-09-16T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: 'beat-the-streets-2026-09-20',
    date: '20 SEP',
    day: 'SUN',
    title: 'Beat the streets',
    time: '10:30 · Parc Royal',
    tag: 'CONNECT',
    startsAt: '2026-09-20T10:30:00',
    durationMinutes: 90,
    location: 'Parc Royal',
  },
  {
    slug: 'intervals-2026-09-23',
    date: '23 SEP',
    day: 'WED',
    title: 'Intervals',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-09-23T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: '5km-test-2026-09-30',
    date: '30 SEP',
    day: 'WED',
    title: '5km TEST',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-09-30T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: 'sprints-2026-10-07',
    date: '7 OCT',
    day: 'WED',
    title: 'Sprints',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-10-07T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: 'intervals-2026-10-14',
    date: '14 OCT',
    day: 'WED',
    title: 'Intervals',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-10-14T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: 'sprints-2026-10-21',
    date: '21 OCT',
    day: 'WED',
    title: 'Sprints',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-10-21T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
  {
    slug: 'threshold-30-2026-10-28',
    date: '28 OCT',
    day: 'WED',
    title: 'Threshold 30',
    time: '19:30 · Parc du cinquantenaire',
    tag: 'PERFORM',
    startsAt: '2026-10-28T19:30:00',
    durationMinutes: 90,
    location: 'Parc du cinquantenaire',
  },
];

export const EVENTS = FALLBACK_EVENTS;

/** "28 OCT" devient "event-28-oct", l'ancre visée depuis la carte du hero. */
export function eventAnchor(date: string) {
  return `event-${date.toLowerCase().replace(' ', '-')}`;
}

function formatDisplayTime(value: string) {
  return value.slice(0, 5);
}

function getDateParts(eventDate: string) {
  const [year, month, day] = eventDate.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return {
    dayNumber: day,
    dayLabel: DAY_LABELS[date.getDay()],
    monthLabel: MONTH_LABELS[month - 1],
  };
}

function mapSupabaseEvent(row: SupabaseEventRow): CalendarEvent {
  const dateParts = getDateParts(row.event_date);
  const startTime = formatDisplayTime(row.start_time);

  return {
    slug: row.slug,
    date: `${dateParts.dayNumber} ${dateParts.monthLabel}`,
    day: dateParts.dayLabel,
    title: row.title,
    time: `${startTime} · ${row.location}`,
    tag: row.event_type,
    startsAt: `${row.event_date}T${startTime}:00`,
    durationMinutes: row.duration_minutes,
    location: row.location,
    stravaUrl: row.strava_url ?? undefined,
  };
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return FALLBACK_EVENTS;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/events?select=slug,event_date,start_time,duration_minutes,title,location,event_type,strava_url&order=event_date.asc,start_time.asc`,
      {
        cache: 'no-store',
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      },
    );

    if (!response.ok) {
      return FALLBACK_EVENTS;
    }

    const rows = (await response.json()) as SupabaseEventRow[];
    return rows.map(mapSupabaseEvent);
  } catch {
    return FALLBACK_EVENTS;
  }
}
