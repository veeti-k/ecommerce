import { Endpoint, respondError, respondSuccessNoContent, zinc } from "shared";
import { db } from "../../../database";

export const update: Endpoint = async (req, res) => {
  const productId = Number(req.params.productId);
  const body = req.body;

  const category = await db.categories.get.byId(body.deepestCategoryId);
  if (!category)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid 'deepestCategoryId', category does not exist",
    });

  const product = await db.products.get.byId(productId);
  if (!product)
    return respondError({
      res,
      statusCode: 400,
      message: "Product does not exist",
    });

  const updatedProduct = await db.products.update(productId, body);

  await zinc.updateProduct(updatedProduct);

  respondSuccessNoContent(res);
};
