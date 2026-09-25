import {
  describe,
  expect,
  it,
} from "vitest";

import {
  assessFindings,
} from "./assessment-engine";

import type {
  Finding,
} from "./finding";

describe(
  "assessFindings",
  () => {
    it(
      "returns unresolved when there are no findings",
      () => {
        const result =
          assessFindings([]);

        expect(
          result.status,
        ).toBe(
          "unresolved",
        );

        expect(
          result.findings,
        ).toEqual([]);
      },
    );

    it(
      "returns supported when findings agree",
      () => {
        const findings:
          Finding[] = [
            {
              id: "finding_001",

              type:
                "strong_conditioning_response",

              confidence: "high",

              basedOn: [
                "obs_001",
                "obs_002",
                "obs_003",
              ],

              evidence: [],

              explanation:
                "Conditioning response supported.",
            },
          ];

        const result =
          assessFindings(
            findings,
          );

        expect(
          result.status,
        ).toBe(
          "supported",
        );

        expect(
          result.findings,
        ).toEqual(
          findings,
        );
      },
    );

    it(
      "returns supported when different compatible findings coexist",
      () => {
        const findings:
          Finding[] = [
            {
              id: "finding_001",

              type:
                "strong_conditioning_response",

              confidence: "high",

              basedOn: [
                "obs_001",
              ],

              evidence: [],

              explanation:
                "Conditioning response supported.",
            },

            {
              id: "finding_002",

              type:
                "chemical_exposure",

              confidence: "high",

              basedOn: [
                "obs_002",
              ],

              evidence: [],

              explanation:
                "Chemical exposure reported.",
            },
          ];

        const result =
          assessFindings(
            findings,
          );

        expect(
          result.status,
        ).toBe(
          "supported",
        );

        expect(
          result.findings,
        ).toEqual(
          findings,
        );
      },
    );
  },
);