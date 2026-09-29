import {
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";

import type {
  QuestionnaireAnswer,
} from "../domain/questionnaire";

import type {
  Product,
} from "../domain/product";

import {
  runFullAnalysis,
} from "../domain/full-analysis";

import {
  questionnaireQuestions,
} from "./questionnaire-data";

import {
  analysisRules,
  analysisRecommendationRules,
} from "./analysis-data";

import {
  CORE_ROUTINE_PRODUCT_CATEGORIES,
} from "../domain/routine-product-selection";

import {
  getActiveAnalysisProducts,
  getProductStoreMode,
} from "./product-store";

const answers: QuestionnaireAnswer[] = [
  {
    questionId: "roughness",
    value: "low",
  },
  {
    questionId: "tangling",
    value: "low",
  },
  {
    questionId: "conditioning",
    value: "low",
  },
  {
    questionId: "breakage",
    value: "high",
  },
  {
    questionId: "wetting_speed",
    value: "normal",
  },
  {
    questionId: "drying_speed",
    value: "normal",
  },
  {
    questionId: "water_retention",
    value: "high",
  },
  {
    questionId: "chemical_processing",
    value: "low",
  },
  {
    questionId: "heat_exposure",
    value: "low",
  },
  {
    questionId: "damage_history",
    value: "severe",
  },
  {
    questionId: "scalp_oiliness",
    value: "none",
  },
  {
    questionId: "scalp_dryness",
    value: "none",
  },
  {
    questionId: "scalp_sensitivity",
    value: "none",
  },
  {
    questionId: "scalp_burning",
    value: "none",
  },
  {
    questionId: "scalp_wound",
    value: "none",
  },
  {
    questionId: "sudden_hair_loss",
    value: "none",
  },
  {
    questionId: "wash_frequency",
    value: "sometimes",
  },
  {
    questionId: "conditioning_frequency",
    value: "sometimes",
  },
  {
    questionId: "styling_frequency",
    value: "sometimes",
  },
  {
    questionId: "primary_goal",
    value: "reduce_breakage",
  },
  {
    questionId: "routine_complexity",
    value: "balanced",
  },
  {
    questionId: "budget_priority",
    value: "lowest_price",
  },
];

describe(
  "catálogo real + análise completa",
  () => {
    let products: Product[] = [];

    beforeAll(
      async () => {
        expect(
          getProductStoreMode(),
          "O teste precisa usar o Supabase. Confira o arquivo .env.local e reinicie o terminal se necessário.",
        ).toBe("supabase");

        products =
          await getActiveAnalysisProducts();

        expect(
          products.length,
          "O Supabase respondeu, mas não há produtos públicos ativos/verificados.",
        ).toBeGreaterThan(0);
      },
      15_000,
    );

    it(
      "carrega os produtos reais do seed",
      () => {
        const ids = products.map(
          (product) => product.id,
        );

        expect(ids).toEqual(
          expect.arrayContaining([
            "vult-choque-reconstrucao-leave-in-100ml",
            "elseve-reparacao-total-5-creme-milagroso-500ml",
            "vult-recarga-hidratacao-shampoo-350ml",
            "vult-recarga-hidratacao-condicionador-200ml",
            "vult-glow-acid-mascara-acidificante-150ml",
            "vult-oleo-bifasico-oleos-poderosos-90ml",
            "vult-choque-reconstrucao-shampoo-350ml",
            "seda-hidratacao-diaria-shampoo-325ml",
            "vult-choque-reconstrucao-condicionador-200ml",
            "seda-ceramidas-condicionador-325ml",
            "vult-choque-reconstrucao-mascara-250g",
            "elseve-oleo-extraordinario-100ml",
            "seda-toque-de-seda-serum-oleo-60ml",
            "loccitane-pataua-serum-calmante-couro-50ml",
            "match-agente-antioleosidade-tonico-100ml",
          ]),
        );

        for (const category of
          CORE_ROUTINE_PRODUCT_CATEGORIES) {
          const productsInCategory =
            products.filter(
              (product) =>
                product.category ===
                  category ||
                (category === "mask" &&
                  product.category ===
                    "treatment") ||
                (category === "leave_in" &&
                  product.category ===
                    "styler"),
            );

          expect(
            productsInCategory.length,
            `O catálogo precisa ter pelo menos 3 opções para a categoria-base: ${category}.`,
          ).toBeGreaterThanOrEqual(3);
        }

        expect(
          products.filter(
            (product) =>
              product.category === "scalp",
          ).length,
          "O catálogo precisa ter opções separadas para oleosidade e ressecamento do couro cabeludo.",
        ).toBeGreaterThanOrEqual(2);
      },
    );

    it(
      "simula as 22 respostas e recomenda proteção da fibra com produtos reais em ordem de menor preço",
      () => {
        const analysis =
          runFullAnalysis(
            questionnaireQuestions,
            answers,
            analysisRules,
            products,
            analysisRecommendationRules,
          );

        expect(
          analysis.valid,
          "A análise deveria ser válida com as 22 respostas automáticas.",
        ).toBe(true);

        expect(
          analysis.result,
          "A análise foi válida, mas não retornou resultado.",
        ).toBeDefined();

        const result = analysis.result!;

        expect(
          result.safety.level,
          "O cenário automático foi montado sem sinais de alerta no couro cabeludo.",
        ).toBe("normal");

        expect(
          result.safety.canRecommendProducts,
        ).toBe(true);

        const damageProtection =
          result.recommendations.find(
            (recommendationResult) =>
              recommendationResult
                .recommendation.type ===
              "damage_protection",
          );

        expect(
          damageProtection,
          "Era esperada a recomendação damage_protection: quebra alta + histórico de dano severo.",
        ).toBeDefined();

        const recommendedIds =
          damageProtection!.products.map(
            (product) => product.id,
          );

        expect(recommendedIds).toEqual(
          expect.arrayContaining([
            "vult-choque-reconstrucao-shampoo-350ml",
            "vult-glow-acid-mascara-acidificante-150ml",
            "vult-choque-reconstrucao-mascara-250g",
            "vult-choque-reconstrucao-leave-in-100ml",
            "seda-toque-de-seda-serum-oleo-60ml",
            "vult-oleo-bifasico-oleos-poderosos-90ml",
            "elseve-reparacao-total-5-creme-milagroso-500ml",
          ]),
        );

        const recommendedPrices =
          damageProtection!.products
            .map((product) => product.price)
            .filter(
              (price): price is number =>
                price !== undefined,
            );

        expect(recommendedPrices).toEqual(
          [...recommendedPrices].sort(
            (a, b) => a - b,
          ),
        );

        expect(
          result.routineProducts,
        ).toHaveLength(
          CORE_ROUTINE_PRODUCT_CATEGORIES.length,
        );

        expect(
          result.routineProducts?.every(
            (selection) =>
              selection.product !== null,
          ),
        ).toBe(true);
      },
    );
  },
);
