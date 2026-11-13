-- Remote Work Hub ZW: run once in Supabase > SQL Editor.
-- 1) Admin allowlist ------------------------------------------------------
create table if not exists public.admins (user_id uuid primary key references auth.users(id) on delete cascade);
alter table public.admins enable row level security;
drop policy if exists "admins read own row" on public.admins;
create policy "admins read own row" on public.admins for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as
$$ select exists (select 1 from public.admins where user_id = auth.uid()); $$;

-- Make yourself admin (replace the email, then run):
-- insert into public.admins (user_id) select id from auth.users where email = 'YOUR_EMAIL_HERE';

-- 2) Jobs: public sees live jobs only, admins do everything ----------------
alter table public.jobs add column if not exists expires_at timestamptz;
alter table public.jobs enable row level security;

do $$ declare p record; begin
  for p in select policyname from pg_policies where schemaname='public' and tablename='jobs' loop
    execute format('drop policy %I on public.jobs', p.policyname);
  end loop;
end $$;

create policy "public reads live jobs" on public.jobs for select to anon, authenticated
  using (status = 'published' and (expires_at is null or expires_at > now()));
create policy "admins read all jobs" on public.jobs for select to authenticated using (public.is_admin());
create policy "admins insert jobs"   on public.jobs for insert to authenticated with check (public.is_admin());
create policy "admins update jobs"   on public.jobs for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins delete jobs"   on public.jobs for delete to authenticated using (public.is_admin());

-- 3) Newsletter subscribers: anyone can add themselves, only admins can read
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);
alter table public.subscribers enable row level security;
drop policy if exists "anyone can subscribe" on public.subscribers;
drop policy if exists "admins read subscribers" on public.subscribers;
create policy "anyone can subscribe" on public.subscribers for insert to anon, authenticated
  with check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');
create policy "admins read subscribers" on public.subscribers for select to authenticated using (public.is_admin());

-- 4) Also in the dashboard: Authentication > Sign In / Providers > turn OFF "Allow new users to sign up".
