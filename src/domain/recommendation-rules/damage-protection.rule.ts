import type {
  RecommendationRule,
} from "../recommendation-rule";

export const damageProtectionRecommendationRule:
  RecommendationRule = {
    id: "recommendation_damage_protection",

    name: "Damage protection support",

    status: "active",

    version: 1,

    requiresFindings: [
      "elevated_damage_risk",
    ],

    produces: {
      type: "damage_protection",

      confidence: "high",

      productCriteria: {
        requiredAttributes: [
          "damage_support",
        ],
      },
    },

    evidence: [],

    rationale:
      "Os sinais observados indicam maior risco de danos à fibra. Vale priorizar uma rotina que reduza agressões e favoreça proteção e condicionamento.",
  };