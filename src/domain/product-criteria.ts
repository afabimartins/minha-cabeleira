import type {
  ProductCategory,
} from "./product";

export type ProductCriteria = {
  categories?: ProductCategory[];

  requiredAttributes?: string[];

  excludedAttributes?: string[];

  requiredIngredients?: string[];

  excludedIngredients?: string[];

  maxPrice?: number;
};