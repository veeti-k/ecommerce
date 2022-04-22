import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { createHash } from "crypto";
import { seededUsers } from "../src/seededUsers";

const sha256 = (plainText: string) => createHash("sha256").update(plainText).digest("base64");
const hashPassword = (plainText: string) => hash(sha256(plainText), 12);

(async () => {
  const prisma = new PrismaClient();

  for (const username in seededUsers) {
    const user = seededUsers[username];

    const hashedPassword = await hashPassword(user.password);

    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
        flags: Number(user.flags),
      },
    });
  }

  await prisma.$disconnect();
})();
