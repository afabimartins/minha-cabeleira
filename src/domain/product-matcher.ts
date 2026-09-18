import type {
  Product,
} from "./product";

import type {
  ProductCriteria,
} from "./product-criteria";

export type ProductMatch = {
  product: Product;
  matched: boolean;
  reasons: string[];
};

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase();
}

function normalizedSet(
  values: string[],
): Set<string> {
  return new Set(
    values.map(normalize),
  );
}

export function matchProduct(
  product: Product,
  criteria: ProductCriteria,
): ProductMatch {
  const reasons: string[] = [];

  if (product.availability !== "active") {
    return {
      product,
      matched: false,
      reasons: ["product_not_available"],
    };
  }

  if (
    criteria.categories &&
    !criteria.categories.includes(
      product.category,
    )
  ) {
    reasons.push("category_not_allowed");
  }

  if (
    criteria.maxPrice !== undefined &&
    (
      product.price === undefined ||
      product.price > criteria.maxPrice
    )
  ) {
    reasons.push("price_above_limit");
  }

  const attributes = normalizedSet(
    product.attributes,
  );

  const ingredients = normalizedSet(
    product.ingredients,
  );

  for (
    const attribute of
    criteria.requiredAttributes ?? []
  ) {
    if (!attributes.has(normalize(attribute))) {
      reasons.push(
        `missing_attribute:${attribute}`,
      );
    }
  }

  for (
    const attribute of
    criteria.excludedAttributes ?? []
  ) {
    if (attributes.has(normalize(attribute))) {
      reasons.push(
        `excluded_attribute:${attribute}`,
      );
    }
  }

  for (
    const ingredient of
    criteria.requiredIngredients ?? []
  ) {
    if (!ingredients.has(normalize(ingredient))) {
      reasons.push(
        `missing_ingredient:${ingredient}`,
      );
    }
  }

  for (
    const ingredient of
    criteria.excludedIngredients ?? []
  ) {
    if (ingredients.has(normalize(ingredient))) {
      reasons.push(
        `excluded_ingredient:${ingredient}`,
      );
    }
  }

  return {
    product,
    matched: reasons.length === 0,
    reasons,
  };
}

export function findMatchingProducts(
  products: Product[],
  criteria: ProductCriteria,
): ProductMatch[] {
  return products
    .map((product) =>
      matchProduct(product, criteria),
    )
    .filter((result) => result.matched);
}