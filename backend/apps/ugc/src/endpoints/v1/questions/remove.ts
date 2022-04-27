import { Endpoint, respondSuccessNoContent } from "shared";
import { db } from "../../../database";

export const remove: Endpoint = async (req, res) => {
  const questionId = req.params.questionId;

  await db.questions.remove(questionId);

  respondSuccessNoContent(res);
};
