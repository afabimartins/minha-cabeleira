import type { Finding } from "../finding";
import type { Observation } from "../observation";
import { evaluateRule } from "../rule-engine";
import { strongConditioningResponseRule } from "./conditioning-response.rule";

export function evaluateConditioningResponse(
  observations: Observation[],
): Finding | null {
  return evaluateRule(
    strongConditioningResponseRule,
    observations,
  );
}