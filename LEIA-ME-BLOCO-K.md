# BLOCO K — PUBLICAÇÃO, ADSENSE, SEO, PRIVACIDADE E PLAYWRIGHT

Este bloco fecha a primeira versão técnica do Minha Cabeleira sem mexer na lógica capilar aprovada.

## O que entra

- infraestrutura para Google AdSense;
- anúncios manuais e identificados como `Publicidade`;
- **nenhum anúncio manual dentro do questionário ou resultado**;
- carregamento do AdSense somente em páginas elegíveis;
- página `/privacidade`;
- link de privacidade no rodapé;
- integração preparada para a CMP / “Privacidade e mensagens” do Google;
- link de revogação “Configurações de privacidade e cookies” quando o AdSense estiver ativo;
- SEO por rota;
- `noindex` para `/admin`;
- canonical quando `VITE_SITE_URL` for preenchida;
- metadados Open Graph básicos;
- fallback de rotas para hospedagem SPA;
- headers básicos para publicação;
- `robots.txt`;
- preparação de `ads.txt`;
- testes E2E com Playwright;
- teste automatizado de download do PDF;
- teste de ausência de anúncios na análise;
- teste mobile de overflow horizontal.

---

# 1. EXTRAIR

Extraia este ZIP na raiz:

```text
C:\Users\Profissional\Projects\minha-cabeleira
```

Permita substituir os arquivos existentes.

Este bloco **não altera o Supabase** e não exige SQL novo.

---

# 2. INSTALAR PLAYWRIGHT

Uma única vez:

```powershell
npm install -D @playwright/test
npx playwright install chromium
```

---

# 3. NÃO ATIVAR ADSENSE AINDA

O `.env.example` agora possui as variáveis do AdSense.

No seu `.env.local`, por enquanto, mantenha:

```env
VITE_ADSENSE_ENABLED=false
VITE_ADSENSE_PREVIEW=false
```

Assim nenhum anúncio real é carregado.

Se quiser apenas visualizar os espaços localmente:

```env
VITE_ADSENSE_PREVIEW=true
```

Isso mostra **placeholders**, não publicidade real.

---

# 4. COMO VAMOS ATIVAR O ADSENSE DEPOIS

Quando a conta/site forem aprovados:

1. No Google AdSense, crie blocos de anúncio **manuais**.
2. Mantenha **Auto ads desativado inicialmente** para preservar o controle sobre o questionário e o resultado.
3. Copie o ID `ca-pub-...` para:

```env
VITE_ADSENSE_CLIENT=
```

4. Copie os IDs numéricos dos blocos para:

```env
VITE_ADSENSE_SLOT_HOME_CONTENT=
VITE_ADSENSE_SLOT_GLOSSARY_LIST=
VITE_ADSENSE_SLOT_GLOSSARY_ENTRY=
VITE_ADSENSE_SLOT_ABOUT_CONTENT=
```

5. Só então:

```env
VITE_ADSENSE_ENABLED=true
```

6. No AdSense, configure **Privacidade e mensagens** / CMP do Google antes de atender tráfego nas regiões em que a plataforma exige consentimento.

7. Depois que o AdSense fornecer a entrada oficial de `ads.txt`, crie:

```text
public/ads.txt
```

e copie **exatamente** a linha fornecida na conta.

Não renomeie `ads.txt.example` para `ads.txt` enquanto os dados reais não existirem.

---

# 5. URL FINAL E CONTATO

Quando souber o domínio:

```env
VITE_SITE_URL=https://SEU-DOMINIO
```

E antes da publicação comercial, configure um e-mail público:

```env
VITE_PRIVACY_CONTACT_EMAIL=contato@SEU-DOMINIO
```

---

# 6. TESTE VISUAL

Rode:

```powershell
npm run dev
```

Confira:

- `/`
- `/analise`
- `/glossario`
- `/glossario/porosidade-capilar` (ou qualquer verbete válido)
- `/sobre`
- `/privacidade`
- `/admin`

O questionário e o resultado não devem exibir `.ad-slot`.

---

# 7. TESTE E2E

Depois:

```powershell
.\test-e2e.cmd
```

O Playwright verifica:

- Home;
- Glossário;
- busca por “porosidade”;
- Privacidade;
- questionário;
- ausência de anúncios na análise;
- conclusão automática das 20 perguntas;
- geração/download do PDF;
- overflow horizontal no mobile.

---

# 8. VALIDAÇÃO FINAL

Quando tudo estiver visualmente certo:

```powershell
npm test
npm run build
.\test-live-analysis.cmd
.\test-e2e.cmd
```

---

# 9. COMMIT

Se tudo passar:

```powershell
git add .
git status
git commit -m "feat: prepare site for adsense seo privacy and e2e"
git status
```

Antes do commit, confirme novamente que `.env.local` NÃO está staged.

---

# Observação importante sobre publicidade

Os espaços de publicidade são componentes separados do catálogo e da análise.

A presença de um anúncio, anunciante, remuneração ou posição de publicidade não participa da seleção técnica de produto.

Isso preserva a separação entre:

```text
ANÁLISE TÉCNICA
↓
ORIENTAÇÃO
↓
PRODUTOS COMPATÍVEIS (opcional)

------------------------------

PUBLICIDADE — GOOGLE ADSENSE
```
