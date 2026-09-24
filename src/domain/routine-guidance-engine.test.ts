import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Observation,
} from "./observation";

import type {
  RecommendationResult,
} from "./analysis-result";

import type {
  Recommendation,
} from "./recommendation";

import {
  buildRoutineGuidance,
} from "./routine-guidance-engine";

function createObservation(
  value: Observation["value"],
): Observation {
  return {
    id:
      `observation_conditioning_frequency_${value}`,

    domain: "routine",

    trait:
      "conditioning_frequency",

    value,

    region: "mid_length",

    source: "questionnaire",
  };
}

function createRecommendation(
  type: string,
): RecommendationResult {
  const recommendation:
    Recommendation = {
      id:
        `recommendation_${type}`,

      type,

      status: "supported",

      confidence: "high",

      basedOnFindings: [
        "finding_test",
      ],

      evidence: [],

      rationale:
        "Test recommendation.",
    };

  return {
    recommendation,
    products: [],
  };
}

describe(
  "buildRoutineGuidance",
  () => {
    it(
      "creates conditioning routine guidance when conditioning support exists and conditioning is rarely used",
      () => {
        const recommendations = [
          createRecommendation(
            "conditioning_support",
          ),
        ];

        const observations = [
          createObservation("rarely"),
        ];

        const guidance =
          buildRoutineGuidance(
            recommendations,
            observations,
          );

        expect(guidance).toHaveLength(
          1,
        );

        expect(guidance[0].type).toBe(
          "conditioning_frequency_support",
        );

        expect(
          guidance[0]
            .relatedRecommendationType,
        ).toBe(
          "conditioning_support",
        );
      },
    );

    it(
      "does not create guidance from low conditioning frequency alone",
      () => {
        const recommendations:
          RecommendationResult[] = [];

        const observations = [
          createObservation("rarely"),
        ];

        const guidance =
          buildRoutineGuidance(
            recommendations,
            observations,
          );

        expect(guidance).toEqual([]);
      },
    );

    it.each([
      "sometimes",
      "frequently",
      "daily",
    ] as const)(
      "does not create conditioning frequency guidance when frequency is %s",
      (value) => {
        const recommendations = [
          createRecommendation(
            "conditioning_support",
          ),
        ];

        const observations = [
          createObservation(value),
        ];

        const guidance =
          buildRoutineGuidance(
            recommendations,
            observations,
          );

        expect(guidance).toEqual([]);
      },
    );
  },
);