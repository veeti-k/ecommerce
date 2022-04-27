import prisma from "../client";

export const add = (byEmployee: boolean, productId: number, body: any) =>
  prisma.questionAnswer.create({
    data: {
      ...body,
      productId,
      byEmployee,
    },
  });

export const approve = (answerId: string) =>
  prisma.questionAnswer.update({
    where: {
      questionAnswerId: answerId,
    },
    data: {
      isApproved: true,
      isDeleted: false,
    },
  });

export const remove = (answerId: string) =>
  prisma.questionAnswer.update({
    where: {
      questionAnswerId: answerId,
    },
    data: {
      isDeleted: true,
    },
  });
