import type {
  Product,
} from "./product";

export function rankProductsByPrice(
  products: Product[],
): Product[] {
  return [...products].sort(
    (a, b) => {
      if (
        a.price === undefined &&
        b.price === undefined
      ) {
        return 0;
      }

      if (a.price === undefined) {
        return 1;
      }

      if (b.price === undefined) {
        return -1;
      }

      return a.price - b.price;
    },
  );
}