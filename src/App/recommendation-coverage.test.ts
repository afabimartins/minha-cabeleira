import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Product,
  ProductCategory,
} from "../domain/product";

import type {
  QuestionnaireAnswer,
} from "../domain/questionnaire";

import {
  runFullAnalysis,
} from "../domain/full-analysis";

import {
  questionnaireQuestions,
} from "./questionnaire-data";

import {
  analysisRules,
  analysisRecommendationRules,
} from "./analysis-data";

function product(
  id: string,
  category: ProductCategory,
  attributes: string[],
  price: number,
): Product {
  return {
    id,
    name: id,
    brand: "Fixture",
    category,
    price,
    currency: "BRL",
    ingredients: [],
    attributes,
    availability: "active",
  };
}

const catalog: Product[] = [
  product(
    "shampoo-complete",
    "shampoo",
    [
      "moisture_support",
      "damage_support",
      "conditioning",
      "gentle_cleansing",
    ],
    10,
  ),
  product(
    "conditioner-complete",
    "conditioner",
    [
      "conditioning",
      "moisture_support",
      "damage_support",
    ],
    12,
  ),
  product(
    "mask-complete",
    "mask",
    [
      "conditioning",
      "moisture_support",
      "damage_support",
    ],
    14,
  ),
  product(
    "leave-in-complete",
    "leave_in",
    [
      "conditioning",
      "conditioning_support",
      "moisture_support",
      "damage_support",
      "heat_protection",
    ],
    16,
  ),
  product(
    "styler-complete",
    "styler",
    [
      "conditioning",
      "conditioning_support",
      "moisture_support",
    ],
    18,
  ),
  product(
    "oil-complete",
    "oil",
    [
      "conditioning",
      "moisture_support",
      "damage_support",
      "heat_protection",
    ],
    20,
  ),
  product(
    "treatment-complete",
    "treatment",
    [
      "conditioning",
      "conditioning_support",
      "damage_support",
    ],
    22,
  ),
  product(
    "scalp-oiliness",
    "scalp",
    ["scalp_oiliness_support"],
    24,
  ),
  product(
    "scalp-dryness",
    "scalp",
    ["scalp_dryness_support"],
    26,
  ),
];

const neutralValues: Record<
  string,
  QuestionnaireAnswer["value"]
> = {
  roughness: "low",
  tangling: "low",
  conditioning: "low",
  breakage: "low",
  wetting_speed: "normal",
  drying_speed: "normal",
  water_retention: "medium",
  chemical_processing: "low",
  heat_exposure: "low",
  damage_history: "none",
  scalp_oiliness: "none",
  scalp_dryness: "none",
  scalp_sensitivity: "none",
  scalp_burning: "none",
  scalp_wound: "none",
  sudden_hair_loss: "none",
  wash_frequency: "sometimes",
  conditioning_frequency: "sometimes",
  styling_frequency: "sometimes",
  primary_goal: "reduce_breakage",
  routine_complexity: "balanced",
  budget_priority: "cost_benefit",
};

function answersWith(
  overrides: Partial<
    Record<
      string,
      QuestionnaireAnswer["value"]
    >
  > = {},
): QuestionnaireAnswer[] {
  return questionnaireQuestions.map(
    (question) => ({
      questionId: question.id,
      value:
        overrides[question.id] ??
        neutralValues[question.id],
    }),
  );
}

function run(
  overrides: Parameters<
    typeof answersWith
  >[0] = {},
) {
  const analysis = runFullAnalysis(
    questionnaireQuestions,
    answersWith(overrides),
    analysisRules,
    catalog,
    analysisRecommendationRules,
  );

  expect(analysis.valid).toBe(true);
  expect(analysis.result).not.toBeNull();

  return analysis.result!;
}

const goals = [
  "reduce_breakage",
  "improve_softness",
  "control_frizz",
  "improve_definition",
  "retain_length",
  "simplify_routine",
] as const;

const routineComplexities = [
  "minimal",
  "balanced",
  "complete",
] as const;

const budgetPriorities = [
  "lowest_price",
  "cost_benefit",
  "flexible",
] as const;

const needStates = [
  {
    key: "conditioning",
    answers: {
      roughness: "high",
      tangling: "high",
      conditioning: "high",
    },
  },
  {
    key: "damage",
    answers: {
      breakage: "high",
      damage_history: "severe",
    },
  },
  {
    key: "moisture",
    answers: {
      wetting_speed: "fast",
      drying_speed: "fast",
      water_retention: "low",
    },
  },
  {
    key: "chemical",
    answers: {
      chemical_processing: "high",
    },
  },
  {
    key: "heat",
    answers: {
      heat_exposure: "high",
    },
  },
  {
    key: "scalp_oiliness",
    answers: {
      scalp_oiliness: "moderate",
    },
  },
  {
    key: "scalp_dryness",
    answers: {
      scalp_dryness: "moderate",
    },
  },
] as const;

describe(
  "recommendation coverage",
  () => {
    it("gives every normal fallback profile ingredient guidance and products for all 54 preference combinations", () => {
      for (const goal of goals) {
        for (
          const routineComplexity of
          routineComplexities
        ) {
          for (
            const budgetPriority of
            budgetPriorities
          ) {
            const result = run({
              primary_goal: goal,
              routine_complexity:
                routineComplexity,
              budget_priority:
                budgetPriority,
            });

            expect(
              result.safety.level,
            ).toBe("normal");

            expect(
              result.recommendations.length,
              `Sem recomendação para goal=${goal}, routine=${routineComplexity}, budget=${budgetPriority}`,
            ).toBeGreaterThan(0);

            expect(
              result.recommendations.some(
                ({ recommendation }) =>
                  (recommendation
                    .ingredientGuidance
                    ?.lookFor.length ?? 0) > 0,
              ),
              `Sem orientação de fórmula para goal=${goal}, routine=${routineComplexity}, budget=${budgetPriority}`,
            ).toBe(true);

            expect(
              result.recommendations.some(
                ({ products }) =>
                  products.length > 0,
              ),
              `Sem produto compatível no catálogo-fixture para goal=${goal}, routine=${routineComplexity}, budget=${budgetPriority}`,
            ).toBe(true);

            expect(
              result.routineProducts?.length,
            ).toBeGreaterThanOrEqual(5);

            expect(
              result.routineProducts
                ?.slice(0, 5)
                .every(
                  (selection) =>
                    selection.product !== null,
                ),
            ).toBe(true);
          }
        }
      }
    });

    it("covers all 128 combinations of supported need predicates without a normal result losing formula guidance", () => {
      const totalStates =
        2 ** needStates.length;

      for (
        let mask = 0;
        mask < totalStates;
        mask += 1
      ) {
        const overrides: Record<
          string,
          QuestionnaireAnswer["value"]
        > = {
          primary_goal:
            "control_frizz",
        };

        const activeKeys: string[] = [];

        needStates.forEach(
          (state, index) => {
            if (
              (mask & (1 << index)) === 0
            ) {
              return;
            }

            activeKeys.push(state.key);

            Object.assign(
              overrides,
              state.answers,
            );
          },
        );

        const result = run(overrides);

        expect(
          result.safety.level,
          `Estado inesperadamente bloqueado: ${activeKeys.join(", ") || "fallback"}`,
        ).toBe("normal");

        expect(
          result.recommendations.length,
          `Sem recomendação: ${activeKeys.join(", ") || "fallback"}`,
        ).toBeGreaterThan(0);

        expect(
          result.recommendations.every(
            ({ recommendation }) =>
              (recommendation
                .ingredientGuidance
                ?.lookFor.length ?? 0) > 0,
          ),
          `Existe recomendação sem orientação de fórmula: ${activeKeys.join(", ") || "fallback"}`,
        ).toBe(true);
      }
    });

    it("keeps the safety boundary: caution and stop do not expose product suggestions", () => {
      const caution = run({
        breakage: "high",
        damage_history: "severe",
        scalp_sensitivity: "severe",
      });

      expect(
        caution.safety.level,
      ).toBe("caution");

      expect(
        caution.safety.canRecommendProducts,
      ).toBe(false);

      expect(
        caution.recommendations.every(
          ({ products }) =>
            products.length === 0,
        ),
      ).toBe(true);

      expect(
        caution.routineProducts,
      ).toEqual([]);

      const stop = run({
        breakage: "high",
        damage_history: "severe",
        scalp_wound: "severe",
      });

      expect(stop.safety.level).toBe(
        "stop",
      );

      expect(
        stop.safety.canRecommendProducts,
      ).toBe(false);

      expect(
        stop.recommendations.every(
          ({ products }) =>
            products.length === 0,
        ),
      ).toBe(true);

      expect(
        stop.routineProducts,
      ).toEqual([]);
    });
  },
);
