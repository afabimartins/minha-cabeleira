import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  FindingSummary,
} from "./finding-engine";

import type {
  RecommendationRule,
} from "./recommendation-rule";

import {
  evaluateRecommendationRule,
} from "./recommendation-engine";

const findings: FindingSummary[] = [
  {
    type: "strong_conditioning_response",
    confidence: "high",
    supportingFindings: ["finding_001"],
    basedOn: [
      "obs_001",
      "obs_002",
      "obs_003",
    ],
    evidence: [],
    explanations: [
      "Conditioning response supported.",
    ],
  },
];

const activeRule: RecommendationRule = {
  id: "recommendation_rule_001",
  name: "Example recommendation",
  status: "active",
  version: 1,

  requiresFindings: [
    "strong_conditioning_response",
  ],

  produces: {
    type: "example_recommendation",
    confidence: "medium",
  },

  evidence: ["evidence_001"],

  rationale:
    "Example recommendation rationale.",
};

describe("evaluateRecommendationRule", () => {
  it("creates a candidate when required findings exist", () => {
    const result =
      evaluateRecommendationRule(
        activeRule,
        findings,
      );

    expect(result).not.toBeNull();

    expect(result?.status).toBe(
      "candidate",
    );

    expect(result?.type).toBe(
      "example_recommendation",
    );
  });

  it("does not evaluate draft recommendation rules", () => {
    const result =
      evaluateRecommendationRule(
        {
          ...activeRule,
          status: "draft",
        },
        findings,
      );

    expect(result).toBeNull();
  });

  it("does not recommend when required findings are absent", () => {
    const result =
      evaluateRecommendationRule(
        activeRule,
        [],
      );

    expect(result).toBeNull();
  });
});