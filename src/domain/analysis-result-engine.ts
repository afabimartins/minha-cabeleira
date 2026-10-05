import type {
  Diagnosis,
} from "./diagnosis";

import type {
  Product,
} from "./product";

import type {
  AnalysisResult,
  RecommendationResult,
} from "./analysis-result";

import type {
  RecommendationRule,
} from "./recommendation-rule";

import type {
  Observation,
} from "./observation";

import {
  buildRecommendations,
} from "./recommendation-engine";

import {
  buildGoalFallbackRecommendation,
} from "./goal-fallback-recommendation";

import {
  selectProducts,
} from "./product-selection";

import {
  assessSafety,
} from "./safety-engine";

import {
  personalizeRecommendations,
} from "./personalization";

import {
  buildRoutineGuidance,
} from "./routine-guidance-engine";

import {
  selectRoutineProducts,
} from "./routine-product-selection";

export function buildAnalysisResult(
  diagnosis: Diagnosis,
  observations: Observation[],
  products: Product[],
  recommendationRules: RecommendationRule[],
): AnalysisResult {
  const safety =
    assessSafety(observations);

  const diagnosticRecommendations =
    buildRecommendations(
      recommendationRules,
      diagnosis.findings,
    );

  /*
   * Uma análise normal não deve terminar sem nenhuma orientação de
   * fórmula apenas porque os sinais não atingiram o limiar das regras
   * diagnósticas específicas. Quando não existe recomendação derivada
   * dos achados, usamos a prioridade declarada pela pessoa como uma
   * camada de personalização — nunca como diagnóstico.
   *
   * Em caution/stop não criamos fallback de objetivo. A camada de
   * segurança e as orientações gerais da interface continuam prevalecendo.
   */
  const goalFallback =
    diagnosticRecommendations.length === 0 &&
    safety.level === "normal"
      ? buildGoalFallbackRecommendation(
          observations,
        )
      : null;

  const recommendations =
    goalFallback
      ? [goalFallback]
      : diagnosticRecommendations;

  const recommendationResults:
    RecommendationResult[] =
      recommendations.map(
        (recommendation) => ({
          recommendation,

          products:
            safety.canRecommendProducts &&
            recommendation.productCriteria
              ? selectProducts(
                  products,
                  recommendation.productCriteria,
                )
              : [],
        }),
      );

  const personalizedRecommendations =
    safety.canRecommendProducts
      ? personalizeRecommendations(
          recommendationResults,
          observations,
        )
      : recommendationResults;

  const routineGuidance =
    buildRoutineGuidance(
      personalizedRecommendations,
      observations,
    );

  const routineProducts =
    safety.canRecommendProducts
      ? selectRoutineProducts(
          products,
          personalizedRecommendations,
          observations,
        )
      : [];

  return {
    diagnosis,

    safety,

    recommendations:
      personalizedRecommendations,

    routineGuidance,

    routineProducts,
  };
}
