import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  QuestionnaireQuestion,
} from "./questionnaire";

import {
  validateAnswers,
} from "./questionnaire-validation";

const questions: QuestionnaireQuestion[] = [
  {
    id: "wetting",
    text:
      "Com que velocidade o comprimento fica completamente molhado?",
    type: "single_choice",
    domain: "fiber",
    trait: "wetting_speed",
    region: "mid_length",

    options: [
      {
        label: "Devagar",
        value: "slow",
      },
      {
        label: "Normal",
        value: "normal",
      },
      {
        label: "Rápido",
        value: "fast",
      },
    ],
  },
];

describe("validateAnswers", () => {
  it("accepts valid answers", () => {
    const result =
      validateAnswers(
        questions,
        [
          {
            questionId: "wetting",
            value: "slow",
          },
        ],
      );

    expect(result).toEqual([]);
  });

  it("rejects invalid options", () => {
    const result =
      validateAnswers(
        questions,
        [
          {
            questionId: "wetting",
            value: "severe",
          },
        ],
      );

    expect(result).toEqual([
      {
        questionId: "wetting",
        reason: "invalid_option",
      },
    ]);
  });

  it("reports unknown questions", () => {
    const result =
      validateAnswers(
        questions,
        [
          {
            questionId: "missing",
            value: "high",
          },
        ],
      );

    expect(result).toEqual([
      {
        questionId: "missing",
        reason: "unknown_question",
      },
    ]);
  });
});