# Minha Cabeleira — Bloco U: LCP + contraste da Home

Este pacote foi preparado sobre a cópia atual enviada antes do Bloco T, com as alterações do próprio Bloco T reaplicadas antes desta etapa.

## O que muda

1. **Hero descoberto no HTML inicial**
   - `index.html` passa a fazer preload da fotografia principal.
   - O preload usa `imagesrcset`/`imagesizes` para o navegador escolher a largura adequada antes do React iniciar.
   - `fetchpriority="high"` é mantido.

2. **Hero responsivo**
   - Foram criadas versões WebP de 480, 768, 1024 e 1280 px.
   - A Home usa `srcSet` e `sizes` em vez de entregar sempre 1280 px.
   - Isto ataca diretamente o alerta do Lighthouse `LCP request discovery` e a maior parte do restante de `Improve image delivery`.

3. **Logo de interface menor**
   - `minha-cabeleira-logo-mark-ui.png` cai de 256x256 para 128x128.
   - O logo grande original usado no PDF não é alterado.

4. **Contraste AA na Home**
   - Escurece somente cores utilizadas como texto pequeno nos elementos apontados pelo Lighthouse:
     - `.home-section-kicker`
     - `.home-diversity__link`
     - `.home-diversity__note`
     - `.home-glossary__link`
     - `.home-glossary__term > span`
   - A identidade visual, fundos, ilustrações, botões e cores decorativas permanecem como estavam.

## O que NÃO muda

- questionário;
- motor de recomendações;
- catálogo/Supabase;
- admin;
- PDF;
- SEO dinâmico;
- consentimento;
- navegação mobile;
- estrutura das páginas.

Também não foi feita uma tentativa de "corrigir" os ~752 KiB de JavaScript não utilizado vistos no Lighthouse, pois os prints mostram que a maior parte vinha de extensões do Chrome/Urban VPN e não do site.

## Como aplicar

Na raiz do projeto:

```powershell
..\bloco-u\minha-cabeleira-BLOCO-U-lcp-contraste\aplicar-bloco-u.cmd
npm test
npm run build
git status
```

Não faça `git push` antes de conferir o resultado dos testes.

## Depois do deploy

Rode o Lighthouse Mobile de preferência em janela anônima/um perfil sem extensões. Compare principalmente:

- LCP (antes do Bloco U: 4,4 s no teste enviado);
- `LCP request discovery`;
- `Improve image delivery`;
- Accessibility (antes: 95);
- CLS (deve continuar 0).
