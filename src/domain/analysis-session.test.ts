import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  QuestionnaireQuestion,
} from "./questionnaire";

import {
  analyzeQuestionnaire,
} from "./analysis-session";

import {
  strongConditioningResponseRule,
} from "./rules/conditioning-response.rule";

const questions: QuestionnaireQuestion[] = [
  {
    id: "roughness",
    text: "Aspereza após lavagem",
    type: "single_choice",
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
    type: "single_choice",
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
    text:
      "Melhora com condicionamento",
    type: "single_choice",
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

describe("analyzeQuestionnaire", () => {
  it("connects questionnaire data to the diagnosis pipeline", () => {
    const activeRule = {
      ...strongConditioningResponseRule,
      status: "active" as const,
    };

    const result =
      analyzeQuestionnaire(
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
        [activeRule],
      );

    expect(result.valid).toBe(true);

    expect(
      result.diagnosis?.findings,
    ).toHaveLength(1);
  });

  it("stops before diagnosis when questionnaire data is invalid", () => {
    const result =
      analyzeQuestionnaire(
        questions,
        [
          {
            questionId: "roughness",
            value: "fast",
          },
        ],
        [],
      );

    expect(result.valid).toBe(false);

    expect(
      result.diagnosis,
    ).toBeNull();
  });
});