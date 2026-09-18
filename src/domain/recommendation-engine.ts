import type {
  FindingSummary,
} from "./finding-engine";

import type {
  Recommendation,
} from "./recommendation";

import type {
  RecommendationRule,
} from "./recommendation-rule";

export function evaluateRecommendationRule(
  rule: RecommendationRule,
  findings: FindingSummary[],
): Recommendation | null {
  if (rule.status !== "active") {
    return null;
  }

  const availableFindingTypes = new Set(
    findings.map((finding) => finding.type),
  );

  const requirementsMet =
    rule.requiresFindings.every((type) =>
      availableFindingTypes.has(type),
    );

  if (!requirementsMet) {
    return null;
  }

  const supportingFindings = findings.filter(
    (finding) =>
      rule.requiresFindings.includes(
        finding.type,
      ),
  );

  return {
    id: `recommendation_${rule.id}`,
    type: rule.produces.type,
    status: "candidate",
    confidence: rule.produces.confidence,

    basedOnFindings:
      supportingFindings.flatMap(
        (finding) =>
          finding.supportingFindings,
      ),

    evidence: rule.evidence,

    rationale: rule.rationale,
  };
}

export function evaluateRecommendationRules(
  rules: RecommendationRule[],
  findings: FindingSummary[],
): Recommendation[] {
  return rules
    .map((rule) =>
      evaluateRecommendationRule(
        rule,
        findings,
      ),
    )
    .filter(
      (
        recommendation,
      ): recommendation is Recommendation =>
        recommendation !== null,
    );
}