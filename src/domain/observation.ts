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
  // Fiber surface / conditioning
  | "post_wash_roughness"
  | "wet_tangling"
  | "conditioning_improvement"

  // Water behaviour
  | "wetting_speed"
  | "drying_speed"
  | "water_retention"

  // Mechanical behaviour
  | "elasticity"
  | "breakage"
  | "manipulation_damage"

  // Scalp
  | "scalp_oiliness"
  | "scalp_dryness"
  | "scalp_sensitivity"

  // History
  | "chemical_processing"
  | "heat_exposure"
  | "damage_history";

export type ObservationValue =
  | "low"
  | "medium"
  | "high"
  | "slow"
  | "normal"
  | "fast"
  | "none"
  | "mild"
  | "moderate"
  | "severe"
  | "yes"
  | "no"
  | number
  | boolean;

export type Observation = {
  id: string;
  domain: ObservationDomain;
  trait: ObservationTrait;
  value: ObservationValue;
  region: HairRegion;
  source: "questionnaire";
};