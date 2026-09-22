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
  moistureRetentionRule,
} from "./moisture-retention.rule";

const matchingObservations:
  Observation[] = [
    {
      id: "observation_wetting",
      domain: "fiber",
      trait: "wetting_speed",
      value: "fast",
      region: "mid_length",
      source: "questionnaire",
    },
    {
      id: "observation_drying",
      domain: "fiber",
      trait: "drying_speed",
      value: "fast",
      region: "mid_length",
      source: "questionnaire",
    },
    {
      id: "observation_retention",
      domain: "fiber",
      trait: "water_retention",
      value: "low",
      region: "mid_length",
      source: "questionnaire",
    },
  ];

describe("moistureRetentionRule", () => {
  it(
    "matches when all moisture retention signals are present",
    () => {
      const result = evaluateRule(
        moistureRetentionRule,
        matchingObservations,
      );

      expect(result).not.toBeNull();

      expect(result?.type).toBe(
        "low_moisture_retention",
      );
    },
  );

  it(
    "does not match from rapid drying alone",
    () => {
      const result = evaluateRule(
        moistureRetentionRule,
        [
          matchingObservations[1],
        ],
      );

      expect(result).toBeNull();
    },
  );

  it(
    "does not match when retention is not low",
    () => {
      const observations:
        Observation[] = [
          matchingObservations[0],
          matchingObservations[1],
          {
            ...matchingObservations[2],
            value: "medium",
          },
        ];

      const result = evaluateRule(
        moistureRetentionRule,
        observations,
      );

      expect(result).toBeNull();
    },
  );
});