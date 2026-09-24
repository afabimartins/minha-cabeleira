import type {
  KnowledgeRule,
} from "../rule";

export const chemicalExposureRule:
  KnowledgeRule = {
    id: "rule_substantial_chemical_exposure",

    name: "Substantial chemical exposure",

    description:
      "Identifies a reported history of frequent or intense chemical processing.",

    conditions: [
      {
        trait: "chemical_processing",
        value: "high",
      },
    ],

    produces: {
      type: "substantial_chemical_exposure",
      confidence: "high",
    },

    evidence: [],

    rationale:
      "A exposição química frequente ou intensa relatada é um dado relevante do histórico do cabelo. Este achado descreve a exposição informada e, isoladamente, não significa que exista dano na fibra.",

    status: "active",

    version: 1,
  };