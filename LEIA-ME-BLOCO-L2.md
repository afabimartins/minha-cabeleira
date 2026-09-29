# BLOCO L.2 — ícones dos cards da Home

Substitui os quatro caracteres Unicode dos cards da Home por ícones vetoriais
minimalistas e consistentes, sem instalar biblioteca adicional.

## Ícones

- Análise personalizada → checklist
- Tipos de cabelo → ondas/textura
- Prioridades da rotina → relógio/rotina
- Produtos compatíveis → frasco

Todos são SVG inline, com:
- mesmo peso de traço;
- mesmo tamanho;
- sem dependência de fonte;
- cores da identidade do Minha Cabeleira;
- boa renderização em desktop e mobile.

## Aplicar

Extraia na raiz:

```text
C:\Users\Profissional\Projects\minha-cabeleira
```

Substitua:

```text
src\App\HomePage.tsx
src\App\styles.css
```

## Conferir

```powershell
npm run dev
```

Olhe o bloco de quatro cards abaixo do hero.

Se estiver aprovado:

```powershell
npm test
npm run build
.\test-e2e.cmd
```

Depois:

```powershell
git add .
git status
git commit -m "fix: refine home feature icons"
git status
```

Confirme que `.env.local` não está staged.
