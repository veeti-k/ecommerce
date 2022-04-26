import { Endpoint, respondSuccess } from "shared";
import { db } from "../../../../database";

export const getAllNotApproved: Endpoint = async (req, res) =>
  respondSuccess({
    res,
    statusCode: 200,
    json: await db.questions.get.all(false),
  });
