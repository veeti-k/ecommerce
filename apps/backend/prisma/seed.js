import prismaPkg from "@prisma/client";
import { seededUsers } from "../src/seededUsers";
const { PrismaClient } = prismaPkg;
import { hash } from "bcrypt";
import { createHash } from "crypto";

const sha256 = (plainText) => createHash("sha256").update(plainText).digest("base64");

const hashPassword = (plainText) => hash(sha256(plainText), 12);

(async () => {
  const prisma = new PrismaClient();

  for (const user of seededUsers) {
    const hashedPassword = await hashPassword(user.password);

    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  await prisma.$disconnect();
})();
