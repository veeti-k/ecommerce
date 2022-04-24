import { createCategoryRequestBodyValidator } from "../../../validators/v1/categories/addCategory";
import { db } from "../../../database";
import { Endpoint, respondError, respondSuccess } from "shared";

export const create: Endpoint = async (req, res) => {
  const validationResult = createCategoryRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid request body",
      errors: validationResult.errors,
    });

  const { parentId } = validationResult.validated;

  if (parentId) {
    const parentCategory = await db.categories.get.byId(parentId);

    if (!parentCategory)
      return respondError({
        res,
        statusCode: 400,
        message: "Parent category does not exist",
      });
  }

  const createdCategory = await db.categories.create(validationResult.validated);

  return respondSuccess({
    res,
    statusCode: 201,
    json: { categoryId: createdCategory.categoryId },
  });
};
