import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../database";

export const remove: Endpoint = async (req, res) => {
  const existingProduct = await db.products.get.byId(Number(req.params.productId));

  if (!existingProduct)
    return respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  await db.products.remove(Number(req.params.productId));

  respondSuccessNoContent(res);
};
