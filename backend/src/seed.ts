import prismaPkg from "@prisma/client";
import { hashPassword } from "./util/hash";
const { PrismaClient } = prismaPkg;

const seededUsers = [
  {
    name: "ADMINISTRATOR",
    email: "ADMINISTRATOR@test.test",
    password: "ADMINISTRATOR-password",
    flags: 1,
    createdAt: new Date(),
    phoneNumber: "ADMINISTRATOR-phoneNumber",
  },
];

export const seedUsers = async () => {
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
};
