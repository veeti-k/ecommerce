import { Endpoint, respondError, respondSuccess, zinc } from "shared";
import { db } from "../../../database";
import { createProductRequestBodyValidator } from "../../../validators/v1/products/create";

export const create: Endpoint = async (req, res) => {
  const validationResult = createProductRequestBodyValidator(req.body);
  if (validationResult.error)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid request body",
      errors: validationResult.error?.details,
    });

  const validatedBody = validationResult.value;

  const category = await db.categories.get.byId(validatedBody.deepestCategoryId);
  if (!category)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid 'deepestCategoryId', category does not exist",
    });

  const createdProduct = await db.products.create(validatedBody);

  await zinc.addProduct(createdProduct);

  respondSuccess({
    res,
    statusCode: 201,
    json: { productId: createdProduct.productId },
  });
};
