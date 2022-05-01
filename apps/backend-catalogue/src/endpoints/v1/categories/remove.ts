import { Endpoint, respondError, respondSuccessNoContent } from "shared";
import { db } from "../../../database";

export const remove: Endpoint = async (req, res) => {
  const categoryId = Number(req.params.categoryId);

  const category = await db.categories.get.byId(categoryId);

  if (!category) {
    return respondError({
      res,
      statusCode: 404,
      message: "Category not found",
    });
  }

  await db.categories.remove(category.categoryId);

  return respondSuccessNoContent(res);
};
