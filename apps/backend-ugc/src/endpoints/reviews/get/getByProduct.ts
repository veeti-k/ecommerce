import { db } from "database";
import { Endpoint, respondSuccess } from "shared";

export const getByProduct: Endpoint = async (req, res) =>
  respondSuccess({
    res,
    statusCode: 200,
    json: await db.ugc.reviews.get.byProductId(req.params.productId),
  });
