import type {
  Diagnosis,
} from "./diagnosis";

import type {
  Product,
  ProductCategory,
} from "./product";

import type {
  Recommendation,
} from "./recommendation";

import type {
  SafetyAssessment,
} from "./safety";

import type {
  RoutineGuidance,
} from "./routine-guidance";


export type RoutineProductMatchLevel =
  | "exact"
  | "compatible"
  | "basic"
  | "missing";

export type RoutineProductOption = {
  product: Product;
  matchLevel: RoutineProductMatchLevel;
  matchedAttributes: string[];
  missingAttributes: string[];
};

export type RoutineProductSelection = {
  category: ProductCategory;

  /**
   * Primeira opção da lista. Mantida por compatibilidade com relatórios
   * e integrações antigas. A interface deve preferir `options`.
   */
  product: Product | null;
  matchLevel: RoutineProductMatchLevel;
  matchedAttributes: string[];
  missingAttributes: string[];

  /**
   * Até três alternativas por categoria. Quando houver cobertura no
   * catálogo, cada alternativa deve pertencer a uma marca diferente.
   */
  options?: RoutineProductOption[];
  targetOptionCount?: number;
};

export type RecommendationResult = {
  recommendation: Recommendation;

  products: Product[];
};

export type AnalysisResult = {
  diagnosis: Diagnosis;

  safety: SafetyAssessment;

  recommendations:
    RecommendationResult[];

  routineGuidance:
    RoutineGuidance[];

  routineProducts?:
    RoutineProductSelection[];
};