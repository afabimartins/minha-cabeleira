# Créditos das fotografias — Bloco J0

O Bloco J0 substitui as imagens fotográficas geradas por IA da Home por fotografias reais selecionadas no Pexels.

As páginas abaixo estavam marcadas pelo Pexels como **Free to use** no momento da curadoria (27/09/2026).

## Hero — cabelos castanhos ondulados

- Fotógrafa: Mathilde Langevin
- Fonte: https://www.pexels.com/photo/back-view-of-woman-with-brown-hair-13543276/

## Hero — cabelo ruivo

- Fotógrafa: Beyzanur K.
- Fonte: https://www.pexels.com/photo/close-up-of-red-hair-and-hands-in-soft-lighting-28994648/

## Hero — cabelo loiro ondulado

- Fotógrafa: Olga Solo
- Fonte: https://www.pexels.com/photo/wavy-blonde-hair-with-sunlit-8977848/

## Hero e card “Tipos de cabelo” — cabelo cacheado

- Fotógrafa: Alena Darmel
- Fonte: https://www.pexels.com/photo/crop-anonymous-woman-touching-hair-in-sunlight-7222368/

## Arquitetura

As URLs das imagens e suas fontes ficam centralizadas em:

```text
src/App/home-stock-images.ts
```

Isso permite trocar uma foto depois sem espalhar URLs pelo JSX.

### Próximo passo recomendado

No Bloco J, quando configurarmos o Supabase Storage, podemos copiar as fotografias escolhidas para o próprio armazenamento do Minha Cabeleira. Assim a Home deixa de depender diretamente da CDN externa em produção, mantendo a origem/licença registrada neste arquivo.
