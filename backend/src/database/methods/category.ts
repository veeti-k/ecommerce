import { CreateCategoryRequestBody, UpdateCategoryRequestBody } from "../../types/Category";
import prisma from "../client";

export const create = (obj: CreateCategoryRequestBody) =>
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

export const update = (categoryId: number, obj: UpdateCategoryRequestBody) =>
  prisma.category.update({
    where: {
      categoryId,
    },
    data: {
      name: obj.name,
      parentId: obj.parentId,
    },
  });

export const get = {
  all: () => prisma.category.findMany(),
  byId: (categoryId: number) =>
    prisma.category.findFirst({
      where: {
        categoryId,
      },
    }),
};

export const forTests = {
  removeAll: () => prisma.category.deleteMany({}),
};
