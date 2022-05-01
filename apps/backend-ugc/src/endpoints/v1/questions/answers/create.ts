import {
  AuthVerifyUserResponse,
  Endpoint,
  REQ_USER,
  respondError,
  respondSuccess,
  zinc,
} from "shared";
import { db } from "../../../../database";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse | null;
  const byEmployee = !!currentUser?.isEmployee;

  const productId = Number(req.params.productId);
  const questionId = req.params.questionId;

  const product = await zinc.getProductById(productId);
  if (!product)
    return respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  const question = await db.questions.get.oneById(questionId);
  if (!question)
    return respondError({
      res,
      statusCode: 404,
      message: "Question not found",
    });

  const addedAnswer = await db.answers.add(byEmployee, productId, req.body);

  respondSuccess({
    res,
    statusCode: 200,
    json: { answerId: addedAnswer.questionAnswerId },
  });
};
