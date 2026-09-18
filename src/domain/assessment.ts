import type { Finding } from "./finding";

export type AssessmentStatus =
  | "supported"
  | "unresolved"
  | "conflicting";

export type Assessment = {
  status: AssessmentStatus;
  findings: Finding[];
  reason: string;
};