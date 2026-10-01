# BLOCO R1 — Logo antiga monocromática + favicon

## O que este bloco altera

Este bloco mantém a identidade monocromática, mas volta ao desenho anterior da marca
(MC + perfil feminino com cabelos ao vento).

Cor principal da marca:
- `#2B1E1A` — marrom/carvão muito escuro, mais suave que `#000000`.

Arquivos:
- `src/assets/minha-cabeleira-logo-mark.png`
  - desenho antigo, recolorido em `#2B1E1A`;
  - usado pelo site e pelo PDF por meio do `BrandMark`.
- `public/favicon.ico`
  - favicon principal, com o monograma MC do desenho antigo.
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/favicon-192x192.png`
- `public/apple-touch-icon.png`

## Como aplicar

Extraia o conteúdo deste ZIP na raiz do projeto `minha-cabeleira` e aceite substituir
`src/assets/minha-cabeleira-logo-mark.png`.

Os novos arquivos da pasta `public` podem ser adicionados normalmente.

## Importante

Não substitua `index.html` por causa deste bloco. O navegador normalmente detecta
`/favicon.ico` automaticamente. Isso evita sobrescrever alterações de SEO que já
existem no seu `index.html`.

## Testes

Depois de extrair:

```powershell
npm test
npm run build
```

Se ambos passarem:

```powershell
git status
git add src/assets/minha-cabeleira-logo-mark.png public/favicon.ico public/favicon-16x16.png public/favicon-32x32.png public/favicon-192x192.png public/apple-touch-icon.png LEIA-ME-BLOCO-R1-IDENTIDADE.md
git commit -m "style: restaura desenho antigo da marca e adiciona favicon"
git push origin main
```

Após o deploy do Cloudflare:
1. abra `https://minhacabeleira.com.br`;
2. use `Ctrl + F5`;
3. confira header e footer;
4. feche e reabra a aba para conferir o favicon;
5. baixe um PDF de teste para confirmar a marca no relatório.
