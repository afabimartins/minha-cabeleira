import type {
  KnowledgeRule,
} from "../rule";

export const heatExposureRule:
  KnowledgeRule = {
    id: "rule_frequent_heat_exposure",

    name: "Frequent heat exposure",

    description:
      "Identifies a reported history of frequent exposure to heat styling tools.",

    conditions: [
      {
        trait: "heat_exposure",
        value: "high",
      },
    ],

    produces: {
      type: "frequent_heat_exposure",
      confidence: "high",
    },

    evidence: [],

    rationale:
      "A exposição frequente a fontes de calor relatada é um dado relevante do histórico do cabelo. Este achado descreve a exposição informada e, isoladamente, não significa que exista dano na fibra.",

    status: "active",

    version: 1,
  };