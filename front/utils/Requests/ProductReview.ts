import { AddProductReviewRequestBody } from "../../types/ProductReview";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const AddProductReviewRequest = (productId: number, review: AddProductReviewRequestBody) =>
  request({
    path: apiRoutes.products.product.reviewsRoot(productId),
    method: "POST",
    body: review,
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
