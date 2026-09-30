import {
  InternalLink,
} from "./InternalLink";

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <section className="not-found-card">
        <p className="not-found-card__code" aria-hidden="true">
          404
        </p>

        <p className="not-found-card__eyebrow">
          Página não encontrada
        </p>

        <h1>
          Esse endereço não existe no Minha Cabeleira.
        </h1>

        <p>
          O link pode ter mudado ou ter sido digitado incorretamente. Você pode voltar ao início ou seguir direto para a análise.
        </p>

        <div className="not-found-card__actions">
          <InternalLink
            className="not-found-card__primary"
            to="/"
          >
            Voltar ao início
            <span aria-hidden="true">→</span>
          </InternalLink>

          <InternalLink
            className="not-found-card__secondary"
            to="/analise"
          >
            Fazer minha análise
          </InternalLink>
        </div>
      </section>
    </main>
  );
}
