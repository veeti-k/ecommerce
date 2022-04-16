import { AddProductReviewRequestBody } from "../../types/ProductReview";
import { request } from "../requests";
import { apiRoutes } from "../routes";

export const AddProductReviewRequest = (productId: number, review: AddProductReviewRequestBody) =>
  request({
    path: apiRoutes.products.product.reviewsRoot(productId),
    method: "POST",
    body: review,
  });
