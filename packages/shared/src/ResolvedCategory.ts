export type ResolvedCategory = {
  id: string;
  name: string;
  parentId?: string | null;
  children?: ResolvedCategory[];
};
