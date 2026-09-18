import type {
  Observation,
} from "./observation";

import type {
  QuestionnaireAnswer,
  QuestionnaireQuestion,
} from "./questionnaire";

import {
  answersToObservations,
} from "./questionnaire-engine";

import {
  validateAnswers,
} from "./questionnaire-validation";

export type QuestionnaireSessionResult =
  | {
      valid: true;
      observations: Observation[];
      issues: [];
    }
  | {
      valid: false;
      observations: [];
      issues: ReturnType<
        typeof validateAnswers
      >;
    };

export function processQuestionnaire(
  questions: QuestionnaireQuestion[],
  answers: QuestionnaireAnswer[],
): QuestionnaireSessionResult {
  const issues =
    validateAnswers(
      questions,
      answers,
    );

  if (issues.length > 0) {
    return {
      valid: false,
      observations: [],
      issues,
    };
  }

  return {
    valid: true,
    observations:
      answersToObservations(
        questions,
        answers,
      ),
    issues: [],
  };
}