import { category } from "@prisma/client";

export interface ResolvedCategory extends category {
  children: ResolvedCategory[] | null;
}

export interface CreateCategoryRequestBody {
  name: string;
  parentId: number | null;
}
