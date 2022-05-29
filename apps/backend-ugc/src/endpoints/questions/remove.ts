import { db } from "database";
import { Endpoint, respondSuccessNoContent } from "shared";

export const remove: Endpoint = async (req, res) => {
  const productId = req.params.productId;
  const questionId = req.params.questionId;

  await db.ugc.questions.remove(productId, questionId);

  respondSuccessNoContent(res);
};
