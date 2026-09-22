import {
  Questionnaire,
} from "./Questionnaire";

export function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-brand">
            <div
              className="app-brand__mark"
              aria-hidden="true"
            >
              MC
            </div>

            <div className="app-brand__text">
              <h1>
                Minha Cabeleira
              </h1>

              <p>
                Cuidado sem rótulos
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="app-intro">
          <p className="app-intro__eyebrow">
            Análise capilar
          </p>

          <h2>
            Entenda melhor o que o seu
            cabelo precisa.
          </h2>

          <p className="app-intro__description">
            Responda algumas perguntas
            sobre o seu cabelo, sua rotina
            e seus objetivos. A análise
            organiza essas informações
            para mostrar prioridades e
            produtos compatíveis.
          </p>
        </section>

        <Questionnaire />
      </main>
    </div>
  );
}