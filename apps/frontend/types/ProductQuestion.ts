import { Product } from "./Product";

export type ProductQuestionAnswer = {
  questionAnswerId: string;
  questionId: string;
  answerersNickname: string;
  content: string;
  createdAt: string;
  byEmployee: boolean;
};

export type ProductQuestion = {
  questionId: string;
  productId: string;
  questionersNickname: string;
  title: string;
  content: string;
  createdAt: string;
  answers: ProductQuestionAnswer[];
};

export type ProductQuestionWithProduct = ProductQuestion & {
  product: Product;
};

export type AddProductQuestionRequestBody = Omit<
  ProductQuestion,
  "questionId" | "reviewId" | "byEmployee" | "createdAt" | "answers" | "productId"
>;
