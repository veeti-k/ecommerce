import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../../database";

export const approve: Endpoint = async (req, res) => {
  const approvedComment = await db.answers.approve(req.params.commentId);

  if (!approvedComment)
    return respondError({
      res,
      statusCode: 404,
      message: "Comment not found",
    });

  respondSuccessNoContent(res);
};
