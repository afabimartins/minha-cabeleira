# Minha Cabeleira — Bloco F

## O que muda

- Remove os produtos fictícios do catálogo público.
- A análise passa a carregar produtos ativos de uma fonte de dados externa ao código.
- Adiciona `/admin` para cadastrar, editar, pausar e excluir produtos.
- Mantém um modo local apenas para desenvolvimento, usando `localStorage`, para testar o painel antes do Supabase.
- Prepara Supabase Auth + REST + RLS sem instalar dependência nova.
- Produtos cadastrados podem guardar marca, nome, categoria, tamanho, preço, varejista, URL, lista INCI, atributos técnicos, fonte, data de verificação e tipo de link.
- O resultado passa a mostrar varejista e botão “Ver produto” quando houver URL.
- Links afiliados e conteúdo patrocinado ficam explicitamente identificados.
- Aplica a logo refinada mais recente em `src/assets/minha-cabeleira-logo-mark.png`.

## Aplicação rápida

Extraia este ZIP na raiz do projeto e permita substituir os arquivos.

Depois:

```powershell
npm run dev
```

Abra:

```text
http://localhost:5173/admin
```

Sem Supabase configurado, o painel entra em **modo local de desenvolvimento**. Os registros ficam somente naquele navegador. Isso serve para validar o fluxo, não para produção.

## Configuração do Supabase

1. Crie/abra o projeto no Supabase.
2. Execute `supabase/products.sql` no SQL Editor.
3. Em Authentication > Users, crie a conta da administradora.
4. Copie o UUID da usuária e execute no SQL Editor:

```sql
insert into public.profiles (user_id, role, display_name)
values ('UUID-DA-USUARIA', 'admin', 'Administradora');
```

5. Copie `.env.example` para `.env.local` e preencha:

```env
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=SUA_CHAVE_PUBLICAVEL
```

6. Reinicie `npm run dev`.

> Nunca coloque `service_role`, secret key ou senha administrativa em variáveis `VITE_*`. O navegador usa somente a chave publicável; a autorização de escrita é feita pelo token da usuária autenticada + RLS.

## Fluxo de produtos

```text
Admin cadastra produto real
        ↓
produto ativo + atributos técnicos
        ↓
questionário termina
        ↓
catálogo ativo é carregado
        ↓
motor técnico seleciona apenas compatíveis
        ↓
preferências de preço/rotina ordenam o resultado
```

Se o catálogo estiver vazio ou temporariamente indisponível, a análise continua funcionando e mantém as orientações de fórmula/ingredientes.

## Produtos reais

Este bloco propositalmente **não inventa produtos nem fórmulas**. O catálogo começa vazio. O passo seguinte é pesquisar e cadastrar os primeiros produtos reais com fonte, composição e data de verificação.

Os produtos fictícios permanecem somente nas fixtures dos testes automatizados, onde são úteis e estáveis.
