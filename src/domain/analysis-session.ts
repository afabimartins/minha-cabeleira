import type {
  KnowledgeRule,
} from "./rule";

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

export function analyzeQuestionnaire(
  questions: QuestionnaireQuestion[],
  answers: QuestionnaireAnswer[],
  rules: KnowledgeRule[],
) {
  const questionnaire =
    processQuestionnaire(
      questions,
      answers,
    );

  if (!questionnaire.valid) {
    return {
      valid: false as const,
      issues:
        questionnaire.issues,
      diagnosis: null,
    };
  }

  return {
    valid: true as const,
    issues: [],
    diagnosis:
      buildDiagnosis(
        rules,
        questionnaire.observations,
      ),
  };
}