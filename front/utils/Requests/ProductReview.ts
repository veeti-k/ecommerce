import {
  AddProductReviewCommentRequestBody,
  AddProductReviewRequestBody,
} from "../../types/ProductReview";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const GetProductReviewsRequest = (productId: number) =>
  request({
    path: apiRoutes.products.product.reviewsRoot(productId),
    method: "GET",
  });

export const AddProductReviewRequest = (productId: number, review: AddProductReviewRequestBody) =>
  request({
    path: apiRoutes.products.product.reviewsRoot(productId),
    method: "POST",
    body: review,
  });

export const AddProductReviewCommentRequest = (
  productId: number,
  reviewId: string,
  comment: AddProductReviewCommentRequestBody
) =>
  request({
    path: apiRoutes.products.product.reviews.review.commentsRoot(productId, reviewId),
    method: "POST",
    body: comment,
  });

export const GetNotApprovedProductReviewsRequest = () =>
  request({
    path: apiRoutes.products.reviewsRoot,
    method: "GET",
  });

export const ApproveProductReviewRequest = (productId: number, reviewId: string) =>
  request({
    path: apiRoutes.products.product.reviews.reviewRoot(productId, reviewId),
    method: "PATCH",
  });

export const DeclineProductReviewRequest = (productId: number, reviewId: string) =>
  request({
    path: apiRoutes.products.product.reviews.reviewRoot(productId, reviewId),
    method: "DELETE",
  });
