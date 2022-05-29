import { db } from "database";
import { Endpoint, respondSuccessNoContent } from "shared";

export const remove: Endpoint = async (req, res) => {
  const productId = req.params.productId;
  const reviewId = req.params.reviewId;

  await db.ugc.reviews.remove(productId, reviewId);

  respondSuccessNoContent(res);
};
