import { db } from "database";
import { Endpoint, respondError, respondSuccessNoContent } from "shared";

export const remove: Endpoint = async (req, res) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  const commentId = req.params.commentId;

  const result = await db.ugc.reviewComments.remove(productId, reviewId, commentId);

  if (!result)
    return respondError({
      res,
      statusCode: 404,
      message: "Comment not found",
    });

  respondSuccessNoContent(res);
};
