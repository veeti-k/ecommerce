export interface Category {
  categoryId: number;
  name: string;
  parentId: number | null;
}

export interface ResolvedCategory extends Category {
  children: ResolvedCategory[] | null;
}

export interface AddCategoryRequestBody {
  name: string;
  parentId: number | null;
}
