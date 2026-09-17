import type { Finding } from "../finding";
import type { Observation } from "../observation";

export function evaluateConditioningResponse(
  observations: Observation[],
): Finding | null {
  const hasRoughness = observations.some(
    (observation) =>
      observation.trait === "post_wash_roughness" &&
      observation.value === "high",
  );

  const hasTangling = observations.some(
    (observation) =>
      observation.trait === "wet_tangling" &&
      observation.value === "high",
  );

  const hasConditionerImprovement = observations.some(
    (observation) =>
      observation.trait === "conditioning_improvement" &&
      observation.value === "high",
  );

  if (!hasRoughness || !hasTangling || !hasConditionerImprovement) {
    return null;
  }

  return {
    id: "finding_strong_conditioning_response",
    type: "strong_conditioning_response",
    confidence: "high",
    basedOn: observations
      .filter((observation) =>
        [
          "post_wash_roughness",
          "wet_tangling",
          "conditioning_improvement",
        ].includes(observation.trait),
      )
      .map((observation) => observation.id),
    evidence: [],
    explanation:
      "A pessoa relatou aspereza após a lavagem, dificuldade para desembaraçar e melhora acentuada com condicionador.",
  };
}