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
  conditioningSupportRecommendationRule,
} from "../domain/recommendation-rules/conditioning-support.rule";

import {
  damageProtectionRecommendationRule,
} from "../domain/recommendation-rules/damage-protection.rule";

import {
  moistureSupportRecommendationRule,
} from "../domain/recommendation-rules/moisture-support.rule";

import {
  productCatalog,
} from "./product-catalog";

export const analysisRules:
  KnowledgeRule[] = [
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
  ];

export const analysisProducts:
  Product[] = productCatalog;

export const analysisRecommendationRules:
  RecommendationRule[] = [
    conditioningSupportRecommendationRule,
    damageProtectionRecommendationRule,
    moistureSupportRecommendationRule,
  ];