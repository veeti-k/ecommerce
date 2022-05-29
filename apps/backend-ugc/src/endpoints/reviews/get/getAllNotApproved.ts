import { db } from "database";
import { Endpoint, respondSuccess } from "shared";

export const getAllNotApproved: Endpoint = async (req, res) =>
  respondSuccess({
    res,
    statusCode: 200,
    json: await db.ugc.reviews.get.all(true),
  });
