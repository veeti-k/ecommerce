import { AddCategoryRequestBody } from "../../types/Category";
import prisma from "../client";

export const create = (obj: AddCategoryRequestBody) =>
  prisma.category.create({
    data: {
      name: obj.name,
      parentId: obj.parentId,
    },
  });

export const remove = (categoryId: number) =>
  prisma.category.delete({
    where: {
      categoryId,
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
