import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Product,
} from "./product";

import {
  rankProductsByPrice,
} from "./product-ranking";

describe("rankProductsByPrice", () => {
  it("puts cheaper products first", () => {
    const products: Product[] = [
      {
        id: "expensive",
        name: "Expensive",
        brand: "Example",
        category: "conditioner",
        price: 40,
        currency: "BRL",
        ingredients: [],
        attributes: [],
        availability: "active",
      },

      {
        id: "cheap",
        name: "Cheap",
        brand: "Example",
        category: "conditioner",
        price: 15,
        currency: "BRL",
        ingredients: [],
        attributes: [],
        availability: "active",
      },

      {
        id: "medium",
        name: "Medium",
        brand: "Example",
        category: "conditioner",
        price: 25,
        currency: "BRL",
        ingredients: [],
        attributes: [],
        availability: "active",
      },
    ];

    const result =
      rankProductsByPrice(products);

    expect(
      result.map((product) => product.id),
    ).toEqual([
      "cheap",
      "medium",
      "expensive",
    ]);
  });

  it("puts products without a known price last", () => {
    const products: Product[] = [
      {
        id: "unknown",
        name: "Unknown Price",
        brand: "Example",
        category: "conditioner",
        ingredients: [],
        attributes: [],
        availability: "active",
      },

      {
        id: "known",
        name: "Known Price",
        brand: "Example",
        category: "conditioner",
        price: 20,
        currency: "BRL",
        ingredients: [],
        attributes: [],
        availability: "active",
      },
    ];

    const result =
      rankProductsByPrice(products);

    expect(
      result.map((product) => product.id),
    ).toEqual([
      "known",
      "unknown",
    ]);
  });
});