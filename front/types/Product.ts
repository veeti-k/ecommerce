import { Category } from "./Category";

export type ProductReview = {
  id: string;
  productId: number;
  reviewersNickname: string;
  byEmployee: boolean;
  title: string;
  content: string;
  stars: number;
  createdAt: string;
};

export type ProductReviewComment = {
  id: string;
  reviewId: string;
  commentersNickname: string;
  byEmployee: string;
  title: string;
  content: string;
  createdAt: string;
};

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

export type ShowCaseProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  discountAmount: number;
  isDiscounted: boolean;
  isDeleted: boolean;
  averageStars: number;
  reviewCount: number;
  questionCount: number;
  bulletPoints: bulletPoint[];
  images: imageLink[];
};

export type ProductPageProduct = {
  path: Category[];
  id: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  discountPercent: number;
  discountAmount: number;
  isDiscounted: boolean;
  isDeleted: boolean;
  averageStars: number;
  reviewCount: number;
  questionCount: number;
  bulletPoints: bulletPoint[];
  images: imageLink[];
};
