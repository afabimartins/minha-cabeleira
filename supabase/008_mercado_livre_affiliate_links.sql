-- Minha Cabeleira — links de afiliado do Mercado Livre
-- Atualização: 05/10/2026.
--
-- Objetivo:
-- - registrar os links individuais de afiliado encontrados manualmente;
-- - manter os 16 produtos correspondentes ativos;
-- - pausar temporariamente o tônico Match. Agente Antioleosidade,
--   pois não foi encontrado anúncio adequado para afiliação.
--
-- Este script deve ser executado depois de 006_catalog_expansion.sql.

update public.products
set
  product_url = case id
    when 'vult-choque-reconstrucao-condicionador-200ml' then 'https://meli.la/1k1wFN3'
    when 'seda-ceramidas-condicionador-325ml' then 'https://meli.la/21s1XP8'
    when 'vult-recarga-hidratacao-condicionador-200ml' then 'https://meli.la/1VgB1mM'
    when 'elseve-reparacao-total-5-creme-milagroso-500ml' then 'https://meli.la/1CQoxyU'
    when 'seda-boom-definicao-intensa-350ml' then 'https://meli.la/2BWK6uB'
    when 'salon-line-definicao-intensa-1kg' then 'https://meli.la/2ZHL3pY'
    when 'vult-choque-reconstrucao-leave-in-100ml' then 'https://meli.la/1mzDBUR'
    when 'vult-glow-acid-mascara-acidificante-150ml' then 'https://meli.la/15hdSRz'
    when 'vult-choque-reconstrucao-mascara-250g' then 'https://meli.la/1xV415q'
    when 'vult-oleo-bifasico-oleos-poderosos-90ml' then 'https://meli.la/1NmfyEg'
    when 'elseve-oleo-extraordinario-100ml' then 'https://meli.la/1bnjUo8'
    when 'seda-toque-de-seda-serum-oleo-60ml' then 'https://meli.la/2C6EkZA'
    when 'loccitane-pataua-serum-calmante-couro-50ml' then 'https://meli.la/1kUGj4B'
    when 'vult-choque-reconstrucao-shampoo-350ml' then 'https://meli.la/1Fz4nBv'
    when 'vult-recarga-hidratacao-shampoo-350ml' then 'https://meli.la/1rdAD5k'
    when 'seda-hidratacao-diaria-shampoo-325ml' then 'https://meli.la/2M3seTb'
    else product_url
  end,
  retailer = 'Mercado Livre',
  link_type = 'affiliate',
  availability = 'active',
  updated_at = now()
where id in (
  'vult-choque-reconstrucao-condicionador-200ml',
  'seda-ceramidas-condicionador-325ml',
  'vult-recarga-hidratacao-condicionador-200ml',
  'elseve-reparacao-total-5-creme-milagroso-500ml',
  'seda-boom-definicao-intensa-350ml',
  'salon-line-definicao-intensa-1kg',
  'vult-choque-reconstrucao-leave-in-100ml',
  'vult-glow-acid-mascara-acidificante-150ml',
  'vult-choque-reconstrucao-mascara-250g',
  'vult-oleo-bifasico-oleos-poderosos-90ml',
  'elseve-oleo-extraordinario-100ml',
  'seda-toque-de-seda-serum-oleo-60ml',
  'loccitane-pataua-serum-calmante-couro-50ml',
  'vult-choque-reconstrucao-shampoo-350ml',
  'vult-recarga-hidratacao-shampoo-350ml',
  'seda-hidratacao-diaria-shampoo-325ml'
);

update public.products
set
  availability = 'paused',
  updated_at = now()
where id = 'match-agente-antioleosidade-tonico-100ml';
