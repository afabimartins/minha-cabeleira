import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Product,
} from "./product";

import {
  selectProducts,
} from "./product-selection";

describe("selectProducts", () => {
  it("returns compatible products ordered by price", () => {
    const products: Product[] = [
      {
        id: "product_001",
        name: "Product 1",
        brand: "Example",
        category: "conditioner",
        price: 30,
        currency: "BRL",
        ingredients: [],
        attributes: ["conditioning"],
        availability: "active",
      },

      {
        id: "product_002",
        name: "Product 2",
        brand: "Example",
        category: "conditioner",
        price: 15,
        currency: "BRL",
        ingredients: [],
        attributes: ["conditioning"],
        availability: "active",
      },

      {
        id: "product_003",
        name: "Product 3",
        brand: "Example",
        category: "shampoo",
        price: 10,
        currency: "BRL",
        ingredients: [],
        attributes: [],
        availability: "active",
      },
    ];

    const result =
      selectProducts(
        products,
        {
          categories: [
            "conditioner",
          ],

          requiredAttributes: [
            "conditioning",
          ],
        },
      );

    expect(
      result.map((product) => product.id),
    ).toEqual([
      "product_002",
      "product_001",
    ]);
  });
});