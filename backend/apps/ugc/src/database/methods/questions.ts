import prisma from "../client";

export const create = (productId: number, isEmployee: boolean, body: any) =>
  prisma.question.create({
    data: {
      ...body,
      productId,
      isEmployee,
    },
  });

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

export const approve = (questionId: string) =>
  prisma.question.update({
    where: {
      questionId,
    },
    data: {
      isApproved: true,
      isDeleted: false,
    },
  });

export const remove = (questionId: string) =>
  prisma.question.update({
    where: {
      questionId,
    },
    data: {
      isApproved: false,
      isDeleted: true,
    },
  });
