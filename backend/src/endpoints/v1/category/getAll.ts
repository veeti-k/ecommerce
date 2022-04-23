import { db } from "../../../database";
import { Endpoint } from "../../../types/ApiThings";
import { resolveCategories } from "../../../util/resolveCategories";
import { respondSuccess } from "../../../util/respondWith";

export const getAll: Endpoint = async (req, res) => {
  const { resolved } = req.query;

  const categories = await db.category.get.all();

  if (!resolved)
    return respondSuccess({
      res,
      statusCode: 200,
      json: categories,
      sentInfo: "categories",
    });

  respondSuccess({
    res,
    statusCode: 200,
    json: {
      categories,
      resolvedCategories: resolveCategories(categories),
    },
    sentInfo: "categories and resolved categories",
  });
};
