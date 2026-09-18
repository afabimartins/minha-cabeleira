import { describe, expect, it } from "vitest";
import type { Observation } from "./observation";
import { evaluateRule } from "./rule-engine";
import { strongConditioningResponseRule } from "./rules/conditioning-response.rule";

describe("evaluateRule", () => {
  it("produces the finding when every rule condition is matched", () => {
    const observations: Observation[] = [
      {
        id: "obs_001",
        domain: "fiber",
        trait: "post_wash_roughness",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
      {
        id: "obs_002",
        domain: "fiber",
        trait: "wet_tangling",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
      {
        id: "obs_003",
        domain: "product_response",
        trait: "conditioning_improvement",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
    ];

    const activeRule = {
      ...strongConditioningResponseRule,
      status: "active" as const,
    };

    const result = evaluateRule(activeRule, observations);

    expect(result).not.toBeNull();
    expect(result?.type).toBe("strong_conditioning_response");
    expect(result?.confidence).toBe("high");
  });

  it("does not produce the finding when a condition is missing", () => {
    const observations: Observation[] = [
      {
        id: "obs_001",
        domain: "fiber",
        trait: "post_wash_roughness",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
      {
        id: "obs_002",
        domain: "fiber",
        trait: "wet_tangling",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
    ];

    const activeRule = {
      ...strongConditioningResponseRule,
      status: "active" as const,
    };

    const result = evaluateRule(activeRule, observations);

    expect(result).toBeNull();
  });

  it("does not evaluate a draft rule", () => {
    const observations: Observation[] = [
      {
        id: "obs_001",
        domain: "fiber",
        trait: "post_wash_roughness",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
      {
        id: "obs_002",
        domain: "fiber",
        trait: "wet_tangling",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
      {
        id: "obs_003",
        domain: "product_response",
        trait: "conditioning_improvement",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
    ];

    const result = evaluateRule(
      strongConditioningResponseRule,
      observations,
    );

    expect(result).toBeNull();
  });
});