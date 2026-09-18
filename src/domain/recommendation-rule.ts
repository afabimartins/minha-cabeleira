import type { FindingConfidence } from "./finding";

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
  };

  evidence: string[];
  rationale: string;
};