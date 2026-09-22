import type {
  Product,
} from "./product";

import type {
  RecommendationResult,
} from "./analysis-result";

const recommendationAttributeMap:
  Record<string, string> = {
    conditioning_support:
      "conditioning",

    moisture_support:
      "moisture_support",

    damage_protection:
      "damage_support",
  };

function getRequiredAttribute(
  recommendationResult:
    RecommendationResult,
): string | undefined {
  return recommendationAttributeMap[
    recommendationResult
      .recommendation.type
  ];
}

function productCoversAttribute(
  product: Product,
  attribute: string,
): boolean {
  return product.attributes.some(
    (productAttribute) =>
      productAttribute
        .trim()
        .toLowerCase() ===
      attribute
        .trim()
        .toLowerCase(),
  );
}

function getProductPrice(
  product: Product,
): number {
  return (
    product.price ??
    Number.POSITIVE_INFINITY
  );
}

function getCombinationPrice(
  products: Product[],
): number {
  return products.reduce(
    (total, product) =>
      total + getProductPrice(product),
    0,
  );
}

function generateCombinations(
  products: Product[],
  size: number,
): Product[][] {
  const combinations: Product[][] = [];

  function buildCombination(
    startIndex: number,
    current: Product[],
  ) {
    if (current.length === size) {
      combinations.push([
        ...current,
      ]);

      return;
    }

    for (
      let index = startIndex;
      index < products.length;
      index += 1
    ) {
      current.push(products[index]);

      buildCombination(
        index + 1,
        current,
      );

      current.pop();
    }
  }

  buildCombination(0, []);

  return combinations;
}

function combinationCoversAll(
  combination: Product[],
  requiredAttributes: string[],
): boolean {
  return requiredAttributes.every(
    (attribute) =>
      combination.some(
        (product) =>
          productCoversAttribute(
            product,
            attribute,
          ),
      ),
  );
}

export function selectMinimalRoutine(
  recommendationResults:
    RecommendationResult[],
): Product[] {
  const requiredAttributes =
    Array.from(
      new Set(
        recommendationResults
          .map(getRequiredAttribute)
          .filter(
            (
              attribute,
            ): attribute is string =>
              attribute !== undefined,
          ),
      ),
    );

  if (
    requiredAttributes.length === 0
  ) {
    return [];
  }

  const productsById =
    new Map<string, Product>();

  for (
    const recommendationResult of
    recommendationResults
  ) {
    for (
      const product of
      recommendationResult.products
    ) {
      if (
        product.availability ===
        "active"
      ) {
        productsById.set(
          product.id,
          product,
        );
      }
    }
  }

  const products = Array.from(
    productsById.values(),
  );

  for (
    let size = 1;
    size <= products.length;
    size += 1
  ) {
    const combinations =
      generateCombinations(
        products,
        size,
      ).filter(
        (combination) =>
          combinationCoversAll(
            combination,
            requiredAttributes,
          ),
      );

    if (combinations.length === 0) {
      continue;
    }

    combinations.sort(
      (a, b) =>
        getCombinationPrice(a) -
        getCombinationPrice(b),
    );

    return combinations[0];
  }

  return [];
}