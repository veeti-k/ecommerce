import { db } from "database";
import { Endpoint, respondError, respondSuccessNoContent } from "shared";

export const remove: Endpoint = async (req, res) => {
  const productId = req.params.productId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;

  const result = await db.ugc.questionAnswers.remove(productId, questionId, answerId);

  if (!result)
    return respondError({
      res,
      statusCode: 404,
      message: "Answer not found",
    });

  respondSuccessNoContent(res);
};
