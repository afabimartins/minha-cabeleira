import {
  InternalLink,
} from "./InternalLink";

export function TransparencyPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-hero">
        <p>Transparência comercial</p>

        <h1>
          Como o Minha Cabeleira separa orientação técnica de publicidade e interesses comerciais.
        </h1>

        <p>
          A análise foi desenhada para começar pelas necessidades relatadas no questionário e pelos critérios de compatibilidade. Publicidade, marca, patrocínio ou relação comercial não devem alterar silenciosamente esse resultado.
        </p>

        <small>
          Política de transparência da versão atual do site.
        </small>
      </header>

      <div className="privacy-content">
        <section>
          <span>01</span>
          <div>
            <h2>A análise técnica vem primeiro</h2>
            <p>
              O Minha Cabeleira organiza sinais, prioridades de cuidado e orientação de fórmula antes de consultar o catálogo de produtos. A lógica geral da análise pode ser consultada na página de <InternalLink to="/metodologia">Metodologia</InternalLink>.
            </p>
            <p>
              Um produto só entra na camada comercial quando atende aos critérios aplicáveis e está ativo no catálogo. A marca, por si só, não torna um produto mais compatível.
            </p>
          </div>
        </section>

        <section>
          <span>02</span>
          <div>
            <h2>Produtos são exemplos compatíveis, não prescrições</h2>
            <p>
              Os produtos exibidos servem como opções do catálogo atual que atendem aos critérios daquela recomendação. Eles não substituem a orientação sobre função da fórmula, ingredientes e cuidados de segurança.
            </p>
            <p>
              Se um item for pausado, ficar indisponível ou deixar de atender aos critérios, ele pode deixar de aparecer sem que isso altere a necessidade técnica identificada na análise.
            </p>
          </div>
        </section>

        <section>
          <span>03</span>
          <div>
            <h2>Publicidade fica separada da recomendação</h2>
            <p>
              Nesta fase, o site foi preparado para utilizar publicidade do Google AdSense quando essa funcionalidade estiver ativada. Os anúncios ocupam espaços próprios e não participam do cálculo de compatibilidade dos produtos.
            </p>
            <p>
              Um anúncio pode ser escolhido pelo sistema de publicidade, mas isso não significa que o Minha Cabeleira analisou ou recomendou aquele anunciante, produto ou serviço.
            </p>
          </div>
        </section>

        <section>
          <span>04</span>
          <div>
            <h2>Links comerciais ou afiliados devem ser identificados</h2>
            <p>
              O site pode utilizar, no futuro, links comerciais, afiliados ou outras relações que gerem remuneração. Quando isso acontecer, a natureza do link deve ser informada de maneira compatível com o contexto em que ele aparece.
            </p>
            <p>
              A existência de comissão não deve transformar um produto incompatível em compatível nem mudar silenciosamente a prioridade técnica apresentada ao usuário.
            </p>
          </div>
        </section>

        <section>
          <span>05</span>
          <div>
            <h2>Preço e disponibilidade não são garantidos</h2>
            <p>
              Preços e disponibilidade podem mudar nos sites de venda. Quando o catálogo informa preço, ele funciona como referência para ordenação ou comparação e pode não refletir uma alteração feita posteriormente pela loja de destino.
            </p>
            <p>
              Compra, pagamento, entrega, troca, devolução e atendimento são responsabilidades do estabelecimento externo acessado pelo link.
            </p>
          </div>
        </section>

        <section>
          <span>06</span>
          <div>
            <h2>Conteúdo patrocinado precisa ser distinguível</h2>
            <p>
              Caso exista conteúdo patrocinado, parceria paga ou destaque comercial, essa condição deve ser indicada. Um acordo comercial não deve ser apresentado como se fosse evidência técnica independente.
            </p>
            <p>
              Da mesma forma, a ausência de parceria com uma marca não impede que um produto apareça quando ele atende aos critérios definidos pela análise.
            </p>
          </div>
        </section>

        <section>
          <span>07</span>
          <div>
            <h2>Segurança continua acima da monetização</h2>
            <p>
              Quando respostas relacionadas ao couro cabeludo indicam cautela ou necessidade de interromper sugestões de produtos, a camada comercial é bloqueada mesmo que existam itens no catálogo que poderiam ser exibidos em outro cenário.
            </p>
            <p>
              Nenhuma oportunidade de publicidade ou remuneração deve substituir esse bloqueio de segurança.
            </p>
          </div>
        </section>

        <section>
          <span>08</span>
          <div>
            <h2>Esta política acompanha as mudanças do site</h2>
            <p>
              Se o modelo de monetização mudar — por exemplo, com novos formatos de publicidade, afiliação ou patrocínio — esta página deve ser atualizada para refletir o funcionamento real do Minha Cabeleira.
            </p>
            <p>
              As regras gerais de utilização do serviço também estão descritas nos <InternalLink to="/termos">Termos de Uso</InternalLink> e as informações sobre cookies e publicidade podem ser consultadas em <InternalLink to="/privacidade">Privacidade</InternalLink>.
            </p>
          </div>
        </section>
      </div>

      <aside className="privacy-note">
        <strong>Princípio central</strong>
        <p>
          Primeiro vem a necessidade do cabelo e a compatibilidade da fórmula. A camada comercial pode ajudar a encontrar opções, mas não deve decidir o resultado técnico.
        </p>
      </aside>
    </main>
  );
}
