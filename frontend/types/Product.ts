import { Category } from "./Category";

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

export type ProductPageProduct = Product & {
  path: Category[];
};
