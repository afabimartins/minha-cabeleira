import type {
  ObservationTrait,
  ObservationValue,
} from "./observation";

import type {
  FindingConfidence,
} from "./finding";

export type RuleStatus =
  | "draft"
  | "active"
  | "retired";

export type RuleCondition = {
  trait: ObservationTrait;
  value: ObservationValue;
};

export type KnowledgeRule = {
  id: string;

  name: string;

  description: string;

  status: RuleStatus;

  version: number;

  conditions: RuleCondition[];

  produces: {
    type: string;
    confidence: FindingConfidence;
  };

  evidence: string[];

  rationale: string;
};