import {
  AuthVerifyUserResponse,
  Endpoint,
  REQ_USER,
  respondError,
  respondSuccess,
  zinc,
} from "shared";
import { db } from "../../../../database";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse | null;
  const byEmployee = !!currentUser?.isEmployee;

  const productId = Number(req.params.productId);
  const reviewId = req.params.reviewId;

  const product = await zinc.getProductById(productId);
  if (!product)
    return respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  const review = await db.reviews.get.oneById(reviewId);
  if (!review)
    return respondError({
      res,
      statusCode: 404,
      message: "Review not found",
    });

  const addedComment = await db.comments.add(byEmployee, productId, reviewId, req.body);

  respondSuccess({
    res,
    statusCode: 200,
    json: { commentId: addedComment.reviewCommentId },
  });
};
