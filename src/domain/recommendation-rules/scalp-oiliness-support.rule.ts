import type {
  RecommendationRule,
} from "../recommendation-rule";

export const scalpOilinessSupportRecommendationRule:
  RecommendationRule = {
  id: "recommendation_scalp_oiliness_support",

  name: "Scalp oiliness support",

  status: "active",

  version: 1,

  requiresFindings: [
    "scalp_oiliness_need",
  ],

  produces: {
    type: "scalp_oiliness_support",

    confidence: "medium",

    ingredientGuidance: {
      summary:
        "Você relatou oleosidade perceptível no couro cabeludo. Quando não há sinais de irritação, feridas ou outros alertas, vale observar fórmulas de limpeza capazes de remover o excesso de oleosidade sem depender de uma sensação agressiva de limpeza. A adequação depende do conjunto da fórmula e da frequência de uso.",

      lookFor: [
        {
          id: "balanced_cleansing_system",
          name:
            "Sistema de limpeza bem equilibrado",
          purpose:
            "A combinação de tensoativos determina grande parte do poder de limpeza e da sensação após a lavagem. Não é possível classificar um shampoo como suave ou forte por um único ingrediente isolado.",
          examples: [],
        },
        {
          id: "scalp_light_humectants",
          name: "Umectantes",
          purpose:
            "Podem complementar a formulação e ajudar a reduzir a sensação de ressecamento sem substituir a etapa de limpeza.",
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
      categories: ["scalp"],
      requiredAttributes: [
        "scalp_oiliness_support",
      ],
    },
  },

  evidence: [],

  rationale:
    "A oleosidade relatada pode orientar a escolha de um cuidado específico do couro cabeludo, desde que os sinais de segurança não indiquem que produtos devam ser pausados.",
};
