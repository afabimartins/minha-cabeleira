# Minha Cabeleira — Bloco T: performance da Home

Objetivo: atacar os dois maiores pontos mostrados pelo Lighthouse sem alterar o layout aprovado.

## O que muda

1. **Hero**
   - troca o JPG de ~1,0 MB por WebP otimizado;
   - mantém a fotografia e o mesmo recorte via CSS;
   - adiciona dimensões explícitas, `loading="eager"`, `fetchPriority="high"` e `decoding="async"`.

2. **Logo do cabeçalho/rodapé**
   - passa a usar uma cópia de interface com 256×256 px;
   - o arquivo original continua no projeto e continua disponível para o PDF.

3. **Fotos da Home abaixo da primeira dobra**
   - reduz as dimensões físicas dos WebP para ficarem mais próximas do tamanho em que são realmente exibidos;
   - preserva `loading="lazy"` já existente.

4. **PDF / JavaScript inicial**
   - `jspdf` deixa de entrar pelo import estático de `AnalysisResultView`;
   - o módulo do PDF é carregado sob demanda somente quando a pessoa clica em **Baixar resultado em PDF**.

## Peso das imagens da Home alteradas

Aproximadamente:

- antes: **1,61 MB**;
- depois: **0,36 MB**;
- redução: **~1,25 MB (77,7%)**.

O valor final do Lighthouse pode variar conforme rede, cache, extensões do Chrome e dispositivo.

## Arquivos substituídos

- `src/App/HomePage.tsx`
- `src/App/BrandMark.tsx`
- `src/App/AnalysisResultView.tsx`
- `src/assets/hair-care-tima-miroshnichenko.webp`
- `src/assets/hair-coily-augusto-carneiro.webp`
- `src/assets/hair-man-alax-matias.webp`
- `src/assets/hair-straight-hanna-pad.webp`
- `src/assets/hair-wavy-caique-araujo.webp`

## Arquivos novos

- `src/assets/hero-hair-anik-paul.webp`
- `src/assets/minha-cabeleira-logo-mark-ui.png`

O antigo `src/assets/hero-hair-anik-paul.jpg` pode permanecer no projeto. Ele não é mais importado pela Home e, portanto, não deve entrar no build da página.

## Validação local obrigatória

Na raiz do projeto:

```powershell
npm test
npm run build
```

Depois confira visualmente:

- Home desktop;
- Home mobile;
- cabeçalho e rodapé;
- resultado da análise;
- botão **Baixar resultado em PDF**.

Depois do deploy, rode Lighthouse Mobile novamente na Home e compare principalmente **Performance**, **LCP** e **Improve image delivery**.
