import type {
  Observation,
  ObservationValue,
} from "./observation";

import type {
  Recommendation,
} from "./recommendation";

function getPrimaryGoal(
  observations: Observation[],
): ObservationValue | undefined {
  return observations.find(
    (observation) =>
      observation.trait ===
      "primary_goal",
  )?.value;
}

function baseRecommendation(
  id: string,
  type: string,
  rationale: string,
): Omit<
  Recommendation,
  "ingredientGuidance" | "productCriteria"
> {
  return {
    id,
    type,
    status: "candidate",
    confidence: "medium",
    basedOnFindings: [],
    evidence: [],
    rationale,
  };
}

export function buildGoalFallbackRecommendation(
  observations: Observation[],
): Recommendation | null {
  const goal = getPrimaryGoal(
    observations,
  );

  switch (goal) {
    case "reduce_breakage":
    case "retain_length":
      return {
        ...baseRecommendation(
          "recommendation_goal_breakage_support",
          "goal_breakage_support",
          goal === "reduce_breakage"
            ? "Como você escolheu reduzir a quebra como prioridade, esta orientação organiza uma rotina de menor atrito e maior proteção da fibra sem transformar essa preferência em diagnóstico."
            : "Como você escolheu manter comprimento e reduzir perdas como prioridade, esta orientação organiza uma rotina de menor atrito e maior proteção da fibra sem presumir que exista dano.",
        ),

        ingredientGuidance: {
          summary:
            "Sua prioridade declarada é reduzir quebra ou preservar comprimento. Mesmo quando a análise não encontra um padrão diagnóstico específico, vale observar fórmulas que favoreçam condicionamento, deslizamento e formação de filme, combinadas a uma manipulação mais gentil.",

          lookFor: [
            {
              id: "goal_breakage_conditioners",
              name:
                "Agentes condicionantes catiônicos",
              purpose:
                "Podem melhorar o desembaraço e reduzir a força necessária para pentear, ajudando a diminuir atrito mecânico durante o cuidado.",
              examples: [
                {
                  name:
                    "Behentrimonium Chloride",
                  inciName:
                    "Behentrimonium Chloride",
                },
                {
                  name:
                    "Cetrimonium Chloride",
                  inciName:
                    "Cetrimonium Chloride",
                },
              ],
            },
            {
              id: "goal_breakage_film_formers",
              name:
                "Agentes formadores de filme e lubrificantes",
              purpose:
                "Podem melhorar o deslizamento e reduzir atrito na superfície do fio. O efeito final depende da formulação completa.",
              examples: [
                {
                  name: "Amodimethicone",
                  inciName: "Amodimethicone",
                },
                {
                  name: "Dimethicone",
                  inciName: "Dimethicone",
                },
              ],
            },
          ],

          avoid: [],
        },

        productCriteria: {
          requiredAttributes: [
            "damage_support",
          ],
        },
      };

    case "improve_softness":
      return {
        ...baseRecommendation(
          "recommendation_goal_softness_support",
          "goal_softness_support",
          "Como você escolheu melhorar maciez e toque como prioridade, esta orientação usa essa preferência para organizar a rotina sem tratá-la como diagnóstico do fio.",
        ),

        ingredientGuidance: {
          summary:
            "Para uma prioridade de maciez e toque, vale observar fórmulas que combinem condicionantes, álcoois graxos e agentes de lubrificação da superfície. A sensação final depende da formulação como um todo.",

          lookFor: [
            {
              id: "goal_softness_conditioners",
              name:
                "Agentes condicionantes catiônicos",
              purpose:
                "Podem favorecer maleabilidade, desembaraço e sensação de condicionamento.",
              examples: [
                {
                  name:
                    "Behentrimonium Chloride",
                  inciName:
                    "Behentrimonium Chloride",
                },
                {
                  name:
                    "Behentrimonium Methosulfate",
                  inciName:
                    "Behentrimonium Methosulfate",
                },
              ],
            },
            {
              id: "goal_softness_fatty_alcohols",
              name: "Álcoois graxos",
              purpose:
                "Contribuem para a estrutura e espalhabilidade de condicionadores e máscaras e podem complementar a sensação de maciez.",
              examples: [
                {
                  name: "Cetearyl Alcohol",
                  inciName: "Cetearyl Alcohol",
                },
                {
                  name: "Cetyl Alcohol",
                  inciName: "Cetyl Alcohol",
                },
              ],
            },
          ],

          avoid: [],
        },

        productCriteria: {
          requiredAttributes: [
            "conditioning",
          ],
        },
      };

    case "control_frizz":
      return {
        ...baseRecommendation(
          "recommendation_goal_frizz_support",
          "goal_frizz_support",
          "Como você escolheu controlar frizz como prioridade, esta orientação organiza opções de condicionamento e redução de atrito sem atribuir uma causa única ao frizz.",
        ),

        ingredientGuidance: {
          summary:
            "Frizz pode ter causas diferentes. Como objetivo cosmético, vale observar fórmulas que favoreçam condicionamento, lubrificação e formação de filme, além de reduzir atrito durante secagem e finalização.",

          lookFor: [
            {
              id: "goal_frizz_film_formers",
              name:
                "Agentes formadores de filme e lubrificantes",
              purpose:
                "Podem melhorar a superfície do fio, reduzir atrito e contribuir para uma aparência mais alinhada.",
              examples: [
                {
                  name: "Amodimethicone",
                  inciName: "Amodimethicone",
                },
                {
                  name: "Dimethicone",
                  inciName: "Dimethicone",
                },
              ],
            },
            {
              id: "goal_frizz_humectants",
              name: "Umectantes",
              purpose:
                "Podem participar das propriedades de hidratação e condicionamento da fórmula. O efeito no frizz depende da combinação com os demais componentes e das condições de uso.",
              examples: [
                {
                  name: "Glycerin",
                  inciName: "Glycerin",
                },
                {
                  name: "Panthenol",
                  inciName: "Panthenol",
                },
              ],
            },
          ],

          avoid: [],
        },

        productCriteria: {
          requiredAttributes: [
            "moisture_support",
          ],
        },
      };

    case "improve_definition":
      return {
        ...baseRecommendation(
          "recommendation_goal_definition_support",
          "goal_definition_support",
          "Como você escolheu melhorar definição como prioridade, esta orientação foca a etapa de finalização e o controle de atrito sem presumir um tipo ou curvatura de cabelo.",
        ),

        ingredientGuidance: {
          summary:
            "Para uma prioridade de definição, o produto de finalização precisa funcionar como fórmula completa: espalhabilidade, condicionamento e formação de filme importam mais do que um ingrediente isolado.",

          lookFor: [
            {
              id: "goal_definition_conditioners",
              name:
                "Agentes condicionantes e lubrificantes",
              purpose:
                "Podem facilitar a distribuição do finalizador e reduzir atrito durante a modelagem dos fios.",
              examples: [
                {
                  name:
                    "Cetrimonium Chloride",
                  inciName:
                    "Cetrimonium Chloride",
                },
                {
                  name: "Amodimethicone",
                  inciName: "Amodimethicone",
                },
              ],
            },
            {
              id: "goal_definition_humectants",
              name: "Umectantes",
              purpose:
                "Podem contribuir para as propriedades de hidratação e flexibilidade da formulação de finalização.",
              examples: [
                {
                  name: "Glycerin",
                  inciName: "Glycerin",
                },
                {
                  name: "Panthenol",
                  inciName: "Panthenol",
                },
              ],
            },
          ],

          avoid: [],
        },

        productCriteria: {
          categories: [
            "leave_in",
            "styler",
          ],
          requiredAttributes: [
            "conditioning_support",
          ],
        },
      };

    case "simplify_routine":
      return {
        ...baseRecommendation(
          "recommendation_goal_routine_simplification",
          "goal_routine_simplification",
          "Como você escolheu simplificar a rotina como prioridade, a orientação privilegia fórmulas versáteis e reduz a necessidade de acrescentar etapas sem benefício claro.",
        ),

        ingredientGuidance: {
          summary:
            "Para simplificar a rotina, vale priorizar fórmulas multifuncionais que entreguem bom condicionamento e deslizamento em uma etapa que você realmente use. Mais produtos não significam necessariamente melhor resultado.",

          lookFor: [
            {
              id: "goal_simple_conditioners",
              name:
                "Agentes condicionantes catiônicos",
              purpose:
                "Podem reunir desembaraço, maleabilidade e redução de atrito em uma mesma fórmula.",
              examples: [
                {
                  name:
                    "Behentrimonium Chloride",
                  inciName:
                    "Behentrimonium Chloride",
                },
                {
                  name:
                    "Cetrimonium Chloride",
                  inciName:
                    "Cetrimonium Chloride",
                },
              ],
            },
            {
              id: "goal_simple_film_formers",
              name:
                "Agentes formadores de filme e lubrificantes",
              purpose:
                "Podem complementar o condicionamento e a proteção da superfície do fio sem exigir uma etapa separada quando já estão presentes em um produto adequado à rotina.",
              examples: [
                {
                  name: "Amodimethicone",
                  inciName: "Amodimethicone",
                },
                {
                  name: "Dimethicone",
                  inciName: "Dimethicone",
                },
              ],
            },
          ],

          avoid: [],
        },

        productCriteria: {
          categories: [
            "treatment",
            "leave_in",
            "styler",
          ],
          requiredAttributes: [
            "conditioning_support",
          ],
        },
      };

    default:
      return null;
  }
}
