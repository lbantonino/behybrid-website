'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  eventAnchor,
  getClubToday,
  type CalendarEvent,
} from '@/lib/calendar-events';

type ClubToday = ReturnType<typeof getClubToday>;

const WEEKDAY_LABELS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'];
const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function getEventDate(event: CalendarEvent) {
  return new Date(event.startsAt);
}

function getMonthCells(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingEmptyCells = (firstDay.getDay() + 6) % 7;
  const cells: (number | null)[] = Array.from(
    { length: leadingEmptyCells },
    () => null,
  );

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

/**
 * `events` alimente les points verts de la grille : tous les entraînements,
 * pour qu'un mois passé reste consultable. `upcomingEvents` sert aux liens :
 * seuls les événements réellement présents dans la liste sont cliquables,
 * sinon le clic renverrait vers une ancre qui n'existe pas dans la page.
 */
export function MonthCalendar({
  events,
  upcomingEvents,
}: {
  events: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
}) {
  const listedSlugs = useMemo(
    () => new Set(upcomingEvents.map((event) => event.slug)),
    [upcomingEvents],
  );
  // Date de Bruxelles, et non celle de la machine : le serveur (en temps
  // universel) et le navigateur doivent produire le même mois, sans quoi le
  // rendu serveur et l'hydratation divergeraient une fois par mois, entre
  // minuit et deux heures du matin.
  const [today] = useState(getClubToday);
  const [visibleMonth, setVisibleMonth] = useState(() => ({
    month: today.month,
    year: today.year,
  }));

  // Un seul entraînement par jour : c'est le rythme du club, et la grille est
  // construite dessus. Si deux séances tombaient un jour le même jour, la case
  // n'en montrerait qu'une (un point vert, un lien) sans que rien ne casse ;
  // la liste sous le calendrier, elle, les afficherait toutes les deux.
  const eventsByDay = useMemo(() => {
    const eventMap = new Map<number, CalendarEvent>();

    events.forEach((event) => {
      const date = getEventDate(event);

      if (
        date.getMonth() === visibleMonth.month &&
        date.getFullYear() === visibleMonth.year
      ) {
        eventMap.set(date.getDate(), event);
      }
    });

    return eventMap;
  }, [events, visibleMonth]);

  const calendarCells = useMemo(
    () => getMonthCells(visibleMonth.year, visibleMonth.month),
    [visibleMonth],
  );

  function goToPreviousMonth() {
    setVisibleMonth(({ month, year }) => {
      if (month === 0) {
        return { month: 11, year: year - 1 };
      }

      return { month: month - 1, year };
    });
  }

  function goToNextMonth() {
    setVisibleMonth(({ month, year }) => {
      if (month === 11) {
        return { month: 0, year: year + 1 };
      }

      return { month: month + 1, year };
    });
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between md:mb-4.5">
        <h2 className="font-display text-h3 font-extrabold uppercase">
          {MONTH_LABELS[visibleMonth.month]} {visibleMonth.year}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous month"
            onClick={goToPreviousMonth}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-muted transition-colors hover:border-accent hover:text-accent md:h-7 md:w-7"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={goToNextMonth}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-muted transition-colors hover:border-accent hover:text-accent md:h-7 md:w-7"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mb-1.5 grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="text-center text-label text-faint md:text-label"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {calendarCells.map((day, index) => (
          <CalendarDay
            key={`${visibleMonth.year}-${visibleMonth.month}-${index}`}
            day={day}
            event={day === null ? undefined : eventsByDay.get(day)}
            isListed={
              day === null
                ? false
                : listedSlugs.has(eventsByDay.get(day)?.slug ?? '')
            }
            today={today}
            visibleMonth={visibleMonth}
          />
        ))}
      </div>
    </>
  );
}

function CalendarDay({
  day,
  event,
  isListed,
  today,
  visibleMonth,
}: {
  day: number | null;
  event?: CalendarEvent;
  /** L'événement figure-t-il dans la liste affichée sous le calendrier. */
  isListed: boolean;
  today: ClubToday;
  visibleMonth: { month: number; year: number };
}) {
  const isToday =
    day !== null &&
    day === today.day &&
    visibleMonth.month === today.month &&
    visibleMonth.year === today.year;

  const className = `relative flex aspect-square items-center justify-center rounded-xl text-label md:text-body-sm ${
    isToday ? 'bg-white/12 text-ink ring-1 ring-white/20' : 'text-ink'
  } ${
    event && isListed
      ? 'cursor-pointer transition-colors hover:bg-accent hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
      : ''
  }`;

  if (event && isListed) {
    return (
      <a
        href={`#${eventAnchor(event)}`}
        aria-label={`Go to ${event.title} on ${event.date}`}
        className={className}
      >
        {day}
        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />
      </a>
    );
  }

  return <div className={className}>{day}</div>;
}
