import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  RecommendationRule,
} from "./recommendation-rule";

import {
  createRecommendationRegistry,
  getActiveRecommendationRules,
} from "./recommendation-registry";

const activeRule: RecommendationRule = {
  id: "active_rule",
  name: "Active rule",
  status: "active",
  version: 1,

  requiresFindings: [
    "strong_conditioning_response",
  ],

  produces: {
    type: "conditioning_support",
    confidence: "high",
  },

  evidence: [],
  rationale: "Active recommendation rule.",
};

const draftRule: RecommendationRule = {
  ...activeRule,
  id: "draft_rule",
  name: "Draft rule",
  status: "draft",
};

describe("recommendation registry", () => {
  it("stores recommendation rules", () => {
    const registry =
      createRecommendationRegistry([
        activeRule,
        draftRule,
      ]);

    expect(registry.rules).toHaveLength(2);
  });

  it("returns only active rules", () => {
    const registry =
      createRecommendationRegistry([
        activeRule,
        draftRule,
      ]);

    const rules =
      getActiveRecommendationRules(
        registry,
      );

    expect(rules).toHaveLength(1);
    expect(rules[0]?.id).toBe(
      "active_rule",
    );
  });
});