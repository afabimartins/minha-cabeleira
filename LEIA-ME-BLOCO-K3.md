# BLOCO K.3 — perfil válido no teste E2E

A aplicação não estava travando.

O teste E2E anterior respondia **a primeira opção em todas as 20 perguntas**.
Isso gera um perfil praticamente neutro:

- pouca aspereza;
- pouco embaraço;
- pouca quebra;
- sem histórico de dano;
- sem sinais de segurança;
- etc.

Esse conjunto não é uma boa escolha para um teste cuja próxima expectativa é,
obrigatoriamente, a tela completa de resultado.

No fluxo real, o `Questionnaire` só troca para `AnalysisResultView` quando:

```ts
analysis.valid && analysis.result
```

Portanto o E2E deve usar um conjunto de respostas conhecido por gerar uma
análise técnica válida, em vez de presumir que “primeira opção em tudo” fará isso.

## Perfil usado agora

O teste automatizado escolhe:

- pergunta 4: **muita quebra**;
- pergunta 10: **mudança intensa / histórico de dano severo**;
- pergunta 18: **reduzir quebra**;
- pergunta 19: **rotina equilibrada**;
- pergunta 20: **priorizar menor preço**;
- perguntas de segurança: opções sem cautela/STOP.

Esse é o mesmo tipo de cenário já usado para validar `damage_protection`
no teste de integração do catálogo.

O catálogo continua mockado como vazio no E2E, porque a integração real com
Supabase já é validada separadamente por:

```powershell
.\test-live-analysis.cmd
```

## Aplicar

Extraia este ZIP na raiz do projeto e substitua apenas:

```text
e2e/site.spec.ts
```

Depois:

```powershell
.\test-e2e.cmd
```

Se passar:

```powershell
npm test
npm run build
.\test-live-analysis.cmd
.\test-e2e.cmd
```
