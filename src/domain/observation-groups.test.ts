import { describe, expect, it } from "vitest";

import type { Observation } from "./observation";

import {
  observationsByTraits,
  waterBehaviourTraits,
  scalpTraits,
} from "./observation-groups";

describe("observation groups", () => {
  const observations: Observation[] = [
    {
      id: "obs_001",
      domain: "fiber",
      trait: "wetting_speed",
      value: "slow",
      region: "mid_length",
      source: "questionnaire",
    },
    {
      id: "obs_002",
      domain: "fiber",
      trait: "drying_speed",
      value: "fast",
      region: "mid_length",
      source: "questionnaire",
    },
    {
      id: "obs_003",
      domain: "scalp",
      trait: "scalp_oiliness",
      value: "high",
      region: "scalp",
      source: "questionnaire",
    },
  ];

  it("selects water behaviour observations", () => {
    const result = observationsByTraits(
      observations,
      waterBehaviourTraits,
    );

    expect(result.map((item) => item.id)).toEqual([
      "obs_001",
      "obs_002",
    ]);
  });

  it("selects scalp observations", () => {
    const result = observationsByTraits(
      observations,
      scalpTraits,
    );

    expect(result.map((item) => item.id)).toEqual([
      "obs_003",
    ]);
  });
});