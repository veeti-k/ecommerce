import { db } from "database";
import { Endpoint, respondSuccessNoContent } from "shared";

export const approve: Endpoint = async (req, res) => {
  const reviewId = req.params.reviewId;

  await db.ugc.reviews.approve(reviewId);

  respondSuccessNoContent(res);
};
