import {
  AddProductReviewCommentRequestBody,
  AddProductReviewRequestBody,
} from "../../types/ProductReview";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const GetProductReviewsRequest = (productId: string) =>
  request({
    path: apiRoutes.products.product.reviewsRoot(productId),
    method: "GET",
  });

export const AddProductReviewRequest = (productId: string, review: AddProductReviewRequestBody) =>
  request({
    path: apiRoutes.products.product.reviewsRoot(productId),
    method: "POST",
    body: review,
  });

export const AddProductReviewCommentRequest = (
  productId: string,
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
    path: apiRoutes.products.notApprovedReviewsRoot,
    method: "GET",
  });

export const ApproveProductReviewRequest = (productId: string, reviewId: string) =>
  request({
    path: apiRoutes.products.product.reviews.reviewRoot(productId, reviewId),
    method: "PATCH",
  });

export const DeclineProductReviewRequest = (productId: string, reviewId: string) =>
  request({
    path: apiRoutes.products.product.reviews.reviewRoot(productId, reviewId),
    method: "DELETE",
  });
