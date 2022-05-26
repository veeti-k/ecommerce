import { DocumentStuff } from "..";

export interface IReview {
  productId: string;
  nickname: string;
  title: string;
  content: string;
  stars: number;
  isDeleted: boolean;
  isApproved: boolean;
  byEmployee: boolean;
}

export interface IReviewComment {
  reviewId: string;
  nickname: string;
  title: string;
  content: string;
  byEmployee: boolean;
  isDeleted: boolean;
  isApproved: boolean;
}

export type ReviewDocument = IReview & DocumentStuff;
export type ReviewCommentDocument = IReviewComment & DocumentStuff;
