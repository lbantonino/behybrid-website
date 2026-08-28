'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { eventAnchor, type CalendarEvent } from '@/lib/calendar-events';

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

export function MonthCalendar({ events }: { events: CalendarEvent[] }) {
  const [today] = useState(() => new Date());
  const [visibleMonth, setVisibleMonth] = useState(() => ({
    month: today.getMonth(),
    year: today.getFullYear(),
  }));

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
        <p className="font-display text-h3 font-extrabold uppercase md:text-h3">
          {MONTH_LABELS[visibleMonth.month]} {visibleMonth.year}
        </p>
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
  today,
  visibleMonth,
}: {
  day: number | null;
  event?: CalendarEvent;
  today: Date;
  visibleMonth: { month: number; year: number };
}) {
  const isToday =
    day !== null &&
    day === today.getDate() &&
    visibleMonth.month === today.getMonth() &&
    visibleMonth.year === today.getFullYear();

  const className = `relative flex aspect-square items-center justify-center rounded-xl text-label md:text-body-sm ${
    isToday ? 'bg-white/12 text-ink ring-1 ring-white/20' : 'text-ink'
  } ${
    event
      ? 'cursor-pointer transition-colors hover:bg-accent hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
      : ''
  }`;

  if (event) {
    return (
      <a
        href={`#${eventAnchor(event.date)}`}
        aria-label={`Go to ${event.title} on ${event.date}`}
        className={className}
      >
        {day}
        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-accent" />
      </a>
    );
  }

  return (
    <div className={className}>
      {day}
    </div>
  );
}
