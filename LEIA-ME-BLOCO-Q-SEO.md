# BLOCO Q — SEO E INDEXAÇÃO

## Objetivo

Preparar o Minha Cabeleira para indexação pública no domínio definitivo:

`https://minhacabeleira.com.br`

Este bloco não altera a lógica da análise, o catálogo, o Supabase ou a área administrativa.

## Alterações

- título e meta description estáticos no `index.html`;
- canonical oficial para `minhacabeleira.com.br`;
- Open Graph e Twitter Cards;
- imagem social real em `/og-image.jpg`;
- favicon em `/favicon.png`;
- JSON-LD básico de `WebSite` e páginas públicas;
- SEO por rota no componente `SiteSeo`;
- `robots.txt` com bloqueio da área `/admin` e endereço do sitemap;
- `sitemap.xml` com as rotas públicas e todas as entradas atuais do Glossário;
- geração automática do sitemap antes de cada build;
- contato público `contato@minhacabeleira.com.br` na página de Privacidade;
- teste unitário para as regras principais de SEO.

## Arquivos principais

- `index.html`
- `src/App/SiteSeo.tsx`
- `src/App/site-seo.test.ts`
- `src/App/PrivacyPage.tsx`
- `public/robots.txt`
- `public/sitemap.xml`
- `public/og-image.jpg`
- `public/favicon.png`
- `scripts/generate-sitemap.mjs`
- `package.json`
- `.env.example`

## Variável de produção

No Cloudflare Pages, manter:

`VITE_SITE_URL=https://minhacabeleira.com.br`

E, se desejado, definir:

`VITE_PRIVACY_CONTACT_EMAIL=contato@minhacabeleira.com.br`

O código possui esse endereço como fallback público, então a página não fica sem contato caso a variável seja esquecida.

## Testes

Executar:

```text
npm test
npm run build
```

O `build` executa primeiro `scripts/generate-sitemap.mjs`, portanto novas entradas do Glossário entram automaticamente no sitemap quando o projeto for compilado.

## Deploy

Depois dos testes locais:

```text
git status
git add .
git commit -m "feat: add SEO and indexing metadata"
git push
```

O Cloudflare Pages deve iniciar o deploy automático pela branch configurada.

## Verificação pública

Após o deploy, conferir:

- `https://minhacabeleira.com.br/`
- `https://minhacabeleira.com.br/analise`
- `https://minhacabeleira.com.br/glossario`
- `https://minhacabeleira.com.br/privacidade`
- `https://minhacabeleira.com.br/robots.txt`
- `https://minhacabeleira.com.br/sitemap.xml`
- `https://minhacabeleira.com.br/og-image.jpg`

Também testar novamente:

`https://www.minhacabeleira.com.br/analise`

O endereço deve continuar redirecionando para o domínio sem `www`.
