-- Run in Supabase → SQL Editor.

create table public.registrations (
  id uuid primary key,
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null unique,
  phone text not null,
  country text not null,
  city text,
  role text not null,
  org_name text,
  industry text not null,
  stage text not null,
  build_room text not null,
  wants text[] not null default '{}',
  challenge text not null,
  heard_from text not null
);

alter table public.registrations enable row level security;

-- Visitors can register, but cannot read, edit or delete anything.
create policy "public can register" on public.registrations
  for insert to anon with check (true);

-- Signed-in admins can read and manage everything.
create policy "admins read"   on public.registrations for select to authenticated using (true);
create policy "admins delete" on public.registrations for delete to authenticated using (true);
create policy "admins update" on public.registrations for update to authenticated using (true);

-- Profile image gallery (public bucket; visitors can add images, admins can remove them)
insert into storage.buckets (id, name, public) values ('profile-photos', 'profile-photos', true)
on conflict (id) do nothing;

create policy "public can upload profile images" on storage.objects
  for insert to anon with check (bucket_id = 'profile-photos');
create policy "admins manage profile images" on storage.objects
  for all to authenticated using (bucket_id = 'profile-photos');
