# BLOCO R — Identidade monocromática

Este bloco altera somente os arquivos visuais da marca. Não modifica a lógica da análise, o catálogo, o glossário, o SEO ou o Supabase.

## Arquivos que substitui

- `src/assets/minha-cabeleira-logo-mark.png`
- `public/favicon.png`

## Arquivos que adiciona

- `public/apple-touch-icon.png`
- `src/assets/branding/minha-cabeleira-logo-mark-black.png`
- `src/assets/branding/minha-cabeleira-logo-mark-white.png`
- `src/assets/branding/minha-cabeleira-logo-horizontal-black.png`
- `src/assets/branding/minha-cabeleira-logo-horizontal-white.png`
- `src/assets/branding/minha-cabeleira-logo-vertical-black.png`
- `src/assets/branding/minha-cabeleira-logo-vertical-white.png`
- `src/assets/branding/minha-cabeleira-favicon-black.png`
- `src/assets/branding/minha-cabeleira-favicon-white.png`

O componente `BrandMark.tsx` e o gerador do PDF já importam `src/assets/minha-cabeleira-logo-mark.png`, então a nova marca passa automaticamente a ser usada no cabeçalho, rodapé, páginas internas e PDF, sem alteração de código.

## Aplicação

Extraia este ZIP na raiz do projeto `minha-cabeleira`, aceitando substituir os arquivos existentes.

Depois execute:

```powershell
npm test
npm run build
```

Se ambos passarem:

```powershell
git status
git add src/assets/minha-cabeleira-logo-mark.png src/assets/branding public/favicon.png public/apple-touch-icon.png LEIA-ME-BLOCO-R-IDENTIDADE.md
git commit -m "style: adota identidade monocromatica da marca"
git push origin main
```

O Cloudflare Pages deve iniciar o deploy automaticamente.

## Conferência após o deploy

Confira a nova marca em:

- cabeçalho;
- rodapé;
- página individual do Glossário;
- PDF da análise;
- favicon da aba do navegador.

Se o favicon antigo permanecer, faça recarga forçada (`Ctrl+F5`) ou teste em janela anônima, pois favicons são fortemente armazenados em cache pelos navegadores.
