import type {
  Product,
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

export function selectProducts(
  products: Product[],
  criteria: ProductCriteria,
): Product[] {
  const matches =
    findMatchingProducts(
      products,
      criteria,
    );

  const matchingProducts =
    matches.map(
      (match) => match.product,
    );

  return rankProductsByPrice(
    matchingProducts,
  );
}