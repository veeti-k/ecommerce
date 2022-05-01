import { Endpoint, respondError, respondSuccess, zinc } from "shared";
import { db } from "../../../database";

export const create: Endpoint = async (req, res) => {
  const productId = Number(req.params.productId);

  const product = await zinc.getProductById(productId);
  if (!product)
    respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  const createdQuestion = await db.questions.create(productId, req.body);

  respondSuccess({
    res,
    statusCode: 201,
    json: { questionId: createdQuestion.questionId },
  });
};
