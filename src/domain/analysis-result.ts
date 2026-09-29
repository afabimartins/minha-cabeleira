import type {
  Diagnosis,
} from "./diagnosis";

import type {
  Product,
  ProductCategory,
} from "./product";

import type {
  Recommendation,
} from "./recommendation";

import type {
  SafetyAssessment,
} from "./safety";

import type {
  RoutineGuidance,
} from "./routine-guidance";


export type RoutineProductMatchLevel =
  | "exact"
  | "compatible"
  | "basic"
  | "missing";

export type RoutineProductSelection = {
  category: ProductCategory;
  product: Product | null;
  matchLevel: RoutineProductMatchLevel;
  matchedAttributes: string[];
  missingAttributes: string[];
};

export type RecommendationResult = {
  recommendation: Recommendation;

  products: Product[];
};

export type AnalysisResult = {
  diagnosis: Diagnosis;

  safety: SafetyAssessment;

  recommendations:
    RecommendationResult[];

  routineGuidance:
    RoutineGuidance[];

  routineProducts?:
    RoutineProductSelection[];
};