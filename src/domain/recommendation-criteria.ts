import type {
  ProductCriteria,
} from "./product-criteria";

export type RecommendationCriteria = {
  recommendationType: string;

  productCriteria: ProductCriteria;

  usageGuidance?: {
    amount?: string;
    frequency?: string;
    application?: string;
    notes?: string[];
  };
};