import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  QuestionnaireQuestion,
} from "./questionnaire";

import {
  processQuestionnaire,
} from "./questionnaire-session";

const questions: QuestionnaireQuestion[] = [
  {
    id: "breakage",
    text:
      "Você percebe quebra no comprimento?",
    type: "single_choice",
    domain: "fiber",
    trait: "breakage",
    region: "mid_length",

    options: [
      {
        label: "Não percebo",
        value: "none",
      },
      {
        label: "Pouca",
        value: "low",
      },
      {
        label: "Muita",
        value: "high",
      },
    ],
  },
];

describe("processQuestionnaire", () => {
  it("produces observations for a valid questionnaire", () => {
    const result =
      processQuestionnaire(
        questions,
        [
          {
            questionId: "breakage",
            value: "high",
          },
        ],
      );

    expect(result.valid).toBe(true);

    expect(
      result.observations,
    ).toHaveLength(1);
  });

  it("does not produce observations from invalid answers", () => {
    const result =
      processQuestionnaire(
        questions,
        [
          {
            questionId: "breakage",
            value: "fast",
          },
        ],
      );

    expect(result.valid).toBe(false);

    expect(
      result.observations,
    ).toEqual([]);

    expect(result.issues).toHaveLength(
      1,
    );
  });
});