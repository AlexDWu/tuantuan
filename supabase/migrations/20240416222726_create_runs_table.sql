create table public.runs (
  id bigint primary key generated always as identity,
  created_by_id uuid not null references auth.users on delete cascade,
  status text default 'draft',
  created_at timestamptz default now()
);

alter table public.runs enable row level security;

create policy "Public runs are viewable by everyone."
  on runs for select
  using ( true );

create policy "Users can insert their own runs."
  on runs for insert
  with check ( auth.uid() = created_by_id );

create policy "Users can update own runs."
  on runs for update
  with check ( auth.uid() = created_by_id );
