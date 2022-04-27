import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../database";

export const update: Endpoint = async (req, res) => {
  const categoryId = Number(req.params.categoryId);

  const existingCategory = await db.categories.get.byId(categoryId);
  if (!existingCategory)
    return respondError({
      res,
      statusCode: 404,
      message: "Category not found",
    });

  const body = req.body;

  if (body.parentId) {
    const existingParent = await db.categories.get.byId(body.parentId);

    if (!existingParent)
      return respondError({
        res,
        statusCode: 404,
        message: "Parent category not found",
      });
  }

  await db.categories.update(existingCategory.categoryId, body);

  respondSuccessNoContent(res);
};
