import {
  InternalLink,
} from "./InternalLink";

export function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p>Sobre o projeto</p>
        <h1>
          Cuidado sem rótulos começa com informação melhor organizada.
        </h1>
        <p>
          O Minha Cabeleira foi pensado para transformar respostas sobre cabelo, rotina e objetivos em orientações compreensíveis — sem reduzir pessoas a uma categoria de curvatura e sem transformar um ingrediente isolado em promessa.
        </p>
      </section>

      <section className="about-principles">
        <article>
          <span>01</span>
          <h2>Necessidades primeiro</h2>
          <p>
            A análise parte dos sinais relatados, do histórico, da rotina e dos objetivos. Tipo de cabelo não é usado como atalho para decidir o que alguém precisa.
          </p>
        </article>

        <article>
          <span>02</span>
          <h2>Fórmula antes da marca</h2>
          <p>
            As recomendações destacam funções cosméticas e características de formulação. Produtos são apenas uma camada opcional de consulta.
          </p>
        </article>

        <article>
          <span>03</span>
          <h2>Fontes visíveis</h2>
          <p>
            O glossário concentra definições, limitações de interpretação e bibliografia para que a base técnica possa ser consultada e revisada.
          </p>
        </article>
      </section>

      <section className="about-cta">
        <div>
          <p>Quer ver isso aplicado ao seu cabelo?</p>
          <h2>Comece pela análise.</h2>
        </div>
        <InternalLink to="/analise">
          Fazer minha análise
          <span aria-hidden="true">→</span>
        </InternalLink>
      </section>
    </main>
  );
}
