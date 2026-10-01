# Minha Cabeleira — Bloco S: UX mobile global

Este bloco fecha os ajustes identificados na revisão mobile da Home e da página de Privacidade.

## O que muda

- adiciona menu mobile acessível ao `SiteHeader` compartilhado;
- mantém o CTA `Fazer minha análise` no cabeçalho;
- menu mobile contém Início, Análise, Glossário, Sobre e Privacidade;
- fecha o menu ao navegar e com a tecla Escape;
- não altera o header desktop;
- volta a exibir `Recomendações personalizadas` no hero mobile;
- benefícios do hero passam a usar faixa horizontal compacta no celular;
- galeria `Sem rótulos. Com contexto.` passa a rolagem horizontal com as quatro fotografias, reduzindo a altura da Home;
- reduz discretamente o título da página Privacidade em telas pequenas.

## Aplicação

Extraia este ZIP na raiz do projeto `minha-cabeleira`, aceitando substituir:

- `src/App/SiteHeader.tsx`
- `src/App/styles.css`

Depois execute:

```powershell
npm test
npm run build
```

Se ambos passarem:

```powershell
git add src/App/SiteHeader.tsx src/App/styles.css LEIA-ME-BLOCO-S-UX-MOBILE.md
git commit -m "fix: melhora navegacao e home no mobile"
git push origin main
```

## Verificação depois do deploy

Em largura mobile, confirme:

1. botão de menu aparece ao lado do CTA;
2. menu abre e lista as cinco rotas públicas;
3. link da página atual aparece destacado;
4. clicar em uma rota fecha o menu;
5. os três benefícios do hero continuam presentes;
6. as quatro fotografias da seção de diversidade podem ser percorridas horizontalmente;
7. página Privacidade continua legível sem título excessivamente grande.

O Bloco S não altera regras da análise, catálogo, Supabase, PDF ou SEO.
