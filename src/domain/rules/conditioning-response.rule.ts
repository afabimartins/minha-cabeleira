import type { KnowledgeRule } from "../rule";

export const strongConditioningResponseRule: KnowledgeRule = {
  id: "rule_strong_conditioning_response",

  name: "Strong conditioning response",

  description:
    "Identifies a pattern compatible with a strong reported benefit from conditioning.",

  conditions: [
    {
      trait: "post_wash_roughness",
      value: "high",
    },
    {
      trait: "wet_tangling",
      value: "high",
    },
    {
      trait: "conditioning_improvement",
      value: "high",
    },
  ],

  produces: {
    type: "strong_conditioning_response",
    confidence: "high",
  },

  evidence: [],

  rationale:
    "The finding requires multiple independent reported signals rather than roughness alone.",

  status: "draft",

  version: 1,
};