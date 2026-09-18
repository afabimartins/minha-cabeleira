import type {
  HairRegion,
  ObservationDomain,
  ObservationTrait,
  ObservationValue,
} from "./observation";

export type QuestionType =
  | "single_choice"
  | "boolean";

export type QuestionOption = {
  label: string;
  value: ObservationValue;
};

export type QuestionnaireQuestion = {
  id: string;
  text: string;
  type: QuestionType;

  domain: ObservationDomain;
  trait: ObservationTrait;
  region: HairRegion;

  options?: QuestionOption[];

  helpText?: string;
};

export type QuestionnaireAnswer = {
  questionId: string;
  value: ObservationValue;
};