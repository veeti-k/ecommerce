import { db } from "database";
import { Endpoint, respondError, respondSuccess } from "shared";

export const create: Endpoint = async (req, res) => {
  const body = req.body;

  const category = await db.catalogue.categories.get.byId(body.deepestCategoryId);
  if (!category)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid 'deepestCategoryId', category does not exist",
    });

  const createdProduct = await db.catalogue.products.create(body);

  respondSuccess({
    res,
    statusCode: 201,
    json: { productId: createdProduct._id },
  });
};
