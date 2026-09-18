import type {
  QuestionnaireAnswer,
  QuestionnaireQuestion,
} from "./questionnaire";

export type QuestionnaireValidationIssue = {
  questionId: string;
  reason:
    | "unknown_question"
    | "invalid_option";
};

export function validateAnswers(
  questions: QuestionnaireQuestion[],
  answers: QuestionnaireAnswer[],
): QuestionnaireValidationIssue[] {
  const questionsById = new Map(
    questions.map((question) => [
      question.id,
      question,
    ]),
  );

  const issues:
    QuestionnaireValidationIssue[] = [];

  for (const answer of answers) {
    const question =
      questionsById.get(
        answer.questionId,
      );

    if (!question) {
      issues.push({
        questionId:
          answer.questionId,
        reason: "unknown_question",
      });

      continue;
    }

    if (
      question.options &&
      !question.options.some(
        (option) =>
          option.value ===
          answer.value,
      )
    ) {
      issues.push({
        questionId:
          answer.questionId,
        reason: "invalid_option",
      });
    }
  }

  return issues;
}