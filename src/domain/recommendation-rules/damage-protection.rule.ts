import type {
  RecommendationRule,
} from "../recommendation-rule";

export const damageProtectionRecommendationRule:
  RecommendationRule = {
  id: "recommendation_damage_protection",

  name: "Damage protection support",

  status: "active",

  version: 2,

  requiresFindings: [
    "elevated_damage_risk",
  ],

  produces: {
    type: "damage_protection",

    confidence: "high",

    ingredientGuidance: {
      summary:
        "Seus sinais indicam maior necessidade de proteger a fibra contra desgaste adicional. Além de reduzir agressões mecânicas e térmicas, vale observar fórmulas que favoreçam condicionamento, lubrificação da superfície e formação de filme protetor.",

      lookFor: [
        {
          id: "film_forming_conditioners",

          name:
            "Agentes formadores de filme e condicionantes",

          purpose:
            "Podem formar um revestimento sobre a superfície do fio, melhorar o deslizamento e reduzir o atrito durante o penteado e o manuseio.",

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
          id: "cationic_conditioning_agents",

          name:
            "Agentes condicionantes catiônicos",

          purpose:
            "Podem melhorar a maleabilidade e o desembaraço, ajudando a diminuir a força necessária para pentear fios mais suscetíveis à quebra.",

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
          id: "hydrolyzed_proteins",

          name:
            "Proteínas e peptídeos hidrolisados",

          purpose:
            "Podem atuar temporariamente na superfície da fibra e contribuir para propriedades de condicionamento e formação de filme. O efeito depende da matéria-prima e da formulação e não significa reconstrução permanente do fio.",

          examples: [
            {
              name:
                "Hydrolyzed Keratin",
              inciName:
                "Hydrolyzed Keratin",
            },
            {
              name:
                "Hydrolyzed Wheat Protein",
              inciName:
                "Hydrolyzed Wheat Protein",
            },
            {
              name:
                "Hydrolyzed Rice Protein",
              inciName:
                "Hydrolyzed Rice Protein",
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
  },

  evidence: [],

  rationale:
    "Os sinais observados indicam maior risco de desgaste da fibra. A prioridade é reduzir agressões adicionais e favorecer condicionamento, deslizamento e proteção durante o cuidado diário.",
};