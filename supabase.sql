-- extensions
create extension if not exists pgcrypto;
create extension if not exists uuid-ossp;

-- profiles: link to auth.users
create table if not exists public.profiles (
	id uuid primary key references auth.users(id) on delete cascade,
	role text not null check (role in ('doctor','user')) default 'user',
	full_name text,
	external_id text unique,
	created_at timestamptz default now()
);

-- devices: optional per-device API key
create table if not exists public.devices (
	id uuid primary key default gen_random_uuid(),
	name text,
	api_key text unique,
	owner_user_id uuid references public.profiles(id),
	created_at timestamptz default now()
);

-- tests: screening results
create table if not exists public.tests (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references public.profiles(id) on delete cascade,
	device_id uuid references public.devices(id),
	total_syn numeric,
	oligomeric_syn numeric,
	dj1 numeric,
	tau numeric,
	total_syn_norm numeric,
	oligomeric_syn_norm numeric,
	dj1_norm numeric,
	tau_norm numeric,
	risk_score numeric,
	risk_level text check (risk_level in ('normal','elevated','see_doctor')),
	notes text,
	meta jsonb,
	created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.tests enable row level security;
alter table public.devices enable row level security;

-- profiles: owner can read/update self
drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select
on public.profiles for select
using (auth.uid() = id);

drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update
on public.profiles for update
using (auth.uid() = id);

-- tests: users can read their own
drop policy if exists tests_user_select on public.tests;
create policy tests_user_select
on public.tests for select
using (auth.uid() = user_id);

-- doctors can read all tests (initial simple policy)
drop policy if exists tests_doctor_select on public.tests;
create policy tests_doctor_select
on public.tests for select
using (
	exists (
		select 1 from public.profiles p
		where p.id = auth.uid() and p.role = 'doctor'
	)
);

-- devices: allow doctors to view (optional UI)
drop policy if exists devices_doctor_select on public.devices;
create policy devices_doctor_select
on public.devices for select
using (
	exists (
		select 1 from public.profiles p
		where p.id = auth.uid() and p.role = 'doctor'
	)
);

-- Trigger: create profiles row when new auth user is created
create or replace function public.handle_new_user()
returns trigger as $$
begin
	insert into public.profiles (id, role, full_name)
	values (new.id, 'user', coalesce(new.raw_user_meta_data->>'full_name',''))
	on conflict (id) do nothing;
	return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();


