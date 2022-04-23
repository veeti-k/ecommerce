import { db } from "../../../database";
import { Endpoint } from "../../../types/ApiThings";
import { respondError, respondSuccessNoContent } from "../../../util/respondWith";
import { updateCategoryRequestBodyValidator } from "../../../validators/v1/categories/update";

export const update: Endpoint = async (req, res) => {
  const validationResult = updateCategoryRequestBodyValidator(req.body);
  if (!validationResult.isValid)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid request body",
      errors: validationResult.errors,
    });

  const categoryId = Number(req.params.categoryId);

  const existingCategory = await db.category.get.byId(categoryId);
  if (!existingCategory)
    return respondError({
      res,
      statusCode: 404,
      message: "Category was not found",
    });

  const validated = validationResult.validated;

  if (validated.parentId) {
    const existingParent = await db.category.get.byId(validated.parentId);

    if (!existingParent)
      return respondError({
        res,
        statusCode: 404,
        message: "Parent category was not found",
      });
  }

  await db.category.update(existingCategory.categoryId, validated);

  respondSuccessNoContent(res);
};
