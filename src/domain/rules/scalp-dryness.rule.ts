import type {
  KnowledgeRule,
} from "../rule";

const supportedDrynessValues = [
  "mild",
  "moderate",
  "severe",
] as const;

export const scalpDrynessRules:
  KnowledgeRule[] =
  supportedDrynessValues.map(
    (value) => ({
      id: `rule_scalp_dryness_${value}`,

      name: `Scalp dryness ${value}`,

      description:
        "Identifies reported scalp dryness that can be used to personalize cosmetic care while keeping safety signals separate.",

      conditions: [
        {
          trait: "scalp_dryness",
          value,
        },
      ],

      produces: {
        type: "scalp_dryness_need",
        confidence:
          value === "mild"
            ? "medium"
            : "high",
      },

      evidence: [],

      rationale:
        "Você relatou ressecamento ou descamação seca no couro cabeludo. Esse dado pode orientar cuidados cosméticos mais suaves quando não existem sinais de segurança que bloqueiem sugestões; persistência, piora ou desconforto importante merecem avaliação profissional.",

      status: "active",

      version: 1,
    }),
  );
