import type {
  Product,
  ProductCategory,
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

function getRequiredAttributes(
  recommendationResults:
    RecommendationResult[],
): string[] {
  return Array.from(
    new Set(
      recommendationResults
        .map(
          (result) =>
            recommendationAttributeMap[
              result.recommendation.type
            ],
        )
        .filter(
          (
            attribute,
          ): attribute is string =>
            attribute !== undefined,
        ),
    ),
  );
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function coverageScore(
  product: Product,
  requiredAttributes: string[],
): number {
  const attributes = new Set(
    product.attributes.map(normalize),
  );

  return requiredAttributes.reduce(
    (score, attribute) =>
      score +
      (attributes.has(
        normalize(attribute),
      )
        ? 1
        : 0),
    0,
  );
}

function priceForSort(
  product: Product,
): number {
  return (
    product.price ??
    Number.POSITIVE_INFINITY
  );
}

/**
 * Uma rotina mínima mantém no máximo um produto por categoria.
 * Entre produtos da mesma categoria, prioriza aquele que cobre o
 * maior número de necessidades detectadas e, em empate, o mais barato.
 */
export function selectMinimalRoutine(
  recommendationResults:
    RecommendationResult[],
): Product[] {
  const requiredAttributes =
    getRequiredAttributes(
      recommendationResults,
    );

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

  const productsByCategory =
    new Map<
      ProductCategory,
      Product[]
    >();

  for (const product of productsById.values()) {
    const current =
      productsByCategory.get(
        product.category,
      ) ?? [];

    current.push(product);
    productsByCategory.set(
      product.category,
      current,
    );
  }

  return Array.from(
    productsByCategory.entries(),
  )
    .sort(([a], [b]) =>
      a.localeCompare(b),
    )
    .map(([, products]) =>
      [...products].sort((a, b) => {
        const coverageDifference =
          coverageScore(
            b,
            requiredAttributes,
          ) -
          coverageScore(
            a,
            requiredAttributes,
          );

        if (
          coverageDifference !== 0
        ) {
          return coverageDifference;
        }

        const priceDifference =
          priceForSort(a) -
          priceForSort(b);

        if (priceDifference !== 0) {
          return priceDifference;
        }

        return a.name.localeCompare(
          b.name,
          "pt-BR",
        );
      })[0],
    );
}
