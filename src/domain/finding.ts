export type FindingConfidence =
  | "low"
  | "medium"
  | "high";

export type Finding = {
  id: string;
  type: string;
  confidence: FindingConfidence;

  basedOn: string[];

  evidence: string[];

  explanation: string;
};