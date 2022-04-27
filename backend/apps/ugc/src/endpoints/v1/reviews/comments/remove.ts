import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../../database";

export const remove: Endpoint = async (req, res) => {
  const commentId = req.params.commentId;

  const result = await db.answers.remove(commentId);

  if (!result)
    return respondError({
      res,
      statusCode: 404,
      message: "Comment not found",
    });

  respondSuccessNoContent(res);
};
