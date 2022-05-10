import { Endpoint, respondSuccess, zinc } from "shared";

export const search: Endpoint = async (req, res) => {
  const categoryId = req.query.categoryId as number | undefined;
  const query = req.query.query as string | undefined;

  const searchTerm = zinc.buildSearchTerm({ query, categoryId });

  if (!searchTerm)
    return respondSuccess({
      res,
      statusCode: 200,
      json: [],
    });

  const products = await zinc.search(searchTerm).catch((err) => {
    console.log(err);
    return [];
  });

  respondSuccess({
    res,
    statusCode: 200,
    json: products,
  });
};
