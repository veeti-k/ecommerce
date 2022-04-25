import { Endpoint, respondError, respondSuccessNoContent, zinc } from "shared";
import { db } from "../../../database";
import { updateProductRequestBodyValidator } from "../../../validators/v1/products/update";

export const update: Endpoint = async (req, res) => {
  const validationResult = updateProductRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid request body",
      errors: validationResult.errors,
    });

  const productId = Number(req.params.productId);
  const validatedBody = validationResult.validated;

  const category = await db.categories.get.byId(validatedBody.deepestCategoryId);
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

  await db.products.update(productId, validatedBody);

  await zinc.updateProduct(product);

  respondSuccessNoContent(res);
};
