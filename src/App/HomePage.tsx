import heroHairAnik from "../assets/hero-hair-anik-paul.jpg";
import hairCareTima from "../assets/hair-care-tima-miroshnichenko.webp";
import hairCoilyAugusto from "../assets/hair-coily-augusto-carneiro.webp";
import hairManAlax from "../assets/hair-man-alax-matias.webp";
import hairStraightHanna from "../assets/hair-straight-hanna-pad.webp";
import hairWavyCaique from "../assets/hair-wavy-caique-araujo.webp";

import {
  AdSlot,
  adSlots,
} from "./adsense";

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

type FeatureIconName =
  | "analysis"
  | "hair"
  | "routine"
  | "products";

function FeatureIcon({
  name,
}: {
  name: FeatureIconName;
}) {
  const commonProps = {
    width: 21,
    height: 21,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "analysis") {
    return (
      <svg {...commonProps}>
        <path d="M9 6h10" />
        <path d="M9 12h10" />
        <path d="M9 18h10" />
        <path d="m4.5 6 1 1 2-2" />
        <path d="m4.5 12 1 1 2-2" />
        <path d="m4.5 18 1 1 2-2" />
      </svg>
    );
  }

  if (name === "hair") {
    return (
      <svg {...commonProps}>
        <path d="M4 7.5c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0" />
        <path d="M4 12c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0" />
        <path d="M4 16.5c2.2-2.2 4.4-2.2 6.6 0s4.4 2.2 6.6 0" />
      </svg>
    );
  }

  if (name === "routine") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="7.5" />
        <path d="M12 8.3v4.2l2.8 1.8" />
        <path d="M7.2 4.8 5.6 3.2" />
        <path d="m16.8 4.8 1.6-1.6" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M9.2 3.5h5.6" />
      <path d="M10 3.5v3L7.8 9.2v9.3c0 1.1.9 2 2 2h4.4c1.1 0 2-.9 2-2V9.2L14 6.5v-3" />
      <path d="M7.8 12h8.4" />
    </svg>
  );
}

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
                src={heroHairAnik}
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
            <span className="home-showcase-card__icon" aria-hidden="true"><FeatureIcon name="analysis" /></span>
            <div>
              <h3>Análise personalizada</h3>
              <p>
                Uma análise feita sob medida a partir das suas respostas e necessidades.
              </p>
            </div>
            <InternalLink to="/analise" aria-label="Abrir análise">→</InternalLink>
          </article>

          <article className="home-showcase-card home-showcase-card--hair">
            <img
              className="home-showcase-card__real-photo"
              src={hairCareTima}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
            />

            <span className="home-showcase-card__icon" aria-hidden="true"><FeatureIcon name="hair" /></span>

            <div>
              <h3>Tipos de cabelo</h3>
              <p>
                Entenda características e comportamentos sem transformar textura em rótulo.
              </p>
            </div>

            <InternalLink to="/glossario" aria-label="Explorar tipos e termos">→</InternalLink>
          </article>

          <article className="home-showcase-card home-showcase-card--routine">
            <span className="home-showcase-card__icon" aria-hidden="true"><FeatureIcon name="routine" /></span>
            <div>
              <h3>Prioridades da rotina</h3>
              <p>
                Descubra o que faz mais sentido priorizar agora e o que pode esperar.
              </p>
            </div>
            <InternalLink to="/analise" aria-label="Descobrir prioridades">→</InternalLink>
          </article>

          <article className="home-showcase-card home-showcase-card--products">
            <span className="home-showcase-card__icon" aria-hidden="true"><FeatureIcon name="products" /></span>
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

      <section
        className="home-diversity"
        aria-labelledby="home-diversity-title"
      >
        <div className="home-diversity__intro">
          <p className="home-section-kicker">
            Todos os cabelos
          </p>

          <h2 id="home-diversity-title">
            Sem rótulos. Com contexto.
          </h2>

          <p>
            Textura, comprimento, cor e estilo fazem parte da aparência do cabelo,
            mas não dizem sozinhos do que ele precisa. A análise parte dos sinais
            relatados, da rotina e dos seus objetivos.
          </p>

          <InternalLink
            className="home-diversity__link"
            to="/analise"
          >
            Entender minhas prioridades
            <span aria-hidden="true">→</span>
          </InternalLink>
        </div>

        <div className="home-diversity__gallery">
          <figure className="home-diversity__photo home-diversity__photo--feature">
            <img
              src={hairCoilyAugusto}
              alt="Pessoa com cabelo crespo volumoso em retrato de estúdio."
              loading="lazy"
              decoding="async"
            />
            <figcaption>Texturas naturais</figcaption>
          </figure>

          <figure className="home-diversity__photo home-diversity__photo--man">
            <img
              src={hairManAlax}
              alt="Pessoa de perfil com cabelo cacheado volumoso."
              loading="lazy"
              decoding="async"
            />
            <figcaption>Cuidado para todos</figcaption>
          </figure>

          <figure className="home-diversity__photo home-diversity__photo--straight">
            <img
              src={hairStraightHanna}
              alt="Pessoa prendendo cabelo liso castanho."
              loading="lazy"
              decoding="async"
            />
            <figcaption>Fios lisos</figcaption>
          </figure>

          <figure className="home-diversity__photo home-diversity__photo--wavy">
            <img
              src={hairWavyCaique}
              alt="Pessoa com cabelo castanho longo e ondulado entre flores."
              loading="lazy"
              decoding="async"
            />
            <figcaption>Ondas e movimento</figcaption>
          </figure>
        </div>

        <p className="home-diversity__note">
          As fotografias representam diversidade visual. Elas não determinam
          diagnóstico, necessidade técnica ou recomendação de produto.
        </p>
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

      <AdSlot
        slot={adSlots.homeContent}
        placement="home-content"
      />

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
