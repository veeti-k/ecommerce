import { db } from "database";
import { Endpoint, REQ_USER, respondError, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse | null;
  const byEmployee = !!currentUser?.isEmployee;

  const productId = req.params.productId;
  const questionId = req.params.questionId;

  // TODO: check if product exists via catalogue service

  const question = await db.ugc.questions.get.oneById(productId, questionId);
  if (!question)
    return respondError({
      res,
      statusCode: 404,
      message: "Question not found",
    });

  const addedAnswer = await db.ugc.questionAnswers.create(
    productId,
    questionId,
    byEmployee,
    req.body
  );

  respondSuccess({
    res,
    statusCode: 200,
    json: { answerId: addedAnswer._id },
  });
};
