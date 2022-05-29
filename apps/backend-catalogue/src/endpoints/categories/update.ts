import { db } from "database";
import { Endpoint, respondError, respondSuccessNoContent } from "shared";

export const update: Endpoint = async (req, res) => {
  const categoryId = req.params.categoryId;

  const existingCategory = await db.catalogue.categories.get.byId(categoryId);
  if (!existingCategory)
    return respondError({
      res,
      statusCode: 404,
      message: "Category not found",
    });

  const body = req.body;

  if (body.parentId) {
    const existingParent = await db.catalogue.categories.get.byId(body.parentId);

    if (!existingParent)
      return respondError({
        res,
        statusCode: 404,
        message: "Parent category not found",
      });
  }

  await db.catalogue.categories.update(existingCategory._id, body);

  respondSuccessNoContent(res);
};
