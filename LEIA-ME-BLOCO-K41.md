# BLOCO K.4.1 — site.spec.ts limpo

O K4 anterior tinha a correção lógica correta, mas o arquivo no projeto ficou com erro de sintaxe.

Este pacote substitui o `e2e/site.spec.ts` inteiro por uma versão limpa e compacta.

## Aplicar

Extraia na raiz do projeto e substitua:

```text
e2e/site.spec.ts
```

Primeiro valide a sintaxe/listagem:

```powershell
npx playwright test --list
```

Se listar 8 testes (4 cenários x desktop/mobile), rode:

```powershell
.\test-e2e.cmd
```

Não altera nenhum arquivo da aplicação.
