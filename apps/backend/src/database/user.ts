import { RegisterRequestBody } from "shared";
import { prisma } from ".";
import { hashPassword } from "../util/hash";

export const createUser = async (body: RegisterRequestBody) => {
  const hash = await hashPassword(body.password);

  return prisma.user.create({
    data: {
      ...body,
      password: hash,
      createdAt: new Date(),
      flags: 0,
    },
  });
};

export const getUser = {
  byEmail: (email: string) => prisma.user.findFirst({ where: { email } }),
  byPhoneNumber: (phoneNumber: string) => prisma.user.findFirst({ where: { phoneNumber } }),
};
