export interface Category {
  categoryId: number;
  name: string;
  parentId: number | null;
}

export interface ResolvedCategory extends Category {
  children: ResolvedCategory[] | null;
}
