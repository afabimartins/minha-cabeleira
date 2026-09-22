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

describe(
  "buildAnalysisResult personalization integration",
  () => {
    it("applies minimal routine and lowest price to selected products", () => {
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
    });

    it("keeps all compatible products when routine is not minimal", () => {
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
    });
  },
);