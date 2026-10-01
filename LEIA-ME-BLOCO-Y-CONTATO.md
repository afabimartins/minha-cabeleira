# Bloco Y — Contato

Este bloco adiciona a página institucional de contato do Minha Cabeleira.

## O que muda

- nova rota pública `/contato`;
- e-mail oficial `contato@minhacabeleira.com.br` visível e clicável;
- orientações para dúvidas gerais, correções, privacidade e catálogo;
- link `Contato` no rodapé;
- SEO específico para a nova página;
- `/contato` incluído no sitemap gerado;
- teste SEO atualizado.

## O que não muda

- motor da análise;
- questionário;
- recomendações e catálogo;
- Supabase e painel admin;
- PDF;
- estilos globais;
- configuração de anúncios.

A página reutiliza os estilos institucionais já existentes, sem adicionar CSS novo.

## Validação

Depois de aplicar:

```powershell
npm test
npm run build
git status
```

O build deve regenerar `public/sitemap.xml` com a nova rota.
