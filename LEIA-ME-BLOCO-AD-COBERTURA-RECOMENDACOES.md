# Bloco AD — cobertura de orientações e recomendações

Este bloco corrige uma lacuna do motor de análise: uma combinação válida e segura de respostas podia terminar sem nenhuma recomendação específica e, por consequência, sem a seção “O que procurar na fórmula”.

Na lógica anterior, somente três padrões geravam recomendação específica: condicionamento forte, risco elevado de dano e baixa retenção de umidade. Considerando apenas as oito perguntas que alimentavam esses três padrões, **24.570 de 27.648 combinações possíveis (88,87%)** não ativavam nenhuma das três recomendações. As demais perguntas podiam mudar segurança, histórico e preferências, mas não eliminavam essa lacuna de cobertura.

## O que foi corrigido

### 1. Fallback por objetivo, sem transformar objetivo em diagnóstico

Quando a análise está em nível de segurança `normal` e nenhuma regra diagnóstica específica gera recomendação, o motor agora usa a prioridade declarada pela pessoa apenas como camada de personalização.

Há orientação própria para:

- reduzir quebra;
- melhorar maciez;
- controlar frizz;
- melhorar definição;
- manter comprimento e reduzir perdas;
- simplificar a rotina.

Essas recomendações têm `basedOnFindings: []` e textos explícitos de que a preferência não representa diagnóstico.

### 2. Achados que antes ficavam sem recomendação

Agora há recomendações associadas a:

- exposição frequente ao calor → `heat_protection`;
- exposição química frequente/intensa → `chemical_process_care`.

### 3. Necessidades do couro cabeludo

As duas perguntas já existentes de oleosidade e ressecamento agora geram achados e orientação de fórmula quando a resposta indica necessidade cosmética:

- `scalp_oiliness_need` → `scalp_oiliness_support`;
- `scalp_dryness_need` → `scalp_dryness_support`.

A camada de segurança continua independente e prevalece. Resultados `caution` e `stop` continuam bloqueando produtos.

### 4. Cobertura de produtos

A rotina-base continua selecionando as cinco categorias essenciais:

- shampoo;
- condicionador;
- máscara/tratamento;
- finalizador/leave-in;
- óleo/sérum.

Cuidado de couro cabeludo entra quando a resposta indica oleosidade ou ressecamento.

O tônico Match. Agente Antioleosidade continua pausado. Portanto, um resultado de oleosidade pode mostrar a orientação de fórmula sem apresentar um produto específico de couro cabeludo até que seja encontrado um item afiliável adequado.

## Teste de regressão

Foi adicionado:

```text
src/App/recommendation-coverage.test.ts
```

Ele cobre:

- 54 combinações de objetivo × complexidade da rotina × prioridade de preço em um perfil seguro sem achado diagnóstico específico;
- 128 combinações equivalentes dos sete grupos de necessidades atualmente suportados;
- preservação do bloqueio de produtos para `caution` e `stop`.

## Verificações realizadas na preparação do bloco

- `tsc --noEmit`: passou.
- compilação isolada do motor com TypeScript: passou.
- auditoria executável das 54 combinações de preferências: passou.
- auditoria executável das 128 combinações de necessidades: passou.
- cenários `caution` e `stop`: passaram.

O `node_modules` do ZIP foi instalado no Windows e não possui o binding Linux do Rolldown; por isso o Vitest completo não é executável neste ambiente Linux sem reinstalar dependências. No Windows do projeto, rode normalmente:

```powershell
npm test
```

Depois:

```powershell
npm run build
```

## Banco de dados

Foi adicionado também:

```text
supabase/008_mercado_livre_affiliate_links.sql
```

Ele documenta no código-fonte os 16 links de afiliado do Mercado Livre já gravados no Supabase e mantém o produto Match. temporariamente pausado.

**No projeto atual, não é necessário executar esse SQL agora**, porque essas alterações já foram aplicadas diretamente no Supabase. O arquivo existe para que uma instalação futura/recriação do banco reproduza o estado atual.
