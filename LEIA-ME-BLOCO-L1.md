# BLOCO L.1 — PDF: NUMERAÇÃO E MARCADORES

Correção visual do PDF sem alterar a lógica da análise, o conteúdo técnico,
as regras de segurança ou a seleção de produtos.

## O que foi corrigido

- `01`, `02`, `03`: círculos grandes substituídos por selos pequenos e arredondados;
- cards de achados: círculo + bolinha removidos;
- segurança: ícone Unicode `✓` / `!` removido;
- marcadores de avisos: substituídos por traços vetoriais;
- lista da “Prioridade inicial”: bullets Unicode substituídos por traços vetoriais;
- textos com travessão em pontos do PDF foram normalizados para hífen ASCII.

A mudança evita o problema visto no PDF em que o símbolo ficava minúsculo,
descentralizado ou parecia um erro de renderização dentro de um círculo grande.

## Aplicar

Extraia na raiz:

```text
C:\Users\Profissional\Projects\minha-cabeleira
```

e substitua:

```text
src\App\analysis-pdf.ts
```

## Teste rápido

```powershell
npm run dev
```

Faça uma análise e baixe um novo PDF.

Você deve ver:

- cabeçalhos de seção com selo pequeno `01 / 02 / 03`;
- uma barra vertical coral nos achados;
- uma barra vertical verde/amarela/vermelha no bloco de segurança;
- nenhum círculo grande com pontinho ou check quebrado.

## Validação

```powershell
npm test
npm run build
.\test-e2e.cmd
```

Se tudo passar:

```powershell
git add .
git status
git commit -m "fix: refine pdf section numbers and markers"
git status
```

Confirme que `.env.local` não está staged.
