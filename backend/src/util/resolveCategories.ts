import { Category, ResolvedCategory } from "../types/Category";

export const resolveCategories = (categories: Category[]): ResolvedCategory[] => {
  const resolvedCategories: ResolvedCategory[] = [];

  const temp: ResolvedCategory[] = categories.map((category) => ({
    ...category,
    children: null,
  }));

  for (const category of temp) {
    if (category.parentId === null) {
      resolvedCategories.push(category);
    } else {
      const parent = temp.find((c) => c.categoryId === category.parentId);
      if (!parent) continue;

      parent.children ??= [];
      parent.children.push(category);
    }
  }

  return resolvedCategories;
};

export const getCategoryPath = (categories: Category[], deepestCategoryId: number): Category[] => {
  const result: Category[] = [];

  let current = categories.find((c) => c.categoryId == deepestCategoryId);
  if (!current) return [];

  result.unshift(current);

  while (current?.parentId) {
    current = categories.find((c) => c.categoryId == current?.parentId);
    if (!current) continue;

    result.unshift(current);
  }

  return result;
};
