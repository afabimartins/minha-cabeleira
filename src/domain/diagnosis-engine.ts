import type { Observation } from "./observation";
import type { KnowledgeRule } from "./rule";
import type { Diagnosis } from "./diagnosis";

import { evaluateKnowledgeBase } from "./knowledge-engine";
import { assessFindings } from "./assessment-engine";
import { consolidateFindings } from "./finding-engine";
import { buildHairProfile } from "./hair-profile";

export function buildDiagnosis(
  rules: KnowledgeRule[],
  observations: Observation[],
): Diagnosis {
  const findings = evaluateKnowledgeBase(
    rules,
    observations,
  );

  const assessment = assessFindings(findings);

  const findingSummaries =
    consolidateFindings(findings);

  const profile =
    buildHairProfile(findingSummaries);

  return {
    findings,
    assessment,
    profile,
  };
}