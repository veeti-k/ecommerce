import { Category } from "./Category";

export type bulletPoint = {
  id: string | null;
  text: string;
};
export const bulletPointDefaultValue = { id: null, text: "" };

export type imageLink = {
  id: string | null;
  link: string;
};
export const imageLinkDefaultValue = { id: null, link: "" };

export type BaseProduct = {
  id: number;
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
};

export type Product = BaseProduct & {
  bulletPoints: string;
  imageUrl: string;
};

export type ProductPageProduct = Product & {
  bulletPoints: bulletPoint[];
  images: imageLink[];
  path: Category[];
};