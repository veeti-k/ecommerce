import { db } from "database";
import { Endpoint, respondError, respondSuccess } from "shared";
import { resolveCategory } from "../../util/resolveCategories";

export const getOne: Endpoint = async (req, res) => {
  const categoryId = req.params.categoryId;

  const categories = await db.catalogue.categories.get.all();
  const category = categories.find((c) => c._id == categoryId);

  if (!category)
    return respondError({
      res,
      statusCode: 404,
      message: "Category not found",
    });

  const resolved = resolveCategory(categories, category);

  respondSuccess({
    res,
    statusCode: 200,
    json: resolved,
    sentInfo: "resolved category",
  });
};
