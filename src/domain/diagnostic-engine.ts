import type { Observation } from "./observation";
import type { KnowledgeRule } from "./rule";

import {
  evaluateKnowledgeBase,
} from "./knowledge-engine";

import {
  consolidateFindings,
} from "./finding-engine";

import {
  buildHairProfile,
} from "./hair-profile";

export function evaluateHairProfile(
  rules: KnowledgeRule[],
  observations: Observation[],
) {
  const findings = evaluateKnowledgeBase(
    rules,
    observations,
  );

  const consolidatedFindings =
    consolidateFindings(findings);

  const profile = buildHairProfile(
    consolidatedFindings,
  );

  return {
    observations,
    findings,
    consolidatedFindings,
    profile,
  };
}