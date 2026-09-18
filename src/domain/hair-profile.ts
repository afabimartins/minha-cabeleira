import type { FindingConfidence } from "./finding";
import type { FindingSummary } from "./finding-engine";

export type ProfileAssessmentStatus =
  | "supported"
  | "uncertain"
  | "conflicted"
  | "unknown";

export type ProfileAssessment = {
  type: string;
  status: ProfileAssessmentStatus;
  confidence: FindingConfidence | null;
  basedOn: string[];
  evidence: string[];
  explanations: string[];
};

export type HairProfile = {
  assessments: ProfileAssessment[];
  unresolved: string[];
};

export function buildHairProfile(
  findings: FindingSummary[],
): HairProfile {
  if (findings.length === 0) {
    return {
      assessments: [],
      unresolved: [
        "No supported findings are currently available.",
      ],
    };
  }

  const assessments: ProfileAssessment[] =
    findings.map((finding) => ({
      type: finding.type,
      status: "supported",
      confidence: finding.confidence,
      basedOn: finding.basedOn,
      evidence: finding.evidence,
      explanations: finding.explanations,
    }));

  return {
    assessments,
    unresolved: [],
  };
}