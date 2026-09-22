import {
  useState,
} from "react";

import type {
  QuestionnaireAnswer,
} from "../domain/questionnaire";

import type {
  ObservationValue,
} from "../domain/observation";

import type {
  AnalysisResult,
} from "../domain/analysis-result";

import {
  questionnaireQuestions,
} from "./questionnaire-data";

import {
  runFullAnalysis,
} from "../domain/full-analysis";

import {
  analysisRules,
  analysisProducts,
  analysisRecommendationRules,
} from "./analysis-data";

import {
  AnalysisResultView,
} from "./AnalysisResultView";

export function Questionnaire() {
  const [
    currentQuestionIndex,
    setCurrentQuestionIndex,
  ] = useState(0);

  const [
    answers,
    setAnswers,
  ] = useState<QuestionnaireAnswer[]>(
    [],
  );

  const [
    analysisResult,
    setAnalysisResult,
  ] = useState<AnalysisResult | null>(
    null,
  );

  const currentQuestion =
    questionnaireQuestions[
      currentQuestionIndex
    ];

  const currentAnswer =
    answers.find(
      (answer) =>
        answer.questionId ===
        currentQuestion.id,
    );

  function selectAnswer(
    value: ObservationValue,
  ) {
    setAnswers(
      (previousAnswers) => {
        const otherAnswers =
          previousAnswers.filter(
            (answer) =>
              answer.questionId !==
              currentQuestion.id,
          );

        return [
          ...otherAnswers,
          {
            questionId:
              currentQuestion.id,
            value,
          },
        ];
      },
    );
  }

  function goNext() {
    const answerForCurrentQuestion =
      answers.find(
        (answer) =>
          answer.questionId ===
          currentQuestion.id,
      );

    if (!answerForCurrentQuestion) {
      return;
    }

    const isLastQuestion =
      currentQuestionIndex ===
      questionnaireQuestions.length -
        1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex(
        (previousIndex) =>
          previousIndex + 1,
      );

      return;
    }

    const analysis =
      runFullAnalysis(
        questionnaireQuestions,
        answers,
        analysisRules,
        analysisProducts,
        analysisRecommendationRules,
      );

    if (
      analysis.valid &&
      analysis.result
    ) {
      setAnalysisResult(
        analysis.result,
      );
    }
  }

  function goBack() {
    if (currentQuestionIndex === 0) {
      return;
    }

    setCurrentQuestionIndex(
      (previousIndex) =>
        previousIndex - 1,
    );
  }

  function restart() {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setAnalysisResult(null);
  }

  if (analysisResult) {
    return (
      <AnalysisResultView
        result={analysisResult}
        onRestart={restart}
      />
    );
  }

  return (
    <section>
      <p>
        Pergunta{" "}
        {currentQuestionIndex + 1} de{" "}
        {questionnaireQuestions.length}
      </p>

      <h2>
        {currentQuestion.text}
      </h2>

      {currentQuestion.helpText && (
        <p>
          {currentQuestion.helpText}
        </p>
      )}

      <fieldset>
        <legend>
          Escolha uma opção
        </legend>

        {currentQuestion.options?.map(
          (option) => {
            const optionId =
              `${currentQuestion.id}-${String(
                option.value,
              )}`;

            return (
              <div key={optionId}>
                <input
                  id={optionId}
                  type="radio"
                  name={
                    currentQuestion.id
                  }
                  value={String(
                    option.value,
                  )}
                  checked={
                    currentAnswer?.value ===
                    option.value
                  }
                  onChange={() =>
                    selectAnswer(
                      option.value,
                    )
                  }
                />

                <label
                  htmlFor={optionId}
                >
                  {option.label}
                </label>
              </div>
            );
          },
        )}
      </fieldset>

      <div>
        <button
          type="button"
          onClick={goBack}
          disabled={
            currentQuestionIndex === 0
          }
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={!currentAnswer}
        >
          {currentQuestionIndex ===
          questionnaireQuestions.length -
            1
            ? "Ver minha análise"
            : "Continuar"}
        </button>
      </div>
    </section>
  );
}