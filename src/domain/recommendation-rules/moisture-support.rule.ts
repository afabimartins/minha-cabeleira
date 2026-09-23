import type {
  RecommendationRule,
} from "../recommendation-rule";

export const moistureSupportRecommendationRule:
  RecommendationRule = {
  id: "recommendation_moisture_support",

  name: "Moisture retention support",

  status: "active",

  version: 2,

  requiresFindings: [
    "low_moisture_retention",
  ],

  produces: {
    type: "moisture_support",

    confidence: "high",

    ingredientGuidance: {
      summary:
        "Seus sinais sugerem dificuldade em manter o cabelo com sensação de maciez e condicionamento ao longo do tempo. Vale observar fórmulas que combinem componentes capazes de atrair água com agentes condicionantes, emolientes ou formadores de filme que ajudem a manter a fibra mais maleável.",

      lookFor: [
        {
          id: "humectants",

          name: "Umectantes",

          purpose:
            "São ingredientes com afinidade pela água e podem contribuir para as propriedades de hidratação e condicionamento da formulação. O efeito final depende da concentração e da combinação com os demais componentes.",

          examples: [
            {
              name: "Glycerin",
              inciName: "Glycerin",
            },
            {
              name: "Panthenol",
              inciName: "Panthenol",
            },
            {
              name:
                "Propanediol",
              inciName:
                "Propanediol",
            },
          ],
        },

        {
          id: "emollients",

          name:
            "Emolientes e componentes lipídicos",

          purpose:
            "Podem melhorar a lubricidade, a flexibilidade e a sensação de maciez da fibra, complementando o efeito de condicionamento da fórmula.",

          examples: [
            {
              name:
                "Caprylic/Capric Triglyceride",
              inciName:
                "Caprylic/Capric Triglyceride",
            },
            {
              name:
                "Coco-Caprylate/Caprate",
              inciName:
                "Coco-Caprylate/Caprate",
            },
          ],
        },

        {
          id: "conditioning_and_film_forming_agents",

          name:
            "Agentes condicionantes e formadores de filme",

          purpose:
            "Podem reduzir atrito e melhorar a superfície do fio, contribuindo para que a sensação de maciez e condicionamento seja mantida por mais tempo.",

          examples: [
            {
              name:
                "Behentrimonium Chloride",
              inciName:
                "Behentrimonium Chloride",
            },
            {
              name:
                "Amodimethicone",
              inciName:
                "Amodimethicone",
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
  },

  evidence: [],

  rationale:
    "Seu cabelo apresenta sinais associados à baixa retenção de umidade e à perda de maciez ao longo do tempo. Fórmulas que combinem umectação, condicionamento e redução do atrito podem ser priorizadas.",
};