# Bloco Y.1 — Contato: fallback para links de e-mail

Corrige a experiência da página /contato quando o navegador ou o Windows não possui um aplicativo configurado para links mailto:.

Alterações:
- mantém o endereço contato@minhacabeleira.com.br como link mailto:;
- adiciona botão “Copiar e-mail”;
- mostra confirmação acessível após copiar;
- inclui fallback de cópia para navegadores sem Clipboard API.

Nenhuma alteração no Supabase, catálogo, análise, SEO ou rotas.
