import {
  useState,
} from "react";

import type {
  AnalysisResult,
} from "../domain/analysis-result";

import {
  getFindingPresentation,
  getRecommendationTitle,
  getSafetyDescription,
  getSafetyTitle,
} from "./analysis-presentation";

import {
  getAnalysisReportPolicy,
} from "./analysis-report";

import {
  buildAnalysisReport,
} from "./analysis-report-model";

import {
  generateAnalysisPdf,
} from "./analysis-pdf";

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
  const [visibleProducts, setVisibleProducts] =
    useState<Record<string, boolean>>(
      {},
    );

  const reportPolicy =
    getAnalysisReportPolicy(result);

  const productsBlocked =
    !reportPolicy.showProducts;

  const guidanceBlocked =
    !reportPolicy.showIngredientGuidance;

  function toggleProducts(
    recommendationId: string,
  ) {
    setVisibleProducts(
      (previous) => ({
        ...previous,
        [recommendationId]:
          !previous[
            recommendationId
          ],
      }),
    );
  }

  function handleDownloadPdf() {
    const report =
      buildAnalysisReport(result);

    generateAnalysisPdf(report);
  }

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

          {result.recommendations.length ===
          0 ? (
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
                ) => {
                  const guidance =
                    recommendation
                      .ingredientGuidance;

                  const productsAreVisible =
                    Boolean(
                      visibleProducts[
                        recommendation.id
                      ],
                    );

                  return (
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

                      {guidanceBlocked ? (
                        <div className="recommendation-blocked">
                          <span
                            className="recommendation-blocked__icon"
                            aria-hidden="true"
                          >
                            !
                          </span>

                          <div>
                            <h4>
                              Orientação de
                              fórmula pausada
                            </h4>

                            <p>
                              Identificamos
                              um sinal que
                              merece
                              avaliação
                              profissional
                              antes de testar
                              novos produtos
                              ou tratamentos.
                              Por isso, não
                              exibimos
                              orientações de
                              fórmula para
                              uso neste
                              momento.
                            </p>
                          </div>
                        </div>
                      ) : (
                        guidance && (
                          <div className="ingredient-guidance">
                            <div className="ingredient-guidance__intro">
                              <p className="ingredient-guidance__eyebrow">
                                Orientação de
                                fórmula
                              </p>

                              <h5>
                                O que procurar
                                na fórmula
                              </h5>

                              <p>
                                {
                                  guidance.summary
                                }
                              </p>
                            </div>

                            {guidance.lookFor
                              .length >
                              0 && (
                              <div className="ingredient-guidance__list">
                                {guidance.lookFor.map(
                                  (item) => (
                                    <article
                                      className="ingredient-guidance__item"
                                      key={
                                        item.id
                                      }
                                    >
                                      <h6>
                                        {
                                          item.name
                                        }
                                      </h6>

                                      <p>
                                        {
                                          item.purpose
                                        }
                                      </p>

                                      {item
                                        .examples
                                        .length >
                                        0 && (
                                        <div className="ingredient-guidance__examples">
                                          <span>
                                            Exemplos
                                            no
                                            rótulo
                                          </span>

                                          <div className="ingredient-guidance__tags">
                                            {item.examples.map(
                                              (
                                                example,
                                              ) => (
                                                <span
                                                  className="ingredient-guidance__tag"
                                                  key={`${item.id}-${example.inciName ?? example.name}`}
                                                >
                                                  {example.inciName ??
                                                    example.name}
                                                </span>
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

                            {guidance.avoid
                              .length >
                              0 && (
                              <div className="ingredient-guidance__avoid">
                                <h6>
                                  Pontos de
                                  atenção
                                </h6>

                                {guidance.avoid.map(
                                  (item) => (
                                    <div
                                      key={
                                        item.id
                                      }
                                    >
                                      <strong>
                                        {
                                          item.name
                                        }
                                      </strong>

                                      <p>
                                        {
                                          item.purpose
                                        }
                                      </p>
                                    </div>
                                  ),
                                )}
                              </div>
                            )}

                            <div className="ingredient-guidance__note">
                              <span
                                aria-hidden="true"
                              >
                                i
                              </span>

                              <p>
                                A presença de
                                um ingrediente
                                isolado não
                                garante o
                                desempenho do
                                produto. A
                                formulação como
                                um todo, a
                                combinação dos
                                componentes e o
                                modo de uso
                                também
                                importam.
                              </p>
                            </div>
                          </div>
                        )
                      )}

                      {productsBlocked ? (
                        <div className="recommendation-blocked">
                          <span
                            className="recommendation-blocked__icon"
                            aria-hidden="true"
                          >
                            !
                          </span>

                          <div>
                            <h4>
                              Sugestões de
                              produtos
                              pausadas
                            </h4>

                            <p>
                              As sugestões de
                              produtos do
                              catálogo foram
                              bloqueadas por
                              segurança neste
                              resultado.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="recommendation-products">
                          <div className="recommendation-products__summary">
                            <div>
                              <p className="recommendation-products__eyebrow">
                                Consulta
                                opcional
                              </p>

                              <h5>
                                Produtos
                                compatíveis
                              </h5>

                              <p>
                                Veja produtos
                                do catálogo
                                que atendem
                                aos critérios
                                desta
                                recomendação.
                                A marca não
                                determina a
                                recomendação.
                              </p>
                            </div>

                            {products.length >
                              0 && (
                              <button
                                className="recommendation-products__toggle"
                                type="button"
                                aria-expanded={
                                  productsAreVisible
                                }
                                onClick={() =>
                                  toggleProducts(
                                    recommendation.id,
                                  )
                                }
                              >
                                {productsAreVisible
                                  ? "Ocultar produtos"
                                  : "Ver produtos compatíveis"}
                              </button>
                            )}
                          </div>

                          {products.length ===
                          0 ? (
                            <div className="recommendation-card__empty">
                              Nenhum produto
                              do catálogo
                              atual atende
                              aos critérios
                              desta
                              recomendação.
                              Isso não altera
                              a orientação de
                              fórmula acima.
                            </div>
                          ) : (
                            productsAreVisible && (
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
                            )
                          )}
                        </div>
                      )}
                    </article>
                  );
                },
              )}
            </div>
          )}
        </section>
      </div>

      <footer className="analysis-result__footer">
        <div>
          <h3>
            Salve o resultado da sua análise
          </h3>

          <p>
            Baixe uma cópia em PDF para
            consultar suas orientações
            depois. Você também pode
            refazer a análise quando sua
            rotina, seus objetivos ou a
            percepção sobre o seu cabelo
            mudarem.
          </p>
        </div>

        <div className="analysis-result__footer-actions">
          <button
            className="analysis-result__download"
            type="button"
            onClick={handleDownloadPdf}
          >
            Baixar resultado em PDF
          </button>

          <button
            className="analysis-result__restart"
            type="button"
            onClick={onRestart}
          >
            Refazer análise
          </button>
        </div>
      </footer>
    </section>
  );
}