export type Product = {
  productId: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  discountAmount: number;
  isDiscounted: boolean;
  isDeleted: boolean;
  averageStars: number;
  reviewCount: number;
  questionCount: number;
  deepestCategoryId: number;
  bulletPoints: string;
  imageLinks: string;
};

export interface ZincProduct {
  _id: string;
  _source: Product;
}

export interface CreateProductRequestBody
  extends Omit<
    Product,
    | "productId"
    | "averageStars"
    | "reviewCount"
    | "questionCount"
    | "isDeleted"
    | "imageLinks"
    | "bulletPoints"
  > {
  imageLinks: string[];
  bulletPoints: string[];
}

export interface UpdateProductRequestBody extends CreateProductRequestBody {}
