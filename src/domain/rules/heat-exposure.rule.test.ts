import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Observation,
} from "../observation";

import {
  evaluateRule,
} from "../rule-engine";

import {
  heatExposureRule,
} from "./heat-exposure.rule";

function createObservation(
  value: Observation["value"],
): Observation {
  return {
    id: `observation_heat_exposure_${value}`,
    domain: "history",
    trait: "heat_exposure",
    value,
    region: "all",
    source: "questionnaire",
  };
}

describe(
  "heatExposureRule",
  () => {
    it(
      "creates a finding for high heat exposure",
      () => {
        const observations: Observation[] = [
          createObservation("high"),
        ];

        const finding = evaluateRule(
          heatExposureRule,
          observations,
        );

        expect(finding).not.toBeNull();

        expect(finding?.type).toBe(
          "frequent_heat_exposure",
        );

        expect(finding?.confidence).toBe(
          "high",
        );
      },
    );

    it.each([
      "low",
      "medium",
    ] as const)(
      "does not create a finding for %s heat exposure",
      (value) => {
        const observations: Observation[] = [
          createObservation(value),
        ];

        const finding = evaluateRule(
          heatExposureRule,
          observations,
        );

        expect(finding).toBeNull();
      },
    );

    it(
      "does not create a finding when the observation is absent",
      () => {
        const finding = evaluateRule(
          heatExposureRule,
          [],
        );

        expect(finding).toBeNull();
      },
    );
  },
);