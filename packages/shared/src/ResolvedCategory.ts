export type ResolvedCategory = {
  id: number;
  name: string;
  parentId?: number;
  children: ResolvedCategory[];
};
