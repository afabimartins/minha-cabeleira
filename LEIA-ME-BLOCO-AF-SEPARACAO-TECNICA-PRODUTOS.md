# Bloco AF — Separação entre orientação técnica e produtos

## Objetivo

Corrigir a duplicação das indicações comerciais e garantir a ordem editorial do Minha Cabeleira:

1. diagnóstico e segurança;
2. prioridades técnicas;
3. tipos de ingredientes e exemplos INCI para procurar no rótulo;
4. somente depois, um único bloco de produtos compatíveis.

## O que muda

- Remove a primeira lista comercial de produtos da área técnica da análise.
- Remove a segunda renderização por recomendação que fazia os produtos aparecerem de novo.
- Mantém um único bloco final, sempre depois das orientações de fórmula.
- O bloco final passa a se chamar **Produtos compatíveis por categoria** no site e **PRODUTOS COMPATÍVEIS - CONSULTA OPCIONAL** no PDF.
- Cada categoria pode exibir até 3 opções de marcas diferentes quando o catálogo tiver cobertura suficiente.
- Quando faltarem marcas, o site informa a lacuna em vez de repetir a mesma marca para preencher artificialmente a meta.
- A compatibilidade técnica continua sendo o primeiro critério; marca não determina a recomendação.
- O PDF segue exatamente a mesma ordem: orientação técnica primeiro, produtos depois.

## Arquivos completos incluídos

- `src/App/AnalysisResultView.tsx`
- `src/App/analysis-pdf.ts`
- `src/App/styles.css`
- `src/domain/analysis-result.ts`
- `src/domain/routine-product-selection.ts`
- `src/domain/routine-product-selection.test.ts`
- `e2e/site.spec.ts`

## Como aplicar

Na raiz do projeto, execute o `.cmd` deste bloco passando a pasta do projeto, por exemplo:

```powershell
& "C:\CAMINHO\minha-cabeleira-bloco-af\aplicar-bloco-af.cmd" "C:\CAMINHO\minha-cabeleira"
```

Depois, dentro da pasta do projeto:

```powershell
npm test
npm run build
```

Se os dois comandos passarem, abra o site localmente e confirme uma análise completa e o PDF antes do deploy.

## O que validar visualmente

Na tela e no PDF, antes do primeiro nome de produto devem aparecer as prioridades técnicas e o bloco **O que procurar na fórmula**, com tipos de ingredientes e exemplos no rótulo.

Os nomes de marcas, preços e links devem aparecer somente no bloco final de **Produtos compatíveis**.
