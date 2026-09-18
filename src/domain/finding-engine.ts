import type {
  Finding,
  FindingConfidence,
} from "./finding";

const confidenceWeight: Record<
  FindingConfidence,
  number
> = {
  low: 1,
  medium: 2,
  high: 3,
};

export type FindingSummary = {
  type: string;

  confidence: FindingConfidence;

  supportingFindings: string[];

  basedOn: string[];

  evidence: string[];

  explanations: string[];
};

export function consolidateFindings(
  findings: Finding[],
): FindingSummary[] {
  const groups = new Map<string, Finding[]>();

  for (const finding of findings) {
    const existing = groups.get(finding.type) ?? [];

    existing.push(finding);

    groups.set(finding.type, existing);
  }

  return Array.from(groups.entries()).map(
    ([type, groupedFindings]) => {
      const strongestConfidence =
        groupedFindings.reduce<FindingConfidence>(
          (strongest, finding) =>
            confidenceWeight[finding.confidence] >
            confidenceWeight[strongest]
              ? finding.confidence
              : strongest,
          "low",
        );

      return {
        type,

        confidence: strongestConfidence,

        supportingFindings:
          groupedFindings.map(
            (finding) => finding.id,
          ),

        basedOn: Array.from(
          new Set(
            groupedFindings.flatMap(
              (finding) => finding.basedOn,
            ),
          ),
        ),

        evidence: Array.from(
          new Set(
            groupedFindings.flatMap(
              (finding) => finding.evidence,
            ),
          ),
        ),

        explanations: Array.from(
          new Set(
            groupedFindings.map(
              (finding) => finding.explanation,
            ),
          ),
        ),
      };
    },
  );
}