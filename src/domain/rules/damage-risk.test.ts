import {
  describe,
  expect,
  it,
} from "vitest";

import {
  evaluateRule,
} from "../rule-engine";

import type {
  Observation,
} from "../observation";

import {
  damageRiskRule,
} from "./damage-risk.rule";

describe("damageRiskRule", () => {
  it("matches when breakage is high and damage history is severe", () => {
    const observations: Observation[] = [
      {
        id: "breakage",
        domain: "fiber",
        trait: "breakage",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },

      {
        id: "damage_history",
        domain: "history",
        trait: "damage_history",
        value: "severe",
        region: "all",
        source: "questionnaire",
      },
    ];

    const result = evaluateRule(
      damageRiskRule,
      observations,
    );

    expect(result).not.toBeNull();

    expect(result?.type).toBe(
      "elevated_damage_risk",
    );

    expect(result?.confidence).toBe(
      "high",
    );
  });

  it("does not match from breakage alone", () => {
    const observations: Observation[] = [
      {
        id: "breakage",
        domain: "fiber",
        trait: "breakage",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },
    ];

    const result = evaluateRule(
      damageRiskRule,
      observations,
    );

    expect(result).toBeNull();
  });

  it("does not match from severe damage history alone", () => {
    const observations: Observation[] = [
      {
        id: "damage_history",
        domain: "history",
        trait: "damage_history",
        value: "severe",
        region: "all",
        source: "questionnaire",
      },
    ];

    const result = evaluateRule(
      damageRiskRule,
      observations,
    );

    expect(result).toBeNull();
  });

  it("does not match when damage history is only moderate", () => {
    const observations: Observation[] = [
      {
        id: "breakage",
        domain: "fiber",
        trait: "breakage",
        value: "high",
        region: "mid_length",
        source: "questionnaire",
      },

      {
        id: "damage_history",
        domain: "history",
        trait: "damage_history",
        value: "moderate",
        region: "all",
        source: "questionnaire",
      },
    ];

    const result = evaluateRule(
      damageRiskRule,
      observations,
    );

    expect(result).toBeNull();
  });

  it("does not match when breakage is unknown", () => {
    const observations: Observation[] = [
      {
        id: "breakage",
        domain: "fiber",
        trait: "breakage",
        value: "unknown",
        region: "mid_length",
        source: "questionnaire",
      },

      {
        id: "damage_history",
        domain: "history",
        trait: "damage_history",
        value: "severe",
        region: "all",
        source: "questionnaire",
      },
    ];

    const result = evaluateRule(
      damageRiskRule,
      observations,
    );

    expect(result).toBeNull();
  });
});