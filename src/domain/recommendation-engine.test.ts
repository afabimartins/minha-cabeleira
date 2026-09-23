import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Finding,
} from "./finding";

import type {
  RecommendationRule,
} from "./recommendation-rule";

import {
  evaluateRecommendationRule,
} from "./recommendation-engine";

const finding: Finding = {
  id: "finding_conditioning_response",
  type: "strong_conditioning_response",
  confidence: "high",
  basedOn: [
    "roughness",
    "tangling",
    "conditioning",
  ],
  evidence: [
    "Conditioning improves manageability",
  ],
  explanation:
    "Hair responds positively to conditioning.",
};

const activeRule: RecommendationRule = {
  id: "recommendation_conditioning_support",
  name: "Conditioning support",
  status: "active",
  version: 1,

  requiresFindings: [
    "strong_conditioning_response",
  ],

  produces: {
    type: "conditioning_support",
    confidence: "high",
  },

  evidence: [
    "Strong conditioning response",
  ],

  rationale:
    "The reported pattern supports prioritizing conditioning support.",
};

describe(
  "evaluateRecommendationRule",
  () => {
    it(
      "creates a candidate when required findings exist",
      () => {
        const result =
          evaluateRecommendationRule(
            activeRule,
            [finding],
          );

        expect(result).not.toBeNull();

        expect(result?.status).toBe(
          "candidate",
        );

        expect(result?.type).toBe(
          "conditioning_support",
        );

        expect(
          result?.basedOnFindings,
        ).toContain(finding.id);
      },
    );

    it(
      "carries ingredient guidance from the rule into the recommendation",
      () => {
        const ruleWithIngredientGuidance:
          RecommendationRule = {
          ...activeRule,

          produces: {
            ...activeRule.produces,

            ingredientGuidance: {
              summary:
                "Priorize fórmulas que ofereçam suporte ao condicionamento e ao desembaraço.",

              lookFor: [
                {
                  id: "conditioning_agents",
                  name:
                    "Agentes condicionantes",
                  purpose:
                    "Ajudam a melhorar o condicionamento e o desembaraço dos fios.",
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
                  ],
                },
              ],

              avoid: [],
            },
          },
        };

        const result =
          evaluateRecommendationRule(
            ruleWithIngredientGuidance,
            [finding],
          );

        expect(result).not.toBeNull();

        expect(
          result?.ingredientGuidance,
        ).toEqual(
          ruleWithIngredientGuidance
            .produces
            .ingredientGuidance,
        );
      },
    );

    it(
      "does not evaluate draft recommendation rules",
      () => {
        const result =
          evaluateRecommendationRule(
            {
              ...activeRule,
              status: "draft",
            },
            [finding],
          );

        expect(result).toBeNull();
      },
    );

    it(
      "does not recommend when required findings are absent",
      () => {
        const result =
          evaluateRecommendationRule(
            activeRule,
            [],
          );

        expect(result).toBeNull();
      },
    );
  },
);