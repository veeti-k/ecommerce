import { db } from "database";
import { Endpoint, respondSuccessNoContent } from "shared";

export const approve: Endpoint = async (req, res) => {
  const questionId = req.params.questionId;

  await db.ugc.questions.approve(questionId);

  respondSuccessNoContent(res);
};
