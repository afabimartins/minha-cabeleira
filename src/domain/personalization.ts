import type {
  Observation,
  ObservationValue,
} from "./observation";

import type {
  RecommendationResult,
} from "./analysis-result";

import {
  rankProducts,
} from "./product-ranking";

import {
  selectMinimalRoutine,
} from "./minimal-routine";

export type PersonalizationPreferences = {
  primaryGoal?: ObservationValue;

  routineComplexity?: ObservationValue;

  budgetPriority?: ObservationValue;
};

export function getPersonalizationPreferences(
  observations: Observation[],
): PersonalizationPreferences {
  return {
    primaryGoal: observations.find(
      (observation) =>
        observation.trait ===
        "primary_goal",
    )?.value,

    routineComplexity: observations.find(
      (observation) =>
        observation.trait ===
        "routine_complexity",
    )?.value,

    budgetPriority: observations.find(
      (observation) =>
        observation.trait ===
        "budget_priority",
    )?.value,
  };
}

function getGoalPriority(
  recommendationResult:
    RecommendationResult,
  primaryGoal:
    ObservationValue | undefined,
): number {
  const type =
    recommendationResult
      .recommendation.type;

  if (
    (primaryGoal ===
      "reduce_breakage" ||
      primaryGoal ===
        "retain_length") &&
    (type === "damage_protection" ||
      type === "goal_breakage_support")
  ) {
    return 0;
  }

  if (
    primaryGoal ===
      "improve_softness" &&
    (type === "conditioning_support" ||
      type === "goal_softness_support")
  ) {
    return 0;
  }

  if (
    primaryGoal ===
      "control_frizz" &&
    (type === "moisture_support" ||
      type === "goal_frizz_support")
  ) {
    return 0;
  }

  if (
    primaryGoal ===
      "improve_definition" &&
    type === "goal_definition_support"
  ) {
    return 0;
  }

  if (
    primaryGoal ===
      "simplify_routine" &&
    type ===
      "goal_routine_simplification"
  ) {
    return 0;
  }

  return 1;
}

function rankProductsForBudget(
  recommendationResult:
    RecommendationResult,
  budgetPriority:
    ObservationValue | undefined,
): RecommendationResult {
  if (
    budgetPriority !== "lowest_price"
  ) {
    return {
      ...recommendationResult,

      products: rankProducts(
        recommendationResult.products,
        "default",
      ),
    };
  }

  return {
    ...recommendationResult,

    products: rankProducts(
      recommendationResult.products,
      "lowest_price",
    ),
  };
}

function applyMinimalRoutine(
  recommendationResults:
    RecommendationResult[],
): RecommendationResult[] {
  const selectedProducts =
    selectMinimalRoutine(
      recommendationResults,
    );

  const selectedProductIds =
    new Set(
      selectedProducts.map(
        (product) => product.id,
      ),
    );

  return recommendationResults.map(
    (recommendationResult) => ({
      ...recommendationResult,

      products:
        recommendationResult.products.filter(
          (product) =>
            selectedProductIds.has(
              product.id,
            ),
        ),
    }),
  );
}

export function personalizeRecommendations(
  recommendationResults:
    RecommendationResult[],
  observations: Observation[],
): RecommendationResult[] {
  const preferences =
    getPersonalizationPreferences(
      observations,
    );

  const rankedResults =
    recommendationResults.map(
      (recommendationResult) =>
        rankProductsForBudget(
          recommendationResult,
          preferences.budgetPriority,
        ),
    );

  const routineAdjustedResults =
    preferences.routineComplexity ===
    "minimal"
      ? applyMinimalRoutine(
          rankedResults,
        )
      : rankedResults;

  return routineAdjustedResults
    .map(
      (
        recommendationResult,
        originalIndex,
      ) => ({
        recommendationResult,

        originalIndex,

        priority: getGoalPriority(
          recommendationResult,
          preferences.primaryGoal,
        ),
      }),
    )
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }

      return (
        a.originalIndex -
        b.originalIndex
      );
    })
    .map(
      ({
        recommendationResult,
      }) => recommendationResult,
    );
}