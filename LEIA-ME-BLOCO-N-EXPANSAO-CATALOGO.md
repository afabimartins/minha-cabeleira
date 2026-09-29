# Bloco N — expansão do catálogo para o deploy de teste

Este bloco amplia o catálogo de 8 para **17 produtos** e acrescenta duas perguntas que permitem recomendar cuidado específico do couro cabeludo somente quando ele for pertinente.

## Cobertura após a migration

A base passa a ter:

- 3 shampoos;
- 3 condicionadores;
- 3 máscaras/tratamentos;
- 3 finalizadores/leave-ins;
- 3 óleos/séruns;
- 2 cuidados de couro cabeludo.

Os aliases já usados pelo motor continuam valendo:

- `mask` + `treatment` contam como máscara/tratamento;
- `leave_in` + `styler` contam como finalizador/leave-in.

## Novos produtos

### Shampoo

- Vult — Shampoo Cabelos Choque de Reconstrução 350 ml
- Seda — Shampoo Hidratação Diária 325 ml

### Condicionador

- Vult — Condicionador Cabelos Choque de Reconstrução 200 ml
- Seda — Condicionador Ceramidas 325 ml

### Máscara

- Vult — Máscara Reconstrutora Cabelos Choque de Reconstrução 250 g

### Óleo / sérum

- Elseve — Óleo Extraordinário Nutrição 100 ml
- Seda — Sérum + Óleo de Tratamento Toque de Seda 60 ml

### Couro cabeludo

- L'Occitane au Brésil — Sérum Calmante Capilar Patauá+ Cuidado com Couro 50 ml — hidratação/conforto do couro cabeludo
- Match. — Tônico Capilar Antiefeito Rebote Agente Antioleosidade 100 ml — oleosidade

As fontes técnicas e comerciais estão gravadas em `source_url` e `product_url` de cada registro. Preços foram conferidos em 29/09/2026 e devem ser tratados como dados mutáveis. Para ressecamento do couro cabeludo foi priorizado um produto sem restrição explícita de curvatura/tipo de fio. A opção da L'Occitane au Brésil informa hidratação do couro cabeludo e a linha é apresentada para todos os tipos de cabelo, evitando usar como fallback geral uma alternativa voltada especificamente a cabelos cacheados, crespos ou com tranças.

## Mudança no questionário

O questionário passa de 20 para **22 perguntas** com:

1. percepção de oleosidade do couro cabeludo;
2. percepção de ressecamento/descamação seca do couro cabeludo.

Essas perguntas não são tratadas como diagnóstico. Elas apenas determinam se a categoria opcional `scalp` deve entrar na rotina e qual atributo técnico procurar.

Sinais de coceira/sensibilidade, ardor e feridas continuam separados. Se a avaliação de segurança resultar em `caution` ou `stop`, produtos continuam bloqueados.

## Seleção de produtos de couro cabeludo

A fibra e o couro cabeludo agora são pontuados separadamente:

- `scalp_dryness` → procura `scalp_dryness_support`;
- `scalp_oiliness` → procura `scalp_oiliness_support`.

Critérios técnicos do comprimento, como `damage_support`, não são usados para transformar um tônico de couro cabeludo em correspondência de reparação da fibra. Exclusões continuam globais e obrigatórias.

## Aplicação no Supabase

Execute **depois** da migration 005:

```text
supabase/006_catalog_expansion.sql
```

A migration não sobrescreve `image_url` em uma reexecução. Assim, depois que você fizer os uploads das imagens no admin, uma nova execução do script não deve apagá-las.

Depois rode:

```powershell
.\test-live-analysis.cmd
```

## Imagens

Os 9 novos registros entram com imagem vazia. O próximo passo é justamente o que planejamos: fazer upload das imagens licenciadas/próprias pelo painel administrativo e revisar visualmente os cards.

## Validação deste bloco

- TypeScript: sem erros.
- Catálogo de migrations: 17 IDs únicos.
- Cobertura: 3/3/3/3/3 nas cinco categorias-base e 2 em couro cabeludo.
- Teste funcional do seletor: **1.728 combinações** passaram, incluindo ausência de necessidade do couro cabeludo, ressecamento, oleosidade e presença simultânea dos dois sinais.
- Questionário: 22 perguntas.
- PDF: reconhece a categoria “Cuidado do couro cabeludo”.

O Vitest não foi executado neste ambiente Linux porque os binários do `node_modules` original foram instalados no Windows. Os arquivos de teste foram atualizados para execução normal no seu computador.
