# Bloco AB — CSP em modo Report-Only

Este bloco NÃO bloqueia recursos. Ele adiciona uma Content Security Policy em modo de auditoria (`Content-Security-Policy-Report-Only`) para validar a política antes de aplicá-la de forma definitiva.

Origens observadas em produção:
- Scripts: `https://minhacabeleira.com.br` e `https://static.cloudflareinsights.com`
- Conexões: `https://minhacabeleira.com.br` e `https://rjtgllghebfyossibcxf.supabase.co`
- Imagens: `https://minhacabeleira.com.br` e `https://rjtgllghebfyossibcxf.supabase.co`
- Estilos: `https://minhacabeleira.com.br`
- Fontes externas: nenhuma

Permissões adicionais deliberadas:
- `https://cloudflareinsights.com` em `connect-src`, compatível com o endpoint alternativo do Cloudflare Web Analytics.
- `wss://rjtgllghebfyossibcxf.supabase.co` em `connect-src`, para não bloquear uma futura conexão realtime do mesmo projeto.
- `data:` e `blob:` em imagens/fontes/worker/media onde o app pode gerar recursos locais.
- `'unsafe-inline'` apenas em `style-src`, porque a interface usa estilos inline em componentes React.
- Nenhum `'unsafe-inline'` e nenhum `'unsafe-eval'` em `script-src`.

A política também propõe:
- `object-src 'none'`
- `base-uri 'self'`
- `frame-src 'none'`
- `frame-ancestors 'none'`
- `form-action 'self'`
- `upgrade-insecure-requests`

## Depois do deploy

1. Abra uma janela anônima.
2. Abra DevTools > Console.
3. Ative **Preserve log**.
4. Recarregue a Home.
5. Faça uma análise completa.
6. Abra produtos compatíveis.
7. Visite Glossário, Contato e Privacidade.
8. Entre no `/admin` e confira login/lista/edição sem salvar alterações desnecessárias.
9. No Console, filtre por:
   - `Content Security Policy`
   - `violat`
   - `CSP`

Se não houver violações legítimas, o próximo bloco pode trocar `Content-Security-Policy-Report-Only` por `Content-Security-Policy`.
