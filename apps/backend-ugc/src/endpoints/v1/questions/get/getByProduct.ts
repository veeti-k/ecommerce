import { Endpoint, respondSuccess } from "shared";
import { db } from "../../../../database";

export const getByProduct: Endpoint = async (req, res) =>
  respondSuccess({
    res,
    statusCode: 200,
    json: await db.questions.get.byProductId(Number(req.params.productId)),
  });
