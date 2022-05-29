import { db } from "database";
import { Endpoint, respondError, respondSuccessNoContent } from "shared";

export const approve: Endpoint = async (req, res) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;
  const commentId = req.params.commentId;

  const approvedComment = await db.ugc.reviewComments.approve(productId, reviewId, commentId);

  if (!approvedComment)
    return respondError({
      res,
      statusCode: 404,
      message: "Comment not found",
    });

  respondSuccessNoContent(res);
};
