import { Endpoint, respondSuccessNoContent } from "shared";
import { db } from "../../../database";

export const remove: Endpoint = async (req, res) => {
  const reviewId = req.params.reviewId;

  await db.reviews.remove(reviewId);

  respondSuccessNoContent(res);
};
