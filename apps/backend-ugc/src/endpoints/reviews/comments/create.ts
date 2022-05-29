import { db } from "database";
import { Endpoint, REQ_USER, respondError, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse | null;
  const byEmployee = !!currentUser?.isEmployee;

  const productId = req.params.productId;
  const reviewId = req.params.reviewId;

  // TODO: check if product exists via catalogue service

  const review = await db.ugc.reviews.get.oneById(reviewId);
  if (!review)
    return respondError({
      res,
      statusCode: 404,
      message: "Review not found",
    });

  const addedComment = await db.ugc.reviewComments.create(
    productId,
    reviewId,
    byEmployee,
    req.body
  );

  respondSuccess({
    res,
    statusCode: 200,
    json: { commentId: addedComment._id },
  });
};
