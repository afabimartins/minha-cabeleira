export type FindingConfidence =
  | "low"
  | "moderate"
  | "high";

export type FindingType =
  | "strong_conditioning_response";

export type Finding = {
  id: string;
  type: FindingType;
  confidence: FindingConfidence;
  basedOn: string[];
  evidence: string[];
  explanation: string;
};