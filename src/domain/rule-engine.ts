import type { Finding } from "./finding";
import type { Observation } from "./observation";
import type { KnowledgeRule } from "./rule";

function isObservation(
  observation: Observation | undefined,
): observation is Observation {
  return observation !== undefined;
}

export function evaluateRule(
  rule: KnowledgeRule,
  observations: Observation[],
): Finding | null {
  
   if (rule.status !== "active") {
    return null;
  }  
  
  const matchedObservations = rule.conditions.map((condition) =>
    observations.find(
      (observation) =>
        observation.trait === condition.trait &&
        observation.value === condition.value,
    ),
  );

  const allConditionsMatched =
    matchedObservations.every(isObservation);

  if (!allConditionsMatched) {
    return null;
  }

  return {
    id: `finding_${rule.id}`,
    type: rule.produces.type,
    confidence: rule.produces.confidence,
    basedOn: matchedObservations.map(
      (observation) => observation.id,
    ),
    evidence: rule.evidence,
    explanation: rule.rationale,
  };
}