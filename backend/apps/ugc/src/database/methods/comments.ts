import prisma from "../client";

export const add = (byEmployee: boolean, productId: number, reviewId: string, body: any) =>
  prisma.reviewComment.create({
    data: {
      ...body,
      reviewId,
      productId,
      byEmployee,
    },
  });

export const approve = (commentId: string) =>
  prisma.reviewComment.update({
    where: {
      reviewCommentId: commentId,
    },
    data: {
      isApproved: true,
      isDeleted: false,
    },
  });

export const remove = (commentId: string) =>
  prisma.reviewComment.update({
    where: {
      reviewCommentId: commentId,
    },
    data: {
      isDeleted: true,
    },
  });
