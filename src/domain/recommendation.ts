import type {
  FindingConfidence,
} from "./finding";

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
};