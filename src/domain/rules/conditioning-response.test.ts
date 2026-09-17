import { describe, expect, it } from "vitest";
import type { Observation } from "../observation";
import { evaluateConditioningResponse } from "./conditioning-response";

describe("evaluateConditioningResponse", () => {
  it("produces a high-confidence finding when all three signals are present", () => {
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

    const result = evaluateConditioningResponse(observations);

    expect(result).not.toBeNull();
    expect(result?.type).toBe("strong_conditioning_response");
    expect(result?.confidence).toBe("high");
    expect(result?.basedOn).toEqual([
      "obs_001",
      "obs_002",
      "obs_003",
    ]);
  });

  it("does not infer a strong conditioning response from roughness alone", () => {
    const observations: Observation[] = [
      {
        id: "obs_001",
        domain: "fiber",
        trait: "post_wash_roughness",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
    ];

    const result = evaluateConditioningResponse(observations);

    expect(result).toBeNull();
  });
});