import type {
  RecommendationRule,
} from "../recommendation-rule";

export const heatProtectionRecommendationRule:
  RecommendationRule = {
  id: "recommendation_heat_protection",

  name: "Heat protection support",

  status: "active",

  version: 1,

  requiresFindings: [
    "frequent_heat_exposure",
  ],

  produces: {
    type: "heat_protection",

    confidence: "high",

    ingredientGuidance: {
      summary:
        "Você relatou uso frequente de fontes de calor. Além de reduzir temperatura, tempo de exposição e passadas repetidas, vale priorizar produtos cuja fórmula seja indicada para proteção térmica. Ingredientes isolados não comprovam proteção contra calor; o desempenho depende da formulação completa e do modo de uso.",

      lookFor: [
        {
          id: "heat_film_formers",
          name:
            "Agentes formadores de filme e lubrificantes",
          purpose:
            "Podem reduzir atrito e formar um revestimento sobre a superfície do fio. Em produtos desenvolvidos para uso com calor, podem fazer parte do sistema de proteção da fórmula.",
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
          id: "heat_conditioners",
          name:
            "Agentes condicionantes catiônicos",
          purpose:
            "Podem melhorar o deslizamento e reduzir a força necessária para pentear e manipular os fios antes e depois do uso de calor.",
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
      ],

      avoid: [],
    },

    productCriteria: {
      categories: [
        "leave_in",
        "styler",
        "oil",
      ],
      requiredAttributes: [
        "heat_protection",
      ],
    },
  },

  evidence: [],

  rationale:
    "Como o uso frequente de calor faz parte do seu histórico, a prioridade é reduzir a exposição desnecessária e, quando houver calor, preferir produtos formulados e indicados para proteção térmica.",
};
