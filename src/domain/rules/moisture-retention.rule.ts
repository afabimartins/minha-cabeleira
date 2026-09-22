import type {
  KnowledgeRule,
} from "../rule";

export const moistureRetentionRule:
  KnowledgeRule = {
    id: "rule_low_moisture_retention",

    name: "Low moisture retention pattern",

    description:
      "Identifies a reported pattern of rapid wetting, rapid drying and low moisture retention.",

    conditions: [
      {
        trait: "wetting_speed",
        value: "fast",
      },
      {
        trait: "drying_speed",
        value: "fast",
      },
      {
        trait: "water_retention",
        value: "low",
      },
    ],

    produces: {
      type: "low_moisture_retention",
      confidence: "high",
    },

    evidence: [],

    rationale:
      "A combinação de molhamento rápido, secagem rápida e baixa retenção relatada sustenta um padrão de baixa retenção de umidade.",

    status: "active",

    version: 1,
  };