import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  QuestionnaireQuestion,
} from "./questionnaire";

import {
  answersToObservations,
} from "./questionnaire-engine";

const questions: QuestionnaireQuestion[] = [
  {
    id: "roughness",
    text:
      "Como o comprimento fica depois da lavagem?",
    type: "single_choice",
    domain: "fiber",
    trait: "post_wash_roughness",
    region: "mid_length",

    options: [
      {
        label: "Pouco áspero",
        value: "low",
      },
      {
        label: "Muito áspero",
        value: "high",
      },
    ],
  },

  {
    id: "scalp_oiliness",
    text:
      "Como você percebe a oleosidade do couro cabeludo?",
    type: "single_choice",
    domain: "scalp",
    trait: "scalp_oiliness",
    region: "scalp",

    options: [
      {
        label: "Baixa",
        value: "low",
      },
      {
        label: "Média",
        value: "medium",
      },
      {
        label: "Alta",
        value: "high",
      },
    ],
  },
];

describe("answersToObservations", () => {
  it("converts answers into observations", () => {
    const result =
      answersToObservations(
        questions,
        [
          {
            questionId: "roughness",
            value: "high",
          },

          {
            questionId:
              "scalp_oiliness",
            value: "medium",
          },
        ],
      );

    expect(result).toHaveLength(2);

    expect(result[0]).toEqual({
      id: "observation_roughness",
      domain: "fiber",
      trait: "post_wash_roughness",
      value: "high",
      region: "mid_length",
      source: "questionnaire",
    });

    expect(result[1]?.region).toBe(
      "scalp",
    );
  });

  it("ignores answers for unknown questions", () => {
    const result =
      answersToObservations(
        questions,
        [
          {
            questionId:
              "unknown_question",
            value: "high",
          },
        ],
      );

    expect(result).toEqual([]);
  });
});