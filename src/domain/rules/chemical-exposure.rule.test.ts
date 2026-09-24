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
  chemicalExposureRule,
} from "./chemical-exposure.rule";

function createObservation(
  value: Observation["value"],
): Observation {
  return {
    id: `observation_chemical_processing_${value}`,
    domain: "history",
    trait: "chemical_processing",
    value,
    region: "all",
    source: "questionnaire",
  };
}

describe(
  "chemicalExposureRule",
  () => {
    it(
      "creates a finding for high chemical exposure",
      () => {
        const observations: Observation[] = [
          createObservation("high"),
        ];

        const finding = evaluateRule(
          chemicalExposureRule,
          observations,
        );

        expect(finding).not.toBeNull();

        expect(finding?.type).toBe(
          "substantial_chemical_exposure",
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
      "does not create a finding for %s chemical exposure",
      (value) => {
        const observations: Observation[] = [
          createObservation(value),
        ];

        const finding = evaluateRule(
          chemicalExposureRule,
          observations,
        );

        expect(finding).toBeNull();
      },
    );

    it(
      "does not create a finding when the observation is absent",
      () => {
        const finding = evaluateRule(
          chemicalExposureRule,
          [],
        );

        expect(finding).toBeNull();
      },
    );
  },
);