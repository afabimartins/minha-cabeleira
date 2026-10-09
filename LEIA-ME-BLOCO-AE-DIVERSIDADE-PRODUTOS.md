# Bloco AE — Diversidade de marcas e ordem das recomendações

## O que muda

1. Cada categoria da rotina passa a oferecer **até 3 opções de produto**.
2. As opções da mesma categoria são selecionadas com **marcas diferentes** sempre que o catálogo permitir.
3. A compatibilidade técnica continua sendo o primeiro critério. Dentro da mesma categoria, o motor não repete uma marca se houver alternativa de outra marca.
4. As etiquetas ficam mais neutras: "Correspondência alta", "Correspondência parcial" e "Opção básica da categoria".
5. A interface deixa de mostrar produtos duas vezes.
6. A ordem passa a ser:
   - diagnóstico/segurança;
   - prioridades e ativos/ingredientes;
   - **um único bloco final de produtos recomendados**, sempre visível.
7. O PDF passa a seguir a mesma lógica: ativos primeiro, produtos depois, sem duplicação.
8. Para couro cabeludo, um produto de ressecamento não é usado como fallback para oleosidade (e vice-versa).

## Quantidade esperada

A rotina-base possui 5 categorias centrais:

- Shampoo
- Condicionador
- Máscara / tratamento
- Finalizador / creme / leave-in
- Óleo / sérum

Com 3 marcas por categoria, um resultado normal pode exibir **até 15 produtos**.

Quando houver uma necessidade específica de couro cabeludo, a categoria de tratamento do couro cabeludo é acrescentada e o total pode chegar a **18 opções**.

## Situação atual do catálogo (antes de novos cadastros)

| Categoria | Marcas ativas | Meta | Lacuna |
|---|---:|---:|---:|
| Shampoo | 2 | 3 | +1 marca |
| Condicionador | 2 | 3 | +1 marca |
| Máscara / tratamento | 2 | 3 | +1 marca |
| Finalizador / creme / leave-in | 3 | 3 | OK |
| Óleo / sérum | 3 | 3 | OK |
| Couro cabeludo — ressecamento | 1 | 3 | +2 marcas |
| Couro cabeludo — oleosidade | 0 | 3 | +3 marcas |

A meta de 3 marcas é um **piso**, não um teto. Para reduzir a predominância atual de Vult, Seda e Elseve, os próximos cadastros devem priorizar marcas ainda pouco ou nada representadas no catálogo.

## Testes adicionados/atualizados

- `routine-product-selection.test.ts`: verifica seleção de até 3 marcas diferentes por categoria.
- O mesmo teste impede que um produto de couro cabeludo destinado apenas a ressecamento seja sugerido para oleosidade.
- `e2e/site.spec.ts`: verifica que existe somente um bloco final de produtos e que não há mais botão "Ver produtos compatíveis" escondendo uma segunda lista.

## Como aplicar

Na raiz do projeto:

```powershell
& "CAMINHO\PARA\minha-cabeleira-bloco-ae\aplicar-bloco-ae.cmd"
```

Ou passe explicitamente a pasta do projeto:

```powershell
& "CAMINHO\PARA\minha-cabeleira-bloco-ae\aplicar-bloco-ae.cmd" "C:\Users\Profissional\Projects\minha-cabeleira"
```

Depois rode:

```powershell
npm test
npm run build
```

**Não faça deploy deste bloco ainda.** Primeiro vamos completar a diversidade do catálogo e validar os ~15 produtos por resultado localmente.
