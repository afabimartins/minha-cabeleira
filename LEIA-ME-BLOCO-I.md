# Minha Cabeleira — Bloco I
## Supabase + Admin de produção + primeiro lote de produtos reais

Este bloco parte do H.1 aprovado. Ele **não altera a Home, a logo, o Glossário nem a lógica técnica da análise**.

## O que muda

- O Admin passa a estar pronto para uso real com Supabase Auth + RLS.
- Sessões administrativas podem ser renovadas com refresh token.
- Uma pessoa autenticada só entra no Admin se também tiver `role = admin` em `profiles`.
- Produtos novos começam como **Pausados**.
- Um produto só pode ser ativado se tiver, no mínimo:
  - fonte técnica;
  - data de verificação;
  - URL real do produto;
  - lista de ingredientes / INCI;
  - ao menos um atributo técnico de compatibilidade.
- Se houver preço, o Admin também exige varejista e data de verificação do preço.
- O catálogo público só lê produtos ativos e efetivamente verificados.
- Cards de produto no resultado passam a aceitar:
  - imagem;
  - tamanho;
  - preço;
  - varejista;
  - data de verificação;
  - link real.
- Se não houver imagem, o card usa um placeholder limpo — não fazemos hotlink automático em imagem de loja.

## Arquivos deste bloco

```text
.env.example
src/App/AdminPage.tsx
src/App/AnalysisResultView.tsx
src/App/catalog-product.ts
src/App/product-store.ts
src/App/styles.css
supabase/001_catalog.sql
supabase/002_promote_admin.sql
supabase/003_seed_real_products.sql
```

---

# Configuração do Supabase

## 1. Crie o projeto

No painel do Supabase, crie o projeto `Minha Cabeleira`.

## 2. Rode a estrutura do banco

Abra **SQL Editor** e execute:

```text
supabase/001_catalog.sql
```

Esse arquivo cria:

- `profiles`;
- `products`;
- índices;
- atualização automática de `updated_at`;
- RLS;
- políticas públicas e administrativas.

## 3. Crie a administradora

No Supabase:

```text
Authentication > Users > Add user
```

Crie a conta com o e-mail que deverá administrar o catálogo.

Copie o UUID dessa usuária.

Depois abra:

```text
supabase/002_promote_admin.sql
```

Substitua:

```text
SUBSTITUA-PELO-UUID-DA-USUARIA
```

pelo UUID real e execute.

Para adicionar outra administradora no futuro, faça exatamente o mesmo com outro usuário/UUID. **Não compartilhe senha.**

## 4. Configure o frontend

Copie:

```text
.env.example
```

para:

```text
.env.local
```

Preencha:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Use apenas a **publishable/anon key** no navegador.

**Nunca coloque `service_role` ou secret key em `VITE_*`.**

Reinicie o Vite depois de salvar o `.env.local`.

## 5. Teste o login

Abra:

```text
http://localhost:5173/admin
```

Agora o selo no topo deve mostrar o e-mail da administradora, e não `Local`.

---

# Primeiro lote de produtos reais

O arquivo:

```text
supabase/003_seed_real_products.sql
```

insere um pequeno lote inicial real, verificado em **27/09/2026**.

A intenção é testar o fluxo completo sem transformar marcas em critério técnico.

Produtos iniciais:

1. Vult — Leave-In Spray Cabelos Choque de Reconstrução 100 ml
2. Salon Line — Creme para Pentear Definição Intensa 1 kg
3. Seda — Creme para Pentear Boom Definição Intensa 350 ml
4. Elseve — Creme Milagroso 3 em 1 Reparação Total 5 500 ml

## Fontes técnicas e comerciais usadas no seed

### Vult — Choque de Reconstrução
Fonte técnica e produto:
https://www.vult.com.br/produto/leavein-spray-vult-cabelos-choque-de-reconstrucao-100ml

Preço de referência em 27/09/2026: **R$ 20,90** no site da Vult.

### Salon Line — Definição Intensa 1 kg
Produto, composição e preço de referência:
https://www.drogaraia.com.br/salon-line-creme-para-pentear-definicao-intensa-1kg.html

Preço observado em 27/09/2026: **R$ 39,99**.

### Seda Boom — Definição Intensa 350 ml
Composição oficial Unilever:
https://www.ingredientesunilever.com.br/p/sedaboom-cremeparapenteardefinicaointensa350ml-2023.html/17891150088399

Produto/preço:
https://www.drogaraia.com.br/seda-boom-creme-para-pentear-definicao-intensa-350ml.html

Preço observado em 27/09/2026: **R$ 11,19**.

### Elseve — Reparação Total 5 Creme Milagroso 3 em 1 500 ml
Composição/fonte técnica:
https://www.loreal-paris.com.br/elseve/reparacao-total-5/creme-milagroso-3-em-1

Produto/preço:
https://www.drogaraia.com.br/elseve-creme-milagroso-3-em-1-reparacao-total-5-500ml-1001534.html

Preço observado em 27/09/2026: **R$ 42,99**.

---

# Sobre os atributos técnicos

O seed usa apenas os atributos já existentes no motor:

```text
conditioning
conditioning_support
moisture_support
damage_support
```

Eles servem para filtrar produtos depois que a recomendação técnica já foi definida.

Fluxo:

```text
respostas
→ achados
→ recomendação técnica
→ critérios de produto
→ catálogo real
→ produtos compatíveis
→ ordenação/personalização
```

A marca não participa da decisão.

---

# Imagens dos produtos

O seed deixa `image_url = null` de propósito.

Isso evita depender de hotlink de lojas ou usar imagens sem uma estratégia clara de permissão/licença. O Admin já aceita `URL da imagem`.

Para produção, prefira:

1. imagem fornecida oficialmente pela marca com permissão de uso; ou
2. imagem armazenada pelo próprio projeto em um bucket do Supabase Storage, quando tivermos definido a política de mídia.

---

# Como aplicar este ZIP

Extraia na raiz do projeto e permita substituir os arquivos.

Depois rode:

```powershell
npm run dev
```

Primeiro teste o Admin ainda em modo local. Depois configure o Supabase e repita.

Quando o Supabase estiver funcionando, execute o seed e faça uma análise que gere `conditioning_support`, `moisture_support` ou `damage_protection` para conferir os produtos reais no resultado.

---

# Validação antes do próximo bloco

Depois da configuração:

```powershell
npm test
npm run build
```

O próximo bloco recomendado é o **Bloco J — fechamento para publicação**:

- responsividade final;
- PDF com produtos reais e metadados de verificação;
- revisão de estados `normal/caution/stop`;
- Storage para imagens de produtos;
- revisão de acessibilidade;
- build final e preparação para deploy.
