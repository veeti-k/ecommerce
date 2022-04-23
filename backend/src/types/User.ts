import { user } from "@prisma/client";

export interface ReqSetUser extends Omit<user, "password" | "addresses" | "sessions"> {}

export interface SeededUser extends Omit<user, "userId" | "addresses" | "sessions"> {}
