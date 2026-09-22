import type {
  Observation,
} from "./observation";

import type {
  SafetyAssessment,
  SafetyNotice,
} from "./safety";

const STOP_TRAITS = new Set([
  "scalp_wound",
  "scalp_bleeding",
  "severe_scalp_pain",
]);

const CAUTION_TRAITS = new Set([
  "scalp_irritation",
  "scalp_burning",
  "sudden_hair_loss",
  "scalp_sensitivity",
]);

function isHighRiskValue(
  value: Observation["value"],
): boolean {
  return (
    value === "high" ||
    value === "severe"
  );
}

function getStopMessage(
  trait: Observation["trait"],
): string {
  switch (trait) {
    case "scalp_wound":
      return "A presença de feridas no couro cabeludo merece avaliação profissional antes de testar novos produtos ou tratamentos.";

    case "scalp_bleeding":
      return "A presença de sangramento no couro cabeludo merece avaliação profissional antes de testar novos produtos ou tratamentos.";

    case "severe_scalp_pain":
      return "Dor intensa no couro cabeludo merece avaliação profissional antes de testar novos produtos ou tratamentos.";

    default:
      return "Este sinal merece avaliação profissional antes de testar novos produtos ou tratamentos.";
  }
}

function getCautionMessage(
  trait: Observation["trait"],
): string {
  switch (trait) {
    case "scalp_sensitivity":
      return "Sensibilidade, coceira ou ardor frequentes no couro cabeludo pedem mais cuidado na escolha de produtos.";

    case "scalp_irritation":
      return "Sinais de irritação no couro cabeludo pedem mais cuidado na escolha e no uso de produtos.";

    case "scalp_burning":
      return "Ardor intenso no couro cabeludo pede mais cuidado antes de testar novos produtos.";

    case "sudden_hair_loss":
      return "Uma percepção de queda súbita merece atenção e deve ser considerada com cautela antes de alterar a rotina.";

    default:
      return "Este sinal pede mais cuidado na escolha de produtos.";
  }
}

export function assessSafety(
  observations: Observation[],
): SafetyAssessment {
  const notices: SafetyNotice[] = [];

  for (const observation of observations) {
    if (
      STOP_TRAITS.has(
        observation.trait,
      ) &&
      isHighRiskValue(
        observation.value,
      )
    ) {
      notices.push({
        level: "stop",
        code: observation.trait,
        message: getStopMessage(
          observation.trait,
        ),
      });

      continue;
    }

    if (
      CAUTION_TRAITS.has(
        observation.trait,
      ) &&
      isHighRiskValue(
        observation.value,
      )
    ) {
      notices.push({
        level: "caution",
        code: observation.trait,
        message: getCautionMessage(
          observation.trait,
        ),
      });
    }
  }

  if (
    notices.some(
      (notice) =>
        notice.level === "stop",
    )
  ) {
    return {
      level: "stop",
      notices,
      canRecommendProducts: false,
    };
  }

  if (notices.length > 0) {
    return {
      level: "caution",
      notices,
      canRecommendProducts: true,
    };
  }

  return {
    level: "normal",
    notices: [],
    canRecommendProducts: true,
  };
}