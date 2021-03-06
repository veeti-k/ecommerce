import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "../../../server/global";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    verifyRequest: "/auth/verify-request",
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      if (!session?.user?.email) return session;

      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        include: {
          accounts: true,
        },
      });

      if (!dbUser) return session;

      session.user.accounts = dbUser.accounts.map((acc) => acc.provider);
      session.user.flags = Number(dbUser.flags);

      return session;
    },
  },
});
