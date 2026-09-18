import {
  describe,
  expect,
  it,
} from "vitest";

import type { FindingSummary } from "./finding-engine";

import {
  buildHairProfile,
} from "./hair-profile";

describe("buildHairProfile", () => {
  it("creates supported assessments from consolidated findings", () => {
    const findings: FindingSummary[] = [
      {
        type: "strong_conditioning_response",
        confidence: "high",
        supportingFindings: [
          "finding_rule_strong_conditioning_response",
        ],
        basedOn: [
          "obs_001",
          "obs_002",
          "obs_003",
        ],
        evidence: [],
        explanations: [
          "Multiple independent reported signals support this finding.",
        ],
      },
    ];

    const profile = buildHairProfile(findings);

    expect(profile.assessments).toHaveLength(1);

    expect(profile.assessments[0]?.type).toBe(
      "strong_conditioning_response",
    );

    expect(profile.assessments[0]?.status).toBe(
      "supported",
    );

    expect(profile.assessments[0]?.confidence).toBe(
      "high",
    );

    expect(profile.assessments[0]?.basedOn).toEqual([
      "obs_001",
      "obs_002",
      "obs_003",
    ]);

    expect(profile.unresolved).toEqual([]);
  });

  it("does not invent an assessment when there are no findings", () => {
    const profile = buildHairProfile([]);

    expect(profile.assessments).toEqual([]);

    expect(profile.unresolved).toEqual([
      "No supported findings are currently available.",
    ]);
  });
});