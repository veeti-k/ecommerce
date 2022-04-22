import pkg from "@prisma/client";
const { PrismaClient } = pkg;

export const prisma = new PrismaClient();

import * as user from "./user";
import * as session from "./session";

export const db = {
  user,
  session,
};
