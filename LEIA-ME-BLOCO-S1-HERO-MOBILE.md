# Bloco S.1 — correção do hero mobile

Este bloco corrige somente o mockup demonstrativo do questionário na Home em telas pequenas.

## O que muda

- impede o hero de gerar rolagem horizontal;
- centraliza o cartão demonstrativo do questionário;
- garante que progresso, opções e botão “Continuar” fiquem totalmente visíveis;
- mantém o menu mobile e a galeria horizontal introduzidos no Bloco S;
- não altera questionário real, resultados, Supabase, SEO, PDF ou catálogo.

## Arquivo a substituir

`src/App/styles.css`

## Depois de substituir

```powershell
npm test
npm run build
```

Se ambos passarem:

```powershell
git add src/App/styles.css LEIA-ME-BLOCO-S1-HERO-MOBILE.md
git commit -m "fix: corrige mockup do questionario no mobile"
git push origin main
```
