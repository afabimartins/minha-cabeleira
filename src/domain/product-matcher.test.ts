import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Product,
} from "./product";

import {
  findMatchingProducts,
  matchProduct,
} from "./product-matcher";

const conditioner: Product = {
  id: "product_001",
  name: "Example Conditioner",
  brand: "Example",
  category: "conditioner",

  price: 19.9,
  currency: "BRL",

  ingredients: [
    "Cetearyl Alcohol",
    "Behentrimonium Chloride",
  ],

  attributes: [
    "conditioning",
    "rinse_off",
  ],

  availability: "active",
};

describe("product matcher", () => {
  it("matches a product that satisfies all criteria", () => {
    const result = matchProduct(
      conditioner,
      {
        categories: ["conditioner"],

        requiredAttributes: [
          "conditioning",
        ],

        maxPrice: 25,
      },
    );

    expect(result.matched).toBe(true);
    expect(result.reasons).toEqual([]);
  });

  it("rejects excluded attributes", () => {
    const result = matchProduct(
      conditioner,
      {
        excludedAttributes: [
          "conditioning",
        ],
      },
    );

    expect(result.matched).toBe(false);

    expect(result.reasons).toContain(
      "excluded_attribute:conditioning",
    );
  });

  it("matches ingredients case-insensitively", () => {
    const result = matchProduct(
      conditioner,
      {
        requiredIngredients: [
          "behentrimonium chloride",
        ],
      },
    );

    expect(result.matched).toBe(true);
  });

  it("respects the maximum price", () => {
    const result = matchProduct(
      conditioner,
      {
        maxPrice: 10,
      },
    );

    expect(result.matched).toBe(false);

    expect(result.reasons).toContain(
      "price_above_limit",
    );
  });

  it("filters a product catalog", () => {
    const expensiveProduct: Product = {
      ...conditioner,

      id: "product_002",
      name: "Expensive Conditioner",
      price: 50,
    };

    const result =
      findMatchingProducts(
        [
          conditioner,
          expensiveProduct,
        ],
        {
          categories: [
            "conditioner",
          ],
          maxPrice: 25,
        },
      );

    expect(result).toHaveLength(1);

    expect(
      result[0]?.product.id,
    ).toBe("product_001");
  });
});
