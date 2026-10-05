import type {
  RecommendationRule,
} from "../recommendation-rule";

export const chemicalProcessCareRecommendationRule:
  RecommendationRule = {
  id: "recommendation_chemical_process_care",

  name: "Chemical process care",

  status: "active",

  version: 1,

  requiresFindings: [
    "substantial_chemical_exposure",
  ],

  produces: {
    type: "chemical_process_care",

    confidence: "high",

    ingredientGuidance: {
      summary:
        "Você relatou exposição química frequente ou intensa. Isso não prova que exista dano, mas torna útil priorizar fórmulas que favoreçam condicionamento, deslizamento e menor atrito, especialmente ao desembaraçar e manipular o comprimento.",

      lookFor: [
        {
          id: "chemical_cationic_conditioners",
          name:
            "Agentes condicionantes catiônicos",
          purpose:
            "Podem melhorar a maleabilidade e o desembaraço, ajudando a reduzir atrito durante o cuidado do comprimento.",
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
          id: "chemical_fatty_alcohols",
          name: "Álcoois graxos",
          purpose:
            "São componentes comuns de condicionadores e máscaras e contribuem para espalhabilidade, textura e sensação de condicionamento da fórmula.",
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
        {
          id: "chemical_film_formers",
          name:
            "Agentes formadores de filme e lubrificantes",
          purpose:
            "Podem reduzir atrito na superfície da fibra e contribuir para maciez e facilidade de pentear.",
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
        "conditioner",
        "mask",
        "treatment",
        "leave_in",
        "styler",
        "oil",
      ],
      requiredAttributes: [
        "conditioning",
      ],
    },
  },

  evidence: [],

  rationale:
    "A exposição química relatada justifica uma rotina cuidadosa, com atenção ao condicionamento e à redução de atrito, sem presumir dano apenas pelo histórico de química.",
};
