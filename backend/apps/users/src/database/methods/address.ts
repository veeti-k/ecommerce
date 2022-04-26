import prisma from "../client";

export const create = (userId: number, body: any) =>
  prisma.address.create({
    data: {
      ...body,
      userId: userId,
    },
  });

export const update = (addressId: string, body: any) =>
  prisma.address.update({
    where: {
      addressId,
    },
    data: {
      ...body,
    },
  });

export const get = {
  allByUserId: (userId: number) =>
    prisma.address.findMany({
      where: {
        userId,
      },
    }),
  oneById: (userId: number, addressId: string) =>
    prisma.address.findFirst({
      where: {
        userId,
        addressId,
      },
    }),
};
