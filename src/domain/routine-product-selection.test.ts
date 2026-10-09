import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  RecommendationResult,
} from "./analysis-result";

import type {
  Observation,
} from "./observation";

import type {
  Product,
  ProductCategory,
} from "./product";

import {
  CORE_ROUTINE_PRODUCT_CATEGORIES,
  selectRoutineProducts,
} from "./routine-product-selection";

function product(
  id: string,
  category: ProductCategory,
  price: number,
  attributes: string[],
  brand = "Fixture",
): Product {
  return {
    id,
    name: id,
    brand,
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
    "shampoo-basic",
    "shampoo",
    12,
    ["moisture_support"],
  ),
  product(
    "conditioner-basic",
    "conditioner",
    14,
    [
      "conditioning",
      "moisture_support",
    ],
  ),
  product(
    "mask-basic",
    "mask",
    18,
    [
      "conditioning",
      "moisture_support",
      "damage_support",
    ],
  ),
  product(
    "leave-in-basic",
    "leave_in",
    20,
    [
      "conditioning",
      "moisture_support",
      "damage_support",
    ],
  ),
  product(
    "oil-basic",
    "oil",
    22,
    [
      "conditioning",
      "moisture_support",
      "damage_support",
    ],
  ),
  product(
    "scalp-dryness-basic",
    "scalp",
    24,
    ["scalp_dryness_support"],
  ),
  product(
    "scalp-oiliness-basic",
    "scalp",
    26,
    ["scalp_oiliness_support"],
  ),
];

function recommendation(
  type: string,
  requiredAttributes: string[],
): RecommendationResult {
  return {
    recommendation: {
      id: `recommendation-${type}`,
      type,
      status: "candidate",
      confidence: "high",
      basedOnFindings: [],
      evidence: [],
      rationale: type,
      productCriteria: {
        requiredAttributes,
      },
    },
    products: [],
  };
}

function preference(
  trait:
    | "routine_complexity"
    | "budget_priority",
  value: Observation["value"],
): Observation {
  return {
    id: `${trait}-${String(value)}`,
    domain: "preference",
    trait,
    value,
    region: "all",
    source: "questionnaire",
  };
}


function goalPreference(
  value: Observation["value"],
): Observation {
  return {
    id: `primary_goal-${String(value)}`,
    domain: "goal",
    trait: "primary_goal",
    value,
    region: "all",
    source: "questionnaire",
  };
}

describe(
  "selectRoutineProducts",
  () => {
    it("returns every core category even when there are no diagnostic recommendations", () => {
      const routine =
        selectRoutineProducts(
          catalog,
          [],
          [],
        );

      expect(
        routine.map(
          (selection) =>
            selection.category,
        ),
      ).toEqual(
        CORE_ROUTINE_PRODUCT_CATEGORIES,
      );

      expect(
        routine.every(
          (selection) =>
            selection.product !== null,
        ),
      ).toBe(true);
    });

    it("marks exact, compatible and basic fallbacks transparently", () => {
      const routine =
        selectRoutineProducts(
          catalog,
          [
            recommendation(
              "combined",
              [
                "conditioning",
                "damage_support",
              ],
            ),
          ],
          [],
        );

      expect(
        routine.find(
          (selection) =>
            selection.category ===
            "mask",
        )?.matchLevel,
      ).toBe("exact");

      expect(
        routine.find(
          (selection) =>
            selection.category ===
            "conditioner",
        )?.matchLevel,
      ).toBe("compatible");

      expect(
        routine.find(
          (selection) =>
            selection.category ===
            "shampoo",
        )?.matchLevel,
      ).toBe("basic");
    });

    it("chooses the cheapest product inside the same compatibility level when price is the priority", () => {
      const products = [
        ...catalog,
        product(
          "conditioner-cheapest",
          "conditioner",
          9,
          [
            "conditioning",
            "moisture_support",
          ],
        ),
      ];

      const routine =
        selectRoutineProducts(
          products,
          [
            recommendation(
              "conditioning",
              ["conditioning"],
            ),
          ],
          [
            preference(
              "budget_priority",
              "lowest_price",
            ),
          ],
        );

      expect(
        routine.find(
          (selection) =>
            selection.category ===
            "conditioner",
        )?.product?.id,
      ).toBe("conditioner-cheapest");
    });

    it("returns up to three options from different brands for each category", () => {
      const products = [
        product(
          "shampoo-a-1",
          "shampoo",
          12,
          ["moisture_support"],
          "Marca A",
        ),
        product(
          "shampoo-a-2",
          "shampoo",
          10,
          ["moisture_support"],
          "Marca A",
        ),
        product(
          "shampoo-b",
          "shampoo",
          14,
          ["moisture_support"],
          "Marca B",
        ),
        product(
          "shampoo-c",
          "shampoo",
          16,
          ["moisture_support"],
          "Marca C",
        ),
        ...catalog.filter(
          (item) => item.category !== "shampoo",
        ),
      ];

      const routine =
        selectRoutineProducts(
          products,
          [
            recommendation(
              "moisture_support",
              ["moisture_support"],
            ),
          ],
          [
            preference(
              "budget_priority",
              "lowest_price",
            ),
          ],
        );

      const shampoo = routine.find(
        (selection) =>
          selection.category === "shampoo",
      );

      expect(shampoo?.options).toHaveLength(3);
      expect(
        shampoo?.options?.map(
          (option) => option.product.brand,
        ),
      ).toEqual([
        "Marca A",
        "Marca B",
        "Marca C",
      ]);

      expect(
        new Set(
          shampoo?.options?.map(
            (option) =>
              option.product.brand.toLowerCase(),
          ),
        ).size,
      ).toBe(3);
    });

    it("never relaxes excluded attributes", () => {
      const unsafe = product(
        "unsafe-shampoo",
        "shampoo",
        5,
        [
          "moisture_support",
          "avoid_me",
        ],
      );

      const safe = product(
        "safe-shampoo",
        "shampoo",
        15,
        ["moisture_support"],
      );

      const result: RecommendationResult = {
        recommendation: {
          id: "safety-filter",
          type: "safety-filter",
          status: "candidate",
          confidence: "high",
          basedOnFindings: [],
          evidence: [],
          rationale: "safety",
          productCriteria: {
            requiredAttributes: [
              "moisture_support",
            ],
            excludedAttributes: [
              "avoid_me",
            ],
          },
        },
        products: [],
      };

      const routine =
        selectRoutineProducts(
          [
            unsafe,
            safe,
            ...catalog.filter(
              (item) =>
                item.category !==
                "shampoo",
            ),
          ],
          [result],
          [],
        );

      expect(
        routine.find(
          (selection) =>
            selection.category ===
            "shampoo",
        )?.product?.id,
      ).toBe("safe-shampoo");
    });

    it("selects scalp care that matches dryness when dryness is reported", () => {
      const observations: Observation[] = [
        {
          id: "scalp-dryness",
          domain: "scalp",
          trait: "scalp_dryness",
          value: "moderate",
          region: "scalp",
          source: "questionnaire",
        },
        preference(
          "budget_priority",
          "lowest_price",
        ),
      ];

      const routine =
        selectRoutineProducts(
          catalog,
          [],
          observations,
        );

      const scalp = routine.find(
        (selection) =>
          selection.category ===
          "scalp",
      );

      expect(scalp?.product?.id).toBe(
        "scalp-dryness-basic",
      );
      expect(scalp?.matchLevel).toBe(
        "exact",
      );
    });

    it("selects scalp care that matches oiliness when oiliness is reported", () => {
      const observations: Observation[] = [
        {
          id: "scalp-oiliness",
          domain: "scalp",
          trait: "scalp_oiliness",
          value: "severe",
          region: "scalp",
          source: "questionnaire",
        },
        preference(
          "budget_priority",
          "lowest_price",
        ),
      ];

      const routine =
        selectRoutineProducts(
          catalog,
          [],
          observations,
        );

      expect(
        routine.find(
          (selection) =>
            selection.category ===
            "scalp",
        )?.product?.id,
      ).toBe("scalp-oiliness-basic");
    });

    it("does not use a dryness-only scalp product as fallback for oiliness", () => {
      const observations: Observation[] = [
        {
          id: "scalp-oiliness",
          domain: "scalp",
          trait: "scalp_oiliness",
          value: "moderate",
          region: "scalp",
          source: "questionnaire",
        },
      ];

      const withoutOiliness = catalog.filter(
        (item) =>
          item.id !== "scalp-oiliness-basic",
      );

      const scalp = selectRoutineProducts(
        withoutOiliness,
        [],
        observations,
      ).find(
        (selection) =>
          selection.category === "scalp",
      );

      expect(scalp?.product).toBeNull();
      expect(scalp?.options).toEqual([]);
    });

    it("does not add scalp care when oiliness and dryness are absent", () => {
      const observations: Observation[] = [
        {
          id: "scalp-dryness",
          domain: "scalp",
          trait: "scalp_dryness",
          value: "none",
          region: "scalp",
          source: "questionnaire",
        },
        {
          id: "scalp-oiliness",
          domain: "scalp",
          trait: "scalp_oiliness",
          value: "none",
          region: "scalp",
          source: "questionnaire",
        },
      ];

      const routine =
        selectRoutineProducts(
          catalog,
          [],
          observations,
        );

      expect(
        routine.some(
          (selection) =>
            selection.category ===
            "scalp",
        ),
      ).toBe(false);
    });

    it("reports a missing category instead of inventing a product", () => {
      const withoutOil =
        catalog.filter(
          (item) =>
            item.category !== "oil",
        );

      const routine =
        selectRoutineProducts(
          withoutOil,
          [],
          [],
        );

      const oil = routine.find(
        (selection) =>
          selection.category === "oil",
      );

      expect(oil?.product).toBeNull();
      expect(oil?.matchLevel).toBe(
        "missing",
      );
    });

    it("keeps all core categories covered across recommendation and preference combinations", () => {
      const recommendationSets: RecommendationResult[][] = [
        [],
        [
          recommendation(
            "conditioning_support",
            ["conditioning"],
          ),
        ],
        [
          recommendation(
            "moisture_support",
            ["moisture_support"],
          ),
        ],
        [
          recommendation(
            "damage_protection",
            ["damage_support"],
          ),
        ],
        [
          recommendation(
            "conditioning_support",
            ["conditioning"],
          ),
          recommendation(
            "moisture_support",
            ["moisture_support"],
          ),
        ],
        [
          recommendation(
            "conditioning_support",
            ["conditioning"],
          ),
          recommendation(
            "damage_protection",
            ["damage_support"],
          ),
        ],
        [
          recommendation(
            "moisture_support",
            ["moisture_support"],
          ),
          recommendation(
            "damage_protection",
            ["damage_support"],
          ),
        ],
        [
          recommendation(
            "conditioning_support",
            ["conditioning"],
          ),
          recommendation(
            "moisture_support",
            ["moisture_support"],
          ),
          recommendation(
            "damage_protection",
            ["damage_support"],
          ),
        ],
      ];

      const routinePreferences:
        Observation["value"][] = [
          "minimal",
          "balanced",
          "complete",
        ];

      const budgetPreferences:
        Observation["value"][] = [
          "lowest_price",
          "cost_benefit",
          "flexible",
        ];

      const goals: Observation["value"][] = [
        "reduce_breakage",
        "improve_softness",
        "control_frizz",
        "improve_definition",
        "retain_length",
        "simplify_routine",
      ];

      const scalpScenarios: Observation[][] = [
        [],
        [
          {
            id: "scalp-dryness",
            domain: "scalp",
            trait: "scalp_dryness",
            value: "moderate",
            region: "scalp",
            source: "questionnaire",
          },
        ],
        [
          {
            id: "scalp-oiliness",
            domain: "scalp",
            trait: "scalp_oiliness",
            value: "moderate",
            region: "scalp",
            source: "questionnaire",
          },
        ],
        [
          {
            id: "scalp-dryness",
            domain: "scalp",
            trait: "scalp_dryness",
            value: "mild",
            region: "scalp",
            source: "questionnaire",
          },
          {
            id: "scalp-oiliness",
            domain: "scalp",
            trait: "scalp_oiliness",
            value: "mild",
            region: "scalp",
            source: "questionnaire",
          },
        ],
      ];

      let testedCombinations = 0;

      for (const rules of recommendationSets) {
        for (
          const routinePreference of
          routinePreferences
        ) {
          for (
            const budgetPreference of
            budgetPreferences
          ) {
            for (const goal of goals) {
              for (
                const scalpScenario of
                  scalpScenarios
              ) {
                const routine =
                  selectRoutineProducts(
                    catalog,
                    rules,
                    [
                      preference(
                        "routine_complexity",
                        routinePreference,
                      ),
                      preference(
                        "budget_priority",
                        budgetPreference,
                      ),
                      goalPreference(goal),
                      ...scalpScenario,
                    ],
                  );

                expect(
                  routine,
                ).toHaveLength(
                  CORE_ROUTINE_PRODUCT_CATEGORIES.length +
                    (scalpScenario.length > 0
                      ? 1
                      : 0),
                );

                expect(
                  routine.every(
                    (selection) =>
                      selection.product !==
                      null,
                  ),
                ).toBe(true);

                testedCombinations += 1;
              }
            }
          }
        }
      }

      expect(testedCombinations).toBe(1728);
    });
  },
);
