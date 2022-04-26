import prisma from "../client";

export const create = (body: any) =>
  prisma.product.create({
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
  prisma.product.update({
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
    prisma.product.findFirst({
      where: {
        productId,
      },
    }),
};
