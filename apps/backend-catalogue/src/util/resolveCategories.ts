import { CategoryDocument, IResolvedCategory } from "shared2";

export const resolveCategories = (categories: CategoryDocument[]): IResolvedCategory[] => {
  const resolvedCategories: IResolvedCategory[] = [];

  const temp: IResolvedCategory[] = categories.map((category) => ({
    ...category,
    children: null,
  }));

  for (const category of temp) {
    if (category.parentId === null) {
      resolvedCategories.push(category);
    } else {
      const parent = temp.find((c) => c._id === category.parentId);
      if (!parent) continue;

      parent.children ??= [];
      parent.children.push(category);
    }
  }

  return resolvedCategories;
};

export const resolveCategory = (
  categories: CategoryDocument[],
  category: CategoryDocument
): IResolvedCategory => {
  const categoryIds: string[] = [];

  const current = category;

  categoryIds.push(current._id);

  const resolved: IResolvedCategory = { ...current, children: null };

  const children = categories.filter((c) => c.parentId === current._id);

  if (!children.length) return resolved;

  resolved.children = children.map((c) => resolveCategory(categories, c));

  return resolved;
};

export const getCategoryPath = (
  categories: CategoryDocument[],
  deepestCategoryId: string
): CategoryDocument[] => {
  const result: CategoryDocument[] = [];

  let current = categories.find((c) => c._id == deepestCategoryId);
  if (!current) return [];

  result.unshift(current);

  while (current?.parentId) {
    current = categories.find((c) => c._id == current?.parentId);
    if (!current) continue;

    result.unshift(current);
  }

  return result;
};
