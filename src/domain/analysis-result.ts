import type {
  Diagnosis,
} from "./diagnosis";

import type {
  Product,
} from "./product";

import type {
  Recommendation,
} from "./recommendation";

import type {
  SafetyAssessment,
} from "./safety";

export type RecommendationResult = {
  recommendation: Recommendation;
  products: Product[];
};

export type AnalysisResult = {
  diagnosis: Diagnosis;

  safety: SafetyAssessment;

  recommendations:
    RecommendationResult[];
};