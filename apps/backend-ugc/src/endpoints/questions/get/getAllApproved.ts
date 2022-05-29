import { db } from "database";
import { Endpoint, respondSuccess } from "shared";

export const getAllApproved: Endpoint = async (req, res) =>
  respondSuccess({
    res,
    statusCode: 200,
    json: await db.ugc.questions.get.all(true),
  });
