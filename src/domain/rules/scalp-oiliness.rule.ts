import type {
  KnowledgeRule,
} from "../rule";

const supportedOilinessValues = [
  "mild",
  "moderate",
  "severe",
] as const;

export const scalpOilinessRules:
  KnowledgeRule[] =
  supportedOilinessValues.map(
    (value) => ({
      id: `rule_scalp_oiliness_${value}`,

      name: `Scalp oiliness ${value}`,

      description:
        "Identifies a reported level of scalp oiliness that can be used to personalize cosmetic care when safety signals do not block product suggestions.",

      conditions: [
        {
          trait: "scalp_oiliness",
          value,
        },
      ],

      produces: {
        type: "scalp_oiliness_need",
        confidence:
          value === "mild"
            ? "medium"
            : "high",
      },

      evidence: [],

      rationale:
        "Você relatou oleosidade perceptível no couro cabeludo. Quando não há sinais de segurança que exijam cautela, esse dado pode orientar a escolha de fórmulas e produtos voltados ao cuidado do couro cabeludo sem ser tratado como diagnóstico.",

      status: "active",

      version: 1,
    }),
  );
