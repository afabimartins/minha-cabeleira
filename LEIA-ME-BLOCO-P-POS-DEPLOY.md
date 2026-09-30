# Minha Cabeleira — Bloco P: correções pós-deploy

Este bloco corrige os pontos encontrados no primeiro smoke test do ambiente Cloudflare Pages.

## 1. Produtos de couro cabeludo não vazam para recomendações gerais

O seletor `selectProducts()` agora aplica, por padrão, apenas categorias de cuidado do fio:

- shampoo
- conditioner
- mask
- treatment
- leave_in
- styler
- oil

A categoria `scalp` só pode aparecer numa recomendação quando uma regra a solicitar explicitamente em `productCriteria.categories`.

Isso evita que um sérum/tônico de couro cabeludo apareça em uma recomendação geral apenas porque compartilha uma tag como `moisture_support`.

A rotina-base continua tratando o couro cabeludo separadamente: `scalp` só é adicionado quando as respostas indicam oleosidade ou ressecamento pertinente.

## 2. Rotina-base passa a mostrar imagens dos produtos

Os cards de rotina-base agora usam `imageUrl` do catálogo, com placeholder quando a imagem não existe.

## 3. PDF mais compacto

A seção de produtos compatíveis do PDF passa a usar uma grade compacta de duas colunas. Isso reduz quebras desnecessárias e evita páginas adicionais com poucos produtos e muito espaço vazio.

## 4. Cobertura de testes

Foram acrescentados testes para garantir que:

- produto `scalp` não entra em recomendação geral mesmo que compartilhe uma tag técnica;
- produto `scalp` continua permitido quando a regra solicita explicitamente essa categoria;
- o E2E inclui um produto de couro cabeludo no catálogo, mas confirma que ele não aparece quando as respostas de couro cabeludo são negativas;
- a rotina-base renderiza as imagens dos cinco produtos essenciais no cenário E2E.

## Arquivos alterados

- `src/domain/product-selection.ts`
- `src/domain/product-selection.test.ts`
- `src/App/AnalysisResultView.tsx`
- `src/App/styles.css`
- `src/App/analysis-pdf.ts`
- `e2e/site.spec.ts`

## Validação feita durante a preparação

- TypeScript: aprovado com `tsc --noEmit`.
- Teste direcionado do seletor: aprovado; recomendação geral retornou apenas produto do fio e regra explícita de `scalp` retornou produto de couro cabeludo.

O ambiente desta preparação não conseguiu completar a instalação Linux de Vite/Vitest a tempo, portanto a rodada completa `npm test`/`npm run build` deve ser executada no Windows antes do push. O projeto já havia passado essa rodada no Bloco O.

## Depois de copiar os arquivos

```powershell
npm run typecheck
npm test
.\test-e2e.cmd
.\test-live-analysis.cmd
```

Se tudo passar:

```powershell
git add .
git commit -m "fix: corrige produtos de couro cabeludo no resultado"
git push
```

O Cloudflare Pages deverá iniciar um novo deploy automaticamente a partir da branch `main`.
