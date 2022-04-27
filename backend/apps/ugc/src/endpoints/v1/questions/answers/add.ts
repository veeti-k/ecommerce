import { AuthVerifyUserResponse, Endpoint, REQ_USER, respondSuccess } from "shared";
import { db } from "../../../../database";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse | null;
  const byEmployee = !!currentUser?.isEmployee;

  const productId = Number(req.params.productId);

  const addedAnswer = await db.answers.add(byEmployee, productId, req.body);

  respondSuccess({
    res,
    statusCode: 200,
    json: { answerId: addedAnswer.questionAnswerId },
  });
};
