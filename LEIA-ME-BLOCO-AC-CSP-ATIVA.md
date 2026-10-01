# Bloco AC — CSP ativa

Este bloco transforma a CSP testada em `Report-Only` em uma política efetiva de bloqueio.

A política foi validada em produção nas rotas públicas e no `/admin`, sem violações legítimas observadas.

Política aplicada:
- scripts: próprio site + Cloudflare Web Analytics;
- conexões: próprio site + Supabase + endpoint do Cloudflare Analytics;
- imagens: próprio site + Supabase + `data:`/`blob:`;
- estilos: próprio site + estilos inline usados pela interface React;
- fontes: próprio site + `data:`;
- objetos incorporados: bloqueados;
- iframes: bloqueados;
- `frame-ancestors 'none'`;
- `form-action 'self'`;
- `upgrade-insecure-requests`.

Após o deploy:
1. Abrir uma janela anônima.
2. Ativar “Manter registro / Keep log” no Console.
3. Recarregar a Home.
4. Fazer uma análise completa.
5. Abrir produtos compatíveis.
6. Visitar Glossário, Privacidade, Contato.
7. Entrar no `/admin`, abrir a lista de produtos e uma edição.
8. Confirmar que não há mensagens “Refused to … because it violates Content Security Policy”.

Se surgir uma violação legítima, reverta este commit ou troque temporariamente para `Content-Security-Policy-Report-Only` enquanto ajusta a origem necessária.
