import { Endpoint, respondSuccessNoContent } from "shared";
import { db } from "../../../database";

export const approve: Endpoint = async (req, res) => {
  const questionId = req.params.questionId;

  await db.questions.approve(questionId);

  respondSuccessNoContent(res);
};
