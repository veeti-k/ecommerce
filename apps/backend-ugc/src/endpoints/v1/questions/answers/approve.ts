import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../../database";

export const approve: Endpoint = async (req, res) => {
  const approvedAnswer = await db.answers.approve(req.params.answerId);

  if (!approvedAnswer)
    return respondError({
      res,
      statusCode: 404,
      message: "Answer not found",
    });

  respondSuccessNoContent(res);
};
