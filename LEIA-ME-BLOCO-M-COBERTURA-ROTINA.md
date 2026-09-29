# Bloco M — cobertura de recomendações por categoria

Este bloco altera a camada de produtos para que uma análise segura tenha uma rotina-base com pelo menos uma indicação em cada categoria essencial:

- shampoo;
- condicionador;
- máscara / tratamento;
- finalizador / leave-in;
- óleo / sérum.

Cuidado específico do couro cabeludo continua opcional e só entra quando existir uma observação própria de necessidade do couro cabeludo. Sinais de segurança continuam prevalecendo: quando `canRecommendProducts` for `false`, nenhum produto é sugerido.

## Como o fallback funciona

A seleção é feita categoria por categoria:

1. **Melhor correspondência** — atende a todos os atributos técnicos pedidos pelas recomendações ativas.
2. **Compatível** — atende a parte dos atributos técnicos, preservando todas as exclusões.
3. **Opção básica** — mantém a categoria coberta quando não há correspondência técnica suficiente.
4. **Catálogo incompleto** — aparece apenas quando não existe nenhum produto ativo/verificado naquela categoria; o motor não inventa um item.

`excludedAttributes` e `excludedIngredients` são tratados como restrições duras e nunca são relaxados pelo fallback.

Para `budget_priority = lowest_price`, o menor preço decide entre produtos do mesmo nível de compatibilidade. A compatibilidade técnica continua vindo antes do preço.

## Rotina mínima

`routine_complexity = minimal` não significa mais “um produto total”. Agora significa **no máximo um produto por categoria** dentro das listas personalizadas, escolhendo o item que cobre mais necessidades e, em empate, o mais barato.

## Banco de dados

Execute no SQL Editor do Supabase, depois dos scripts anteriores:

```text
supabase/005_routine_category_coverage.sql
```

Esse arquivo acrescenta cobertura inicial real para shampoo, condicionador, máscara e óleo. O leave-in já existia no lote anterior.

Depois de executar a migration, rode:

```text
test-live-analysis.cmd
```

O teste ao vivo passa a verificar também se todas as categorias-base estão cobertas.

## Testes adicionados

Arquivo:

```text
src/domain/routine-product-selection.test.ts
```

Ele verifica:

- cobertura das cinco categorias mesmo quando não há achado diagnóstico específico;
- níveis `exact`, `compatible`, `basic` e `missing`;
- prioridade de menor preço dentro do mesmo nível de compatibilidade;
- preservação das exclusões;
- inclusão opcional de cuidado do couro cabeludo;
- 432 combinações de recomendações, objetivo, rotina e orçamento.

## Validação feita neste bloco

- `tsc --noEmit`: passou.
- teste funcional compilado do motor: 432 combinações passaram.
- cenário seguro sem achados específicos: cinco categorias cobertas.
- cenário `caution`: produtos continuam bloqueados.

O Vitest não pôde ser executado dentro do ambiente Linux usado para preparar este ZIP porque o `node_modules` recebido veio com o binding nativo do Rolldown para Windows. Os testes Vitest foram preservados/adicionados e devem rodar normalmente no ambiente Windows do projeto com `npm test`.
