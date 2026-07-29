import Image from "next/image";
import { Container } from "@/components/ui/container";

type EventTag = "PERFORM" | "CONNECT";

type CalendarEvent = {
  date: string;
  day: string;
  title: string;
  time: string;
  tag: EventTag;
};

const EVENTS: CalendarEvent[] = [
  { date: "1 JUL", day: "WED", title: "Hard Run 1-1", time: "19:00 · Parc du Cinquantenaire", tag: "PERFORM" },
  { date: "8 JUL", day: "WED", title: "Threshold Intervals", time: "19:00 · Parc du Cinquantenaire", tag: "PERFORM" },
  { date: "12 JUL", day: "SUN", title: "Long Run", time: "10:00 · Bois de la Cambre", tag: "CONNECT" },
  { date: "15 JUL", day: "WED", title: "Hard Run 1-1", time: "19:00 · Parc du Cinquantenaire", tag: "PERFORM" },
  { date: "22 JUL", day: "WED", title: "Threshold Intervals", time: "19:00 · Parc du Cinquantenaire", tag: "PERFORM" },
  { date: "26 JUL", day: "SUN", title: "Long Run", time: "10:00 · Parc Royal", tag: "CONNECT" },
  { date: "29 JUL", day: "WED", title: "Threshold Intervals", time: "19:00 · Parc du Cinquantenaire", tag: "PERFORM" },
];

const EVENT_DAYS = new Set(EVENTS.map((event) => Number(event.date.split(" ")[0])));
const TODAY = 12;
const WEEKDAY_LABELS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
// Juillet 2026 commence un mercredi (2 cases vides avant le 1er).
const CALENDAR_CELLS: (number | null)[] = [
  null, null, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 31, null, null,
];

function TagPill({ tag }: { tag: EventTag }) {
  if (tag === "PERFORM") {
    return (
      <span className="font-display text-[10px] font-extrabold uppercase tracking-wide text-accent-ink bg-accent rounded-full px-2.5 py-1 md:px-3.5 md:py-1.5 md:text-[11px]">
        Perform
      </span>
    );
  }
  return (
    <span className="rounded-full border border-white/40 px-2.5 py-1 font-display text-[10px] font-extrabold uppercase tracking-wide text-ink md:px-3.5 md:py-1.5 md:text-[11px]">
      Connect
    </span>
  );
}

function EventRow({ event }: { event: CalendarEvent }) {
  return (
    <div className="border-b border-line py-[18px] md:flex md:items-center md:gap-7 md:py-[22px]">
      {/* Mobile */}
      <div className="md:hidden">
        <div className="mb-1 flex items-center gap-2.5">
          <span className="font-display text-[17px] font-extrabold">{event.date}</span>
          <span className="text-[10px] tracking-wide text-[#7a7a75]">{event.day}</span>
          <span className="ml-auto">
            <TagPill tag={event.tag} />
          </span>
          <button
            type="button"
            className="rounded-full border border-white/30 px-3 py-[5px] font-display text-[10px] font-bold uppercase"
          >
            Add +
          </button>
        </div>
        <p className="font-display text-base font-bold uppercase">{event.title}</p>
        <p className="mt-0.5 text-xs text-muted">{event.time}</p>
      </div>

      {/* Desktop */}
      <div className="hidden w-[70px] shrink-0 md:block">
        <p className="font-display text-xl font-extrabold">{event.date}</p>
        <p className="text-[10px] tracking-wide text-[#7a7a75]">{event.day}</p>
      </div>
      <div className="hidden md:block md:flex-1">
        <p className="font-display text-xl font-extrabold uppercase">{event.title}</p>
        <p className="mt-0.5 text-[13px] text-muted">{event.time}</p>
      </div>
      <span className="hidden md:inline-flex md:shrink-0">
        <TagPill tag={event.tag} />
      </span>
      <button
        type="button"
        className="hidden shrink-0 rounded-full border border-white/30 px-[18px] py-2 font-display text-[11px] font-bold uppercase tracking-wide md:inline-block"
      >
        Add +
      </button>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <>
      <Container className="pt-8 md:pt-14">
        <p className="font-display text-sm font-bold uppercase tracking-[2px] text-accent">
          Calendar
        </p>
        <h1 className="mt-1 font-display text-[26px] font-black uppercase md:text-[44px]">
          Never Miss A Run
        </h1>
        <p className="mt-2.5 max-w-[440px] text-[13px] text-muted md:mt-3 md:text-[15px]">
          Every Perform and Connect session, scheduled weeks ahead. Reserve
          your spot and show up.
        </p>

        <div className="mt-7 flex flex-col gap-8 md:mt-10 md:grid md:grid-cols-[400px_1fr] md:items-start md:gap-14">
          <div className="rounded-xl border border-line p-5 md:p-7">
            <div className="mb-4 flex items-center justify-between md:mb-[18px]">
              <p className="font-display text-lg font-extrabold uppercase md:text-xl">
                July 2026
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs text-muted md:h-7 md:w-7"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs text-muted md:h-7 md:w-7"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="mb-1.5 grid grid-cols-7 gap-1">
              {WEEKDAY_LABELS.map((label) => (
                <span key={label} className="text-center text-[9px] text-[#7a7a75] md:text-[10px]">
                  {label}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {CALENDAR_CELLS.map((day, index) => (
                <div
                  key={index}
                  className={`relative flex aspect-square items-center justify-center rounded-md text-[11px] text-[#e6e6e2] md:text-sm ${
                    day === TODAY ? "bg-white/12" : ""
                  }`}
                >
                  {day}
                  {day !== null && EVENT_DAYS.has(day) && (
                    <span className="absolute bottom-[5px] h-1 w-1 rounded-full bg-accent" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-1 inline-block font-display text-[22px] font-black uppercase text-accent md:border-b md:border-accent md:pb-3 md:text-[15px] md:font-bold md:tracking-[1.5px] md:text-muted">
              Next Events
            </p>
            <div>
              {EVENTS.map((event) => (
                <EventRow key={event.date + event.title} event={event} />
              ))}
            </div>
            <p className="py-6 text-center text-[11px] uppercase tracking-wide text-[#7a7a75] md:py-8 md:text-xs">
              Session dates of August coming soon
            </p>
          </div>
        </div>
      </Container>

      <section className="mt-9 grid grid-cols-1 gap-0.5 md:mt-14 md:grid-cols-3">
        {["gallery-calendar-1.png", "gallery-calendar-2.png", "gallery-calendar-3.png"].map(
          (file) => (
            <div key={file} className="relative h-[160px] w-full md:h-[340px]">
              <Image
                src={`/photos/${file}`}
                alt="Photo du club BEHYBRID"
                fill
                sizes="(min-width: 860px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
          )
        )}
      </section>
    </>
  );
}
