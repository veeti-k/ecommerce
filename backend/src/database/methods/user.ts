import { RegisterRequestBody } from "../../types/auth";
import prisma from "../client";

export const createUserAndSession = async (body: RegisterRequestBody, hashedPassword: string) => {
  const userWithSessions = await prisma.user.create({
    data: {
      ...body,
      password: hashedPassword,
      createdAt: new Date(),
      flags: 0,
      sessions: {
        create: {
          createdAt: new Date(),
          lastUsedAt: new Date(),
        },
      },
    },
    include: {
      sessions: true,
    },
  });

  return {
    newUserId: userWithSessions.userId,
    newFlags: userWithSessions.flags,
    newSessionId: userWithSessions.sessions[0].sessionId,
  };
};

export const get = {
  byUserId: async (userId: number) => prisma.user.findFirst({ where: { userId } }),
  byUserIdWith: {
    sessions: async (userId: number) =>
      prisma.user.findFirst({ where: { userId }, include: { sessions: true } }),
  },
  byEmail: (email: string) => prisma.user.findFirst({ where: { email } }),
  byPhoneNumber: (phoneNumber: string) => prisma.user.findFirst({ where: { phoneNumber } }),
};
