import type {
  KnowledgeRule,
} from "./rule";

import type {
  Product,
} from "./product";

import type {
  QuestionnaireAnswer,
  QuestionnaireQuestion,
} from "./questionnaire";

import {
  processQuestionnaire,
} from "./questionnaire-session";

import {
  buildDiagnosis,
} from "./diagnosis-engine";

import {
  buildAnalysisResult,
} from "./analysis-result-engine";

export function runFullAnalysis(
  questions: QuestionnaireQuestion[],
  answers: QuestionnaireAnswer[],
  rules: KnowledgeRule[],
  products: Product[],
) {
  const questionnaire =
    processQuestionnaire(
      questions,
      answers,
    );

  if (!questionnaire.valid) {
    return {
      valid: false as const,
      issues: questionnaire.issues,
      result: null,
    };
  }

  const diagnosis =
    buildDiagnosis(
      rules,
      questionnaire.observations,
    );

  return {
    valid: true as const,
    issues: [],
    result:
      buildAnalysisResult(
        diagnosis,
        questionnaire.observations,
        products,
      ),
  };
}