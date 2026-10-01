import {
  InternalLink,
} from "./InternalLink";

export function TermsPage() {
  return (
    <main className="privacy-page">
      <header className="privacy-hero">
        <p>Termos de uso</p>

        <h1>
          Regras para usar o Minha Cabeleira com clareza e segurança.
        </h1>

        <p>
          Estes termos explicam o escopo da ferramenta, os limites do conteúdo informativo e as condições de uso do site. Ao continuar navegando ou utilizar a análise, você concorda em usar o serviço dentro desses limites.
        </p>

        <small>
          Versão vigente da primeira edição pública do site.
        </small>
      </header>

      <div className="privacy-content">
        <section>
          <span>01</span>
          <div>
            <h2>O que o Minha Cabeleira oferece</h2>
            <p>
              O Minha Cabeleira oferece conteúdo educativo sobre cuidados capilares, glossário de ingredientes, uma análise baseada em questionário e sugestões de produtos que podem ser compatíveis com os critérios identificados.
            </p>
            <p>
              A forma como o resultado é organizado pode ser consultada na página de <InternalLink to="/metodologia">Metodologia</InternalLink>.
            </p>
          </div>
        </section>

        <section>
          <span>02</span>
          <div>
            <h2>O conteúdo não é diagnóstico nem prescrição</h2>
            <p>
              A ferramenta não realiza diagnóstico médico, dermatológico ou tricológico. As respostas são fornecidas pela própria pessoa e transformadas em orientações informativas.
            </p>
            <p>
              Sinais como feridas, ardor intenso, queda súbita, dor persistente ou outras alterações relevantes devem ser avaliados por profissional habilitado. O site pode interromper sugestões de produtos quando respostas de segurança indicarem cautela, mas isso não substitui avaliação profissional.
            </p>
          </div>
        </section>

        <section>
          <span>03</span>
          <div>
            <h2>Resultados dependem das informações fornecidas</h2>
            <p>
              A análise reflete as respostas dadas naquele momento. Mudanças na rotina, química, exposição ao calor, condição do couro cabeludo ou percepção sobre o cabelo podem alterar o resultado em uma nova análise.
            </p>
            <p>
              O Minha Cabeleira não garante que uma recomendação produza o mesmo efeito em todas as pessoas. Fórmula completa, concentração dos ingredientes, modo de uso, frequência, ambiente e características individuais também influenciam a experiência.
            </p>
          </div>
        </section>

        <section>
          <span>04</span>
          <div>
            <h2>Produtos e links externos</h2>
            <p>
              Produtos exibidos são uma camada opcional da análise. A marca não determina a recomendação técnica e um item pausado, incompatível ou indisponível pode deixar de aparecer.
            </p>
            <p>
              Preços, disponibilidade, fórmulas, embalagens e páginas de venda podem mudar sem aviso. Ao abrir um link externo, a compra, entrega, pagamento, troca e atendimento passam a seguir as regras do site ou loja de destino.
            </p>
          </div>
        </section>

        <section>
          <span>05</span>
          <div>
            <h2>Publicidade e relações comerciais</h2>
            <p>
              O site pode exibir publicidade e, futuramente, links comerciais ou afiliados devidamente identificados. Pagamento, patrocínio ou posição de anúncio não devem alterar silenciosamente os critérios técnicos da análise.
            </p>
            <p>
              Quando houver uma relação comercial aplicável, a identificação deve aparecer de forma compatível com o contexto da recomendação.
            </p>
          </div>
        </section>

        <section>
          <span>06</span>
          <div>
            <h2>Uso permitido do site</h2>
            <p>
              Você pode utilizar o site para fins pessoais e informativos. Não é permitido tentar contornar controles de acesso, interferir no funcionamento do serviço, explorar falhas de segurança, automatizar requisições abusivas ou usar o conteúdo de modo que viole direitos de terceiros.
            </p>
            <p>
              O acesso administrativo é restrito a contas autorizadas. A existência de uma rota ou interface técnica não concede permissão para alterar dados ou acessar áreas protegidas.
            </p>
          </div>
        </section>

        <section>
          <span>07</span>
          <div>
            <h2>Conteúdo e propriedade intelectual</h2>
            <p>
              Textos, identidade visual, estrutura editorial e materiais autorais do Minha Cabeleira não podem ser reproduzidos como se fossem de autoria de terceiros. Citações e usos permitidos por lei devem preservar a atribuição adequada quando aplicável.
            </p>
            <p>
              Marcas, nomes de produtos e conteúdos de terceiros pertencem aos respectivos titulares. A presença deles no catálogo ou no glossário não implica vínculo ou endosso comercial.
            </p>
          </div>
        </section>

        <section>
          <span>08</span>
          <div>
            <h2>Disponibilidade e mudanças no serviço</h2>
            <p>
              O site pode receber correções, alterações de conteúdo, mudanças de catálogo ou ajustes nas regras da análise. Também pode ficar temporariamente indisponível por manutenção, falhas técnicas ou serviços externos.
            </p>
            <p>
              Estes termos podem ser atualizados quando o funcionamento ou as obrigações do site mudarem. A versão publicada nesta página passa a ser a referência vigente.
            </p>
          </div>
        </section>

        <section>
          <span>09</span>
          <div>
            <h2>Privacidade</h2>
            <p>
              O tratamento de respostas, foto de referência local, cookies, publicidade e demais dados é explicado separadamente na página de <InternalLink to="/privacidade">Privacidade</InternalLink>.
            </p>
          </div>
        </section>
      </div>

      <aside className="privacy-note">
        <strong>Limite essencial</strong>
        <p>
          O Minha Cabeleira ajuda a organizar informações para decisões de cuidado mais conscientes. A decisão de usar ou interromper um produto continua sendo da pessoa usuária, respeitando rótulo, instruções do fabricante e orientação profissional quando necessária.
        </p>
      </aside>
    </main>
  );
}
