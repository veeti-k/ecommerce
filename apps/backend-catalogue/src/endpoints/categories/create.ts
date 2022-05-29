import { db } from "database";
import { Endpoint, respondError, respondSuccess } from "shared";

export const create: Endpoint = async (req, res) => {
  const body = req.body;

  if (body.parentId) {
    const parentCategory = await db.catalogue.categories.get.byId(body.parentId);

    if (!parentCategory)
      return respondError({
        res,
        statusCode: 400,
        message: "Parent category does not exist",
      });
  }

  const createdCategory = await db.catalogue.categories.create(body);

  return respondSuccess({
    res,
    statusCode: 201,
    json: { categoryId: createdCategory._id },
  });
};
