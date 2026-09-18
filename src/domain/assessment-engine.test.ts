import { describe, expect, it } from "vitest";
import { assessFindings } from "./assessment-engine";
import type { Finding } from "./finding";

describe("assessFindings", () => {
  it("returns unresolved when there are no findings", () => {
    const result = assessFindings([]);

    expect(result.status).toBe("unresolved");
    expect(result.findings).toEqual([]);
  });

  it("returns supported when findings agree", () => {
    const findings: Finding[] = [
      {
        id: "finding_001",
        type: "strong_conditioning_response",
        confidence: "high",
        basedOn: ["obs_001", "obs_002", "obs_003"],
        evidence: [],
        explanation: "Conditioning response supported.",
      },
    ];

    const result = assessFindings(findings);

    expect(result.status).toBe("supported");
    expect(result.findings).toEqual(findings);
  });

  it("returns conflicting when finding types disagree", () => {
    const findings: Finding[] = [
      {
        id: "finding_001",
        type: "strong_conditioning_response",
        confidence: "high",
        basedOn: ["obs_001"],
        evidence: [],
        explanation: "First interpretation.",
      },
      {
        id: "finding_002",
        type: "weak_conditioning_response",
        confidence: "medium",
        basedOn: ["obs_002"],
        evidence: [],
        explanation: "Second interpretation.",
      },
    ];

    const result = assessFindings(findings);

    expect(result.status).toBe("conflicting");
    expect(result.findings).toEqual(findings);
  });
});