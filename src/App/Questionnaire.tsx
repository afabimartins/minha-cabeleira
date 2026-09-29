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

import type {
  Product,
} from "../domain/product";

import {
  questionnaireQuestions,
} from "./questionnaire-data";

import {
  runFullAnalysis,
} from "../domain/full-analysis";

import {
  analysisRules,
  analysisRecommendationRules,
} from "./analysis-data";

import {
  getActiveAnalysisProducts,
} from "./product-store";

import {
  AnalysisResultView,
} from "./AnalysisResultView";

export function Questionnaire() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswer[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isPreparingAnalysis, setIsPreparingAnalysis] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const currentQuestion = questionnaireQuestions[currentQuestionIndex];
  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion.id,
  );

  const totalQuestions = questionnaireQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  function selectAnswer(value: ObservationValue) {
    setAnswers((previousAnswers) => {
      const otherAnswers = previousAnswers.filter(
        (answer) => answer.questionId !== currentQuestion.id,
      );

      return [
        ...otherAnswers,
        {
          questionId: currentQuestion.id,
          value,
        },
      ];
    });
  }

  async function goNext() {
    const answerForCurrentQuestion = answers.find(
      (answer) => answer.questionId === currentQuestion.id,
    );

    if (!answerForCurrentQuestion) return;

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex((previousIndex) => previousIndex + 1);
      return;
    }

    setIsPreparingAnalysis(true);
    setAnalysisError("");

    try {
      let products: Product[] = [];

      try {
        products = await getActiveAnalysisProducts();
      } catch {
        // A análise técnica continua útil mesmo se o catálogo estiver indisponível.
        products = [];
      }

      const analysis = runFullAnalysis(
        questionnaireQuestions,
        answers,
        analysisRules,
        products,
        analysisRecommendationRules,
      );

      if (analysis.valid && analysis.result) {
        setAnalysisResult(analysis.result);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setAnalysisError(
          "Não foi possível concluir a análise. Revise as respostas e tente novamente.",
        );
      }
    } finally {
      setIsPreparingAnalysis(false);
    }
  }

  function goBack() {
    if (currentQuestionIndex === 0) return;
    setCurrentQuestionIndex((previousIndex) => previousIndex - 1);
  }

  function restart() {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setAnalysisResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <section className="questionnaire-shell">
      <div className="questionnaire-hero">
        <div className="questionnaire-hero__content">
          <p className="questionnaire-hero__eyebrow">
            Análise capilar personalizada
          </p>

          <h2>
            Entenda seu cabelo.
            <span> Cuide do que ele precisa.</span>
          </h2>

          <p className="questionnaire-hero__description">
            Suas respostas ajudam a organizar sinais, rotina e objetivos para
            construir orientações mais úteis — sem encaixar seu cabelo em
            rótulos.
          </p>

          <div className="questionnaire-hero__features" aria-label="Características da análise">
            <span>22 perguntas</span>
            <span>Foco em necessidades</span>
            <span>Sem rótulos de cabelo</span>
          </div>

          <div className="questionnaire-hero__strand" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="questionnaire-panel">
        <div className="questionnaire-progress">
          <div className="questionnaire-progress__header">
            <div>
              <span className="questionnaire-progress__label">Seu progresso</span>
              <strong>
                {String(currentQuestionIndex + 1).padStart(2, "0")}
                <small> / {String(totalQuestions).padStart(2, "0")}</small>
              </strong>
            </div>

            <span className="questionnaire-progress__percent">
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className="questionnaire-progress__track"
            role="progressbar"
            aria-label="Progresso da análise"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
          >
            <div
              className="questionnaire-progress__bar"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="questionnaire-card" key={currentQuestion.id}>
          <header className="questionnaire-card__header">
            <p className="questionnaire-card__eyebrow">Sobre o seu cabelo</p>
            <h3>{currentQuestion.text}</h3>

            {currentQuestion.helpText && (
              <p className="questionnaire-card__help">
                {currentQuestion.helpText}
              </p>
            )}
          </header>

          <fieldset className="questionnaire-options">
            <legend className="sr-only">Escolha uma opção</legend>

            {currentQuestion.options?.map((option) => {
              const optionId = `${currentQuestion.id}-${String(option.value)}`;
              const isSelected = currentAnswer?.value === option.value;

              return (
                <label
                  className={`questionnaire-option${
                    isSelected ? " questionnaire-option--selected" : ""
                  }`}
                  htmlFor={optionId}
                  key={optionId}
                >
                  <input
                    id={optionId}
                    type="radio"
                    name={currentQuestion.id}
                    value={String(option.value)}
                    checked={isSelected}
                    onChange={() => selectAnswer(option.value)}
                  />

                  <span className="questionnaire-option__control" aria-hidden="true" />
                  <span className="questionnaire-option__label">{option.label}</span>
                  <span className="questionnaire-option__check" aria-hidden="true">✓</span>
                </label>
              );
            })}
          </fieldset>

          <div className="questionnaire-actions">
            <button
              className="button button--secondary"
              type="button"
              onClick={goBack}
              disabled={currentQuestionIndex === 0}
            >
              <span aria-hidden="true">←</span>
              Voltar
            </button>

            <button
              className="button button--primary"
              type="button"
              onClick={() => void goNext()}
              disabled={!currentAnswer || isPreparingAnalysis}
            >
              {isPreparingAnalysis
                ? "Preparando análise…"
                : currentQuestionIndex === totalQuestions - 1
                  ? "Ver minha análise"
                  : "Continuar"}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {analysisError ? (
          <p className="questionnaire-panel__error" role="alert">
            {analysisError}
          </p>
        ) : null}

        <p className="questionnaire-panel__note">
          Suas respostas são usadas apenas para construir esta análise.
        </p>
      </div>
    </section>
  );
}
