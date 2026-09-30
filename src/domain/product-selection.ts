import type {
  Product,
  ProductCategory,
} from "./product";

import type {
  ProductCriteria,
} from "./product-criteria";

import {
  findMatchingProducts,
} from "./product-matcher";

import {
  rankProductsByPrice,
} from "./product-ranking";

/**
 * Recomendações gerais do fio não devem puxar, por coincidência de tags,
 * produtos destinados ao couro cabeludo. A categoria `scalp` só participa
 * quando uma regra a solicita explicitamente em `criteria.categories`.
 *
 * O cuidado de couro cabeludo da rotina-base é tratado separadamente em
 * `routine-product-selection.ts`, onde depende dos sinais observados.
 */
const DEFAULT_RECOMMENDATION_CATEGORIES: ProductCategory[] = [
  "shampoo",
  "conditioner",
  "mask",
  "treatment",
  "leave_in",
  "styler",
  "oil",
];

function withContextualCategories(
  criteria: ProductCriteria,
): ProductCriteria {
  if (criteria.categories) {
    return criteria;
  }

  return {
    ...criteria,
    categories: DEFAULT_RECOMMENDATION_CATEGORIES,
  };
}

export function selectProducts(
  products: Product[],
  criteria: ProductCriteria,
): Product[] {
  const matches =
    findMatchingProducts(
      products,
      withContextualCategories(criteria),
    );

  const matchingProducts =
    matches.map(
      (match) => match.product,
    );

  return rankProductsByPrice(
    matchingProducts,
  );
}
