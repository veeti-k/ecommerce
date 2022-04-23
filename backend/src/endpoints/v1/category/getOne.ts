import { db } from "../../../database";
import { Endpoint } from "../../../types/ApiThings";
import { resolveCategory } from "../../../util/resolveCategories";
import { respondError, respondSuccess } from "../../../util/respondWith";

export const getOne: Endpoint = async (req, res) => {
  const categoryId = Number(req.params.categoryId);

  const categories = await db.category.get.all();
  const category = categories.find((c) => c.categoryId == categoryId);

  if (!category)
    return respondError({
      res,
      statusCode: 404,
      message: "Category was not found",
    });

  const resolved = resolveCategory(categories, category);

  respondSuccess({
    res,
    statusCode: 200,
    json: resolved,
    sentInfo: "resolved category",
  });
};
