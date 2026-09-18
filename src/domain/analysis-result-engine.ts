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
): AnalysisResult {
  const safety =
    assessSafety(observations);

  const recommendations =
  buildRecommendations(
    [],
    diagnosis.findings,
  );

  const recommendationResults:
    RecommendationResult[] =
      recommendations.map(
        (recommendation) => ({
          recommendation,

          products:
            safety.canRecommendProducts
              ? selectProducts(
                  products,
recommendation.productCriteria ?? {
  categories: [],
  requiredAttributes: [],
},
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