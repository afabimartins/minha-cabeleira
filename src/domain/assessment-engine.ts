import type { Finding } from "./finding";
import type { Assessment } from "./assessment";

export function assessFindings(
  findings: Finding[],
): Assessment {
  if (findings.length === 0) {
    return {
      status: "unresolved",
      findings: [],
      reason: "There is not enough evidence to support a finding.",
    };
  }

  const findingTypes = new Set(
    findings.map((finding) => finding.type),
  );

  if (findingTypes.size > 1) {
    return {
      status: "conflicting",
      findings,
      reason: "Multiple incompatible findings are supported.",
    };
  }

  return {
    status: "supported",
    findings,
    reason: "The available evidence supports the finding.",
  };
}