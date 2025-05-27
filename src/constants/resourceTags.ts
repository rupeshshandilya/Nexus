export const resourceTags = [
  "Accessibility",
  "AI",
  "Animations",
  "API",
  "Authentication",
  "Backgrounds",
  "Browser Extensions",
  "Cheatsheets",
  "CMS",
  "Color",
  "Components",
  "Data Visualisation",
  "Database",
  "CSS",
] as const;

export type ResourceTag = (typeof resourceTags)[number];
