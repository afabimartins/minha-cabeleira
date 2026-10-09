import type {
  RecommendationResult,
  RoutineProductSelection,
} from "./analysis-result";

import type {
  Observation,
  ObservationValue,
} from "./observation";

import type {
  Product,
  ProductCategory,
} from "./product";

export type RoutineProductCategory =
  | "shampoo"
  | "conditioner"
  | "mask"
  | "leave_in"
  | "oil"
  | "scalp";

export const CORE_ROUTINE_PRODUCT_CATEGORIES:
  RoutineProductCategory[] = [
    "shampoo",
    "conditioner",
    "mask",
    "leave_in",
    "oil",
  ];

export const ROUTINE_PRODUCT_TARGET_PER_CATEGORY = 3;

const categoryAliases: Record<
  RoutineProductCategory,
  ProductCategory[]
> = {
  shampoo: ["shampoo"],
  conditioner: ["conditioner"],
  mask: ["mask", "treatment"],
  leave_in: ["leave_in", "styler"],
  oil: ["oil"],
  scalp: ["scalp"],
};

type ProductScore = {
  product: Product;
  level: RoutineProductSelection["matchLevel"];
  matchedAttributes: string[];
  missingAttributes: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function uniqueNormalized(
  values: string[],
): string[] {
  return Array.from(
    new Set(values.map(normalize)),
  );
}


function hasMeaningfulScalpObservation(
  observation: Observation,
): boolean {
  return (
    observation.value !== "none" &&
    observation.value !== "no" &&
    observation.value !== "unknown"
  );
}

function shouldIncludeScalpCare(
  observations: Observation[],
): boolean {
  return observations.some(
    (observation) =>
      (observation.trait ===
        "scalp_oiliness" ||
        observation.trait ===
          "scalp_dryness") &&
      hasMeaningfulScalpObservation(
        observation,
      ),
  );
}

function getScalpRequiredAttributes(
  observations: Observation[],
): string[] {
  const attributes: string[] = [];

  if (
    observations.some(
      (observation) =>
        observation.trait ===
          "scalp_dryness" &&
        hasMeaningfulScalpObservation(
          observation,
        ),
    )
  ) {
    attributes.push(
      "scalp_dryness_support",
    );
  }

  if (
    observations.some(
      (observation) =>
        observation.trait ===
          "scalp_oiliness" &&
        hasMeaningfulScalpObservation(
          observation,
        ),
    )
  ) {
    attributes.push(
      "scalp_oiliness_support",
    );
  }

  return attributes;
}

function getPreference(
  observations: Observation[],
  trait:
    | "budget_priority"
    | "routine_complexity",
): ObservationValue | undefined {
  return observations.find(
    (observation) =>
      observation.trait === trait,
  )?.value;
}

function collectCriteria(
  recommendationResults:
    RecommendationResult[],
) {
  const criteria =
    recommendationResults
      .map(
        ({ recommendation }) =>
          recommendation.productCriteria,
      )
      .filter(
        (
          item,
        ): item is NonNullable<
          typeof item
        > => item !== undefined,
      );

  return {
    requiredAttributes:
      uniqueNormalized(
        criteria.flatMap(
          (item) =>
            item.requiredAttributes ?? [],
        ),
      ),

    requiredIngredients:
      uniqueNormalized(
        criteria.flatMap(
          (item) =>
            item.requiredIngredients ?? [],
        ),
      ),

    excludedAttributes:
      uniqueNormalized(
        criteria.flatMap(
          (item) =>
            item.excludedAttributes ?? [],
        ),
      ),

    excludedIngredients:
      uniqueNormalized(
        criteria.flatMap(
          (item) =>
            item.excludedIngredients ?? [],
        ),
      ),
  };
}

function productHasAnyExcludedCriterion(
  product: Product,
  excludedAttributes: string[],
  excludedIngredients: string[],
): boolean {
  const attributes = new Set(
    product.attributes.map(normalize),
  );
  const ingredients = new Set(
    product.ingredients.map(normalize),
  );

  return (
    excludedAttributes.some(
      (attribute) =>
        attributes.has(attribute),
    ) ||
    excludedIngredients.some(
      (ingredient) =>
        ingredients.has(ingredient),
    )
  );
}

function scoreProduct(
  product: Product,
  requiredAttributes: string[],
  requiredIngredients: string[],
): ProductScore {
  const attributes = new Set(
    product.attributes.map(normalize),
  );
  const ingredients = new Set(
    product.ingredients.map(normalize),
  );

  const matchedAttributes =
    requiredAttributes.filter(
      (attribute) =>
        attributes.has(attribute),
    );

  const missingAttributes =
    requiredAttributes.filter(
      (attribute) =>
        !attributes.has(attribute),
    );

  const matchedIngredients =
    requiredIngredients.filter(
      (ingredient) =>
        ingredients.has(ingredient),
    );

  const missingIngredients =
    requiredIngredients.filter(
      (ingredient) =>
        !ingredients.has(ingredient),
    );

  const requestedCount =
    requiredAttributes.length +
    requiredIngredients.length;

  const matchedCount =
    matchedAttributes.length +
    matchedIngredients.length;

  const level:
    RoutineProductSelection["matchLevel"] =
    requestedCount === 0
      ? "basic"
      : matchedCount === requestedCount
        ? "exact"
        : matchedCount > 0
          ? "compatible"
          : "basic";

  return {
    product,
    level,
    matchedAttributes,
    missingAttributes,
    matchedIngredients,
    missingIngredients,
  };
}

function getLevelWeight(
  level: RoutineProductSelection["matchLevel"],
): number {
  switch (level) {
    case "exact":
      return 3;
    case "compatible":
      return 2;
    case "basic":
      return 1;
    default:
      return 0;
  }
}

function priceForSort(
  product: Product,
): number {
  return (
    product.price ??
    Number.POSITIVE_INFINITY
  );
}

function sortScores(
  scores: ProductScore[],
  budgetPriority:
    ObservationValue | undefined,
): ProductScore[] {
  return [...scores].sort(
    (a, b) => {
      const levelDifference =
        getLevelWeight(b.level) -
        getLevelWeight(a.level);

      if (levelDifference !== 0) {
        return levelDifference;
      }

      const aMatchCount =
        a.matchedAttributes.length +
        a.matchedIngredients.length;
      const bMatchCount =
        b.matchedAttributes.length +
        b.matchedIngredients.length;

      if (
        aMatchCount !== bMatchCount
      ) {
        return (
          bMatchCount - aMatchCount
        );
      }

      if (
        budgetPriority ===
          "lowest_price" ||
        budgetPriority ===
          "cost_benefit"
      ) {
        const priceDifference =
          priceForSort(a.product) -
          priceForSort(b.product);

        if (priceDifference !== 0) {
          return priceDifference;
        }
      }

      return a.product.name.localeCompare(
        b.product.name,
        "pt-BR",
      );
    },
  );
}

export function selectRoutineProducts(
  products: Product[],
  recommendationResults:
    RecommendationResult[],
  observations: Observation[],
): RoutineProductSelection[] {
  const activeProducts = products.filter(
    (product) =>
      product.availability === "active",
  );

  const {
    requiredAttributes,
    requiredIngredients,
    excludedAttributes,
    excludedIngredients,
  } = collectCriteria(
    recommendationResults,
  );

  const budgetPriority =
    getPreference(
      observations,
      "budget_priority",
    );

  const categories: RoutineProductCategory[] = [
    ...CORE_ROUTINE_PRODUCT_CATEGORIES,
    ...(shouldIncludeScalpCare(
      observations,
    )
      ? (["scalp"] as const)
      : []),
  ];

  const scalpRequiredAttributes =
    getScalpRequiredAttributes(
      observations,
    );

  return categories.map(
    (category) => {
      const allowedCategories =
        categoryAliases[category];

      // Necessidades do couro cabeludo são avaliadas separadamente
      // das necessidades da fibra. Assim, por exemplo, dano no
      // comprimento não transforma um tônico de oleosidade em
      // "match" de reparação. Exclusões de segurança continuam
      // valendo globalmente.
      const categoryRequiredAttributes =
        category === "scalp"
          ? scalpRequiredAttributes
          : requiredAttributes;

      const categoryRequiredIngredients =
        category === "scalp"
          ? []
          : requiredIngredients;

      const candidates =
        activeProducts.filter(
          (product) => {
            if (
              !allowedCategories.includes(
                product.category,
              ) ||
              productHasAnyExcludedCriterion(
                product,
                excludedAttributes,
                excludedIngredients,
              )
            ) {
              return false;
            }

            if (
              category === "scalp" &&
              categoryRequiredAttributes.length > 0
            ) {
              const productAttributes = new Set(
                product.attributes.map(normalize),
              );

              return categoryRequiredAttributes.some(
                (attribute) =>
                  productAttributes.has(attribute),
              );
            }

            return true;
          },
        );

      if (candidates.length === 0) {
        return {
          category,
          product: null,
          matchLevel: "missing",
          matchedAttributes: [],
          missingAttributes: [
            ...categoryRequiredAttributes,
          ],
          options: [],
          targetOptionCount:
            ROUTINE_PRODUCT_TARGET_PER_CATEGORY,
        };
      }

      const ranked = sortScores(
        candidates.map((product) =>
          scoreProduct(
            product,
            categoryRequiredAttributes,
            categoryRequiredIngredients,
          ),
        ),
        budgetPriority,
      );

      /*
       * Neutralidade comercial: a lista final evita repetir a mesma
       * marca dentro da categoria. A relevância técnica continua sendo
       * o primeiro critério de ordenação; depois escolhemos, nessa ordem,
       * a melhor opção disponível de cada marca até atingir três marcas.
       */
      const seenBrands = new Set<string>();
      const diverseOptions: ProductScore[] = [];

      for (const score of ranked) {
        const brandKey =
          normalize(score.product.brand);

        if (seenBrands.has(brandKey)) {
          continue;
        }

        seenBrands.add(brandKey);
        diverseOptions.push(score);

        if (
          diverseOptions.length >=
          ROUTINE_PRODUCT_TARGET_PER_CATEGORY
        ) {
          break;
        }
      }

      const selected = diverseOptions[0];

      return {
        category,
        product: selected?.product ?? null,
        matchLevel:
          selected?.level ?? "missing",
        matchedAttributes:
          selected?.matchedAttributes ?? [],
        missingAttributes:
          selected?.missingAttributes ?? [
            ...categoryRequiredAttributes,
          ],
        options: diverseOptions.map(
          (score) => ({
            product: score.product,
            matchLevel: score.level,
            matchedAttributes:
              score.matchedAttributes,
            missingAttributes:
              score.missingAttributes,
          }),
        ),
        targetOptionCount:
          ROUTINE_PRODUCT_TARGET_PER_CATEGORY,
      };
    },
  );
}
