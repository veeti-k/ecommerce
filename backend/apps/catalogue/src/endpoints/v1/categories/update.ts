import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../database";
import { updateCategoryRequestBodyValidator } from "../../../validators/v1/categories/update";

export const update: Endpoint = async (req, res) => {
  const validationResult = updateCategoryRequestBodyValidator(req.body);
  if (validationResult.error)
    return respondError({
      res,
      statusCode: 400,
      message: "Invalid request body",
      errors: validationResult.error?.details,
    });

  const categoryId = Number(req.params.categoryId);

  const existingCategory = await db.categories.get.byId(categoryId);
  if (!existingCategory)
    return respondError({
      res,
      statusCode: 404,
      message: "Category not found",
    });

  const validatedBody = validationResult.value;

  if (validatedBody.parentId) {
    const existingParent = await db.categories.get.byId(validatedBody.parentId);

    if (!existingParent)
      return respondError({
        res,
        statusCode: 404,
        message: "Parent category not found",
      });
  }

  await db.categories.update(existingCategory.categoryId, validatedBody);

  respondSuccessNoContent(res);
};
