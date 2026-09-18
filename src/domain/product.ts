export type ProductCategory =
  | "shampoo"
  | "conditioner"
  | "mask"
  | "leave_in"
  | "styler"
  | "oil"
  | "treatment"
  | "scalp";

export type ProductAvailability =
  | "active"
  | "unavailable"
  | "discontinued";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;

  price?: number;
  currency?: string;

  ingredients: string[];

  attributes: string[];

  availability: ProductAvailability;
};