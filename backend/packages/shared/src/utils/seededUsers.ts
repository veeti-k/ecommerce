import { Flags } from "../types/Flags";
import { SeededUser } from "../types/User";

export enum SeededUsers {
  admin = "admin",
  testUser = "testUser",
}

type SeededUsersObj = {
  [key: string]: SeededUser;
};

export const seededUsers: SeededUsersObj = {
  admin: {
    name: "ADMINISTRATOR",
    email: "ADMINISTRATOR@test.test",
    password: "ADMINISTRATOR-password",
    flags: Flags.Admin,
    createdAt: new Date(),
    phoneNumber: "ADMINISTRATOR-phoneNumber",
  },

  testUser: {
    name: "TEST-USER",
    email: "TEST-USER@test.test",
    password: "TEST-USER-password",
    flags: Flags.None,
    createdAt: new Date(),
    phoneNumber: "TEST-USER-phoneNumber",
  },
};
