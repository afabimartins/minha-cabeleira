import type { KnowledgeRule } from "./rule";
import type { EvidenceRegistry } from "./evidence-registry";

export type RuleValidationIssue =
  | "rule_not_active"
  | "missing_evidence"
  | "inactive_evidence";

export type RuleValidationResult = {
  valid: boolean;
  issues: RuleValidationIssue[];
};

export function validateRuleForProduction(
  rule: KnowledgeRule,
  evidenceRegistry: EvidenceRegistry,
): RuleValidationResult {
  const issues: RuleValidationIssue[] = [];

  if (rule.status !== "active") {
    issues.push("rule_not_active");
  }

  if (rule.evidence.length === 0) {
    issues.push("missing_evidence");
  } else {
    const activeEvidence =
      evidenceRegistry.getActive(rule.evidence);

    if (
      activeEvidence.length !==
      rule.evidence.length
    ) {
      issues.push("inactive_evidence");
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}