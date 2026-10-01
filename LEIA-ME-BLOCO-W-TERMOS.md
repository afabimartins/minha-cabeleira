# Bloco W — Termos de uso

Este bloco adiciona a página pública `/termos` sem alterar o motor de análise, catálogo, admin, estilos globais ou regras de recomendação.

## O que muda

- nova página `src/App/TermsPage.tsx`;
- rota `/termos` em `App.tsx`;
- SEO específico em `SiteSeo.tsx`;
- teste SEO da nova rota;
- link `Termos` no rodapé;
- inclusão de `/termos` no `sitemap.xml` por meio do gerador existente;
- reutilização dos estilos institucionais já aprovados, sem substituir `styles.css`.

## Conteúdo coberto

A página explica:

1. escopo informativo do Minha Cabeleira;
2. que a análise não é diagnóstico nem prescrição;
3. dependência das respostas fornecidas;
4. limites e mudanças em produtos e links externos;
5. publicidade e relações comerciais;
6. uso permitido do site e proteção do admin;
7. conteúdo autoral e marcas de terceiros;
8. disponibilidade e atualização do serviço;
9. vínculo com a Política de Privacidade.

## Aplicação

Na raiz do projeto:

```powershell
..\bloco-w\minha-cabeleira-BLOCO-W-termos\aplicar-bloco-w.cmd
npm test
npm run build
git status
```

Depois de validar, publicar e conferir:

- `https://minhacabeleira.com.br/termos`
- rodapé com link `Termos`
- sitemap contendo `/termos`
- SEO da nova página sem `noindex`
