# Bloco AA — Headers básicos de segurança

Objetivo: endurecer a camada pública do Minha Cabeleira no Cloudflare Pages sem introduzir ainda uma Content-Security-Policy (CSP).

O arquivo `public/_headers` adiciona:

- `Strict-Transport-Security: max-age=31536000`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

Decisões deliberadas:
- HSTS sem `includeSubDomains` e sem `preload`, para evitar uma configuração mais permanente antes de validarmos toda a zona.
- CSP não é adicionada neste bloco. Primeiro será auditada a lista real de origens necessárias para Supabase, Cloudflare Analytics, imagens e demais recursos.
- Nenhuma alteração no React, Supabase, catálogo, admin, análise, SEO ou estilos.

Após aplicar:
1. `npm test`
2. `npm run build`
3. `git status`
4. Commit/push somente após validar.
5. Depois do deploy, repetir o teste de headers no navegador.
