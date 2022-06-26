import Nextauth, { DefaultSession } from "next-auth";

import { Flag } from "@ecommerce/shared";

declare module "next-auth" {
  interface Session {
    user: {
      signout: boolean;
      accounts: string[];
      flags: number;
    } & DefaultSession["user"];
  }
}
