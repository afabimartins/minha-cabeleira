# BLOCO J0 — FOTOS REAIS NA HOME

Objetivo: substituir a aparência fotográfica gerada por IA por fotografias reais de banco de imagens, sem alterar a Home aprovada, a paleta, a logo, o Glossário, o Admin ou o motor da análise.

## Arquivos

```text
src/App/HomePage.tsx
src/App/styles.css
src/App/home-stock-images.ts
IMAGE-CREDITS.md
```

## Mudanças

- hero passa a ser uma composição de quatro fotografias reais;
- cabelo castanho ondulado;
- cabelo ruivo;
- cabelo loiro ondulado;
- cabelo cacheado;
- o card “Tipos de cabelo” também usa fotografia real;
- não usa mais `src/assets/hero-hair.png` na Home;
- a antiga imagem pode continuar no projeto por enquanto sem causar efeito;
- fontes e fotógrafos ficam documentados em `IMAGE-CREDITS.md`.

## Aplicação

Extraia este ZIP na raiz do projeto e permita substituir os arquivos.

Depois:

```powershell
npm run dev
```

Faça um `Ctrl + F5` na Home.

## Observação

Neste bloco as fotografias são carregadas diretamente da CDN do Pexels.

No Bloco J, ao configurar o Supabase Storage para as imagens dos produtos, podemos também hospedar cópias das fotografias escolhidas no armazenamento do projeto. Isso evita dependência direta da CDN externa em produção.
