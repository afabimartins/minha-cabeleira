-- 1) Primeiro crie a usuária em Authentication > Users no painel do Supabase.
-- 2) Copie o UUID dela e substitua abaixo.

insert into public.profiles (user_id, role, display_name)
values (
  'c5b58137-87e1-4429-9b5f-fe6b506097fa',
  'admin',
  'Administradora'
)
on conflict (user_id)
do update set
  role = excluded.role,
  display_name = excluded.display_name;
