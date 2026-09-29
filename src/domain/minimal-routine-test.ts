import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Product,
  ProductCategory,
} from "./product";

import type {
  RecommendationResult,
} from "./analysis-result";

import {
  selectMinimalRoutine,
} from "./minimal-routine";

function createProduct(
  id: string,
  category: ProductCategory,
  price: number,
  attributes: string[],
): Product {
  return {
    id,
    name: id,
    brand: "Minha Cabeleira",
    category,
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
    it("keeps at most one product per category", () => {
      const cheapConditioner =
        createProduct(
          "cheap_conditioner",
          "conditioner",
          19.9,
          ["conditioning"],
        );

      const expensiveConditioner =
        createProduct(
          "expensive_conditioner",
          "conditioner",
          29.9,
          ["conditioning"],
        );

      const leaveIn = createProduct(
        "leave_in",
        "leave_in",
        22.9,
        ["conditioning"],
      );

      const routine =
        selectMinimalRoutine([
          createRecommendationResult(
            "conditioning_support",
            [
              expensiveConditioner,
              cheapConditioner,
              leaveIn,
            ],
          ),
        ]);

      expect(
        routine.map(
          (product) => product.id,
        ),
      ).toEqual([
        "cheap_conditioner",
        "leave_in",
      ]);
    });

    it("prefers the product that covers more detected needs inside the same category", () => {
      const singlePurpose =
        createProduct(
          "single_purpose",
          "conditioner",
          10,
          ["conditioning"],
        );

      const multiPurpose =
        createProduct(
          "multi_purpose",
          "conditioner",
          25,
          [
            "conditioning",
            "moisture_support",
          ],
        );

      const routine =
        selectMinimalRoutine([
          createRecommendationResult(
            "conditioning_support",
            [singlePurpose, multiPurpose],
          ),
          createRecommendationResult(
            "moisture_support",
            [multiPurpose],
          ),
        ]);

      expect(routine).toHaveLength(1);
      expect(routine[0].id).toBe(
        "multi_purpose",
      );
    });

    it("uses the cheapest option when coverage is tied", () => {
      const first = createProduct(
        "first",
        "mask",
        30,
        ["damage_support"],
      );

      const second = createProduct(
        "second",
        "mask",
        20,
        ["damage_support"],
      );

      const routine =
        selectMinimalRoutine([
          createRecommendationResult(
            "damage_protection",
            [first, second],
          ),
        ]);

      expect(routine[0].id).toBe(
        "second",
      );
    });

    it("does not select unavailable products", () => {
      const unavailable =
        createProduct(
          "unavailable",
          "conditioner",
          10,
          ["conditioning"],
        );
      unavailable.availability =
        "unavailable";

      const available =
        createProduct(
          "available",
          "conditioner",
          20,
          ["conditioning"],
        );

      const routine =
        selectMinimalRoutine([
          createRecommendationResult(
            "conditioning_support",
            [unavailable, available],
          ),
        ]);

      expect(
        routine.map(
          (product) => product.id,
        ),
      ).toEqual(["available"]);
    });

    it("does not mutate recommendation results or product arrays", () => {
      const first = createProduct(
        "first",
        "conditioner",
        30,
        ["conditioning"],
      );
      const second = createProduct(
        "second",
        "conditioner",
        20,
        ["conditioning"],
      );
      const products = [first, second];
      const results = [
        createRecommendationResult(
          "conditioning_support",
          products,
        ),
      ];

      selectMinimalRoutine(results);

      expect(results[0].products).toBe(
        products,
      );
      expect(
        results[0].products.map(
          (product) => product.id,
        ),
      ).toEqual(["first", "second"]);
    });
  },
);
