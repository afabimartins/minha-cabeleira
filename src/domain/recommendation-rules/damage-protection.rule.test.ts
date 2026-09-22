import {
  describe,
  expect,
  it,
} from "vitest";

import {
  damageProtectionRecommendationRule,
} from "./damage-protection.rule";

describe(
  "damageProtectionRecommendationRule",
  () => {
    it(
      "requires elevated damage risk",
      () => {
        expect(
          damageProtectionRecommendationRule
            .requiresFindings,
        ).toContain(
          "elevated_damage_risk",
        );
      },
    );

    it(
      "produces damage protection",
      () => {
        expect(
          damageProtectionRecommendationRule
            .produces.type,
        ).toBe(
          "damage_protection",
        );
      },
    );

    it(
      "defines product criteria",
      () => {
        expect(
          damageProtectionRecommendationRule
            .produces
            .productCriteria,
        ).toBeDefined();
      },
    );
  },
);