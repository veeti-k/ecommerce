import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "database";

export const approve: Endpoint = async (req, res) => {
  const productId = req.params.productId;
  const questionId = req.params.questionId;
  const answerId = req.params.answerId;

  const approvedAnswer = await db.ugc.questionAnswers.approve(productId, questionId, answerId);

  if (!approvedAnswer)
    return respondError({
      res,
      statusCode: 404,
      message: "Answer not found",
    });

  respondSuccessNoContent(res);
};
