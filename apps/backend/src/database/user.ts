import { RegisterRequestBody } from "shared";
import { prisma } from ".";

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
  byEmail: (email: string) => prisma.user.findFirst({ where: { email } }),
  byPhoneNumber: (phoneNumber: string) => prisma.user.findFirst({ where: { phoneNumber } }),
};
