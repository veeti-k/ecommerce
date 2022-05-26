import { CatalogueClient } from "./PrismaClients";

export const create = (obj: any) =>
  CatalogueClient.category.create({
    data: {
      ...obj,
      parentId: obj.parentId || null,
    },
  });

export const remove = (categoryId: number) =>
  CatalogueClient.category.delete({
    where: {
      categoryId,
    },
  });

export const update = (categoryId: number, obj: any) =>
  CatalogueClient.category.update({
    where: {
      categoryId,
    },
    data: obj,
  });

export const get = {
  all: () => CatalogueClient.category.findMany(),
  byId: (categoryId: number) =>
    CatalogueClient.category.findFirst({
      where: {
        categoryId,
      },
    }),
};

export const forTests = {
  removeAll: () => CatalogueClient.category.deleteMany({}),
};
