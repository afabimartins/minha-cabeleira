import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  AnalysisResult,
} from "../domain/analysis-result";

import {
  getAnalysisReportPolicy,
} from "./analysis-report";

function createResult(
  level:
    AnalysisResult["safety"]["level"],
  canRecommendProducts: boolean,
): AnalysisResult {
  return {
    diagnosis: {
      findings: [],

      assessment: {
        status: "unresolved",
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
      notices: [],
      canRecommendProducts,
    },

    recommendations: [],
  };
}

describe(
  "getAnalysisReportPolicy",
  () => {
    it(
      "shows ingredient guidance and products in normal state",
      () => {
        const policy =
          getAnalysisReportPolicy(
            createResult(
              "normal",
              true,
            ),
          );

        expect(policy).toEqual({
          showIngredientGuidance: true,
          showProducts: true,
        });
      },
    );

    it(
      "shows ingredient guidance but hides products in caution state",
      () => {
        const policy =
          getAnalysisReportPolicy(
            createResult(
              "caution",
              false,
            ),
          );

        expect(policy).toEqual({
          showIngredientGuidance: true,
          showProducts: false,
        });
      },
    );

    it(
      "hides ingredient guidance and products in stop state",
      () => {
        const policy =
          getAnalysisReportPolicy(
            createResult(
              "stop",
              false,
            ),
          );

        expect(policy).toEqual({
          showIngredientGuidance: false,
          showProducts: false,
        });
      },
    );
  },
);