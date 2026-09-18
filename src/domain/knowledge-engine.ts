import type { Finding } from "./finding";
import type { Observation } from "./observation";
import { evaluateRule } from "./rule-engine";
import type { KnowledgeRule } from "./rule";

export function evaluateKnowledgeBase(
  rules: KnowledgeRule[],
  observations: Observation[],
): Finding[] {
  return rules
    .map((rule) => evaluateRule(rule, observations))
    .filter((finding): finding is Finding => finding !== null);
}