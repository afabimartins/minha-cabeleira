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

  export type ObservationTrait =
  | "post_wash_roughness"
  | "wet_tangling"
  | "conditioning_improvement";

export type Observation = {
  id: string;
  domain: ObservationDomain;
  trait: ObservationTrait;
  value: string | number | boolean;
  region?: HairRegion;
  source: "questionnaire";
};

