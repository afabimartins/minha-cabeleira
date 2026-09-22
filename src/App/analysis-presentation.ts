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