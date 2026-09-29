# BLOCO L — FOTOGRAFIA REAL

Este bloco adiciona o acervo fotográfico real aprovado ao Minha Cabeleira.

## O que muda

### Home
- o hero de ANIK PAUL permanece intacto;
- o card “Tipos de cabelo” passa a usar fotografia de Tima Miroshnichenko;
- entra a nova seção **“Todos os cabelos. Sem rótulos.”**;
- a seção mostra diferentes aparências sem usar fotografia como diagnóstico.

### Sobre
- o hero recebe retrato real de Oscar Steiner;
- entra uma seção complementar com fotografia de Julia Kuzenkov.

### Glossário
- o hero passa a combinar uma imagem de produtos/ativos de Nataliya Vaitkevich;
- uma segunda imagem de Oscar Steiner destaca textura real do cabelo;
- o conteúdo técnico continua sendo o protagonista.

## Fotografias

As imagens foram convertidas para WEBP e reduzidas para tamanhos adequados à interface.
Os JPGs originais não são adicionados ao projeto.

Créditos e URLs:
```text
IMAGE-CREDITS.md
```

## Rastreamento

Neste bloco foram usadas apenas fotografias com autoria/origem suficientemente registradas.

As imagens antigas sem origem confirmada (como a fotografia do cabelo azul com lenço
e a antiga fotografia ruiva sem página-fonte confirmada) NÃO são adicionadas.

## Aplicar

Extraia este ZIP na raiz:

```text
C:\Users\Profissional\Projects\minha-cabeleira
```

e permita substituir os arquivos.

Arquivos alterados:
```text
src/App/HomePage.tsx
src/App/AboutPage.tsx
src/App/GlossaryPage.tsx
src/App/styles.css
IMAGE-CREDITS.md
```

Novos assets:
```text
src/assets/hair-care-tima-miroshnichenko.webp
src/assets/hair-coily-augusto-carneiro.webp
src/assets/hair-man-alax-matias.webp
src/assets/hair-straight-hanna-pad.webp
src/assets/hair-wavy-caique-araujo.webp
src/assets/hair-natural-oscar-steiner.webp
src/assets/hair-blonde-julia-kuzenkov.webp
src/assets/hair-products-nataliya-vaitkevich.webp
src/assets/hair-texture-oscar-steiner.webp
```

## Testar visualmente

```powershell
npm run dev
```

Confira:
- `/`
- `/sobre`
- `/glossario`

Teste também a largura mobile pelo DevTools.

## Validação

```powershell
npm test
npm run build
.\test-e2e.cmd
```

O teste live de catálogo não é afetado por este bloco, mas pode ser executado também:

```powershell
.\test-live-analysis.cmd
```

## Commit sugerido

Depois da validação:

```powershell
git add .
git status
git commit -m "feat: add real photography across public pages"
git status
```

Confirme que `.env.local` não está staged.
