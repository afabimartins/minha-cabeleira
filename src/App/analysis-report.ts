import type {
  AnalysisResult,
} from "../domain/analysis-result";

export type AnalysisReportPolicy = {
  showIngredientGuidance: boolean;
  showProducts: boolean;
};

export function getAnalysisReportPolicy(
  result: AnalysisResult,
): AnalysisReportPolicy {
  return {
    showIngredientGuidance:
      result.safety.level !== "stop",

    showProducts:
      result.safety.canRecommendProducts,
  };
}