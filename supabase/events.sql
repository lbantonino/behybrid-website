do $$
begin
  create type public.event_type as enum ('PERFORM', 'CONNECT');
exception
  when duplicate_object then null;
end;
$$;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  event_date date not null,
  start_time time not null,
  duration_minutes integer not null default 90,
  title text not null,
  location text not null,
  event_type public.event_type not null,
  strava_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

drop policy if exists "Public events are readable" on public.events;

create policy "Public events are readable"
  on public.events
  for select
  using (true);

create index if not exists events_event_date_idx on public.events (event_date);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists events_set_updated_at on public.events;

create trigger events_set_updated_at
  before update on public.events
  for each row
  execute function public.set_updated_at();
