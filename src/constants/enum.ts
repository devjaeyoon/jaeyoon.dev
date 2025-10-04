export const CATEGORY_TYPE = {
  ALL: 'All',
} as const;

export type CategoryType = (typeof CATEGORY_TYPE)[keyof typeof CATEGORY_TYPE];
