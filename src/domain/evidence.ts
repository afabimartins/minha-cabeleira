export type EvidenceType =
  | "systematic_review"
  | "clinical_review"
  | "experimental_study"
  | "observational_study"
  | "regulatory_guidance"
  | "expert_consensus"
  | "other";

export type EvidenceQuality =
  | "low"
  | "moderate"
  | "high"
  | "not_assessed";

export type EvidenceStatus =
  | "draft"
  | "reviewed"
  | "active"
  | "retired";

export type Evidence = {
  id: string;
  title: string;
  citation: string;
  url?: string;
  type: EvidenceType;
  quality: EvidenceQuality;
  status: EvidenceStatus;
  supports: string[];
  limitations: string[];
  notes?: string;
};