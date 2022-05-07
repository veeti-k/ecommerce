import { Endpoint, REQ_USER, respondError, respondSuccess, zinc } from "shared";
import { AuthVerifyUserResponse } from "shared2";
import { db } from "../../../database";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse | null;
  const isEmployee = !!currentUser?.isEmployee;

  const productId = Number(req.params.productId);

  const product = await zinc.getProductById(productId);
  if (!product)
    respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  const createdReview = await db.reviews.create(productId, isEmployee, req.body);

  respondSuccess({
    res,
    statusCode: 201,
    json: { questionId: createdReview.reviewId },
  });
};
