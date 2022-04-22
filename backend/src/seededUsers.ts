import { SeededUser } from "./types/User";

type SeededUsers = {
  [key: string]: SeededUser;
};

export const seededUsers: SeededUsers = {
  admin: {
    name: "ADMINISTRATOR",
    email: "ADMINISTRATOR@test.test",
    password: "ADMINISTRATOR-password",
    flags: BigInt(1),
    createdAt: new Date(),
    phoneNumber: "ADMINISTRATOR-phoneNumber",
  },

  testUser: {
    name: "TEST-USER",
    email: "TEST-USER@test.test",
    password: "TEST-USER-password",
    flags: BigInt(0),
    createdAt: new Date(),
    phoneNumber: "TEST-USER-phoneNumber",
  },
};
