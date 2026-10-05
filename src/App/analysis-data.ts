import type {
  KnowledgeRule,
} from "../domain/rule";

import type {
  Product,
} from "../domain/product";

import type {
  RecommendationRule,
} from "../domain/recommendation-rule";

import {
  strongConditioningResponseRule,
} from "../domain/rules/conditioning-response.rule";

import {
  damageRiskRule,
} from "../domain/rules/damage-risk.rule";

import {
  moistureRetentionRule,
} from "../domain/rules/moisture-retention.rule";

import {
  chemicalExposureRule,
} from "../domain/rules/chemical-exposure.rule";

import {
  heatExposureRule,
} from "../domain/rules/heat-exposure.rule";

import {
  scalpOilinessRules,
} from "../domain/rules/scalp-oiliness.rule";

import {
  scalpDrynessRules,
} from "../domain/rules/scalp-dryness.rule";

import {
  conditioningSupportRecommendationRule,
} from "../domain/recommendation-rules/conditioning-support.rule";

import {
  damageProtectionRecommendationRule,
} from "../domain/recommendation-rules/damage-protection.rule";

import {
  moistureSupportRecommendationRule,
} from "../domain/recommendation-rules/moisture-support.rule";

import {
  heatProtectionRecommendationRule,
} from "../domain/recommendation-rules/heat-protection.rule";

import {
  chemicalProcessCareRecommendationRule,
} from "../domain/recommendation-rules/chemical-process-care.rule";

import {
  scalpOilinessSupportRecommendationRule,
} from "../domain/recommendation-rules/scalp-oiliness-support.rule";

import {
  scalpDrynessSupportRecommendationRule,
} from "../domain/recommendation-rules/scalp-dryness-support.rule";

export const analysisRules: KnowledgeRule[] = [
  {
    ...strongConditioningResponseRule,
    status: "active",
  },
  {
    ...damageRiskRule,
    status: "active",
  },
  {
    ...moistureRetentionRule,
    status: "active",
  },
  {
    ...chemicalExposureRule,
    status: "active",
  },
  {
    ...heatExposureRule,
    status: "active",
  },
  ...scalpOilinessRules,
  ...scalpDrynessRules,
];

// Mantido por compatibilidade com imports antigos. A produção usa product-store.
export const analysisProducts: Product[] = [];

export const analysisRecommendationRules:
  RecommendationRule[] = [
    conditioningSupportRecommendationRule,
    damageProtectionRecommendationRule,
    moistureSupportRecommendationRule,
    heatProtectionRecommendationRule,
    chemicalProcessCareRecommendationRule,
    scalpOilinessSupportRecommendationRule,
    scalpDrynessSupportRecommendationRule,
  ];
