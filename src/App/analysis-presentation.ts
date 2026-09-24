import type {
  AnalysisResult,
} from "../domain/analysis-result";

import type {
  Finding,
} from "../domain/finding";

export type FindingPresentation = {
  title: string;
  description: string;
};

const findingPresentations: Record<
  string,
  FindingPresentation
> = {
  strong_conditioning_response: {
    title:
      "Boa resposta ao condicionamento",

    description:
      "Suas respostas indicam que o cabelo tende a apresentar melhora perceptível com condicionador ou máscara, especialmente em maciez e desembaraço.",
  },

  elevated_damage_risk: {
    title:
      "Sinais de maior exposição a danos",

    description:
      "A combinação das suas respostas sobre quebra, processos químicos e uso de calor indica maior necessidade de atenção à proteção da fibra.",
  },

  low_moisture_retention: {
    title:
      "Menor retenção de umidade relatada",

    description:
      "O conjunto das suas respostas sobre molhamento, secagem e manutenção da umidade indica que o cabelo pode perder a sensação de umidade mais rapidamente.",
  },
};

function humanizeType(
  type: string,
): string {
  return type
    .replaceAll("_", " ")
    .replace(
      /^./,
      (character) =>
        character.toUpperCase(),
    );
}

export function getFindingPresentation(
  finding: Finding,
): FindingPresentation {
  return (
    findingPresentations[
      finding.type
    ] ?? {
      title:
        humanizeType(finding.type),

      description:
        finding.explanation ||
        "Identificamos este sinal a partir das respostas fornecidas na análise.",
    }
  );
}

export function getRecommendationTitle(
  type: string,
): string {
  switch (type) {
    case "conditioning_support":
      return "Suporte de condicionamento";

    case "damage_protection":
      return "Proteção contra danos";

    case "moisture_support":
      return "Suporte à retenção de umidade";

    default:
      return "Recomendação";
  }
}

export function getSafetyTitle(
  level: AnalysisResult["safety"]["level"],
): string {
  switch (level) {
    case "stop":
      return "Atenção necessária";

    case "caution":
      return "Recomendação com cautela";

    default:
      return "Tudo certo para continuar";
  }
}

export function getSafetyDescription(
  result: AnalysisResult,
): string {
  if (result.safety.level === "stop") {
    return "Algumas das suas respostas indicam que é mais seguro não sugerir produtos neste momento. Procure avaliação profissional antes de testar novos produtos ou tratamentos.";
  }

  if (
    result.safety.level === "caution"
  ) {
    return "Identificamos um sinal que merece atenção. Você ainda pode consultar orientações gerais de fórmula, mas as sugestões de produtos ficam bloqueadas por segurança.";
  }

  return "Não identificamos sinais que impeçam a exibição de sugestões de produtos.";
}