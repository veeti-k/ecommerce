import { CatalogueClient } from "..";

export const create = (body: any) =>
  CatalogueClient.product.create({
    data: {
      ...body,
      bulletPoints: body.bulletPoints.join(","),
      imageLinks: body.imageLinks.join(","),

      averageStars: 0,
      questionCount: 0,
      reviewCount: 0,

      isDeleted: false,
    },
  });

export const update = (productId: number, body: any) =>
  CatalogueClient.product.update({
    where: {
      productId,
    },
    data: {
      ...body,

      bulletPoints: body.bulletPoints.join(","),
      imageLinks: body.imageLinks.join(","),
    },
  });

export const get = {
  byId: (productId: number) =>
    CatalogueClient.product.findFirst({
      where: {
        productId,
      },
    }),
};

export const remove = (productId: number) =>
  CatalogueClient.product.delete({
    where: {
      productId,
    },
  });
