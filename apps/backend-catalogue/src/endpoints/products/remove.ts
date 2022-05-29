import { db } from "database";
import { Endpoint, respondError, respondSuccessNoContent } from "shared";

export const remove: Endpoint = async (req, res) => {
  const productId = req.params.productId;

  const existingProduct = await db.catalogue.products.get.byId(productId);

  if (!existingProduct)
    return respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  await db.catalogue.products.remove(productId);

  respondSuccessNoContent(res);
};
