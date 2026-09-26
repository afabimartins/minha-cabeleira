import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Observation,
  ObservationTrait,
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
  trait: ObservationTrait,
  value: Observation["value"],
): Observation {
  return {
    id:
      `observation_${trait}_${value}`,

    domain: "routine",

    trait,

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
          createObservation(
            "conditioning_frequency",
            "rarely",
          ),
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
          createObservation(
            "conditioning_frequency",
            "rarely",
          ),
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
          createObservation(
            "conditioning_frequency",
            value,
          ),
        ];

        const guidance =
          buildRoutineGuidance(
            recommendations,
            observations,
          );

        expect(guidance).toEqual([]);
      },
    );

    it(
      "creates manipulation guidance when damage protection exists and styling is daily",
      () => {
        const recommendations = [
          createRecommendation(
            "damage_protection",
          ),
        ];

        const observations = [
          createObservation(
            "styling_frequency",
            "daily",
          ),
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
          "frequent_styling_protection",
        );

        expect(
          guidance[0]
            .relatedRecommendationType,
        ).toBe(
          "damage_protection",
        );

        expect(
          guidance[0].context,
        ).toEqual({
          trait:
            "styling_frequency",

          value: "daily",
        });
      },
    );

    it(
      "does not create manipulation guidance from daily styling alone",
      () => {
        const recommendations:
          RecommendationResult[] = [];

        const observations = [
          createObservation(
            "styling_frequency",
            "daily",
          ),
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
      "rarely",
      "sometimes",
    ] as const)(
      "does not create frequent styling guidance when styling frequency is %s",
      (value) => {
        const recommendations = [
          createRecommendation(
            "damage_protection",
          ),
        ];

        const observations = [
          createObservation(
            "styling_frequency",
            value,
          ),
        ];

        const guidance =
          buildRoutineGuidance(
            recommendations,
            observations,
          );

        expect(guidance).toEqual([]);
      },
    );

    it(
      "creates washing protection guidance when damage protection exists and washing is daily",
      () => {
        const recommendations = [
          createRecommendation(
            "damage_protection",
          ),
        ];

        const observations = [
          createObservation(
            "wash_frequency",
            "daily",
          ),
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
          "frequent_washing_protection",
        );

        expect(
          guidance[0]
            .relatedRecommendationType,
        ).toBe(
          "damage_protection",
        );

        expect(
          guidance[0].context,
        ).toEqual({
          trait:
            "wash_frequency",

          value: "daily",
        });
      },
    );

    it(
      "does not create washing protection guidance from daily washing alone",
      () => {
        const recommendations:
          RecommendationResult[] = [];

        const observations = [
          createObservation(
            "wash_frequency",
            "daily",
          ),
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
      "rarely",
      "sometimes",
      "frequently",
    ] as const)(
      "does not create washing protection guidance when washing frequency is %s",
      (value) => {
        const recommendations = [
          createRecommendation(
            "damage_protection",
          ),
        ];

        const observations = [
          createObservation(
            "wash_frequency",
            value,
          ),
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