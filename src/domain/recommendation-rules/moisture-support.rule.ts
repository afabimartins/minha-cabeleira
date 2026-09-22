import type {
  RecommendationRule,
} from "../recommendation-rule";

export const moistureSupportRecommendationRule:
  RecommendationRule = {
    id: "recommendation_moisture_support",

    name: "Moisture retention support",

    status: "active",

    version: 1,

    requiresFindings: [
      "low_moisture_retention",
    ],

    produces: {
      type: "moisture_support",

      confidence: "high",

      productCriteria: {
        requiredAttributes: [
          "moisture_support",
        ],
      },
    },

    evidence: [],

    rationale:
      "Seu cabelo apresenta um conjunto de sinais associado à baixa retenção de umidade. Produtos com suporte de condicionamento e retenção de umidade podem ser priorizados na rotina.",
  };