# Bloco X — Transparência comercial

Este bloco adiciona a rota pública `/transparencia` sem alterar o motor da análise, o catálogo, o painel administrativo ou os estilos globais.

## O que muda

- cria `src/App/TransparencyPage.tsx`;
- adiciona a rota `/transparencia` em `App.tsx`;
- adiciona **Transparência** ao rodapé;
- adiciona SEO específico para a página;
- inclui `/transparencia` no sitemap;
- amplia o teste de SEO para cobrir a nova rota.

## Conteúdo da página

A página explica que:

- a recomendação técnica vem antes da camada comercial;
- marca ou pagamento não determinam compatibilidade;
- produtos são exemplos compatíveis e não prescrições;
- publicidade do Google AdSense, quando ativada, permanece separada da análise;
- links comerciais ou afiliados devem ser identificados quando existirem;
- patrocínio precisa ser distinguível de conteúdo técnico;
- preço e disponibilidade podem mudar em sites externos;
- bloqueios de segurança têm prioridade sobre monetização.

## Validação

Depois de aplicar:

```powershell
npm test
npm run build
git status
```

Não faça commit antes de conferir o resultado.
