import type { Product } from "../domain/product";

export type ProductLinkType =
  | "editorial"
  | "affiliate"
  | "sponsored";

export type CatalogProductStatus =
  | "active"
  | "paused";

export type CatalogProduct = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: string;
  size?: string;
  imageUrl?: string;
  imagePath?: string;
  imageSourceUrl?: string;
  imageCredit?: string;
  price?: number;
  currency: string;
  retailer?: string;
  productUrl?: string;
  priceCheckedAt?: string;
  ingredientsRaw: string;
  attributes: string[];
  availability: CatalogProductStatus;
  sourceUrl?: string;
  verifiedAt?: string;
  linkType: ProductLinkType;
};

export function catalogProductToDomainProduct(
  product: CatalogProduct,
): Product {
  const ingredients = product.ingredientsRaw
    .split(/[;,]/)
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);

  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category as Product["category"],
    price: product.price,
    currency: product.currency as Product["currency"],
    ingredients,
    attributes: product.attributes,
    availability: product.availability as Product["availability"],
    productUrl: product.productUrl,
    imageUrl: product.imageUrl,
    retailer: product.retailer,
    linkType: product.linkType,
    verifiedAt: product.verifiedAt,
    priceCheckedAt: product.priceCheckedAt,
    size: product.size,
    sourceUrl: product.sourceUrl,
  } as Product;
}
