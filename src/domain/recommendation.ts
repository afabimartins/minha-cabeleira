import type {
  FindingConfidence,
} from "./finding";

import type {
  IngredientGuidance,
} from "./ingredient-guidance";

import type {
  ProductCriteria,
} from "./product-criteria";

export type RecommendationStatus =
  | "candidate"
  | "supported"
  | "blocked";

export type Recommendation = {
  id: string;

  type: string;

  status: RecommendationStatus;

  confidence: FindingConfidence;

  basedOnFindings: string[];

  evidence: string[];

  rationale: string;

  ingredientGuidance?: IngredientGuidance;

  productCriteria?: ProductCriteria;
};