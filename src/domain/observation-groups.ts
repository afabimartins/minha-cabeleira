import type {
  Observation,
  ObservationTrait,
} from "./observation";

export const fiberSurfaceTraits: ObservationTrait[] = [
  "post_wash_roughness",
  "wet_tangling",
  "conditioning_improvement",
];

export const waterBehaviourTraits: ObservationTrait[] = [
  "wetting_speed",
  "drying_speed",
  "water_retention",
];

export const mechanicalTraits: ObservationTrait[] = [
  "elasticity",
  "breakage",
  "manipulation_damage",
];

export const scalpTraits: ObservationTrait[] = [
  "scalp_oiliness",
  "scalp_dryness",
  "scalp_sensitivity",
];

export const historyTraits: ObservationTrait[] = [
  "chemical_processing",
  "heat_exposure",
  "damage_history",
];

export function observationsByTraits(
  observations: Observation[],
  traits: ObservationTrait[],
): Observation[] {
  const traitSet = new Set(traits);

  return observations.filter((observation) =>
    traitSet.has(observation.trait),
  );
}