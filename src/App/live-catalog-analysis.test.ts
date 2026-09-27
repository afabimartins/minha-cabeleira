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
          ]),
        );
      },
    );

    it(
      "simula as 20 respostas e recomenda proteção da fibra com produtos reais em ordem de menor preço",
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
          "A análise deveria ser válida com as 20 respostas automáticas.",
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

        expect(recommendedIds).toEqual([
          "vult-choque-reconstrucao-leave-in-100ml",
          "elseve-reparacao-total-5-creme-milagroso-500ml",
        ]);

        expect(
          damageProtection!.products.map(
            (product) => product.price,
          ),
        ).toEqual([
          20.9,
          42.99,
        ]);
      },
    );
  },
);
