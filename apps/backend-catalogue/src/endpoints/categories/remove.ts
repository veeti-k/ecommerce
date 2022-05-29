import { db } from "database";
import { Endpoint, respondError, respondSuccessNoContent } from "shared";

export const remove: Endpoint = async (req, res) => {
  const categoryId = req.params.categoryId;

  const category = await db.catalogue.categories.get.byId(categoryId);

  if (!category) {
    return respondError({
      res,
      statusCode: 404,
      message: "Category not found",
    });
  }

  await db.catalogue.categories.remove(category._id);

  return respondSuccessNoContent(res);
};
