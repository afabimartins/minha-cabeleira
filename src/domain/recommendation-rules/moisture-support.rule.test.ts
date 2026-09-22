import {
  describe,
  expect,
  it,
} from "vitest";

import {
  moistureSupportRecommendationRule,
} from "./moisture-support.rule";

describe(
  "moistureSupportRecommendationRule",
  () => {
    it(
      "requires low moisture retention",
      () => {
        expect(
          moistureSupportRecommendationRule
            .requiresFindings,
        ).toContain(
          "low_moisture_retention",
        );
      },
    );

    it(
      "produces moisture support",
      () => {
        expect(
          moistureSupportRecommendationRule
            .produces.type,
        ).toBe(
          "moisture_support",
        );
      },
    );

    it(
      "requires moisture support products",
      () => {
        expect(
          moistureSupportRecommendationRule
            .produces
            .productCriteria
            ?.requiredAttributes,
        ).toContain(
          "moisture_support",
        );
      },
    );
  },
);