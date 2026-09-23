import type {
  RecommendationRule,
} from "../recommendation-rule";

export const conditioningSupportRecommendationRule:
  RecommendationRule = {
  id: "recommendation_conditioning_support",

  name: "Conditioning support",

  status: "active",

  version: 2,

  requiresFindings: [
    "strong_conditioning_response",
  ],

  produces: {
    type: "conditioning_support",

    confidence: "high",

    ingredientGuidance: {
      summary:
        "Seu cabelo apresentou sinais de boa resposta ao condicionamento. Ao escolher condicionadores, máscaras ou leave-ins, vale observar fórmulas com agentes que favoreçam desembaraço, maciez, lubrificação e redução do atrito entre os fios.",

      lookFor: [
        {
          id: "cationic_conditioning_agents",

          name:
            "Agentes condicionantes catiônicos",

          purpose:
            "Depositam-se na superfície do fio e podem ajudar a reduzir eletricidade estática e atrito, facilitando o desembaraço e melhorando a maleabilidade.",

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
            {
              name:
                "Behentrimonium Methosulfate",
              inciName:
                "Behentrimonium Methosulfate",
            },
          ],
        },

        {
          id: "fatty_alcohols",

          name: "Álcoois graxos",

          purpose:
            "São componentes frequentes de condicionadores e contribuem para a estrutura, espalhabilidade e sensação de condicionamento da fórmula.",

          examples: [
            {
              name: "Cetyl Alcohol",
              inciName: "Cetyl Alcohol",
            },
            {
              name: "Stearyl Alcohol",
              inciName: "Stearyl Alcohol",
            },
            {
              name: "Cetearyl Alcohol",
              inciName: "Cetearyl Alcohol",
            },
          ],
        },

        {
          id: "film_forming_conditioners",

          name:
            "Agentes formadores de filme e lubrificantes",

          purpose:
            "Podem revestir a superfície do fio, reduzir atrito e contribuir para maciez, brilho e facilidade de pentear.",

          examples: [
            {
              name: "Dimethicone",
              inciName: "Dimethicone",
            },
            {
              name: "Amodimethicone",
              inciName: "Amodimethicone",
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
  },

  evidence: [],

  rationale:
    "Seu cabelo apresentou sinais de que responde bem ao condicionamento. Fórmulas voltadas à redução de atrito, melhora do desembaraço e condicionamento podem ser priorizadas na rotina.",
};