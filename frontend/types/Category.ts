export type Category = {
  categoryId: number;
  name: string;
  parentId: number | null;
};

export type ResolvedCategory = {
  categoryId: number;
  name: string;
  parentId: number | null;
  children: ResolvedCategory[];
};
