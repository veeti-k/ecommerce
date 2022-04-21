import { compare, hash } from "bcrypt";
import { constants } from "config";
import { createHash } from "crypto";

export const comparePassword = (plainText: string, hash: string) =>
  compare(sha256(plainText), hash);

export const hashPassword = (plainText: string) =>
  hash(sha256(plainText), constants.bcryptSaltRounds);

const sha256 = (plainText: string) => createHash("sha256").update(plainText).digest("base64");
