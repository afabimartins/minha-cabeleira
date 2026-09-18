import {
  describe,
  expect,
  it,
} from "vitest";

import {
  runFullAnalysis,
} from "./full-analysis";

import {
  strongConditioningResponseRule,
} from "./rules/conditioning-response.rule";

import type {
  RecommendationRule,
} from "./recommendation-rule";


import { QuestionnaireQuestion } from "./questionnaire";

const questions: QuestionnaireQuestion[] = [
  {
    id: "roughness",
    text: "Aspereza após lavagem",
    type: "single_choice" as const,
    domain: "fiber",
    trait: "post_wash_roughness",
    region: "mid_length",
    options: [
      {
        label: "Alta",
        value: "high",
      },
    ],
  },
  {
    id: "tangling",
    text: "Embaraçamento molhado",
    type: "single_choice" as const,
    domain: "fiber",
    trait: "wet_tangling",
    region: "mid_length",
    options: [
      {
        label: "Alto",
        value: "high",
      },
    ],
  },
  {
    id: "conditioning",
    text: "Melhora com condicionamento",
    type: "single_choice" as const,
    domain: "product_response",
    trait: "conditioning_improvement",
    region: "mid_length",
    options: [
      {
        label: "Alta",
        value: "high",
      },
    ],
  },
];

const recommendationRule: RecommendationRule = {
  id: "recommendation_conditioning_support",
  name: "Conditioning support",
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

  rationale:
    "The supported finding indicates that conditioning support should be prioritized.",
};

describe("runFullAnalysis", () => {
  it("runs the complete analysis pipeline", () => {
    const result = runFullAnalysis(
  questions,
  [
    {
      questionId: "roughness",
      value: "high",
    },
    {
      questionId: "tangling",
      value: "high",
    },
    {
      questionId: "conditioning",
      value: "high",
    },
  ],
  [
    {
      ...strongConditioningResponseRule,
      status: "active" as const,
    },
  ],
  [],
  [recommendationRule],
);

    expect(result.valid).toBe(true);

    if (!result.valid) {
      throw new Error(
        "Expected full analysis to be valid",
      );
    }

    expect(
      result.result.diagnosis.findings,
    ).toHaveLength(1);

    expect(
      result.result.recommendations.length,
    ).toBeGreaterThan(0);
  });
});