import type {
  RecommendationRule,
} from "./recommendation-rule";

export type RecommendationRegistry = {
  rules: RecommendationRule[];
};

export function createRecommendationRegistry(
  rules: RecommendationRule[],
): RecommendationRegistry {
  return {
    rules,
  };
}

export function getActiveRecommendationRules(
  registry: RecommendationRegistry,
): RecommendationRule[] {
  return registry.rules.filter(
    (rule) => rule.status === "active",
  );
}