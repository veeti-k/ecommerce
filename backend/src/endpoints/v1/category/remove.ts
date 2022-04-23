import { db } from "../../../database";
import { Endpoint } from "../../../types/ApiThings";
import { respondError, respondSuccessNoContent } from "../../../util/respondWith";

export const remove: Endpoint = async (req, res) => {
  const { categoryId } = req.params;

  const category = await db.category.get.byId(Number(categoryId));

  if (!category) {
    return respondError({
      res,
      statusCode: 404,
      message: "Category was not found",
    });
  }

  await db.category.remove(category.categoryId);

  return respondSuccessNoContent(res);
};
