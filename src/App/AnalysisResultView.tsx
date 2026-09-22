import type {
  AnalysisResult,
} from "../domain/analysis-result";

import {
  getFindingPresentation,
} from "./analysis-presentation";

type AnalysisResultViewProps = {
  result: AnalysisResult;
  onRestart: () => void;
};

function formatPrice(
  price?: number,
  currency?: string,
): string {
  if (price === undefined) {
    return "Preço não informado";
  }

  if (currency === "BRL") {
    return new Intl.NumberFormat(
      "pt-BR",
      {
        style: "currency",
        currency: "BRL",
      },
    ).format(price);
  }

  return `${currency ?? ""} ${price.toFixed(
    2,
  )}`.trim();
}

function getRecommendationTitle(
  type: string,
): string {
  switch (type) {
    case "conditioning_support":
      return "Suporte de condicionamento";

    case "damage_protection":
      return "Proteção contra danos";

    case "moisture_support":
      return "Suporte à retenção de umidade";

    default:
      return "Recomendação";
  }
}

function getSafetyTitle(
  level: AnalysisResult["safety"]["level"],
): string {
  switch (level) {
    case "stop":
      return "Atenção necessária";

    case "caution":
      return "Recomendação com cautela";

    default:
      return "Tudo certo para continuar";
  }
}

function getSafetyDescription(
  result: AnalysisResult,
): string {
  if (result.safety.level === "stop") {
    return "Algumas das suas respostas indicam que é mais seguro não sugerir produtos neste momento. Procure avaliação profissional antes de testar novos produtos ou tratamentos.";
  }

  if (
    result.safety.level === "caution"
  ) {
    return "Identificamos um sinal que merece atenção. As sugestões de produtos ficam bloqueadas enquanto esse sinal exigir cautela.";
  }

  return "Não identificamos sinais que impeçam a exibição de sugestões de produtos.";
}

function getSafetyClassName(
  level: AnalysisResult["safety"]["level"],
): string {
  switch (level) {
    case "stop":
      return "analysis-safety analysis-safety--stop";

    case "caution":
      return "analysis-safety analysis-safety--caution";

    default:
      return "analysis-safety analysis-safety--safe";
  }
}

export function AnalysisResultView({
  result,
  onRestart,
}: AnalysisResultViewProps) {
  const recommendationsBlocked =
    !result.safety.canRecommendProducts;

  return (
    <section className="analysis-result">
      <header className="analysis-result__hero">
        <div className="analysis-result__status">
          <span
            className="analysis-result__status-mark"
            aria-hidden="true"
          >
            ✓
          </span>

          <span>Análise concluída</span>
        </div>

        <h2>Sua análise está pronta.</h2>

        <p>
          Organizamos suas respostas para
          destacar os sinais observados,
          os cuidados importantes e o que
          pode fazer mais sentido
          priorizar na sua rotina.
        </p>
      </header>

      <div className="analysis-result__content">
        <section className="analysis-section">
          <div className="analysis-section__heading">
            <span className="analysis-section__number">
              01
            </span>

            <div>
              <p className="analysis-section__eyebrow">
                Seu cabelo
              </p>

              <h3>
                O que observamos no seu
                cabelo
              </h3>
            </div>
          </div>

          {result.diagnosis.findings
            .length === 0 ? (
            <div className="analysis-empty">
              <p>
                Ainda não encontramos
                evidências suficientes
                para destacar um padrão
                específico a partir das
                suas respostas.
              </p>
            </div>
          ) : (
            <div className="finding-grid">
              {result.diagnosis.findings.map(
                (finding) => {
                  const presentation =
                    getFindingPresentation(
                      finding,
                    );

                  return (
                    <article
                      className="finding-card"
                      key={finding.id}
                    >
                      <div
                        className="finding-card__mark"
                        aria-hidden="true"
                      />

                      <div>
                        <h4>
                          {
                            presentation.title
                          }
                        </h4>

                        <p>
                          {
                            presentation.description
                          }
                        </p>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          )}
        </section>

        <section className="analysis-section">
          <div className="analysis-section__heading">
            <span className="analysis-section__number">
              02
            </span>

            <div>
              <p className="analysis-section__eyebrow">
                Cuidado
              </p>

              <h3>Segurança</h3>
            </div>
          </div>

          <div
            className={getSafetyClassName(
              result.safety.level,
            )}
          >
            <div className="analysis-safety__header">
              <span
                className="analysis-safety__icon"
                aria-hidden="true"
              >
                {result.safety.level ===
                "normal"
                  ? "✓"
                  : "!"}
              </span>

              <div>
                <p className="analysis-safety__label">
                  Avaliação de segurança
                </p>

                <h4>
                  {getSafetyTitle(
                    result.safety.level,
                  )}
                </h4>
              </div>
            </div>

            <p className="analysis-safety__description">
              {getSafetyDescription(
                result,
              )}
            </p>

            {result.safety.notices.length >
              0 && (
              <div className="analysis-safety__notices">
                {result.safety.notices.map(
                  (notice, index) => (
                    <div
                      className="analysis-safety__notice"
                      key={`${notice.code}-${index}`}
                    >
                      <span
                        aria-hidden="true"
                      >
                        •
                      </span>

                      <p>
                        {notice.message}
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        <section className="analysis-section">
          <div className="analysis-section__heading">
            <span className="analysis-section__number">
              03
            </span>

            <div>
              <p className="analysis-section__eyebrow">
                Sua rotina
              </p>

              <h3>
                O que priorizar agora
              </h3>
            </div>
          </div>

          {recommendationsBlocked ? (
            <div className="recommendation-blocked">
              <span
                className="recommendation-blocked__icon"
                aria-hidden="true"
              >
                !
              </span>

              <div>
                <h4>
                  Sugestões de produtos
                  pausadas
                </h4>

                <p>
                  As sugestões de produtos
                  foram temporariamente
                  bloqueadas por segurança.
                  Você ainda pode usar as
                  observações acima para
                  entender melhor os sinais
                  identificados.
                </p>
              </div>
            </div>
          ) : result.recommendations
              .length === 0 ? (
            <div className="analysis-empty">
              <p>
                Ainda não há uma
                recomendação específica
                para este resultado.
              </p>
            </div>
          ) : (
            <div className="recommendation-list">
              {result.recommendations.map(
                (
                  {
                    recommendation,
                    products,
                  },
                  index,
                ) => (
                  <article
                    className="recommendation-card"
                    key={
                      recommendation.id
                    }
                  >
                    <div className="recommendation-card__header">
                      <span className="recommendation-card__priority">
                        Prioridade{" "}
                        {index + 1}
                      </span>

                      <h4>
                        {getRecommendationTitle(
                          recommendation.type,
                        )}
                      </h4>

                      <p>
                        {
                          recommendation.rationale
                        }
                      </p>
                    </div>

                    {products.length ===
                    0 ? (
                      <div className="recommendation-card__empty">
                        Nenhum produto do
                        catálogo atual
                        atende aos critérios
                        desta recomendação.
                      </div>
                    ) : (
                      <div className="recommendation-products">
                        <div className="recommendation-products__heading">
                          <h5>
                            Produtos
                            compatíveis
                          </h5>

                          <span>
                            {
                              products.length
                            }{" "}
                            {products.length ===
                            1
                              ? "opção"
                              : "opções"}
                          </span>
                        </div>

                        <div className="product-grid">
                          {products.map(
                            (
                              product,
                            ) => (
                              <article
                                className="product-card"
                                key={
                                  product.id
                                }
                              >
                                <div className="product-card__content">
                                  <p className="product-card__brand">
                                    {
                                      product.brand
                                    }
                                  </p>

                                  <h5>
                                    {
                                      product.name
                                    }
                                  </h5>

                                  <p className="product-card__price">
                                    {formatPrice(
                                      product.price,
                                      product.currency,
                                    )}
                                  </p>
                                </div>

                                <span className="product-card__badge">
                                  Compatível
                                </span>
                              </article>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </div>

      <footer className="analysis-result__footer">
        <div>
          <h3>
            Quer responder novamente?
          </h3>

          <p>
            Você pode refazer a análise
            quando sua rotina, seus
            objetivos ou a percepção sobre
            o seu cabelo mudarem.
          </p>
        </div>

        <button
          className="analysis-result__restart"
          type="button"
          onClick={onRestart}
        >
          Refazer análise
        </button>
      </footer>
    </section>
  );
}