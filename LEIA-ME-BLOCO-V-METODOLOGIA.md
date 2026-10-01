# Bloco V — Metodologia pública

Este bloco adiciona a página pública `/metodologia` sem alterar o motor de análise, o catálogo, o admin ou o layout global.

## O que muda

- nova página `src/App/MethodologyPage.tsx`;
- rota `/metodologia` em `App.tsx`;
- SEO específico em `SiteSeo.tsx`;
- teste SEO da nova rota;
- link `Metodologia` no rodapé;
- inclusão da rota no `sitemap.xml` por meio do gerador existente;
- a página reutiliza os estilos já aprovados da página de Privacidade, então não substitui `styles.css` e não conflita com os Blocos T/U.

## Conteúdo coberto

A página explica, em linguagem pública:

1. respostas do questionário como ponto de partida;
2. combinação de observações em sinais;
3. etapa de segurança antes de produtos;
4. orientação de fórmula antes da marca;
5. produtos ativos como camada opcional;
6. personalização por objetivo, rotina e orçamento sem relaxar segurança;
7. natureza informativa e possibilidade de refazer a análise.

## Aplicação

Na raiz do projeto:

```powershell
..\bloco-v\minha-cabeleira-BLOCO-V-metodologia\aplicar-bloco-v.cmd
npm test
npm run build
git status
```

Depois de validar, publicar e conferir:

- `https://minhacabeleira.com.br/metodologia`
- rodapé com link `Metodologia`
- sitemap contendo `/metodologia`
- SEO da nova página sem `noindex`
