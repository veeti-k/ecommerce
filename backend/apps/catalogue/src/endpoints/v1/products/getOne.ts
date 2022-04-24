import { Endpoint, respondError, respondSuccess } from "shared";
import { db } from "../../../database";
import { getCategoryPath } from "../../../util/resolveCategories";

export const getOne: Endpoint = async (req, res) => {
  const productId = Number(req.params.productId);

  const product = await db.products.get.byId(productId);
  if (!product)
    return respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  const categories = await db.categories.get.all();
  const path = getCategoryPath(categories, product.deepestCategoryId);

  respondSuccess({
    res,
    statusCode: 200,
    json: {
      ...product,
      path,
    },
  });
};
