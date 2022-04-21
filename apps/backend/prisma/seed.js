import prismaPkg from "@prisma/client";
const { PrismaClient } = prismaPkg;

import { hashPassword } from "../dist/util/hash.js";

(async () => {
  const prisma = new PrismaClient();

  const hashedPass = await hashPassword("ADMINISTRATOR-password");

  await prisma.user.create({
    data: {
      name: "ADMINISTRATOR",
      email: "ADMINISTRATOR@test.test",
      password: hashedPass,
      flags: 1,
      createdAt: new Date(),
      phoneNumber: "ADMINISTRATOR-phoneNumber",
    },
  });

  await prisma.$disconnect();
})();
