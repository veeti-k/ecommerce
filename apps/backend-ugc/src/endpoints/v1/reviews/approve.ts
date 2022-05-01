import { Endpoint, respondSuccessNoContent } from "shared";
import { db } from "../../../database";

export const approve: Endpoint = async (req, res) => {
  const reviewId = req.params.reviewId;

  await db.reviews.approve(reviewId);

  respondSuccessNoContent(res);
};
