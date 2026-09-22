import type {
  RecommendationRule,
} from "../recommendation-rule";

export const conditioningSupportRecommendationRule:
  RecommendationRule = {
    id: "recommendation_conditioning_support",

    name: "Conditioning support",

    status: "active",

    version: 1,

    requiresFindings: [
      "strong_conditioning_response",
    ],

    produces: {
      type: "conditioning_support",

      confidence: "high",

      productCriteria: {
        requiredAttributes: [
          "conditioning",
        ],
      },
    },

    evidence: [],

    rationale:
      "Seu cabelo apresentou sinais de que responde bem ao condicionamento. Produtos que ajudam a melhorar maciez, desembaraço e condicionamento podem ser priorizados na rotina.",
  };