import {
  describe,
  expect,
  it,
} from "vitest";

import type { Finding } from "./finding";

import {
  consolidateFindings,
} from "./finding-engine";

describe("consolidateFindings", () => {
  it("groups findings of the same type", () => {
    const findings: Finding[] = [
      {
        id: "finding_001",
        type: "strong_conditioning_response",
        confidence: "medium",
        basedOn: ["obs_001", "obs_002"],
        evidence: ["evidence_001"],
        explanation: "First supporting pattern.",
      },

      {
        id: "finding_002",
        type: "strong_conditioning_response",
        confidence: "high",
        basedOn: ["obs_002", "obs_003"],
        evidence: ["evidence_002"],
        explanation: "Second supporting pattern.",
      },
    ];

    const result =
      consolidateFindings(findings);

    expect(result).toHaveLength(1);

    expect(result[0]?.type).toBe(
      "strong_conditioning_response",
    );

    expect(result[0]?.confidence).toBe("high");

    expect(result[0]?.supportingFindings).toEqual([
      "finding_001",
      "finding_002",
    ]);

    expect(result[0]?.basedOn).toEqual([
      "obs_001",
      "obs_002",
      "obs_003",
    ]);

    expect(result[0]?.evidence).toEqual([
      "evidence_001",
      "evidence_002",
    ]);
  });

  it("keeps different finding types separate", () => {
    const findings: Finding[] = [
      {
        id: "finding_001",
        type: "strong_conditioning_response",
        confidence: "high",
        basedOn: ["obs_001"],
        evidence: [],
        explanation: "Conditioning response.",
      },

      {
        id: "finding_002",
        type: "oil_sensitivity",
        confidence: "medium",
        basedOn: ["obs_002"],
        evidence: [],
        explanation: "Possible oil sensitivity.",
      },
    ];

    const result =
      consolidateFindings(findings);

    expect(result).toHaveLength(2);

    expect(
      result.map((finding) => finding.type),
    ).toEqual([
      "strong_conditioning_response",
      "oil_sensitivity",
    ]);
  });

  it("returns an empty result when there are no findings", () => {
    expect(
      consolidateFindings([]),
    ).toEqual([]);
  });
});