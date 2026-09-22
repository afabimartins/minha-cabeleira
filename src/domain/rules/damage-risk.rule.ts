import type {
  KnowledgeRule,
} from "../rule";

export const damageRiskRule:
  KnowledgeRule = {
    id: "rule_damage_risk",

    name: "Elevated damage risk",

    description:
      "Identifies a reported pattern of substantial breakage combined with a history of important hair fiber change after chemical, thermal or other stress.",

    conditions: [
      {
        trait: "breakage",
        value: "high",
      },

      {
        trait: "damage_history",
        value: "severe",
      },
    ],

    produces: {
      type: "elevated_damage_risk",
      confidence: "high",
    },

    evidence: [],

    rationale:
      "A combinação de quebra intensa relatada com histórico de mudança importante após química, calor ou outro processo sustenta a priorização de cuidados voltados à proteção da fibra.",

    status: "active",

    version: 2,
  };