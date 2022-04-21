import { prisma } from ".";

export const create = (userId: number) =>
  prisma.session.create({
    data: {
      userId: userId,
      lastUsedAt: new Date(),
      createdAt: new Date(),
    },
  });
