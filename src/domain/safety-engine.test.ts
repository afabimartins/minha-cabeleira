import {
  describe,
  expect,
  it,
} from "vitest";

import type {
  Observation,
} from "./observation";

import {
  assessSafety,
} from "./safety-engine";

describe("assessSafety", () => {
  it("returns normal when there are no safety concerns", () => {
    const observations: Observation[] = [
      {
        id: "observation_1",
        domain: "fiber",
        trait: "post_wash_roughness",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
    ];

    const result =
      assessSafety(observations);

    expect(result.level).toBe("normal");

    expect(
      result.canRecommendProducts,
    ).toBe(true);

    expect(result.notices).toEqual([]);
  });

  it("returns caution and blocks products for a high caution trait", () => {
    const observations: Observation[] = [
      {
        id: "observation_1",
        domain: "scalp",
        trait: "scalp_irritation",
        value: "high",
        region: "scalp",
        source: "questionnaire",
      },
    ];

    const result =
      assessSafety(observations);

    expect(result.level).toBe("caution");

    expect(
      result.canRecommendProducts,
    ).toBe(false);

    expect(result.notices).toHaveLength(1);

    expect(
      result.notices[0]?.level,
    ).toBe("caution");

    expect(
      result.notices[0]?.code,
    ).toBe("scalp_irritation");
  });

  it("returns stop and blocks products for a high stop trait", () => {
    const observations: Observation[] = [
      {
        id: "observation_1",
        domain: "scalp",
        trait: "scalp_wound",
        value: "high",
        region: "scalp",
        source: "questionnaire",
      },
    ];

    const result =
      assessSafety(observations);

    expect(result.level).toBe("stop");

    expect(
      result.canRecommendProducts,
    ).toBe(false);

    expect(result.notices).toHaveLength(1);

    expect(
      result.notices[0]?.level,
    ).toBe("stop");

    expect(
      result.notices[0]?.code,
    ).toBe("scalp_wound");
  });

  it("does not trigger safety rules when the value is not high", () => {
    const observations: Observation[] = [
      {
        id: "observation_1",
        domain: "scalp",
        trait: "scalp_irritation",
        value: "medium",
        region: "scalp",
        source: "questionnaire",
      },
      {
        id: "observation_2",
        domain: "scalp",
        trait: "scalp_wound",
        value: "low",
        region: "scalp",
        source: "questionnaire",
      },
    ];

    const result =
      assessSafety(observations);

    expect(result.level).toBe("normal");

    expect(
      result.canRecommendProducts,
    ).toBe(true);

    expect(result.notices).toEqual([]);
  });

  it("gives stop priority when caution and stop signals coexist", () => {
    const observations: Observation[] = [
      {
        id: "observation_1",
        domain: "scalp",
        trait: "scalp_irritation",
        value: "high",
        region: "scalp",
        source: "questionnaire",
      },
      {
        id: "observation_2",
        domain: "scalp",
        trait: "scalp_bleeding",
        value: "high",
        region: "scalp",
        source: "questionnaire",
      },
    ];

    const result =
      assessSafety(observations);

    expect(result.level).toBe("stop");

    expect(
      result.canRecommendProducts,
    ).toBe(false);

    expect(result.notices).toHaveLength(2);

    expect(
      result.notices.some(
        (notice) =>
          notice.level === "caution",
      ),
    ).toBe(true);

    expect(
      result.notices.some(
        (notice) =>
          notice.level === "stop",
      ),
    ).toBe(true);
  });
});