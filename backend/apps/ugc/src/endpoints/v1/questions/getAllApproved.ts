import { Endpoint, respondSuccess } from "shared";
import { db } from "../../../database";

export const getAllApproved: Endpoint = async (req, res) =>
  respondSuccess({
    res,
    statusCode: 200,
    json: await db.questions.get.all(true),
  });
