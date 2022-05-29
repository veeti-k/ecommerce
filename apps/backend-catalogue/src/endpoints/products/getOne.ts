import { db } from "database";
import { Endpoint, respondError, respondSuccess } from "shared";
import { getCategoryPath } from "../../util/resolveCategories";

export const getOne: Endpoint = async (req, res) => {
  const productId = req.params.productId;

  const product = await db.catalogue.products.get.byId(productId);
  if (!product)
    return respondError({
      res,
      statusCode: 404,
      message: "Product not found",
    });

  const categories = await db.catalogue.categories.get.all();
  const path = getCategoryPath(categories, product.categoryId);

  respondSuccess({
    res,
    statusCode: 200,
    json: {
      ...product,
      path,
    },
  });
};
