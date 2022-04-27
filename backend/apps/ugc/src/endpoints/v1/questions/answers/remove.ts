import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../../database";

export const remove: Endpoint = async (req, res) => {
  const answerId = req.params.answerId;

  const result = await db.answers.remove(answerId);

  if (!result)
    return respondError({
      res,
      statusCode: 404,
      message: "Answer not found",
    });

  respondSuccessNoContent(res);
};
