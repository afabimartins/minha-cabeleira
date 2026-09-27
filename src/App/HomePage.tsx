import heroHair from "../assets/hero-hair.png";

import {
  InternalLink,
} from "./InternalLink";

import {
  glossaryEntries,
} from "./glossary-data";

const highlightedGlossary = [
  "glycerin",
  "amodimethicone",
  "behentrimonium-chloride",
  "panthenol",
];

export function HomePage() {
  const glossaryHighlights =
    highlightedGlossary
      .map((slug) =>
        glossaryEntries.find(
          (entry) => entry.slug === slug,
        ),
      )
      .filter(
        (entry) => entry !== undefined,
      );

  return (
    <main className="home-page">
      <section className="home-showcase">
        <div className="home-showcase__shape home-showcase__shape--left" aria-hidden="true" />
        <div className="home-showcase__shape home-showcase__shape--top" aria-hidden="true" />
        <div className="home-showcase__shape home-showcase__shape--right" aria-hidden="true" />

        <div className="home-showcase__inner">
          <div className="home-showcase__copy">
            <p className="home-showcase__eyebrow">
              Análise capilar personalizada
            </p>

            <h1>
              Entenda seu
              <span> cabelo.</span>
              <br />
              Cuide do que
              <br />
              ele precisa.
            </h1>

            <p className="home-showcase__description">
              Responda algumas perguntas e receba uma análise personalizada com orientações organizadas por sinais, rotina e necessidades — sem rótulos, sem complicação.
            </p>

            <div className="home-showcase__actions">
              <InternalLink
                className="home-showcase__primary"
                to="/analise"
              >
                Fazer minha análise
                <span aria-hidden="true">→</span>
              </InternalLink>

              <a
                className="home-showcase__secondary"
                href="#como-funciona"
              >
                Como funciona
                <span aria-hidden="true">●</span>
              </a>
            </div>

            <div className="home-showcase__benefits">
              <div>
                <span className="home-showcase__benefit home-showcase__benefit--coral">✦</span>
                <p>
                  <strong>Rápida e prática</strong>
                  <small>Apenas 20 perguntas</small>
                </p>
              </div>

              <div>
                <span className="home-showcase__benefit home-showcase__benefit--green">◎</span>
                <p>
                  <strong>Recomendações personalizadas</strong>
                  <small>Com base nas suas respostas</small>
                </p>
              </div>

              <div>
                <span className="home-showcase__benefit home-showcase__benefit--purple">♥</span>
                <p>
                  <strong>Sem rótulos de cabelo</strong>
                  <small>Para todos os tipos</small>
                </p>
              </div>
            </div>
          </div>

          <div className="home-showcase__visual" aria-label="Prévia da análise Minha Cabeleira">
            <div className="home-showcase__hair" aria-hidden="true">
              <img
                src={heroHair}
                alt=""
              />
            </div>

            <div className="home-showcase__quiz">
              <div className="home-showcase__quiz-progress">
                <span>Seu progresso</span>
                <strong>01 / 20</strong>
                <small>5%</small>
              </div>

              <div className="home-showcase__quiz-track" aria-hidden="true">
                <span />
              </div>

              <div className="home-showcase__quiz-card">
                <p>Sobre o seu cabelo</p>
                <h2>
                  Como seu cabelo fica após a lavagem?
                </h2>

                <div className="home-showcase__option">
                  <span />
                  Pouco áspero
                </div>

                <div className="home-showcase__option home-showcase__option--selected">
                  <span />
                  Moderadamente áspero
                  <strong>✓</strong>
                </div>

                <div className="home-showcase__option">
                  <span />
                  Muito áspero
                </div>

                <div className="home-showcase__quiz-actions">
                  <span>← Voltar</span>

                  <InternalLink
                    to="/analise"
                  >
                    Continuar
                    <span aria-hidden="true">→</span>
                  </InternalLink>
                </div>
              </div>

              <small className="home-showcase__privacy">
                Suas respostas são usadas apenas para construir esta análise.
              </small>
            </div>
          </div>
        </div>

        <div
          className="home-showcase__cards"
          id="como-funciona"
        >
          <article className="home-showcase-card home-showcase-card--analysis">
            <span className="home-showcase-card__icon">☷</span>
            <div>
              <h3>Análise personalizada</h3>
              <p>
                Uma análise feita sob medida a partir das suas respostas e necessidades.
              </p>
            </div>
            <InternalLink to="/analise" aria-label="Abrir análise">→</InternalLink>
          </article>

          <article className="home-showcase-card home-showcase-card--hair">
            <span className="home-showcase-card__icon">❧</span>
            <div>
              <h3>Tipos de cabelo</h3>
              <p>
                Entenda características e comportamentos sem transformar textura em rótulo.
              </p>
            </div>
            <InternalLink to="/glossario" aria-label="Explorar tipos e termos">→</InternalLink>
          </article>

          <article className="home-showcase-card home-showcase-card--routine">
            <span className="home-showcase-card__icon">□</span>
            <div>
              <h3>Prioridades da rotina</h3>
              <p>
                Descubra o que faz mais sentido priorizar agora e o que pode esperar.
              </p>
            </div>
            <InternalLink to="/analise" aria-label="Descobrir prioridades">→</InternalLink>
          </article>

          <article className="home-showcase-card home-showcase-card--products">
            <span className="home-showcase-card__icon">♙</span>
            <div>
              <h3>Produtos compatíveis</h3>
              <p>
                Consulte produtos reais apenas depois da orientação técnica da sua análise.
              </p>
            </div>
            <InternalLink to="/analise" aria-label="Ver análise de produtos">→</InternalLink>
          </article>
        </div>
      </section>

      <section className="home-glossary">
        <div className="home-glossary__copy">
          <p className="home-section-kicker">
            Glossário Minha Cabeleira
          </p>
          <h2>
            Viu um ativo no resultado? Clique e entenda o que ele faz.
          </h2>
          <p>
            O glossário reúne ingredientes, famílias funcionais e termos usados na análise. Cada verbete explica o papel cosmético, os limites de interpretação e as referências utilizadas.
          </p>

          <InternalLink
            className="home-glossary__link"
            to="/glossario"
          >
            Abrir glossário completo
            <span aria-hidden="true">→</span>
          </InternalLink>
        </div>

        <div className="home-glossary__terms">
          {glossaryHighlights.map((entry) => (
            <InternalLink
              className="home-glossary__term"
              to={`/glossario/${entry.slug}`}
              key={entry.slug}
            >
              <span>{entry.category}</span>
              <strong>{entry.name}</strong>
              <small>{entry.summary}</small>
              <i aria-hidden="true">→</i>
            </InternalLink>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <p>Pronta para começar?</p>
          <h2>
            Seu cabelo não precisa de um rótulo. Precisa de contexto.
          </h2>
        </div>

        <InternalLink
          className="home-cta__button"
          to="/analise"
        >
          Fazer minha análise
          <span aria-hidden="true">→</span>
        </InternalLink>
      </section>
    </main>
  );
}
