# Bloco O — revisão final pré-deploy

Este bloco fecha os pontos técnicos encontrados na auditoria antes do primeiro deploy de teste.

## O que mudou

- Rota 404 real para endereços desconhecidos.
- Verbete inexistente do Glossário também passa a cair na 404.
- SEO da 404 usa `noindex,nofollow` em vez de herdar o SEO da Home.
- Teste E2E novo para rota inexistente.
- Migration `007_predeploy_hardening.sql` otimiza as políticas RLS sem ampliar permissões.

## Estado confirmado no Supabase

- 17 produtos cadastrados.
- 17 imagens no bucket `product-images`.
- 17/17 produtos com `image_path` e `image_url` correspondentes ao Storage.
- RLS habilitado nas tabelas públicas usadas pelo site.

## Antes do deploy comercial

O deploy de teste pode ser feito com AdSense desligado. Antes de uma publicação comercial definitiva, confira:

1. Definir `VITE_SITE_URL` com a URL pública final.
2. Definir `VITE_PRIVACY_CONTACT_EMAIL`.
3. Manter `VITE_ADSENSE_ENABLED=false` até AdSense/CMP estarem realmente configurados.
4. No Supabase, habilitar **Leaked Password Protection** em Authentication > Password Security.
5. Registrar a origem/licença das imagens de produtos se isso ainda não estiver documentado.

## Testes

No Windows, depois de substituir os arquivos deste bloco:

```bat
npm run typecheck
npm test
.\test-e2e.cmd
.\test-live-analysis.cmd
```

O ambiente de revisão usado para montar este bloco não consegue executar o Vitest/Vite do `node_modules` enviado pelo Windows porque os bindings nativos são específicos da plataforma. O TypeScript é validado separadamente no ambiente de revisão.
