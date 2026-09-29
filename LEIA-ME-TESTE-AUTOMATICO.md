# Teste automático ao vivo — Minha Cabeleira

Este teste valida a integração real entre o Supabase e o motor sem exigir que você responda manualmente o questionário.

```text
Supabase real
→ catálogo público
→ 22 respostas automáticas
→ motor de análise
→ recomendações técnicas
→ rotina-base por categoria
→ ordenação por menor preço
```

## Como executar

Com o `.env.local` configurado para o Supabase, na raiz do projeto:

```powershell
.\test-live-analysis.cmd
```

Também é possível dar duplo clique no arquivo no Windows.

## O que o teste exige do catálogo

O catálogo público precisa ter, no mínimo:

- 3 shampoos;
- 3 condicionadores;
- 3 máscaras/tratamentos;
- 3 finalizadores/leave-ins;
- 3 óleos/séruns;
- 2 produtos de couro cabeludo, com cobertura de ressecamento e oleosidade.

O teste também confere que os produtos do lote editorial mais recente chegaram ao Supabase e que as listas de uma recomendação continuam ordenadas pelo menor preço quando essa preferência é selecionada.

## Cenário automático

A simulação usa:

- quebra alta;
- histórico de dano severo;
- objetivo de reduzir quebra;
- rotina equilibrada;
- prioridade para menor preço;
- oleosidade e ressecamento do couro cabeludo marcados como ausentes;
- sinais de segurança sem alerta.

O resultado precisa permanecer válido, com segurança `normal`, recomendação de proteção contra danos e todas as cinco categorias-base preenchidas.

## Importante

Este é um teste de integração ao vivo: ele consulta o Supabase real. Se produtos forem pausados, excluídos ou ficarem sem os dados necessários para a política pública do banco, o teste deve falhar. Isso é intencional.

Os testes unitários (`npm test`) continuam independentes do Supabase.
