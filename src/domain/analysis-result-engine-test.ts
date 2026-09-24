import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Diagnosis,
} from "./diagnosis";

import type {
  Observation,
} from "./observation";

import type {
  Product,
} from "./product";

import type {
  RecommendationRule,
} from "./recommendation-rule";

import {
  buildAnalysisResult,
} from "./analysis-result-engine";

const finding = {
  id: "finding_conditioning",

  type:
    "strong_conditioning_response",

  confidence: "high" as const,

  basedOn: [],

  evidence: [],

  explanation:
    "Conditioning support is relevant.",
};

const diagnosis: Diagnosis = {
  findings: [finding],

  assessment: {
    status: "supported",

    findings: [finding],

    reason:
      "Conditioning finding is supported.",
  },

  profile: {
    assessments: [
      {
        type:
          "strong_conditioning_response",

        status: "supported",

        confidence: "high",

        basedOn: [],

        evidence: [],

        explanations: [
          "Conditioning support is relevant.",
        ],
      },
    ],

    unresolved: [],
  },
};

const products: Product[] = [
  {
    id: "expensive_conditioner",

    name:
      "Expensive Conditioner",

    brand: "Minha Cabeleira",

    category: "conditioner",

    price: 29.9,

    currency: "BRL",

    ingredients: [],

    attributes: [
      "conditioning",
    ],

    availability: "active",
  },

  {
    id: "cheap_conditioner",

    name:
      "Cheap Conditioner",

    brand: "Minha Cabeleira",

    category: "conditioner",

    price: 14.9,

    currency: "BRL",

    ingredients: [],

    attributes: [
      "conditioning",
    ],

    availability: "active",
  },

  {
    id: "middle_conditioner",

    name:
      "Middle Conditioner",

    brand: "Minha Cabeleira",

    category: "conditioner",

    price: 22.9,

    currency: "BRL",

    ingredients: [],

    attributes: [
      "conditioning",
    ],

    availability: "active",
  },
];

const recommendationRules:
  RecommendationRule[] = [
    {
      id:
        "recommendation_conditioning",

      name:
        "Conditioning support recommendation",

      status: "active",

      version: 1,

      requiresFindings: [
        "strong_conditioning_response",
      ],

      produces: {
        type:
          "conditioning_support",

        confidence: "high",

        ingredientGuidance: {
          summary:
            "Priorize fórmulas que ofereçam suporte ao condicionamento e ao desembaraço.",

          lookFor: [
            {
              id:
                "cationic_conditioning_agents",

              name:
                "Agentes condicionantes catiônicos",

              purpose:
                "Podem ajudar a reduzir atrito e facilitar o desembaraço.",

              examples: [
                {
                  name:
                    "Behentrimonium Chloride",

                  inciName:
                    "Behentrimonium Chloride",
                },
              ],
            },
          ],

          avoid: [],
        },

        productCriteria: {
          requiredAttributes: [
            "conditioning",
          ],
        },
      },

      evidence: [],

      rationale:
        "Prioritize conditioning support.",
    },
  ];

function createObservation(
  trait:
    | "routine_complexity"
    | "budget_priority",
  value: Observation["value"],
): Observation {
  return {
    id: trait,

    domain: "preference",

    trait,

    value,

    region: "all",

    source: "questionnaire",
  };
}

function createRoutineObservation(
  trait:
    "conditioning_frequency",
  value: Observation["value"],
): Observation {
  return {
    id: trait,

    domain: "routine",

    trait,

    value,

    region: "mid_length",

    source: "questionnaire",
  };
}

function createSafetyObservation(
  trait:
    | "scalp_sensitivity"
    | "scalp_wound",
  value: Observation["value"],
): Observation {
  return {
    id: trait,

    domain: "scalp",

    trait,

    value,

    region: "scalp",

    source: "questionnaire",
  };
}

describe(
  "buildAnalysisResult personalization integration",
  () => {
    it(
      "applies minimal routine and lowest price to selected products",
      () => {
        const observations:
          Observation[] = [
            createObservation(
              "routine_complexity",
              "minimal",
            ),

            createObservation(
              "budget_priority",
              "lowest_price",
            ),
          ];

        const result =
          buildAnalysisResult(
            diagnosis,
            observations,
            products,
            recommendationRules,
          );

        expect(
          result.safety
            .canRecommendProducts,
        ).toBe(true);

        expect(
          result.recommendations,
        ).toHaveLength(1);

        expect(
          result.recommendations[0]
            .recommendation.type,
        ).toBe(
          "conditioning_support",
        );

        expect(
          result.recommendations[0]
            .products,
        ).toHaveLength(1);

        expect(
          result.recommendations[0]
            .products[0].id,
        ).toBe(
          "cheap_conditioner",
        );

        expect(
          result.recommendations[0]
            .products[0].price,
        ).toBe(14.9);
      },
    );

    it(
      "keeps all compatible products when routine is not minimal",
      () => {
        const observations:
          Observation[] = [
            createObservation(
              "routine_complexity",
              "balanced",
            ),

            createObservation(
              "budget_priority",
              "lowest_price",
            ),
          ];

        const result =
          buildAnalysisResult(
            diagnosis,
            observations,
            products,
            recommendationRules,
          );

        expect(
          result.recommendations[0]
            .products,
        ).toHaveLength(3);

        expect(
          result.recommendations[0]
            .products.map(
              (product) =>
                product.price,
            ),
        ).toEqual([
          14.9,
          22.9,
          29.9,
        ]);
      },
    );

    it(
      "keeps ingredient guidance when the product catalog is empty",
      () => {
        const observations:
          Observation[] = [
            createObservation(
              "routine_complexity",
              "balanced",
            ),
          ];

        const result =
          buildAnalysisResult(
            diagnosis,
            observations,
            [],
            recommendationRules,
          );

        expect(
          result.recommendations,
        ).toHaveLength(1);

        expect(
          result.recommendations[0]
            .recommendation.type,
        ).toBe(
          "conditioning_support",
        );

        expect(
          result.recommendations[0]
            .recommendation
            .ingredientGuidance,
        ).toEqual(
          recommendationRules[0]
            .produces
            .ingredientGuidance,
        );

        expect(
          result.recommendations[0]
            .recommendation
            .ingredientGuidance
            ?.lookFor[0].name,
        ).toBe(
          "Agentes condicionantes catiônicos",
        );

        expect(
          result.recommendations[0]
            .products,
        ).toEqual([]);
      },
    );

    it(
      "keeps recommendation guidance but blocks products when safety level is caution",
      () => {
        const observations:
          Observation[] = [
            createObservation(
              "routine_complexity",
              "balanced",
            ),

            createSafetyObservation(
              "scalp_sensitivity",
              "severe",
            ),
          ];

        const result =
          buildAnalysisResult(
            diagnosis,
            observations,
            products,
            recommendationRules,
          );

        expect(
          result.safety.level,
        ).toBe("caution");

        expect(
          result.safety
            .canRecommendProducts,
        ).toBe(false);

        expect(
          result.recommendations,
        ).toHaveLength(1);

        expect(
          result.recommendations[0]
            .recommendation
            .ingredientGuidance,
        ).toEqual(
          recommendationRules[0]
            .produces
            .ingredientGuidance,
        );

        expect(
          result.recommendations[0]
            .products,
        ).toEqual([]);
      },
    );

    it(
      "keeps recommendation guidance but blocks products when safety level is stop",
      () => {
        const observations:
          Observation[] = [
            createObservation(
              "routine_complexity",
              "balanced",
            ),

            createSafetyObservation(
              "scalp_wound",
              "severe",
            ),
          ];

        const result =
          buildAnalysisResult(
            diagnosis,
            observations,
            products,
            recommendationRules,
          );

        expect(
          result.safety.level,
        ).toBe("stop");

        expect(
          result.safety
            .canRecommendProducts,
        ).toBe(false);

        expect(
          result.recommendations,
        ).toHaveLength(1);

        expect(
          result.recommendations[0]
            .recommendation
            .ingredientGuidance,
        ).toEqual(
          recommendationRules[0]
            .produces
            .ingredientGuidance,
        );

        expect(
          result.recommendations[0]
            .products,
        ).toEqual([]);
      },
    );

    it(
      "includes routine guidance when conditioning support exists and conditioning is rarely used",
      () => {
        const observations:
          Observation[] = [
            createRoutineObservation(
              "conditioning_frequency",
              "rarely",
            ),
          ];

        const result =
          buildAnalysisResult(
            diagnosis,
            observations,
            products,
            recommendationRules,
          );

        expect(
          result.recommendations[0]
            .recommendation.type,
        ).toBe(
          "conditioning_support",
        );

        expect(
          result.routineGuidance,
        ).toHaveLength(1);

        expect(
          result.routineGuidance[0]
            .type,
        ).toBe(
          "conditioning_frequency_support",
        );

        expect(
          result.routineGuidance[0]
            .relatedRecommendationType,
        ).toBe(
          "conditioning_support",
        );

        expect(
          result.routineGuidance[0]
            .context,
        ).toEqual({
          trait:
            "conditioning_frequency",
          value: "rarely",
        });
      },
    );
  },
);