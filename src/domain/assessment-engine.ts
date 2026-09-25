import type {
  Finding,
} from "./finding";

import type {
  Assessment,
} from "./assessment";

export function assessFindings(
  findings: Finding[],
): Assessment {
  if (findings.length === 0) {
    return {
      status: "unresolved",

      findings: [],

      reason:
        "There is not enough evidence to support a finding.",
    };
  }

  return {
    status: "supported",

    findings,

    reason:
      "The available evidence supports the findings.",
  };
}