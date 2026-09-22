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

const questions:
  QuestionnaireQuestion[] = [
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
        {
          label: "Não sei",
          value: "unknown",
        },
      ],
    },

    {
      id: "primary_goal",
      text:
        "Qual é sua principal prioridade?",
      type: "single_choice",
      domain: "goal",
      trait: "primary_goal",
      region: "all",
      options: [
        {
          label: "Reduzir quebra",
          value: "reduce_breakage",
        },
        {
          label: "Controlar frizz",
          value: "control_frizz",
        },
      ],
    },

    {
      id: "routine_complexity",
      text:
        "Que tipo de rotina você prefere?",
      type: "single_choice",
      domain: "preference",
      trait: "routine_complexity",
      region: "all",
      options: [
        {
          label: "Mínima",
          value: "minimal",
        },
        {
          label: "Equilibrada",
          value: "balanced",
        },
        {
          label: "Completa",
          value: "complete",
        },
      ],
    },

    {
      id: "budget_priority",
      text:
        "Como o preço deve influenciar as sugestões?",
      type: "single_choice",
      domain: "preference",
      trait: "budget_priority",
      region: "all",
      options: [
        {
          label:
            "Priorizar menor preço",
          value: "lowest_price",
        },
        {
          label:
            "Priorizar custo-benefício",
          value: "cost_benefit",
        },
        {
          label:
            "Preço flexível",
          value: "flexible",
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

  it("accepts unknown when the question explicitly allows it", () => {
    const result =
      processQuestionnaire(
        questions,
        [
          {
            questionId: "breakage",
            value: "unknown",
          },
        ],
      );

    expect(result.valid).toBe(true);

    expect(
      result.observations[0].value,
    ).toBe("unknown");
  });

  it("produces a goal observation", () => {
    const result =
      processQuestionnaire(
        questions,
        [
          {
            questionId:
              "primary_goal",
            value: "control_frizz",
          },
        ],
      );

    expect(result.valid).toBe(true);

    expect(
      result.observations[0],
    ).toMatchObject({
      domain: "goal",
      trait: "primary_goal",
      value: "control_frizz",
    });
  });

  it("produces a routine preference observation", () => {
    const result =
      processQuestionnaire(
        questions,
        [
          {
            questionId:
              "routine_complexity",
            value: "minimal",
          },
        ],
      );

    expect(result.valid).toBe(true);

    expect(
      result.observations[0],
    ).toMatchObject({
      domain: "preference",
      trait: "routine_complexity",
      value: "minimal",
    });
  });

  it("produces a budget preference observation", () => {
    const result =
      processQuestionnaire(
        questions,
        [
          {
            questionId:
              "budget_priority",
            value: "lowest_price",
          },
        ],
      );

    expect(result.valid).toBe(true);

    expect(
      result.observations[0],
    ).toMatchObject({
      domain: "preference",
      trait: "budget_priority",
      value: "lowest_price",
    });
  });
});