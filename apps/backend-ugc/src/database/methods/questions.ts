import prisma from "../client";

export const create = (productId: number, body: any) =>
  prisma.question.create({
    data: {
      ...body,
      productId,
    },
  });

export const get = {
  all: (isApproved: boolean) =>
    prisma.question.findMany({
      where: {
        isApproved,
        isDeleted: false,
      },
      include: {},
    }),

  byProductId: (productId: number) =>
    prisma.question.findMany({
      where: {
        productId,
        isDeleted: false,
      },
    }),

  oneById: (questionId: string) =>
    prisma.question.findFirst({
      where: {
        questionId,
        isDeleted: false,
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
