import prisma from "../client";

export const get = {
  all: (isApproved: boolean) =>
    prisma.review.findMany({
      where: {
        isApproved,
      },
    }),

  byProductId: (productId: number) =>
    prisma.review.findMany({
      where: {
        productId,
      },
    }),
};
