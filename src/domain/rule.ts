import type { FindingConfidence, FindingType } from "./finding";
import type { ObservationTrait } from "./observation";

export type RuleStatus =
  | "draft"
  | "reviewed"
  | "active"
  | "retired";

export type RuleCondition = {
  trait: ObservationTrait;
  value: string | number | boolean;
};

export type KnowledgeRule = {
  id: string;
  name: string;
  description: string;

  conditions: RuleCondition[];

  produces: {
    type: FindingType;
    confidence: FindingConfidence;
  };

  evidence: string[];

  rationale: string;

  status: RuleStatus;
  version: number;
};