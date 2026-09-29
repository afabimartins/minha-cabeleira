import aboutBlondeJulia from "../assets/hair-blonde-julia-kuzenkov.webp";
import aboutNaturalOscar from "../assets/hair-natural-oscar-steiner.webp";

import {
  AdSlot,
  adSlots,
} from "./adsense";

import {
  InternalLink,
} from "./InternalLink";

export function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero about-hero--with-photo">
        <div className="about-hero__copy">
          <p>Sobre o projeto</p>
          <h1>
            Cuidado sem rótulos começa com informação melhor organizada.
          </h1>
          <p>
            O Minha Cabeleira foi pensado para transformar respostas sobre cabelo,
            rotina e objetivos em orientações compreensíveis — sem reduzir pessoas
            a uma categoria de curvatura e sem transformar um ingrediente isolado
            em promessa.
          </p>
        </div>

        <figure className="about-hero__photo">
          <img
            src={aboutNaturalOscar}
            alt="Pessoa sorrindo com cabelo natural curto e cacheado."
            loading="eager"
            decoding="async"
          />
        </figure>
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

      <section className="about-perspective">
        <div className="about-perspective__copy">
          <p>O cabelo muda</p>
          <h2>
            A análise precisa acompanhar contexto, não uma imagem ideal.
          </h2>
          <p>
            Cor, textura, comprimento e aparência podem mudar ao longo do tempo.
            Por isso, a proposta é observar sinais e rotina sem transformar
            estética em regra técnica.
          </p>
        </div>

        <figure className="about-perspective__photo">
          <img
            src={aboutBlondeJulia}
            alt="Close de cabelo loiro ondulado em luz quente."
            loading="lazy"
            decoding="async"
          />
        </figure>
      </section>

      <AdSlot
        slot={adSlots.aboutContent}
        placement="about-content"
      />

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
