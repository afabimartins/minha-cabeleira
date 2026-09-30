-- BLOCO O — hardening pré-deploy
-- Mantém exatamente a mesma autorização e apenas evita reavaliar auth.uid()
-- para cada linha, conforme recomendação de performance do Supabase.

alter policy "users can read own admin profile"
on public.profiles
using (user_id = (select auth.uid()));

alter policy "authenticated admins read all products"
on public.products
using (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

alter policy "authenticated admins insert products"
on public.products
with check (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

alter policy "authenticated admins update products"
on public.products
using (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

alter policy "authenticated admins delete products"
on public.products
using (
  exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

-- As políticas do Storage usam a mesma regra de administradora.
alter policy "admins select product images"
on storage.objects
using (
  bucket_id = 'product-images'
  and exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

alter policy "admins insert product images"
on storage.objects
with check (
  bucket_id = 'product-images'
  and exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

alter policy "admins update product images"
on storage.objects
using (
  bucket_id = 'product-images'
  and exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
)
with check (
  bucket_id = 'product-images'
  and exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);

alter policy "admins delete product images"
on storage.objects
using (
  bucket_id = 'product-images'
  and exists (
    select 1
    from public.profiles
    where profiles.user_id = (select auth.uid())
      and profiles.role = 'admin'
  )
);
