import prisma from "../client";

export const create = (userId: number) =>
  prisma.session.create({
    data: {
      userId: userId,
      lastUsedAt: new Date(),
      createdAt: new Date(),
    },
  });

export const get = {
  allByUserId: (userId: number) =>
    prisma.session.findMany({
      where: {
        userId,
      },
    }),
};
