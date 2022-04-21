import { prisma } from ".";

export const createSession = (userId: number) =>
  prisma.session.create({
    data: {
      userId: userId,
      lastUsedAt: new Date(),
      createdAt: new Date(),
    },
  });
