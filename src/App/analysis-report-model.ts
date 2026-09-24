import type {
  AnalysisResult,
} from "../domain/analysis-result";

import type {
  IngredientGuidance,
} from "../domain/ingredient-guidance";

import type {
  Product,
} from "../domain/product";

import {
  getFindingPresentation,
  getRecommendationTitle,
  getSafetyDescription,
  getSafetyTitle,
} from "./analysis-presentation";

import {
  getAnalysisReportPolicy,
} from "./analysis-report";

export type AnalysisReportFinding = {
  id: string;
  title: string;
  description: string;
};

export type AnalysisReportSafety = {
  level:
    AnalysisResult["safety"]["level"];
  title: string;
  description: string;
  notices: string[];
};

export type AnalysisReportRecommendation = {
  id: string;
  title: string;
  rationale: string;
  ingredientGuidance:
    | IngredientGuidance
    | null;
  products: Product[];
  ingredientGuidanceBlocked: boolean;
  productsBlocked: boolean;
};

export type AnalysisReport = {
  title: string;
  introduction: string;
  findings: AnalysisReportFinding[];
  safety: AnalysisReportSafety;
  recommendations:
    AnalysisReportRecommendation[];
  disclaimer: string;
};

export function buildAnalysisReport(
  result: AnalysisResult,
): AnalysisReport {
  const policy =
    getAnalysisReportPolicy(result);

  return {
    title: "Sua análise capilar",

    introduction:
      "Este relatório organiza as informações fornecidas durante a análise para destacar os sinais observados, os cuidados importantes e o que pode fazer mais sentido priorizar na sua rotina.",

    findings:
      result.diagnosis.findings.map(
        (finding) => {
          const presentation =
            getFindingPresentation(
              finding,
            );

          return {
            id: finding.id,
            title:
              presentation.title,
            description:
              presentation.description,
          };
        },
      ),

    safety: {
      level: result.safety.level,

      title: getSafetyTitle(
        result.safety.level,
      ),

      description:
        getSafetyDescription(result),

      notices:
        result.safety.notices.map(
          (notice) =>
            notice.message,
        ),
    },

    recommendations:
      result.recommendations.map(
        ({
          recommendation,
          products,
        }) => ({
          id: recommendation.id,

          title:
            getRecommendationTitle(
              recommendation.type,
            ),

          rationale:
            recommendation.rationale,

          ingredientGuidance:
            policy.showIngredientGuidance
              ? recommendation
                  .ingredientGuidance ??
                null
              : null,

          products:
            policy.showProducts
              ? products
              : [],

          ingredientGuidanceBlocked:
            !policy.showIngredientGuidance,

          productsBlocked:
            !policy.showProducts,
        }),
      ),

    disclaimer:
      "Esta análise é informativa e foi construída a partir das respostas fornecidas. Ela não substitui diagnóstico, consulta ou avaliação realizada por profissional de saúde quando houver sinais que mereçam investigação.",
  };
}