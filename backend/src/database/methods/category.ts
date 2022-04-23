import { AddCategoryRequestBody } from "../../types/Category";
import prisma from "../client";

export const addCategory = (obj: AddCategoryRequestBody) =>
  prisma.category.create({
    data: {
      name: obj.name,
      parentId: obj.parentId,
    },
  });

export const get = {
  byId: (categoryId: number) =>
    prisma.category.findFirst({
      where: {
        categoryId,
      },
    }),
};
