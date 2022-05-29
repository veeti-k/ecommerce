import { db } from "database";
import { Endpoint, respondSuccess } from "shared";

export const create: Endpoint = async (req, res) => {
  const productId = req.params.productId;

  // TODO: check if product exists via catalogue service

  const createdQuestion = await db.ugc.questions.create(productId, req.body);

  respondSuccess({
    res,
    statusCode: 201,
    json: { questionId: createdQuestion._id },
  });
};
