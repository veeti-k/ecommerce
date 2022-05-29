import { db } from "database";
import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { validationSchemas } from "shared2";

export const update: Endpoint = async (req, res) => {
  const productId = req.params.productId;
  const body = req.body as validationSchemas.IUpdateProductBody;

  const category = await db.catalogue.categories.get.byId(body.categoryId);
  if (!category)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid 'categoryId', category does not exist",
    });

  const updatedProduct = await db.catalogue.products.update(productId, body);
  if (!updatedProduct)
    return respondError({
      res,
      statusCode: 400,
      message: "Product does not exist",
    });

  respondSuccessNoContent(res);
};
