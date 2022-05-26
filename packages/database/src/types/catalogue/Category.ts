import { DocumentStuff } from "..";

export interface ICategory {
  name: string;
  parentId: string;
}

export type CategoryDocument = ICategory & DocumentStuff;
