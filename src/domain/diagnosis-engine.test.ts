import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Observation,
} from "./observation";

import {
  buildDiagnosis,
} from "./diagnosis-engine";

import {
  strongConditioningResponseRule,
} from "./rules/conditioning-response.rule";

import {
  chemicalExposureRule,
} from "./rules/chemical-exposure.rule";

describe(
  "buildDiagnosis",
  () => {
    it(
      "supports multiple compatible findings in the same diagnosis",
      () => {
        const observations:
          Observation[] = [
            {
              id: "obs_roughness",

              domain: "fiber",

              trait:
                "post_wash_roughness",

              value: "high",

              region:
                "mid_length",

              source:
                "questionnaire",
            },

            {
              id: "obs_tangling",

              domain: "fiber",

              trait:
                "wet_tangling",

              value: "high",

              region:
                "mid_length",

              source:
                "questionnaire",
            },

            {
              id:
                "obs_conditioning",

              domain:
                "product_response",

              trait:
                "conditioning_improvement",

              value: "high",

              region:
                "mid_length",

              source:
                "questionnaire",
            },

            {
              id:
                "obs_chemical",

              domain: "history",

              trait:
                "chemical_processing",

              value: "high",

              region: "all",

              source:
                "questionnaire",
            },
          ];

        const rules = [
          {
            ...strongConditioningResponseRule,

            status:
              "active" as const,
          },

          {
            ...chemicalExposureRule,

            status:
              "active" as const,
          },
        ];

        const result =
          buildDiagnosis(
            rules,
            observations,
          );

        expect(
          result.findings,
        ).toHaveLength(2);

        expect(
          result.findings.map(
            (finding) =>
              finding.type,
          ),
        ).toEqual([
          "strong_conditioning_response",
          "substantial_chemical_exposure",
        ]);

        expect(
          result.assessment.status,
        ).toBe(
          "supported",
        );

        expect(
          result.assessment.findings,
        ).toHaveLength(2);
      },
    );
  },
);