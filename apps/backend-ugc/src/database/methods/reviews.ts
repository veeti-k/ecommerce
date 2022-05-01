import prisma from "../client";

export const create = (productId: number, byEmployee: boolean, body: any) =>
  prisma.review.create({
    data: {
      ...body,
      byEmployee,
      productId,
    },
  });

export const get = {
  all: (isApproved: boolean) =>
    prisma.review.findMany({
      where: {
        isApproved,
        isDeleted: false,
      },
      include: {},
    }),

  byProductId: (productId: number) =>
    prisma.review.findMany({
      where: {
        productId,
        isDeleted: false,
      },
    }),

  oneById: (reviewId: string) =>
    prisma.review.findFirst({
      where: {
        reviewId,
        isDeleted: false,
      },
    }),
};

export const approve = (reviewId: string) =>
  prisma.review.update({
    where: {
      reviewId,
    },
    data: {
      isApproved: true,
      isDeleted: false,
    },
  });

export const remove = (reviewId: string) =>
  prisma.review.update({
    where: {
      reviewId,
    },
    data: {
      isApproved: false,
      isDeleted: true,
    },
  });
