# Minha Cabeleira — Bloco G

Este bloco corrige dois pontos observados após o Bloco F.

## 1. Home

A Home passa a usar a composição visual aprovada como referência:

- hero maior e mais vivo;
- mechas em destaque ocupando a área direita;
- questionário sobreposto às mechas;
- CTA principal + “Como funciona”;
- benefícios rápidos abaixo da chamada;
- quatro cards logo na primeira dobra:
  - Análise personalizada;
  - Tipos de cabelo;
  - Prioridades da rotina;
  - Produtos compatíveis.

O arquivo `hero-hair.png` acompanha o bloco para garantir que a Home não dependa de uma versão antiga do asset.

## 2. Análises sem prioridade

Uma análise válida não termina mais com apenas “Ainda não há uma recomendação específica”.

Quando o motor não encontra evidência suficiente para uma recomendação técnica específica, a interface mostra uma **Prioridade inicial** conservadora e contextual.

Exemplos:

- exposição ao calor: orientação de redução de desgaste durante o uso térmico;
- exposição química: evitar sobreposição desnecessária de processos;
- cautela no couro cabeludo: segurança primeiro;
- ausência de padrão específico: rotina-base + observação.

Essas orientações não inventam diagnóstico e não forçam produtos. O catálogo continua secundário.

O PDF também recebe a mesma prioridade inicial, evitando relatório “vazio”.

## Como aplicar

Extraia o ZIP na raiz do projeto, permitindo substituir os arquivos.

Depois:

```powershell
npm run dev
```

Teste:

1. `/` — confirmar a nova Home;
2. completar uma análise com poucas evidências técnicas — deve aparecer “Prioridade inicial”;
3. completar uma análise com exposição frequente ao calor e sem dano — deve haver orientação contextual, sem afirmar que existe dano;
4. gerar o PDF e confirmar que a prioridade inicial aparece também no relatório.

Não é necessário alterar o Admin ou o catálogo de produtos neste bloco.
