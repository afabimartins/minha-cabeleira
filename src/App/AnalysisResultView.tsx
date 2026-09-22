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

export function AnalysisResultView({
  result,
  onRestart,
}: AnalysisResultViewProps) {
  const canRecommendProducts =
    result.safety.canRecommendProducts;

  return (
    <section>
      <header>
        <p>Análise concluída</p>

        <h2>
          Entendemos melhor o que seu
          cabelo está mostrando.
        </h2>
      </header>

      <div>
        <h3>
          O que observamos no seu cabelo
        </h3>

        {result.diagnosis.findings.length ===
        0 ? (
          <p>
            Ainda não encontramos
            evidências suficientes para
            destacar um padrão específico
            a partir das suas respostas.
          </p>
        ) : (
          <div>
            {result.diagnosis.findings.map(
              (finding) => {
                const presentation =
                  getFindingPresentation(
                    finding,
                  );

                return (
                  <article
                    key={finding.id}
                  >
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
                  </article>
                );
              },
            )}
          </div>
        )}
      </div>

      <div>
        <h3>Segurança</h3>

        <h4>
          {getSafetyTitle(
            result.safety.level,
          )}
        </h4>

        <p>
          {getSafetyDescription(result)}
        </p>

        {result.safety.notices.length >
          0 && (
          <div>
            {result.safety.notices.map(
              (notice, index) => (
                <p
                  key={`${notice.code}-${index}`}
                >
                  {notice.message}
                </p>
              ),
            )}
          </div>
        )}
      </div>

      <div>
        <h3>
          O que priorizar na sua rotina
        </h3>

        {!canRecommendProducts ? (
          <p>
            As sugestões de produtos
            foram temporariamente
            bloqueadas por segurança.
          </p>
        ) : result.recommendations.length ===
          0 ? (
          <p>
            Ainda não há uma recomendação
            específica para este
            resultado.
          </p>
        ) : (
          result.recommendations.map(
            ({
              recommendation,
              products,
            }) => (
              <article
                key={recommendation.id}
              >
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

                {products.length === 0 ? (
                  <p>
                    Nenhum produto do
                    catálogo atual atende
                    aos critérios desta
                    recomendação.
                  </p>
                ) : (
                  <>
                    <h5>
                      Produtos compatíveis
                    </h5>

                    <div>
                      {products.map(
                        (product) => (
                          <article
                            key={product.id}
                          >
                            <strong>
                              {
                                product.name
                              }
                            </strong>

                            <p>
                              {
                                product.brand
                              }
                            </p>

                            <p>
                              {formatPrice(
                                product.price,
                                product.currency,
                              )}
                            </p>
                          </article>
                        ),
                      )}
                    </div>
                  </>
                )}
              </article>
            ),
          )
        )}
      </div>

      <button
        type="button"
        onClick={onRestart}
      >
        Refazer análise
      </button>
    </section>
  );
}