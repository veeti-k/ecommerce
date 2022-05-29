import { DocumentStuff } from "../documentStuff";

export interface IReview {
  productId: string;
  nickname: string;
  title: string;
  content: string;
  stars: number;
  isApproved: boolean;
  byEmployee: boolean;
}

export interface IReviewComment {
  reviewId: string;
  productId: string;
  nickname: string;
  title: string;
  content: string;
  byEmployee: boolean;
  isApproved: boolean;
}

export interface IPopulatedReviewComment extends Omit<IReviewComment, "review"> {
  review: ReviewDocument;
}

export type ReviewDocument = IReview & DocumentStuff;
export type ReviewCommentDocument = IReviewComment & DocumentStuff;
export type PopulatedReviewCommentDocument = IPopulatedReviewComment & DocumentStuff;
