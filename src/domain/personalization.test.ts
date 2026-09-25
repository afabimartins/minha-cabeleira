import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Observation,
} from "./observation";

import type {
  RecommendationResult,
} from "./analysis-result";

import {
  getPersonalizationPreferences,
  personalizeRecommendations,
} from "./personalization";

function createRecommendationResult(
  type: string,
  productPrices: number[] = [
    19.9,
    24.9,
    29.9,
  ],
): RecommendationResult {
  const attributeByType: Record<
    string,
    string[]
  > = {
    conditioning_support: [
      "conditioning",
    ],

    damage_protection: [
      "damage_support",
    ],

    moisture_support: [
      "moisture_support",
    ],
  };

  return {
    recommendation: {
      id: `recommendation_${type}`,
      type,
      status: "candidate",
      confidence: "high",
      basedOnFindings: [],
      evidence: [],
      rationale: `Recommendation for ${type}.`,
    },

    products: productPrices.map(
      (price, index) => ({
        id: `${type}_product_${index + 1}`,
        name: `${type} Product ${index + 1}`,
        brand: "Minha Cabeleira",
        category: "conditioner",
        price,
        currency: "BRL",
        ingredients: [],
        attributes:
          attributeByType[type] ?? [],
        availability: "active",
      }),
    ),
  };
}

function createPreferenceObservation(
  trait:
    | "primary_goal"
    | "routine_complexity"
    | "budget_priority",
  value: Observation["value"],
): Observation {
  return {
    id: trait,

    domain:
      trait === "primary_goal"
        ? "goal"
        : "preference",

    trait,
    value,
    region: "all",
    source: "questionnaire",
  };
}

describe(
  "getPersonalizationPreferences",
  () => {
    it("extracts personalization preferences from observations", () => {
      const observations: Observation[] =
        [
          createPreferenceObservation(
            "primary_goal",
            "reduce_breakage",
          ),

          createPreferenceObservation(
            "routine_complexity",
            "minimal",
          ),

          createPreferenceObservation(
            "budget_priority",
            "lowest_price",
          ),
        ];

      expect(
        getPersonalizationPreferences(
          observations,
        ),
      ).toEqual({
        primaryGoal:
          "reduce_breakage",

        routineComplexity:
          "minimal",

        budgetPriority:
          "lowest_price",
      });
    });

    it("returns undefined preferences when they are not present", () => {
      expect(
        getPersonalizationPreferences(
          [],
        ),
      ).toEqual({
        primaryGoal: undefined,

        routineComplexity:
          undefined,

        budgetPriority:
          undefined,
      });
    });
  },
);

describe(
  "personalizeRecommendations",
  () => {
    it("prioritizes damage protection for a reduce breakage goal", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
          ),

          createRecommendationResult(
            "damage_protection",
          ),

          createRecommendationResult(
            "moisture_support",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "primary_goal",
            "reduce_breakage",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0]
          .recommendation.type,
      ).toBe(
        "damage_protection",
      );
    });

    it("prioritizes damage protection for a retain length goal", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "moisture_support",
          ),

          createRecommendationResult(
            "conditioning_support",
          ),

          createRecommendationResult(
            "damage_protection",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "primary_goal",
            "retain_length",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0]
          .recommendation.type,
      ).toBe(
        "damage_protection",
      );
    });

    it("prioritizes conditioning support for a softness goal", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "damage_protection",
          ),

          createRecommendationResult(
            "conditioning_support",
          ),

          createRecommendationResult(
            "moisture_support",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "primary_goal",
            "improve_softness",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0]
          .recommendation.type,
      ).toBe(
        "conditioning_support",
      );
    });

    it("prioritizes moisture support for a frizz goal", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
          ),

          createRecommendationResult(
            "damage_protection",
          ),

          createRecommendationResult(
            "moisture_support",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "primary_goal",
            "control_frizz",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0]
          .recommendation.type,
      ).toBe(
        "moisture_support",
      );
    });

    it("limits each recommendation to one product for a minimal routine", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
          ),

          createRecommendationResult(
            "damage_protection",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "routine_complexity",
            "minimal",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized,
      ).toHaveLength(2);

      expect(
        personalized.every(
          (result) =>
            result.products.length ===
            1,
        ),
      ).toBe(true);

      expect(
        personalized[0]
          .products[0].price,
      ).toBe(19.9);
    });

    it("does not limit products for a balanced routine", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "routine_complexity",
            "balanced",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0].products,
      ).toHaveLength(3);
    });

    it("does not limit products for a complete routine", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "routine_complexity",
            "complete",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0].products,
      ).toHaveLength(3);
    });

    it("preserves recommendation order when the goal has no supported mapping", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
          ),

          createRecommendationResult(
            "damage_protection",
          ),

          createRecommendationResult(
            "moisture_support",
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "primary_goal",
            "improve_definition",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized.map(
          (result) =>
            result.recommendation.type,
        ),
      ).toEqual([
        "conditioning_support",
        "damage_protection",
        "moisture_support",
      ]);
    });

    it(
  "preserves recommendation order for a simplify routine goal",
  () => {
    const results:
      RecommendationResult[] = [
        createRecommendationResult(
          "conditioning_support",
        ),

        createRecommendationResult(
          "damage_protection",
        ),

        createRecommendationResult(
          "moisture_support",
        ),
      ];

    const observations:
      Observation[] = [
        createPreferenceObservation(
          "primary_goal",
          "simplify_routine",
        ),
      ];

    const personalized =
      personalizeRecommendations(
        results,
        observations,
      );

    expect(
      personalized.map(
        (result) =>
          result.recommendation.type,
      ),
    ).toEqual([
      "conditioning_support",
      "damage_protection",
      "moisture_support",
    ]);
  },
);

    it("does not mutate the original recommendation results", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
          ),
        ];

      const originalProducts =
        results[0].products;

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "routine_complexity",
            "minimal",
          ),
        ];

      personalizeRecommendations(
        results,
        observations,
      );

      expect(
        results[0].products,
      ).toBe(originalProducts);

      expect(
        results[0].products,
      ).toHaveLength(3);
    });

    it("ranks products from lowest to highest price when lowest price is preferred", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            [
              29.9,
              14.9,
              22.9,
            ],
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "budget_priority",
            "lowest_price",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0].products.map(
          (product) =>
            product.price,
        ),
      ).toEqual([
        14.9,
        22.9,
        29.9,
      ]);
    });

    it("selects the cheapest compatible product when minimal routine and lowest price are combined", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            [
              29.9,
              14.9,
              22.9,
            ],
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "routine_complexity",
            "minimal",
          ),

          createPreferenceObservation(
            "budget_priority",
            "lowest_price",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0].products,
      ).toHaveLength(1);

      expect(
        personalized[0]
          .products[0].price,
      ).toBe(14.9);
    });

    it(
  "preserves product order when cost benefit is preferred",
  () => {
    const results:
      RecommendationResult[] = [
        createRecommendationResult(
          "conditioning_support",
          [
            29.9,
            14.9,
            22.9,
          ],
        ),
      ];

    const observations:
      Observation[] = [
        createPreferenceObservation(
          "budget_priority",
          "cost_benefit",
        ),
      ];

    const personalized =
      personalizeRecommendations(
        results,
        observations,
      );

    expect(
      personalized[0].products.map(
        (product) =>
          product.price,
      ),
    ).toEqual([
      29.9,
      14.9,
      22.9,
    ]);
  },
);

    it("preserves product order when budget is flexible", () => {
      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            [
              29.9,
              14.9,
              22.9,
            ],
          ),
        ];

      const observations:
        Observation[] = [
          createPreferenceObservation(
            "budget_priority",
            "flexible",
          ),
        ];

      const personalized =
        personalizeRecommendations(
          results,
          observations,
        );

      expect(
        personalized[0].products.map(
          (product) =>
            product.price,
        ),
      ).toEqual([
        29.9,
        14.9,
        22.9,
      ]);
    });
  },
);