import { Endpoint, respondSuccess } from "shared";
import { db } from "../../../database";
import { resolveCategories } from "../../../util/resolveCategories";

export const getAll: Endpoint = async (req, res) => {
  const { resolved } = req.query;

  const categories = await db.categories.get.all();

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
