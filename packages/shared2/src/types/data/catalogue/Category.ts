import { DocumentStuff } from "../documentStuff";

export interface ICategory {
  name: string;
  parentId: string;
}

export interface IResolvedCategory extends CategoryDocument {
  children: IResolvedCategory[] | null;
}

export type CategoryDocument = ICategory & DocumentStuff;
