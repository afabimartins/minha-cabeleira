import type {
  ObservationValue,
} from "./observation";

export type RoutineGuidance = {
  id: string;

  type: string;

  title: string;

  description: string;

  basedOn: string[];

  relatedRecommendationType?: string;

  context?: {
    trait: string;
    value: ObservationValue;
  };
};