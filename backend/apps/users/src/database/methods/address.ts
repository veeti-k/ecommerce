import prisma from "../client";

export const create = (userId: number, body: any) =>
  prisma.address.create({
    data: {
      ...body,
      userId: userId,
    },
  });

export const get = {
  allByUserId: (userId: number) =>
    prisma.address.findMany({
      where: {
        userId,
      },
    }),
};
