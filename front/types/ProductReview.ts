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

export type AddProductReviewRequestBody = Omit<
  ProductReview,
  "id" | "productId" | "byEmployee" | "createdAt"
>;

export type ProductReviewComment = {
  id: string;
  reviewId: string;
  commentersNickname: string;
  byEmployee: string;
  title: string;
  content: string;
  createdAt: string;
};

export type AddProductReviewCommentRequestBody = Omit<
  ProductReviewComment,
  "id" | "reviewId" | "byEmployee" | "createdAt"
>;
