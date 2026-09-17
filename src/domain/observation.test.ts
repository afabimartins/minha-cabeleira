import { describe, expect, it } from "vitest";
import type { Observation } from "./observation";

describe("Observation", () => {
  it("represents a questionnaire observation", () => {
    const observation: Observation = {
      id: "obs_001",
      domain: "fiber",
      trait: "post_wash_roughness",
      value: "high",
      region: "mid_length",
      source: "questionnaire",
    };

    expect(observation.domain).toBe("fiber");
    expect(observation.trait).toBe("post_wash_roughness");
    expect(observation.value).toBe("high");
    expect(observation.region).toBe("mid_length");
    expect(observation.source).toBe("questionnaire");
  });
});