export type ObservationDomain =
  | "fiber"
  | "scalp"
  | "history"
  | "product_response"
  | "routine"
  | "goal"
  | "preference";

export type HairRegion =
  | "scalp"
  | "root"
  | "mid_length"
  | "ends"
  | "all";

export type Observation = {
  id: string;
  domain: ObservationDomain;
  trait: string;
  value: string | number | boolean;
  region?: HairRegion;
  source: "questionnaire";
};

