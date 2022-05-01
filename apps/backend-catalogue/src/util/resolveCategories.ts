import { Category, ResolvedCategory } from "shared";

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

export const resolveCategory = (categories: Category[], category: Category): ResolvedCategory => {
  const categoryIds: number[] = [];

  const current = category;

  categoryIds.push(current.categoryId);

  const resolved: ResolvedCategory = { ...current, children: null };

  const children = categories.filter((c) => c.parentId === current.categoryId);

  if (!children.length) return resolved;

  resolved.children = children.map((c) => resolveCategory(categories, c));

  return resolved;
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
