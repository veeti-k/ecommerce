import prisma from "../client";

const userSelect = {
  userId: true,
  name: true,
  email: true,
  createdAt: true,
  phoneNumber: true,
  flags: true,
};

const addressSelect = {
  addressId: true,
  city: true,
  email: true,
  name: true,
  phoneNumber: true,
  state: true,
  streetAddress: true,
  zip: true,
  userId: true,
};

const sessionSelect = {
  sessionId: true,
  userId: true,
  createdAt: true,
  lastUsedAt: true,
};

export const createUserAndSession = async (body: any, hashedPassword: string) => {
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
  byUserId: async (userId: number) =>
    prisma.user.findFirst({ where: { userId }, select: userSelect }),
  byUserIdWith: {
    sessions: async (userId: number) =>
      prisma.user.findFirst({
        where: { userId },
        select: { ...userSelect, sessions: { select: { ...sessionSelect } } },
      }),

    sessionsAndAddresses: async (userId: number) =>
      prisma.user.findFirst({
        where: { userId },
        select: {
          ...userSelect,
          sessions: { select: { ...sessionSelect } },
          addresses: { select: { ...addressSelect } },
        },
      }),
  },
  byEmail: (email: string) => prisma.user.findFirst({ where: { email }, select: userSelect }),
  byPhoneNumber: (phoneNumber: string) =>
    prisma.user.findFirst({ where: { phoneNumber }, select: userSelect }),
};

export const update = (userId: number, updated: any) =>
  prisma.user.update({
    where: { userId },
    data: updated,
    select: userSelect,
  });
