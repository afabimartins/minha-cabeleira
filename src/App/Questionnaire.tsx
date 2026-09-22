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

  const progress =
    ((currentQuestionIndex + 1) /
      questionnaireQuestions.length) *
    100;

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
    <section className="questionnaire">
      <div className="questionnaire-progress">
        <div className="questionnaire-progress__header">
          <span>
            Pergunta{" "}
            {currentQuestionIndex + 1} de{" "}
            {questionnaireQuestions.length}
          </span>

          <span>
            {Math.round(progress)}%
          </span>
        </div>

        <div
          className="questionnaire-progress__track"
          aria-hidden="true"
        >
          <div
            className="questionnaire-progress__bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="questionnaire-card">
        <header className="questionnaire-card__header">
          <p className="questionnaire-card__eyebrow">
            Sobre o seu cabelo
          </p>

          <h2>
            {currentQuestion.text}
          </h2>

          {currentQuestion.helpText && (
            <p className="questionnaire-card__help">
              {currentQuestion.helpText}
            </p>
          )}
        </header>

        <fieldset className="questionnaire-options">
          <legend className="sr-only">
            Escolha uma opção
          </legend>

          {currentQuestion.options?.map(
            (option) => {
              const optionId =
                `${currentQuestion.id}-${String(
                  option.value,
                )}`;

              const isSelected =
                currentAnswer?.value ===
                option.value;

              return (
                <label
                  className={`questionnaire-option${
                    isSelected
                      ? " questionnaire-option--selected"
                      : ""
                  }`}
                  htmlFor={optionId}
                  key={optionId}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name={
                      currentQuestion.id
                    }
                    value={String(
                      option.value,
                    )}
                    checked={isSelected}
                    onChange={() =>
                      selectAnswer(
                        option.value,
                      )
                    }
                  />

                  <span className="questionnaire-option__control" />

                  <span className="questionnaire-option__label">
                    {option.label}
                  </span>
                </label>
              );
            },
          )}
        </fieldset>

        <div className="questionnaire-actions">
          <button
            className="button button--secondary"
            type="button"
            onClick={goBack}
            disabled={
              currentQuestionIndex === 0
            }
          >
            Voltar
          </button>

          <button
            className="button button--primary"
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
      </div>
    </section>
  );
}