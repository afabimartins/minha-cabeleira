import {
  BrandMark,
} from "./BrandMark";

import {
  getGlossaryEntry,
} from "./glossary-data";

import {
  InternalLink,
} from "./InternalLink";

type GlossaryEntryPageProps = {
  slug: string;
};

export function GlossaryEntryPage({
  slug,
}: GlossaryEntryPageProps) {
  const entry =
    getGlossaryEntry(slug);

  if (!entry) {
    return (
      <main className="glossary-entry-page">
        <section className="glossary-not-found">
          <p>Glossário</p>
          <h1>
            Este termo ainda não está no glossário.
          </h1>
          <InternalLink to="/glossario">
            Voltar para o glossário
          </InternalLink>
        </section>
      </main>
    );
  }

  return (
    <main className="glossary-entry-page">
      <div className="glossary-breadcrumb">
        <InternalLink to="/glossario">
          Glossário
        </InternalLink>
        <span aria-hidden="true">/</span>
        <span>{entry.name}</span>
      </div>

      <article className="glossary-entry">
        <header className="glossary-entry__hero">
          <div>
            <p className="glossary-entry__category">
              {entry.category}
            </p>
            <h1>{entry.name}</h1>

            <div className="glossary-entry__names">
              <p>
                <span>PT-BR</span>
                <strong>{entry.name}</strong>
              </p>

              {entry.inciName && (
                <p>
                  <span>INCI / rótulo</span>
                  <strong>
                    {entry.inciName}
                  </strong>
                </p>
              )}

              {entry.englishName && (
                <p>
                  <span>English</span>
                  <strong>
                    {entry.englishName}
                  </strong>
                </p>
              )}

              {entry.spanishName && (
                <p>
                  <span>Español</span>
                  <strong>
                    {entry.spanishName}
                  </strong>
                </p>
              )}
            </div>

            <p className="glossary-entry__summary">
              {entry.summary}
            </p>
          </div>

          <div className="glossary-entry__brand" aria-hidden="true">
            <BrandMark
              className="glossary-entry__brand-mark"
              compact
            />
          </div>
        </header>

        <div className="glossary-entry__content">
          <section>
            <p className="glossary-entry__eyebrow">
              Função e contexto
            </p>
            <h2>
              O que esse termo pode significar na prática
            </h2>

            <ul className="glossary-entry__list">
              {entry.whatItDoes.map(
                (item) => (
                  <li key={item}>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </section>

          <aside className="glossary-entry__attention">
            <span aria-hidden="true">i</span>
            <div>
              <strong>
                O rótulo não conta a história inteira
              </strong>
              <p>
                {entry.limitations}
              </p>
            </div>
          </aside>

          <section>
            <p className="glossary-entry__eyebrow">
              Onde aparece no contexto
            </p>
            <h2>
              Produtos ou situações relacionadas
            </h2>
            <div className="glossary-entry__chips">
              {entry.commonlyFoundIn.map(
                (item) => (
                  <span key={item}>
                    {item}
                  </span>
                ),
              )}
            </div>
          </section>

          {entry.related.length > 0 && (
            <section>
              <p className="glossary-entry__eyebrow">
                Continue explorando
              </p>
              <h2>Termos relacionados</h2>
              <div className="glossary-entry__related">
                {entry.related.map(
                  (relatedSlug) => {
                    const related =
                      getGlossaryEntry(
                        relatedSlug,
                      );

                    if (!related) {
                      return null;
                    }

                    return (
                      <InternalLink
                        to={`/glossario/${related.slug}`}
                        key={related.slug}
                      >
                        <span>
                          {related.category}
                        </span>
                        <strong>
                          {related.name}
                        </strong>
                        <i aria-hidden="true">
                          →
                        </i>
                      </InternalLink>
                    );
                  },
                )}
              </div>
            </section>
          )}

          <section className="glossary-entry__references">
            <p className="glossary-entry__eyebrow">
              Transparência
            </p>
            <h2>
              Bibliografia usada neste verbete
            </h2>
            <p>
              Estas referências sustentam a base técnica inicial do verbete. A bibliografia pode ser ampliada durante a revisão editorial conforme o tema exigir fontes mais específicas.
            </p>

            <ol>
              {entry.references.map(
                (reference) => (
                  <li key={reference.id}>
                    {reference.citation}
                  </li>
                ),
              )}
            </ol>
          </section>
        </div>
      </article>
    </main>
  );
}
