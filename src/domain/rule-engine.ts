import type { Finding } from "./finding";
import type { Observation } from "./observation";
import type { KnowledgeRule } from "./rule";

function findMatchingObservation(
  observations: Observation[],
  trait: KnowledgeRule["conditions"][number]["trait"],
  value: KnowledgeRule["conditions"][number]["value"],
): Observation | undefined {
  return observations.find(
    (observation) =>
      observation.trait === trait &&
      observation.value === value,
  );
}

export function evaluateRule(
  rule: KnowledgeRule,
  observations: Observation[],
): Finding | null {
  if (rule.status !== "active") {
    return null;
  }

  const matchedObservations = rule.conditions.map(
    (condition) =>
      findMatchingObservation(
        observations,
        condition.trait,
        condition.value,
      ),
  );

  const allConditionsMatched =
    matchedObservations.every(
      (observation) => observation !== undefined,
    );

  if (!allConditionsMatched) {
    return null;
  }

  const basedOn = matchedObservations
    .filter(
      (observation): observation is Observation =>
        observation !== undefined,
    )
    .map((observation) => observation.id);

  return {
    id: `finding_${rule.id}`,
    type: rule.produces.type,
    confidence: rule.produces.confidence,
    basedOn,
    evidence: rule.evidence,
    explanation: rule.rationale,
  };
}

export function evaluateRules(
  rules: KnowledgeRule[],
  observations: Observation[],
): Finding[] {
  return rules
    .map((rule) =>
      evaluateRule(rule, observations),
    )
    .filter(
      (finding): finding is Finding =>
        finding !== null,
    );
}