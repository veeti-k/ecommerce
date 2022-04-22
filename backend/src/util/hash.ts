import { compare, hash } from "bcrypt";
import { createHash } from "crypto";
import { config } from "../config";

export const comparePassword = (plainText: string, hash: string) =>
  compare(sha256(plainText), hash);

export const hashPassword = (plainText: string) => hash(sha256(plainText), config.bcryptSaltRounds);

const sha256 = (plainText: string) => createHash("sha256").update(plainText).digest("base64");
