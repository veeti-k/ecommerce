import { db } from "database";
import { Endpoint, REQ_USER, respondSuccess } from "shared";
import { AuthVerifyUserResponse } from "shared2";

export const create: Endpoint = async (req, res) => {
  const currentUser = req.app.get(REQ_USER) as AuthVerifyUserResponse | null;
  const isEmployee = !!currentUser?.isEmployee;

  const productId = req.params.productId;

  // TODO: check if product exists via catalogue service

  const createdReview = await db.ugc.reviews.create(productId, isEmployee, req.body);

  respondSuccess({
    res,
    statusCode: 201,
    json: { questionId: createdReview._id },
  });
};
