# BLOCO K.2 — E2E determinístico, sem depender do Supabase ao vivo

A falha restante acontecia depois da 20ª resposta: o teste aguardava a tela
“Você análise está pronta”, mas o fluxo final também consulta o catálogo do Supabase.

Isso mistura duas responsabilidades diferentes:

1. **E2E da interface**
   - navegar pelas 20 perguntas;
   - concluir a análise;
   - renderizar o resultado;
   - baixar o PDF;
   - testar desktop/mobile.

2. **Integração real com Supabase**
   - carregar o catálogo real;
   - confirmar os produtos reais e a ordenação.

O projeto já possui o teste específico da segunda parte:

```powershell
.\test-live-analysis.cmd
```

Por isso o E2E não deve falhar só porque uma requisição externa ficou lenta,
indisponível ou diferente naquele instante.

## Correção

No teste “Análise completa gera resultado e download de PDF”, o endpoint público:

```text
/rest/v1/products
```

é interceptado pelo Playwright e responde com:

```json
[]
```

Isso é intencional e válido: o Minha Cabeleira foi projetado para continuar
entregando análise técnica mesmo quando o catálogo está vazio/indisponível.

Nenhum código da aplicação é alterado.

## Aplicar

Extraia este ZIP na raiz e substitua apenas:

```text
e2e/site.spec.ts
```

Depois rode:

```powershell
.\test-e2e.cmd
```

Se passar, rode a validação completa:

```powershell
npm test
npm run build
.\test-live-analysis.cmd
.\test-e2e.cmd
```
