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

  const stylingFrequency =
    findObservation(
      observations,
      "styling_frequency",
    );

  if (
    hasRecommendation(
      recommendationResults,
      "damage_protection",
    ) &&
    stylingFrequency?.value ===
      "daily"
  ) {
    guidance.push({
      id:
        "routine_guidance_frequent_styling_protection",

      type:
        "frequent_styling_protection",

      title:
        "Proteção durante a finalização",

      description:
        "Como a finalização faz parte da sua rotina diária e seu resultado já indica prioridade para proteção da fibra, vale reduzir atrito e tração durante a manipulação. Desembarace com cuidado e evite puxar ou tensionar o cabelo além do necessário durante a finalização.",

      basedOn: [
        stylingFrequency.id,
      ],

      relatedRecommendationType:
        "damage_protection",

      context: {
        trait:
          "styling_frequency",

        value:
          stylingFrequency.value,
      },
    });
  }

  return guidance;
}