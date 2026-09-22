import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Product,
} from "./product";

import type {
  RecommendationResult,
} from "./analysis-result";

import {
  selectMinimalRoutine,
} from "./minimal-routine";

function createProduct(
  id: string,
  price: number,
  attributes: string[],
): Product {
  return {
    id,
    name: id,
    brand: "Minha Cabeleira",
    category: "conditioner",
    price,
    currency: "BRL",
    ingredients: [],
    attributes,
    availability: "active",
  };
}

function createRecommendationResult(
  type: string,
  products: Product[],
): RecommendationResult {
  return {
    recommendation: {
      id: `recommendation_${type}`,
      type,
      status: "candidate",
      confidence: "high",
      basedOnFindings: [],
      evidence: [],
      rationale:
        `Recommendation for ${type}.`,
    },

    products,
  };
}

describe(
  "selectMinimalRoutine",
  () => {
    it("selects one product when it covers all recommendation needs", () => {
      const multiPurpose =
        createProduct(
          "multi_purpose",
          29.9,
          [
            "conditioning",
            "moisture_support",
          ],
        );

      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            [multiPurpose],
          ),

          createRecommendationResult(
            "moisture_support",
            [multiPurpose],
          ),
        ];

      const routine =
        selectMinimalRoutine(
          results,
        );

      expect(routine).toHaveLength(1);

      expect(routine[0].id).toBe(
        "multi_purpose",
      );
    });

    it("selects two products when two are required to cover all needs", () => {
      const moistureConditioner =
        createProduct(
          "moisture_conditioner",
          25.9,
          [
            "conditioning",
            "moisture_support",
          ],
        );

      const damageLeaveIn =
        createProduct(
          "damage_leave_in",
          22.9,
          [
            "damage_support",
          ],
        );

      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            [
              moistureConditioner,
            ],
          ),

          createRecommendationResult(
            "moisture_support",
            [
              moistureConditioner,
            ],
          ),

          createRecommendationResult(
            "damage_protection",
            [
              damageLeaveIn,
            ],
          ),
        ];

      const routine =
        selectMinimalRoutine(
          results,
        );

      expect(routine).toHaveLength(2);

      expect(
        routine.map(
          (product) => product.id,
        ),
      ).toEqual([
        "moisture_conditioner",
        "damage_leave_in",
      ]);
    });

    it("chooses the cheapest combination when multiple minimal combinations cover the same needs", () => {
      const expensiveMultiPurpose =
        createProduct(
          "expensive_multi",
          40,
          [
            "conditioning",
            "moisture_support",
          ],
        );

      const cheapMultiPurpose =
        createProduct(
          "cheap_multi",
          25,
          [
            "conditioning",
            "moisture_support",
          ],
        );

      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            [
              expensiveMultiPurpose,
              cheapMultiPurpose,
            ],
          ),

          createRecommendationResult(
            "moisture_support",
            [
              expensiveMultiPurpose,
              cheapMultiPurpose,
            ],
          ),
        ];

      const routine =
        selectMinimalRoutine(
          results,
        );

      expect(routine).toHaveLength(1);

      expect(routine[0].id).toBe(
        "cheap_multi",
      );
    });

    it("does not select unavailable products", () => {
      const unavailable =
        createProduct(
          "unavailable_multi",
          10,
          [
            "conditioning",
            "moisture_support",
          ],
        );

      unavailable.availability =
        "unavailable";

      const conditioner =
        createProduct(
          "conditioner",
          20,
          ["conditioning"],
        );

      const moisture =
        createProduct(
          "moisture",
          20,
          ["moisture_support"],
        );

      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            [
              unavailable,
              conditioner,
            ],
          ),

          createRecommendationResult(
            "moisture_support",
            [
              unavailable,
              moisture,
            ],
          ),
        ];

      const routine =
        selectMinimalRoutine(
          results,
        );

      expect(
        routine.map(
          (product) => product.id,
        ),
      ).toEqual([
        "conditioner",
        "moisture",
      ]);
    });

    it("does not mutate recommendation results or product arrays", () => {
      const first =
        createProduct(
          "first",
          30,
          ["conditioning"],
        );

      const second =
        createProduct(
          "second",
          20,
          ["conditioning"],
        );

      const products = [
        first,
        second,
      ];

      const results:
        RecommendationResult[] = [
          createRecommendationResult(
            "conditioning_support",
            products,
          ),
        ];

      selectMinimalRoutine(results);

      expect(
        results[0].products,
      ).toBe(products);

      expect(
        results[0].products.map(
          (product) => product.id,
        ),
      ).toEqual([
        "first",
        "second",
      ]);
    });
  },
);