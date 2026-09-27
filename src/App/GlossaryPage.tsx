import {
  useMemo,
  useState,
} from "react";

import {
  InternalLink,
} from "./InternalLink";

import {
  getGlossarySearchValues,
  glossaryEntries,
  normalizeGlossaryLabel,
} from "./glossary-data";

const categories = [
  "Todos",
  ...Array.from(
    new Set(
      glossaryEntries.map(
        (entry) => entry.category,
      ),
    ),
  ),
];

function getSecondaryNames(
  entry: (typeof glossaryEntries)[number],
): string[] {
  const names = [
    entry.inciName
      ? `INCI: ${entry.inciName}`
      : entry.englishName
        ? `EN: ${entry.englishName}`
        : "",
    entry.inciName &&
    entry.englishName &&
    entry.englishName !== entry.inciName
      ? `EN: ${entry.englishName}`
      : "",
    entry.spanishName
      ? `ES: ${entry.spanishName}`
      : "",
  ].filter(Boolean);

  return Array.from(new Set(names));
}

export function GlossaryPage() {
  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("Todos");

  const filteredEntries = useMemo(
    () => {
      const normalizedSearch =
        normalizeGlossaryLabel(search);

      return glossaryEntries.filter(
        (entry) => {
          const matchesCategory =
            category === "Todos" ||
            entry.category === category;

          const matchesSearch =
            normalizedSearch.length === 0 ||
            getGlossarySearchValues(
              entry,
            ).some((value) =>
              normalizeGlossaryLabel(
                value,
              ).includes(
                normalizedSearch,
              ),
            );

          return (
            matchesCategory &&
            matchesSearch
          );
        },
      );
    },
    [search, category],
  );

  return (
    <main className="glossary-page">
      <section className="glossary-hero">
        <div>
          <p className="glossary-hero__eyebrow">
            Glossário técnico
          </p>
          <h1>
            Entenda os ativos e termos que aparecem na sua análise.
          </h1>
          <p>
            Ingredientes, famílias funcionais e conceitos explicados com contexto. Os verbetes mostram o nome em português, a nomenclatura usada nos rótulos e equivalentes em inglês e espanhol quando disponíveis.
          </p>
        </div>

        <div className="glossary-hero__stats">
          <strong>
            {glossaryEntries.length}
          </strong>
          <span>verbetes iniciais</span>
          <small>
            Ativos e conceitos serão ampliados conforme a base técnica crescer.
          </small>
        </div>
      </section>

      <section className="glossary-explorer">
        <div className="glossary-toolbar">
          <label className="glossary-search">
            <span className="sr-only">
              Buscar no glossário
            </span>
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              placeholder="Busque porosidade, glicerina, Glycerin, porosity..."
            />
          </label>

          <div
            className="glossary-filters"
            aria-label="Filtrar por categoria"
          >
            {categories.map(
              (item) => (
                <button
                  className={`glossary-filter${
                    category === item
                      ? " glossary-filter--active"
                      : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setCategory(item)
                  }
                  key={item}
                >
                  {item}
                </button>
              ),
            )}
          </div>
        </div>

        <div className="glossary-results-meta">
          <strong>
            {filteredEntries.length}
          </strong>
          <span>
            {filteredEntries.length === 1
              ? "resultado"
              : "resultados"}
          </span>
        </div>

        {filteredEntries.length ===
        0 ? (
          <div className="glossary-empty">
            <h2>
              Ainda não encontramos esse termo.
            </h2>
            <p>
              Tente uma variação em português, inglês ou espanhol. A busca também reconhece sinônimos cadastrados.
            </p>
          </div>
        ) : (
          <div className="glossary-grid">
            {filteredEntries.map(
              (entry) => (
                <InternalLink
                  className="glossary-card"
                  to={`/glossario/${entry.slug}`}
                  key={entry.slug}
                >
                  <div className="glossary-card__top">
                    <span>
                      {entry.category}
                    </span>
                    <i aria-hidden="true">
                      →
                    </i>
                  </div>

                  <h2>{entry.name}</h2>

                  <div className="glossary-card__languages">
                    {getSecondaryNames(
                      entry,
                    ).map((name) => (
                      <span key={name}>
                        {name}
                      </span>
                    ))}
                  </div>

                  <p>
                    {entry.summary}
                  </p>
                </InternalLink>
              ),
            )}
          </div>
        )}
      </section>
    </main>
  );
}
