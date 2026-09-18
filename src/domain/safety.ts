export type SafetyLevel =
  | "normal"
  | "caution"
  | "stop";

export type SafetyNotice = {
  level: SafetyLevel;
  code: string;
  message: string;
};

export type SafetyAssessment = {
  level: SafetyLevel;
  notices: SafetyNotice[];
  canRecommendProducts: boolean;
};