# Teste automático — Minha Cabeleira

Este pequeno bloco substitui o teste manual de preencher as 20 perguntas para confirmar o fluxo:

```text
Supabase real
→ catálogo público
→ 20 respostas automáticas
→ motor de análise
→ damage_protection
→ produtos compatíveis
→ ordenação por menor preço
```

## Arquivos

```text
src/App/live-catalog-analysis.test.ts
test-live-analysis.cmd
```

## Como instalar

Extraia o ZIP na raiz do projeto `minha-cabeleira`, permitindo adicionar os arquivos.

Ele não substitui nenhum arquivo atual do site.

## Como executar

Com o `.env.local` já configurado para o Supabase, na raiz do projeto:

```powershell
.\test-live-analysis.cmd
```

Você também pode dar duplo clique em `test-live-analysis.cmd`.

Não é necessário preencher o questionário no navegador.

## O que o teste confere

O cenário automático responde:

- quebra: alta;
- histórico de dano: severo;
- objetivo: reduzir quebra;
- rotina: equilibrada;
- orçamento: menor preço;
- sinais de segurança: sem alerta;
- demais respostas: escolhidas para não disparar outras prioridades desnecessariamente.

O teste exige:

1. que o frontend esteja usando Supabase, não o catálogo local;
2. que existam produtos públicos ativos/verificados;
3. que Vult Choque de Reconstrução e Elseve Reparação Total 5 estejam no catálogo;
4. que a análise seja válida;
5. que a segurança fique em `normal`;
6. que a recomendação `damage_protection` seja criada;
7. que os dois produtos `damage_support` sejam selecionados;
8. que apareçam na ordem de menor preço:
   - Vult — R$ 20,90
   - Elseve — R$ 42,99

## Importante

Este é um **teste de integração ao vivo**: ele consulta o seu Supabase real. Se você editar, pausar, excluir ou mudar o preço desses produtos, o teste poderá falhar — e isso é proposital, porque ele serve para detectar quando o catálogo real deixa de corresponder ao cenário esperado.

Os testes unitários normais (`npm test`) continuam independentes da internet e não devem depender do Supabase.

## Depois

Quando entrarmos no fechamento do projeto, vale acrescentar uma segunda camada com Playwright para testar também o navegador:

```text
abrir /analise
→ preencher automaticamente
→ clicar
→ conferir o resultado visual
```

Por enquanto, este teste elimina a parte cansativa do preenchimento manual e valida a integração mais importante.
