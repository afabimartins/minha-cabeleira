-- Minha Cabeleira — catálogo real de produtos + controle de administradores
-- Execute no SQL Editor do Supabase.

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin')),
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  brand text not null,
  name text not null,
  category text not null,
  size text,
  image_url text,
  price numeric(10,2),
  currency text not null default 'BRL',
  retailer text,
  product_url text,
  price_checked_at date,
  ingredients_raw text,
  attributes text[] not null default '{}',
  availability text not null default 'paused'
    check (availability in ('active', 'paused')),
  source_url text,
  verified_at date,
  link_type text not null default 'editorial'
    check (link_type in ('editorial', 'affiliate', 'sponsored')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;

revoke all on public.profiles from anon;
revoke all on public.products from anon;
revoke all on public.profiles from authenticated;
revoke all on public.products from authenticated;

grant select on public.products to anon;
grant select, insert, update, delete on public.products to authenticated;
grant select on public.profiles to authenticated;

create policy "public reads active products"
on public.products
for select
to anon
using (availability = 'active');

create policy "authenticated admins read all products"
on public.products
for select
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = auth.uid()
      and profiles.role = 'admin'
  )
);

create policy "authenticated admins insert products"
on public.products
for insert
to authenticated
with check (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = auth.uid()
      and profiles.role = 'admin'
  )
);

create policy "authenticated admins update products"
on public.products
for update
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = auth.uid()
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = auth.uid()
      and profiles.role = 'admin'
  )
);

create policy "authenticated admins delete products"
on public.products
for delete
to authenticated
using (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = auth.uid()
      and profiles.role = 'admin'
  )
);

create policy "users can read own admin profile"
on public.profiles
for select
to authenticated
using (user_id = auth.uid());

-- Depois de criar a usuária em Authentication > Users,
-- substitua o UUID abaixo e execute uma vez:
-- insert into public.profiles (user_id, role, display_name)
-- values ('UUID-DA-USUARIA', 'admin', 'Administradora');
