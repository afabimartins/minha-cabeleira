import {
  describe,
  expect,
  it,
} from "vitest";

import type { Evidence } from "./evidence";
import { EvidenceRegistry } from "./evidence-registry";
import { validateRuleForProduction } from "./rule-validation";
import { strongConditioningResponseRule } from "./rules/conditioning-response.rule";

const evidence: Evidence = {
  id: "evidence_001",
  title: "Example evidence",
  citation: "Example citation",
  type: "experimental_study",
  quality: "moderate",
  status: "active",
  supports: [
    "strong_conditioning_response",
  ],
  limitations: [],
};

describe("validateRuleForProduction", () => {
  it("rejects draft rules", () => {
    const registry =
      new EvidenceRegistry([evidence]);

    const result =
      validateRuleForProduction(
        strongConditioningResponseRule,
        registry,
      );

    expect(result.valid).toBe(false);

    expect(result.issues).toContain(
      "rule_not_active",
    );
  });

  it("rejects active rules without evidence", () => {
    const registry = new EvidenceRegistry();

    const rule = {
      ...strongConditioningResponseRule,
      status: "active" as const,
      evidence: [],
    };

    const result =
      validateRuleForProduction(
        rule,
        registry,
      );

    expect(result.valid).toBe(false);

    expect(result.issues).toContain(
      "missing_evidence",
    );
  });

  it("accepts active rules with active evidence", () => {
    const registry =
      new EvidenceRegistry([evidence]);

    const rule = {
      ...strongConditioningResponseRule,
      status: "active" as const,
      evidence: ["evidence_001"],
    };

    const result =
      validateRuleForProduction(
        rule,
        registry,
      );

    expect(result).toEqual({
      valid: true,
      issues: [],
    });
  });
});