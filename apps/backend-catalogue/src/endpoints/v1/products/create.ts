import { Endpoint, respondError, respondSuccess, zinc } from "shared";
import { db } from "../../../database";

export const create: Endpoint = async (req, res) => {
  const body = req.body;

  const category = await db.categories.get.byId(body.deepestCategoryId);
  if (!category)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid 'deepestCategoryId', category does not exist",
    });

  const createdProduct = await db.products.create(body);

  await zinc.addProduct(createdProduct);

  respondSuccess({
    res,
    statusCode: 201,
    json: { productId: createdProduct.productId },
  });
};
