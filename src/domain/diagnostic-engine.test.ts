import {
  describe,
  expect,
  it,
} from "vitest";

import type { Observation } from "./observation";

import {
  evaluateHairProfile,
} from "./diagnostic-engine";

import {
  strongConditioningResponseRule,
} from "./rules/conditioning-response.rule";

describe("evaluateHairProfile", () => {
  it("runs the complete diagnostic pipeline", () => {
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

    const result = evaluateHairProfile(
      [activeRule],
      observations,
    );

    expect(result.observations).toHaveLength(3);

    expect(result.findings).toHaveLength(1);

    expect(
      result.consolidatedFindings,
    ).toHaveLength(1);

    expect(
      result.profile.assessments,
    ).toHaveLength(1);

    expect(
      result.profile.assessments[0]?.type,
    ).toBe(
      "strong_conditioning_response",
    );

    expect(
      result.profile.assessments[0]?.status,
    ).toBe("supported");

    expect(
      result.profile.assessments[0]?.confidence,
    ).toBe("high");
  });

  it("returns an unresolved profile when evidence is insufficient", () => {
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

    const activeRule = {
      ...strongConditioningResponseRule,
      status: "active" as const,
    };

    const result = evaluateHairProfile(
      [activeRule],
      observations,
    );

    expect(result.findings).toEqual([]);

    expect(
      result.profile.assessments,
    ).toEqual([]);

    expect(
      result.profile.unresolved.length,
    ).toBeGreaterThan(0);
  });

  it("does not evaluate draft knowledge as a supported finding", () => {
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

    const result = evaluateHairProfile(
      [strongConditioningResponseRule],
      observations,
    );

    expect(result.findings).toEqual([]);

    expect(
      result.profile.assessments,
    ).toEqual([]);
  });
});