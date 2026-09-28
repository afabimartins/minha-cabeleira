# BLOCO J — SUPABASE STORAGE + IMAGENS REAIS DOS PRODUTOS

Este bloco parte do Bloco I e preserva a Home aprovada no J0.2.

## O que entra

- bucket público `product-images` no Supabase Storage;
- RLS: somente administradoras podem enviar, substituir e remover arquivos;
- upload direto pelo `/admin`;
- JPG, PNG e WEBP;
- limite de 5 MB;
- caminho estável por produto: `products/<id>/cover`;
- substituição sem acumular várias versões do mesmo produto;
- botão para remover imagem;
- preview antes de salvar;
- miniaturas na lista do Admin;
- registro opcional da fonte e do crédito/licença da imagem;
- `image_path`, `image_source_url` e `image_credit` no banco;
- imagem real nos cards da análise;
- fallback visual quando ainda não houver foto;
- refinamento responsivo dos cards de produto.

## Importante

A imagem NÃO participa da lógica técnica da recomendação.

Um produto continua sendo selecionado pelos critérios de formulação/atributos e pelas regras da análise. A fotografia é apresentação do catálogo.

Também não transformamos imagem em requisito de publicação neste momento, para que os quatro produtos reais já cadastrados não desapareçam enquanto as fotos são adicionadas.

---

# PASSO 1 — SUPABASE

Abra:

Supabase > SQL Editor

e execute:

```text
supabase/004_product_images_storage.sql
```

O resultado esperado é:

```text
Success. No rows returned
```

O script pode ser executado novamente sem recriar colunas ou bucket.

---

# PASSO 2 — CÓDIGO

Extraia este ZIP na raiz:

```text
C:\Users\Profissional\Projects\minha-cabeleira
```

e permita substituir os arquivos.

Arquivos alterados:

```text
src/App/AdminPage.tsx
src/App/catalog-product.ts
src/App/product-store.ts
src/App/AnalysisResultView.tsx
src/App/styles.css
```

Arquivo novo:

```text
supabase/004_product_images_storage.sql
```

Nenhuma variável nova precisa ser adicionada ao `.env.local`.

---

# PASSO 3 — TESTE

Rode:

```powershell
npm run dev
```

Abra:

```text
/admin
```

1. Entre com a conta administrativa.
2. Abra um produto.
3. Em "Imagem do produto", clique em "Escolher imagem".
4. Escolha JPG, PNG ou WEBP com até 5 MB.
5. Confira a prévia.
6. Preencha a fonte/crédito se houver.
7. Clique em "Salvar produto".
8. Abra outro produto e volte ao anterior para confirmar que a imagem permaneceu.
9. Troque a imagem e salve novamente.
10. Teste "Remover" e salve.

Depois faça uma análise que retorne um desses produtos. A foto deve aparecer no card.

---

# PASSO 4 — VALIDAÇÃO DO PROJETO

Depois que o fluxo visual estiver correto:

```powershell
npm test
npm run build
.\test-live-analysis.cmd
```

Se tudo passar, fazemos o commit do Bloco J.

---

# Por que o bucket é público?

As imagens dos produtos são conteúdo público do catálogo. O arquivo precisa aparecer para visitantes sem exigir login.

A escrita continua protegida: upload, substituição e exclusão dependem da sessão administrativa e das políticas RLS.

---

# Próximo bloco

Bloco K:

- AdSense com componente `AdSlot`;
- consentimento/cookies e privacidade;
- SEO;
- responsividade final;
- Playwright;
- PDF final;
- preparação de publicação.
