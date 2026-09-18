import type { Finding } from "./finding";
import type { Observation } from "./observation";
import type { KnowledgeRule } from "./rule";

import {
  evaluateRules,
} from "./rule-engine";

export function evaluateKnowledgeBase(
  rules: KnowledgeRule[],
  observations: Observation[],
): Finding[] {
  return evaluateRules(
    rules,
    observations,
  );
}