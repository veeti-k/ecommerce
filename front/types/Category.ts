export type Category = {
  id: number;
  name: string;
  parentId: number | null;
};

export type ResolvedCategory = {
  id: number;
  name: string;
  parentId: number | null;
  children: ResolvedCategory[];
};
