import type {
  Observation,
} from "./observation";

import type {
  RecommendationResult,
} from "./analysis-result";

import type {
  RoutineGuidance,
} from "./routine-guidance";

function findObservation(
  observations: Observation[],
  trait: string,
): Observation | undefined {
  return observations.find(
    (observation) =>
      observation.trait === trait,
  );
}

function hasRecommendation(
  recommendationResults:
    RecommendationResult[],
  type: string,
): boolean {
  return recommendationResults.some(
    (recommendationResult) =>
      recommendationResult
        .recommendation.type === type,
  );
}

export function buildRoutineGuidance(
  recommendationResults:
    RecommendationResult[],
  observations: Observation[],
): RoutineGuidance[] {
  const guidance: RoutineGuidance[] = [];

  const conditioningFrequency =
    findObservation(
      observations,
      "conditioning_frequency",
    );

  if (
    hasRecommendation(
      recommendationResults,
      "conditioning_support",
    ) &&
    conditioningFrequency?.value ===
      "rarely"
  ) {
    guidance.push({
      id:
        "routine_guidance_conditioning_frequency",

      type:
        "conditioning_frequency_support",

      title:
        "Condicionamento na sua rotina",

      description:
        "Seu resultado indica boa resposta ao condicionamento, enquanto você relatou usar condicionador ou máscara raramente. Nas lavagens em que perceber mais aspereza ou embaraço, priorizar uma etapa de condicionamento pode ajudar a aproveitar melhor essa resposta do seu cabelo.",

      basedOn: [
        conditioningFrequency.id,
      ],

      relatedRecommendationType:
        "conditioning_support",

      context: {
        trait:
          "conditioning_frequency",

        value:
          conditioningFrequency.value,
      },
    });
  }

  return guidance;
}