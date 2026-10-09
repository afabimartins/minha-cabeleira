
import {
  InternalLink,
} from "./InternalLink";

import {
  getGlossaryEntryByLabel,
} from "./glossary-data";

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
  trackAnalyticsEvent,
} from "./analytics";




type AnalysisResultViewProps = {

  result: AnalysisResult;

  onRestart: () => void;

};

type ProductWithCatalogMeta = {
  productUrl?: string;
  retailer?: string;
  linkType?: "editorial" | "affiliate" | "sponsored";
  verifiedAt?: string;
  priceCheckedAt?: string;
  imageUrl?: string;
  size?: string;
  sourceUrl?: string;
};


type BaselinePriority = {
  title: string;
  description: string;
  actions: string[];
};

function getBaselinePriority(
  result: AnalysisResult,
): BaselinePriority | null {
  if (result.recommendations.length > 0) {
    return null;
  }

  if (result.safety.level === "stop") {
    return {
      title: "Prioridade de segurança",
      description:
        "Algumas respostas pedem mais cautela antes de testar novos produtos ou tratamentos. Neste momento, a prioridade é preservar o couro cabeludo e buscar avaliação profissional quando indicado.",
      actions: [
        "Evite iniciar vários produtos ou procedimentos novos ao mesmo tempo.",
        "Mantenha apenas uma rotina essencial e confortável até o quadro estar esclarecido.",
        "Procure avaliação profissional se os sinais persistirem, piorarem ou forem intensos.",
      ],
    };
  }

  if (result.safety.level === "caution") {
    return {
      title: "Cuidar primeiro do couro cabeludo",
      description:
        "A análise encontrou um sinal que merece cautela. Antes de acrescentar novos ativos ou produtos, vale simplificar a rotina e observar como o couro cabeludo responde.",
      actions: [
        "Evite testar vários produtos novos de uma vez.",
        "Prefira uma rotina simples e interrompa o uso de algo que provoque desconforto.",
        "Se o sinal persistir ou ficar mais intenso, procure avaliação profissional.",
      ],
    };
  }

  const findingTypes = result.diagnosis.findings.map(
    (finding) => finding.type.toLowerCase(),
  );

  if (
    findingTypes.some((type) => type.includes("heat"))
  ) {
    return {
      title: "Reduzir desgaste durante o uso de calor",
      description:
        "Você relatou exposição frequente ao calor. Isso, isoladamente, não significa que exista dano, mas justifica uma rotina mais cuidadosa sempre que secador, chapinha ou modelador forem usados.",
      actions: [
        "Use a menor temperatura que funcione para o resultado desejado.",
        "Evite concentrar calor por muito tempo no mesmo ponto ou repetir passadas sem necessidade.",
        "Observe se aumentam aspereza, embaraço ou quebra e ajuste a frequência se isso acontecer.",
      ],
    };
  }

  if (
    findingTypes.some((type) => type.includes("chemical"))
  ) {
    return {
      title: "Evitar sobreposição desnecessária de processos",
      description:
        "A exposição química relatada é relevante para o histórico do cabelo. Mesmo sem evidência suficiente para uma recomendação técnica específica, vale reduzir intervenções acumuladas e acompanhar a resposta da fibra.",
      actions: [
        "Evite repetir processos químicos antes de entender como o cabelo respondeu ao anterior.",
        "Dê atenção ao desembaraço e à manipulação gentil no comprimento.",
        "Observe mudanças de elasticidade, aspereza e quebra antes de aumentar a complexidade da rotina.",
      ],
    };
  }

  if (result.diagnosis.findings.length === 0) {
    return {
      title: "Manter uma rotina-base e observar respostas",
      description:
        "Suas respostas não concentraram evidências suficientes para apontar uma prioridade técnica única. Isso não torna a análise inútil: o melhor ponto de partida é uma rotina simples que permita perceber com clareza como o cabelo responde.",
      actions: [
        "Mantenha limpeza compatível com o conforto do couro cabeludo.",
        "Condicione o comprimento sempre que houver mais aspereza ou embaraço.",
        "Evite aumentar a quantidade de etapas até identificar o que realmente melhora o cabelo.",
      ],
    };
  }

  return {
    title: "Consolidar uma rotina simples",
    description:
      "A análise registrou informações úteis, mas nenhuma delas, sozinha, sustenta uma recomendação técnica mais específica. A prioridade é manter a rotina previsível e observar respostas antes de adicionar novas etapas.",
    actions: [
      "Faça mudanças uma de cada vez para conseguir perceber o efeito de cada etapa.",
      "Priorize desembaraço e manipulação com pouco atrito.",
      "Reavalie a análise quando houver mudança importante na rotina ou no comportamento do cabelo.",
    ],
  };
}



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




function getRoutineProductCategoryLabel(
  category: string,
): string {
  switch (category) {
    case "shampoo":
      return "Shampoo";
    case "conditioner":
      return "Condicionador";
    case "mask":
      return "Máscara / tratamento";
    case "leave_in":
      return "Finalizador / creme / leave-in";
    case "oil":
      return "Óleo / sérum";
    case "scalp":
      return "Cuidado do couro cabeludo";
    default:
      return "Produto";
  }
}

function getRoutineProductMatchLabel(
  level: string,
): string {
  switch (level) {
    case "exact":
      return "Correspondência alta";
    case "compatible":
      return "Correspondência parcial";
    case "basic":
      return "Opção básica da categoria";
    default:
      return "Catálogo incompleto";
  }
}

function RoutineProductsSection({
  selections,
}: {
  selections: NonNullable<
    AnalysisResult["routineProducts"]
  >;
}) {
  return (
    <div className="routine-products routine-products--final">
      <div className="routine-products__intro">
        <p className="routine-products__eyebrow">
          Consulta opcional
        </p>

        <h4>
          Produtos compatíveis por categoria
        </h4>

        <p>
          Primeiro vem a orientação técnica sobre necessidades, tipos de
          ingredientes e exemplos no rótulo. Só depois mostramos opções do
          catálogo compatíveis com esses critérios. Quando o catálogo permite,
          exibimos até três marcas diferentes por categoria para reduzir
          concentração comercial. A ordem não representa preferência de marca.
        </p>
      </div>

      <div className="routine-products__categories">
        {selections.map((selection) => {
          const options =
            selection.options?.length
              ? selection.options
              : selection.product
                ? [
                    {
                      product: selection.product,
                      matchLevel:
                        selection.matchLevel,
                      matchedAttributes:
                        selection.matchedAttributes,
                      missingAttributes:
                        selection.missingAttributes,
                    },
                  ]
                : [];

          const target =
            selection.targetOptionCount ?? 3;
          const missingCount = Math.max(
            0,
            target - options.length,
          );

          return (
            <section
              className="routine-product-category"
              key={selection.category}
            >
              <div className="routine-product-category__heading">
                <div>
                  <p className="routine-product-slot__category">
                    {getRoutineProductCategoryLabel(
                      selection.category,
                    )}
                  </p>
                  <h5>
                    {options.length} de {target} marcas disponíveis
                  </h5>
                </div>

                {missingCount > 0 ? (
                  <span className="routine-product-category__gap">
                    Faltam {missingCount} {missingCount === 1 ? "marca" : "marcas"}
                  </span>
                ) : (
                  <span className="routine-product-category__complete">
                    Cobertura diversificada
                  </span>
                )}
              </div>

              {options.length === 0 ? (
                <article className="routine-product-slot routine-product-slot--missing">
                  <strong>Categoria sem produto ativo</strong>
                  <p>
                    O catálogo precisa de opções verificadas nesta categoria.
                  </p>
                </article>
              ) : (
                <div className="routine-product-options">
                  {options.map((option) => {
                    const product = option.product;
                    const metadata =
                      product as typeof product &
                        ProductWithCatalogMeta;

                    return (
                      <article
                        className="routine-product-slot"
                        key={product.id}
                      >
                        <div className="routine-product-slot__topline">
                          <span className="routine-product-slot__brand">
                            {product.brand}
                          </span>
                          <span
                            className={`routine-product-slot__match routine-product-slot__match--${option.matchLevel}`}
                          >
                            {getRoutineProductMatchLabel(
                              option.matchLevel,
                            )}
                          </span>
                        </div>

                        <div className="routine-product-slot__body">
                          {metadata.imageUrl ? (
                            <div className="routine-product-slot__image-wrap">
                              <img
                                className="routine-product-slot__image"
                                src={metadata.imageUrl}
                                alt={`Embalagem de ${product.brand} ${product.name}`}
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div
                              className="routine-product-slot__image-wrap routine-product-slot__image-wrap--placeholder"
                              aria-hidden="true"
                            >
                              <span>
                                {product.brand.slice(0, 1)}
                              </span>
                            </div>
                          )}

                          <div className="routine-product-slot__details">
                            <h5>{product.name}</h5>

                            {metadata.size ? (
                              <p className="routine-product-slot__size">
                                {metadata.size}
                              </p>
                            ) : null}

                            <p className="routine-product-slot__price">
                              {formatPrice(
                                product.price,
                                product.currency,
                              )}
                            </p>

                            {metadata.productUrl ? (
                              <a
                                className="product-card__link"
                                href={metadata.productUrl}
                                target="_blank"
                                rel="noreferrer noopener sponsored"
                                onClick={() =>
                                  trackAnalyticsEvent(
                                    "recommended_product_click",
                                    {
                                      placement:
                                        "routine_diverse",
                                      ...(metadata.linkType
                                        ? {
                                            link_type:
                                              metadata.linkType,
                                          }
                                        : {}),
                                    },
                                  )
                                }
                              >
                                Ver produto
                                <span aria-hidden="true">
                                  ↗
                                </span>
                              </a>
                            ) : null}

                            {metadata.linkType &&
                            metadata.linkType !== "editorial" ? (
                              <span className="product-card__commercial-note">
                                {metadata.linkType === "affiliate"
                                  ? "Link afiliado"
                                  : "Conteúdo patrocinado"}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
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

  const reportPolicy =
    getAnalysisReportPolicy(result);

  const productsBlocked =
    !reportPolicy.showProducts;

  const guidanceBlocked =
    !reportPolicy.showIngredientGuidance;

  const baselinePriority =
    getBaselinePriority(result);

  const displayedPriorityCount =
    result.recommendations.length > 0
      ? result.recommendations.length
      : baselinePriority
        ? 1
        : 0;


  async function handleDownloadPdf() {

    const report =

      buildAnalysisReport(result);



    const {

      generateAnalysisPdf,

    } = await import(

      "./analysis-pdf"

    );



    await generateAnalysisPdf(report);

    trackAnalyticsEvent(
      "analysis_pdf_download",
    );

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



          <span>

            Análise concluída

          </span>

        </div>



        <h2>

          Seu cabelo, traduzido em prioridades.

        </h2>



        <p>

          Organizamos suas respostas

          para destacar os sinais

          observados, os cuidados

          importantes e o que pode

          fazer mais sentido priorizar

          na sua rotina.

        </p>

        <div className="analysis-result__summary" aria-label="Resumo da análise">
          <div className="analysis-result__summary-item">
            <strong>{result.diagnosis.findings.length}</strong>
            <span>{result.diagnosis.findings.length === 1 ? "sinal observado" : "sinais observados"}</span>
          </div>

          <div className="analysis-result__summary-divider" aria-hidden="true" />

          <div className="analysis-result__summary-item">
            <strong>{displayedPriorityCount}</strong>
            <span>{displayedPriorityCount === 1 ? "prioridade" : "prioridades"}</span>
          </div>

          <div className="analysis-result__summary-divider" aria-hidden="true" />

          <div className={`analysis-result__summary-item analysis-result__summary-item--${result.safety.level}`}>
            <strong>{result.safety.level === "normal" ? "✓" : "!"}</strong>
            <span>{getSafetyTitle(result.safety.level)}</span>
          </div>
        </div>

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



              <h3>

                Segurança

              </h3>

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



          {result.routineGuidance.length >

            0 && (

            <div className="routine-guidance">

              <p className="routine-guidance__eyebrow">

                Na sua rotina

              </p>



              <div className="routine-guidance__list">

                {result.routineGuidance.map(

                  (guidance) => (

                    <article

                      className="routine-guidance__card"

                      key={guidance.id}

                    >

                      <div

                        className="routine-guidance__mark"

                        aria-hidden="true"

                      />



                      <div>

                        <h4>

                          {

                            guidance.title

                          }

                        </h4>



                        <p>

                          {

                            guidance.description

                          }

                        </p>

                      </div>

                    </article>

                  ),

                )}

              </div>

            </div>

          )}



          {result.recommendations.length ===

          0 ? (

            baselinePriority ? (
              <article className="analysis-baseline-priority">
                <span className="analysis-baseline-priority__label">
                  Prioridade inicial
                </span>

                <h4>{baselinePriority.title}</h4>

                <p>{baselinePriority.description}</p>

                <ul>
                  {baselinePriority.actions.map((action) => (
                    <li key={action}>{action}</li>
                  ))}
                </ul>

                <small>
                  Esta orientação é uma base de cuidado e não substitui avaliação profissional quando houver sinais de saúde.
                </small>
              </article>
            ) : (
              <div className="analysis-empty">
                <p>
                  Ainda não há uma recomendação específica para este resultado.
                </p>
              </div>
            )

          ) : (

            <div className="recommendation-list">

              {result.recommendations.map(

                (

                  {

                    recommendation,

                  },

                  index,

                ) => {

                  const guidance =

                    recommendation

                      .ingredientGuidance;



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

                                                (() => {
                                                  const label =
                                                    example.inciName ??
                                                    example.name;

                                                  const glossaryEntry =
                                                    getGlossaryEntryByLabel(
                                                      label,
                                                    );

                                                  if (!glossaryEntry) {
                                                    return (
                                                      <span
                                                        className="ingredient-guidance__tag"
                                                        key={`${item.id}-${label}`}
                                                      >
                                                        {label}
                                                      </span>
                                                    );
                                                  }

                                                  return (
                                                    <InternalLink
                                                      className="ingredient-guidance__tag ingredient-guidance__tag--link"
                                                      to={`/glossario/${glossaryEntry.slug}`}
                                                      title={`Abrir ${glossaryEntry.name} no glossário`}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                      key={`${item.id}-${label}`}
                                                    >
                                                      {label}
                                                      <span aria-hidden="true">↗</span>
                                                    </InternalLink>
                                                  );
                                                })()

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



                    </article>

                  );

                },

              )}

            </div>

          )}

          {productsBlocked ? (
            <div className="recommendation-blocked recommendation-blocked--products-final">
              <span
                className="recommendation-blocked__icon"
                aria-hidden="true"
              >
                !
              </span>

              <div>
                <h4>Sugestões de produtos pausadas</h4>
                <p>
                  As sugestões de produtos do catálogo foram bloqueadas
                  por segurança neste resultado.
                </p>
              </div>
            </div>
          ) : (result.routineProducts?.length ?? 0) > 0 ? (
            <RoutineProductsSection
              selections={result.routineProducts ?? []}
            />
          ) : null}

        </section>

      </div>



      <footer className="analysis-result__footer">

        <div>

          <h3>

            Salve o resultado da sua

            análise

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