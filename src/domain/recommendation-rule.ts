import type {
  FindingConfidence,
} from "./finding";

import type {
  ProductCriteria,
} from "./product-criteria";

export type RecommendationRuleStatus =
  | "draft"
  | "active"
  | "retired";

export type RecommendationRule = {
  id: string;

  name: string;

  status: RecommendationRuleStatus;

  version: number;

  requiresFindings: string[];

  produces: {
    type: string;

    confidence: FindingConfidence;

    productCriteria?: ProductCriteria;
  };

  evidence: string[];

  rationale: string;
};