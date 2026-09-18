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

import {
  buildRecommendations,
} from "./recommendation-engine";

import {
  selectProducts,
} from "./product-selection";

import {
  assessSafety,
} from "./safety-engine";

import type {
  Observation,
} from "./observation";

export function buildAnalysisResult(
  diagnosis: Diagnosis,
  observations: Observation[],
  products: Product[],
  recommendationRules: RecommendationRule[],
): AnalysisResult {
  const safety =
    assessSafety(observations);

  const recommendations =
    buildRecommendations(
      recommendationRules,
      diagnosis.findings,
    );

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

  return {
    diagnosis,
    safety,
    recommendations:
      recommendationResults,
  };
}