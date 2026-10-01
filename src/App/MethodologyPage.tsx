import {
  InternalLink,
} from "./InternalLink";

export function MethodologyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-hero">
        <p>Metodologia</p>

        <h1>
          Como o Minha Cabeleira transforma respostas em prioridades de cuidado.
        </h1>

        <p>
          A análise organiza sinais relatados no questionário, aplica regras de segurança e transforma esse conjunto em orientações de fórmula, rotina e produtos compatíveis. O objetivo é dar contexto — não classificar o cabelo por um rótulo único.
        </p>

        <small>
          Metodologia da versão atual da ferramenta.
        </small>
      </header>

      <div className="privacy-content">
        <section>
          <span>01</span>
          <div>
            <h2>O ponto de partida são as respostas</h2>
            <p>
              O questionário pergunta sobre comportamentos percebidos no cabelo e no couro cabeludo, histórico de química e calor, quebra, retenção de umidade, resposta ao condicionamento, rotina, objetivo principal e preferência de orçamento.
            </p>
            <p>
              Essas respostas são tratadas como observações relatadas pela própria pessoa. Elas não são um diagnóstico e não tentam definir o cabelo por uma categoria rígida de curvatura.
            </p>
          </div>
        </section>

        <section>
          <span>02</span>
          <div>
            <h2>As observações são combinadas em sinais</h2>
            <p>
              O motor procura combinações de respostas que sustentem necessidades como maior suporte de condicionamento, proteção contra danos ou ajuda para retenção de umidade. Uma resposta isolada não decide o resultado inteiro.
            </p>
            <p>
              Quando a evidência disponível não é suficiente para uma conclusão específica, a ferramenta evita transformar incerteza em certeza e mantém a orientação mais geral.
            </p>
          </div>
        </section>

        <section>
          <span>03</span>
          <div>
            <h2>Segurança vem antes da recomendação comercial</h2>
            <p>
              Respostas sobre sensibilidade, ardor, feridas abertas e alterações importantes no couro cabeludo passam por uma etapa de segurança. Dependendo da intensidade relatada, a ferramenta pode exibir cautela ou pausar completamente as sugestões de produtos.
            </p>
            <p>
              Quando isso acontece, a orientação informativa continua disponível, mas o catálogo não é usado para incentivar novos testes de produto naquele momento.
            </p>
          </div>
        </section>

        <section>
          <span>04</span>
          <div>
            <h2>Primeiro vem a função da fórmula</h2>
            <p>
              Cada prioridade produz uma orientação sobre o que procurar na formulação — por exemplo, funções umectantes, condicionantes, emolientes ou formadoras de filme, conforme o sinal observado.
            </p>
            <p>
              Os ingredientes exibidos na análise funcionam como exemplos de rótulo e levam ao <InternalLink to="/glossario">Glossário</InternalLink>, onde a função, as limitações de interpretação e as fontes podem ser consultadas com mais detalhe.
            </p>
          </div>
        </section>

        <section>
          <span>05</span>
          <div>
            <h2>Produtos são uma camada opcional</h2>
            <p>
              Depois da orientação técnica, o sistema procura no catálogo produtos ativos que atendam aos critérios daquela recomendação. A marca não determina a recomendação, e um produto pausado ou incompatível deixa de participar da seleção.
            </p>
            <p>
              Se nenhum item do catálogo atual atender aos critérios, a orientação de fórmula continua válida. A ausência de um produto não muda a necessidade técnica identificada.
            </p>
          </div>
        </section>

        <section>
          <span>06</span>
          <div>
            <h2>Preferências personalizam sem derrubar critérios de segurança</h2>
            <p>
              O objetivo principal pode reorganizar a ordem das prioridades. A preferência por rotina mínima reduz a quantidade de opções exibidas, enquanto a preferência por menor preço pode ordenar produtos compatíveis do mais barato para o mais caro.
            </p>
            <p>
              Essas preferências não tornam um produto incompatível em compatível e não anulam bloqueios de segurança.
            </p>
          </div>
        </section>

        <section>
          <span>07</span>
          <div>
            <h2>O resultado é informativo e pode ser revisto</h2>
            <p>
              O cabelo e a rotina mudam. Por isso, o resultado representa as respostas dadas naquele momento e pode ser refeito quando houver mudança de hábitos, objetivos, química, percepção de quebra ou condição do couro cabeludo.
            </p>
            <p>
              O PDF é uma cópia do resultado para consulta. Ele não transforma a análise em prontuário e não substitui avaliação dermatológica ou de outro profissional de saúde quando houver sinais que mereçam investigação.
            </p>
          </div>
        </section>
      </div>

      <aside className="privacy-note">
        <strong>Transparência da recomendação</strong>
        <p>
          O Minha Cabeleira separa a lógica técnica da camada comercial. Publicidade, patrocínio ou posição de anúncio não devem alterar silenciosamente o resultado da análise nem a compatibilidade de um produto.
        </p>
      </aside>
    </main>
  );
}
