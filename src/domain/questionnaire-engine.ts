import type {
  Observation,
} from "./observation";

import type {
  QuestionnaireAnswer,
  QuestionnaireQuestion,
} from "./questionnaire";

export function answersToObservations(
  questions: QuestionnaireQuestion[],
  answers: QuestionnaireAnswer[],
): Observation[] {
  const questionsById = new Map(
    questions.map((question) => [
      question.id,
      question,
    ]),
  );

  return answers.flatMap((answer) => {
    const question =
      questionsById.get(
        answer.questionId,
      );

    if (!question) {
      return [];
    }

    return [
      {
        id: `observation_${answer.questionId}`,
        domain: question.domain,
        trait: question.trait,
        value: answer.value,
        region: question.region,
        source: "questionnaire" as const,
      },
    ];
  });
}