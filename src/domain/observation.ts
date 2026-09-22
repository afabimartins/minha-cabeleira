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
  | "scalp_irritation"
  | "scalp_burning"
  | "scalp_wound"
  | "scalp_bleeding"
  | "severe_scalp_pain"
  | "sudden_hair_loss"

  // History
  | "chemical_processing"
  | "heat_exposure"
  | "damage_history"

  // Routine
  | "wash_frequency"
  | "conditioning_frequency"
  | "styling_frequency"

  // Goal
  | "primary_goal"

  // Preference
  | "routine_complexity"
  | "budget_priority";

export type ObservationValue =
  // Intensity
  | "low"
  | "medium"
  | "high"

  // Speed
  | "slow"
  | "normal"
  | "fast"

  // Severity / presence
  | "none"
  | "mild"
  | "moderate"
  | "severe"
  | "yes"
  | "no"
  | "unknown"

  // Frequency
  | "rarely"
  | "sometimes"
  | "frequently"
  | "daily"

  // Goals
  | "reduce_breakage"
  | "improve_softness"
  | "control_frizz"
  | "improve_definition"
  | "retain_length"
  | "simplify_routine"

  // Routine preference
  | "minimal"
  | "balanced"
  | "complete"

  // Budget preference
  | "lowest_price"
  | "cost_benefit"
  | "flexible"

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