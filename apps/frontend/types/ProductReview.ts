import { Product } from "./Product";

export type ProductReview = {
  reviewId: string;
  productId: string;
  reviewersNickname: string;
  byEmployee: boolean;
  title: string;
  content: string;
  stars: number;
  createdAt: string;
};

export type ProductReviewWithProduct = ProductReview & {
  product: Product;
};

export type AddProductReviewRequestBody = Omit<
  ProductReview,
  "reviewId" | "productId" | "byEmployee" | "createdAt"
>;

export type ProductReviewComment = {
  reviewCommentId: string;
  reviewId: string;
  commentersNickname: string;
  byEmployee: string;
  title: string;
  content: string;
  createdAt: string;
};

export type AddProductReviewCommentRequestBody = Omit<
  ProductReviewComment,
  "reviewCommentId" | "reviewId" | "byEmployee" | "createdAt"
>;
