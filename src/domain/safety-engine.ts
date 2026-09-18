import type { Observation } from "./observation";
import type {
  SafetyAssessment,
  SafetyNotice,
} from "./safety";

const STOP_TRAITS = new Set([
  "scalp_wound",
  "scalp_bleeding",
  "severe_scalp_pain",
]);

const CAUTION_TRAITS = new Set([
  "scalp_irritation",
  "scalp_burning",
  "sudden_hair_loss",
]);

export function assessSafety(
  observations: Observation[],
): SafetyAssessment {
  const notices: SafetyNotice[] = [];

  for (const observation of observations) {
    if (
      STOP_TRAITS.has(observation.trait) &&
      observation.value === "high"
    ) {
      notices.push({
        level: "stop",
        code: observation.trait,
        message:
          "This response requires professional assessment before product recommendations.",
      });

      continue;
    }

    if (
      CAUTION_TRAITS.has(observation.trait) &&
      observation.value === "high"
    ) {
      notices.push({
        level: "caution",
        code: observation.trait,
        message:
          "This response should be considered with caution.",
      });
    }
  }

  if (
    notices.some(
      (notice) => notice.level === "stop",
    )
  ) {
    return {
      level: "stop",
      notices,
      canRecommendProducts: false,
    };
  }

  if (notices.length > 0) {
    return {
      level: "caution",
      notices,
      canRecommendProducts: true,
    };
  }

  return {
    level: "normal",
    notices: [],
    canRecommendProducts: true,
  };
}