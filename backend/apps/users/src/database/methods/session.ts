import prisma from "../client";

export const create = (userId: number) =>
  prisma.session.create({
    data: {
      userId: userId,
      lastUsedAt: new Date(),
      createdAt: new Date(),
    },
  });

export const getByUserId = (userId: number) =>
  prisma.session.findFirst({
    where: {
      userId: userId,
    },
  });
