import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  AnalysisResult,
} from "../domain/analysis-result";

import {
  buildAnalysisReport,
} from "./analysis-report-model";

function createResult(
  level:
    AnalysisResult["safety"]["level"],
  canRecommendProducts: boolean,
): AnalysisResult {
  return {
    diagnosis: {
      findings: [
        {
          id: "finding_conditioning",
          type:
            "strong_conditioning_response",
          confidence: "high",
          basedOn: [],
          evidence: [],
          explanation:
            "Conditioning support is relevant.",
        },
      ],

      assessment: {
        status: "supported",
        findings: [],
        reason: "Test result.",
      },

      profile: {
        assessments: [],
        unresolved: [],
      },
    },

    safety: {
      level,
      notices:
        level === "normal"
          ? []
          : [
              {
                level:
                  level === "stop"
                    ? "stop"
                    : "caution",
                code:
                  level === "stop"
                    ? "scalp_wound"
                    : "scalp_sensitivity",
                message:
                  level === "stop"
                    ? "A presença de feridas merece atenção."
                    : "A sensibilidade merece atenção.",
              },
            ],
      canRecommendProducts,
    },

    recommendations: [
      {
        recommendation: {
          id:
            "recommendation_conditioning",
          type:
            "conditioning_support",
          status: "candidate",
          confidence: "high",
          basedOnFindings: [
            "finding_conditioning",
          ],
          evidence: [],
          rationale:
            "Priorize suporte ao condicionamento.",

          ingredientGuidance: {
            summary:
              "Procure fórmulas com suporte ao condicionamento.",

            lookFor: [
              {
                id:
                  "cationic_conditioning_agents",
                name:
                  "Agentes condicionantes catiônicos",
                purpose:
                  "Podem ajudar a reduzir atrito e facilitar o desembaraço.",
                examples: [
                  {
                    name:
                      "Behentrimonium Chloride",
                    inciName:
                      "Behentrimonium Chloride",
                  },
                ],
              },
            ],

            avoid: [],
          },

          productCriteria: {
            requiredAttributes: [
              "conditioning",
            ],
          },
        },

        products: [
          {
            id:
              "compatible_conditioner",
            name:
              "Compatible Conditioner",
            brand:
              "Marca de teste",
            category:
              "conditioner",
            price: 19.9,
            currency: "BRL",
            ingredients: [],
            attributes: [
              "conditioning",
            ],
            availability: "active",
          },
        ],
      },
    ],

    routineGuidance: [
      {
        id:
          "routine_guidance_conditioning_frequency",

        type:
          "conditioning_frequency_support",

        title:
          "Condicionamento na sua rotina",

        description:
          "Seu resultado indica boa resposta ao condicionamento, enquanto você relatou usar condicionador ou máscara raramente.",

        basedOn: [
          "conditioning_frequency",
        ],

        relatedRecommendationType:
          "conditioning_support",

        context: {
          trait:
            "conditioning_frequency",

          value: "rarely",
        },
      },
    ],
  };
}

describe(
  "buildAnalysisReport",
  () => {
    it(
      "includes findings, routine guidance, ingredient guidance and products in normal state",
      () => {
        const report =
          buildAnalysisReport(
            createResult(
              "normal",
              true,
            ),
          );

        expect(
          report.findings,
        ).toHaveLength(1);

        expect(
          report.findings[0].title,
        ).toBe(
          "Boa resposta ao condicionamento",
        );

        expect(
          report.routineGuidance,
        ).toHaveLength(1);

        expect(
          report.routineGuidance[0],
        ).toEqual({
          id:
            "routine_guidance_conditioning_frequency",

          title:
            "Condicionamento na sua rotina",

          description:
            "Seu resultado indica boa resposta ao condicionamento, enquanto você relatou usar condicionador ou máscara raramente.",
        });

        expect(
          report.recommendations,
        ).toHaveLength(1);

        expect(
          report.recommendations[0]
            .ingredientGuidance,
        ).not.toBeNull();

        expect(
          report.recommendations[0]
            .ingredientGuidanceBlocked,
        ).toBe(false);

        expect(
          report.recommendations[0]
            .products,
        ).toHaveLength(1);

        expect(
          report.recommendations[0]
            .productsBlocked,
        ).toBe(false);
      },
    );

    it(
      "keeps ingredient guidance but removes products in caution state",
      () => {
        const report =
          buildAnalysisReport(
            createResult(
              "caution",
              false,
            ),
          );

        expect(
          report.safety.level,
        ).toBe("caution");

        expect(
          report.safety.notices,
        ).toEqual([
          "A sensibilidade merece atenção.",
        ]);

        expect(
          report.recommendations[0]
            .ingredientGuidance,
        ).not.toBeNull();

        expect(
          report.recommendations[0]
            .ingredientGuidanceBlocked,
        ).toBe(false);

        expect(
          report.recommendations[0]
            .products,
        ).toEqual([]);

        expect(
          report.recommendations[0]
            .productsBlocked,
        ).toBe(true);
      },
    );

    it(
      "removes ingredient guidance and products in stop state",
      () => {
        const report =
          buildAnalysisReport(
            createResult(
              "stop",
              false,
            ),
          );

        expect(
          report.safety.level,
        ).toBe("stop");

        expect(
          report.safety.notices,
        ).toEqual([
          "A presença de feridas merece atenção.",
        ]);

        expect(
          report.recommendations[0]
            .ingredientGuidance,
        ).toBeNull();

        expect(
          report.recommendations[0]
            .ingredientGuidanceBlocked,
        ).toBe(true);

        expect(
          report.recommendations[0]
            .products,
        ).toEqual([]);

        expect(
          report.recommendations[0]
            .productsBlocked,
        ).toBe(true);
      },
    );
  },
);