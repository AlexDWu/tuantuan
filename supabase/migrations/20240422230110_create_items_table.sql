create table public.items (
  id bigint primary key generated always as identity,
  run_id bigint not null references runs on delete cascade,
  image_urls text[],
  created_at timestamptz default now(),
  name text,
  description text,
  price numeric,
  max_quantity integer
);

alter table public.items enable row level security;

create policy "Public items are viewable by everyone."
  on items for select
  using ( true );

create policy "Users can insert their own items."
  on items for insert
  with check (( select auth.uid()) in (select created_by_id from runs where items.run_id = runs.id) );

create policy "Users can update own items."
  on items for update
  with check (( select auth.uid()) in (select created_by_id from runs where items.run_id = runs.id) );
