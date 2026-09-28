# BLOCO K.1 — correção do Playwright

Os 4 testes que falharam correspondem a 2 testes executados em:
- Chromium desktop;
- Chromium mobile.

A aplicação não falhou. O problema estava no script E2E.

O questionário usa um `input[type="radio"]` visualmente oculto e um controle visual customizado. O Playwright tentava clicar diretamente no input com `check()`, mas o span `.questionnaire-option__control` interceptava o ponteiro.

## Correção

O teste agora seleciona a opção pela interação de teclado:

```ts
await radio.focus();
await page.keyboard.press("Space");
await expect(radio).toBeChecked();
```

Isso também valida que o questionário continua acessível por teclado.

## Aplicar

Extraia este ZIP na raiz e substitua:

```text
e2e/site.spec.ts
```

Depois rode:

```powershell
.\test-e2e.cmd
```

Não é preciso reinstalar Playwright, alterar CSS, Supabase ou o código do questionário.
