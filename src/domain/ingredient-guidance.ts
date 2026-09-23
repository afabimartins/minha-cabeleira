export type IngredientExample = {
  name: string;

  inciName?: string;
};

export type IngredientGuidanceItem = {
  id: string;

  name: string;

  purpose: string;

  examples: IngredientExample[];
};

export type IngredientGuidance = {
  summary: string;

  lookFor: IngredientGuidanceItem[];

  avoid: IngredientGuidanceItem[];
};