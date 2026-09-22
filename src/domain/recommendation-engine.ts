import type {
  Finding,
  FindingConfidence,
} from "./finding";

import type {
  Recommendation,
} from "./recommendation";

import type {
  RecommendationRule,
} from "./recommendation-rule";

const confidenceWeight: Record<
  FindingConfidence,
  number
> = {
  low: 1,
  medium: 2,
  high: 3,
};

export function evaluateRecommendationRule(
  rule: RecommendationRule,
  findings: Finding[],
): Recommendation | null {
  if (rule.status !== "active") {
    return null;
  }

  const matchedFindings =
    rule.requiresFindings.map(
      (
        requiredType,
      ): Finding | undefined =>
        findings.find(
          (finding: Finding) =>
            finding.type ===
            requiredType,
        ),
    );

  if (
    matchedFindings.some(
      (
        finding:
          | Finding
          | undefined,
      ) => finding === undefined,
    )
  ) {
    return null;
  }

  const supportedFindings =
    matchedFindings.filter(
      (
        finding,
      ): finding is Finding =>
        finding !== undefined,
    );

  const strongestConfidence =
    supportedFindings.reduce<FindingConfidence>(
      (
        strongest:
          FindingConfidence,
        finding: Finding,
      ) => {
        return confidenceWeight[
          finding.confidence
        ] >
          confidenceWeight[
            strongest
          ]
          ? finding.confidence
          : strongest;
      },
      "low",
    );

  return {
    id: rule.id,

    type: rule.produces.type,

    status: "candidate",

    confidence:
      confidenceWeight[
        rule.produces.confidence
      ] <
      confidenceWeight[
        strongestConfidence
      ]
        ? rule.produces.confidence
        : strongestConfidence,

    basedOnFindings:
      supportedFindings.map(
        (finding: Finding) =>
          finding.id,
      ),

    evidence: Array.from(
      new Set([
        ...rule.evidence,

        ...supportedFindings.flatMap(
          (finding: Finding) =>
            finding.evidence,
        ),
      ]),
    ),

    rationale: rule.rationale,

    productCriteria:
      rule.produces.productCriteria,
  };
}

export function buildRecommendations(
  rules: RecommendationRule[],
  findings: Finding[],
): Recommendation[] {
  return rules
    .map(
      (
        rule: RecommendationRule,
      ) =>
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