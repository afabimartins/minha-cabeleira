import type {
  RecommendationRule,
} from "../recommendation-rule";

export const scalpDrynessSupportRecommendationRule:
  RecommendationRule = {
  id: "recommendation_scalp_dryness_support",

  name: "Scalp dryness support",

  status: "active",

  version: 1,

  requiresFindings: [
    "scalp_dryness_need",
  ],

  produces: {
    type: "scalp_dryness_support",

    confidence: "medium",

    ingredientGuidance: {
      summary:
        "Você relatou ressecamento ou descamação seca no couro cabeludo. Quando não há sinais de segurança que bloqueiem sugestões, fórmulas com componentes umectantes e emolientes podem ser consideradas. Descamação persistente, intensa ou acompanhada de coceira, ardor ou feridas pode ter outras causas e merece avaliação profissional.",

      lookFor: [
        {
          id: "scalp_humectants",
          name: "Umectantes",
          purpose:
            "São ingredientes com afinidade pela água e podem contribuir para as propriedades de hidratação da formulação.",
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
              name: "Propanediol",
              inciName: "Propanediol",
            },
          ],
        },
        {
          id: "scalp_emollients",
          name:
            "Emolientes leves",
          purpose:
            "Podem complementar a sensação de conforto e maciez da formulação. A adequação ao couro cabeludo depende da composição completa e do modo de uso.",
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
      ],

      avoid: [],
    },

    productCriteria: {
      categories: ["scalp"],
      requiredAttributes: [
        "scalp_dryness_support",
      ],
    },
  },

  evidence: [],

  rationale:
    "O ressecamento relatado pode justificar um cuidado cosmético específico do couro cabeludo, desde que não existam sinais de segurança que peçam pausa de produtos ou avaliação profissional.",
};
