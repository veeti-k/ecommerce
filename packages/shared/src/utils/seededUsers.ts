import { Flags } from "shared2";
import { SeededUser } from "shared2";

export enum SeededUsers {
  Admin = "Admin",
  TestUser = "TestUser",
  Employee = "Employee",
  ManageCategories = "ManageCategories",
  ManageProducts = "ManageProducts",
}

type SeededUsersObj = {
  [key: string]: SeededUser;
};

export const seededUsers: SeededUsersObj = {
  Admin: {
    name: "ADMINISTRATOR",
    email: "ADMINISTRATOR@test.test",
    password: "ADMINISTRATOR-password",
    flags: String(Flags.Admin),
    phoneNumber: "ADMINISTRATOR-phoneNumber",
  },

  TestUser: {
    name: "TEST-USER",
    email: "TEST-USER@test.test",
    password: "TEST-USER-password",
    flags: String(Flags.None),
    phoneNumber: "TEST-USER-phoneNumber",
  },

  Employee: {
    name: "EMPLOYEE",
    email: "EMPLOYEE@test.test",
    password: "EMPLOYEE-password",
    flags: String(Flags.Employee),
    phoneNumber: "EMPLOYEE-phoneNumber",
  },

  ManageProducts: {
    name: "MANAGE-PRODUCTS",
    email: "MANAGE-PRODUCTS@test.test",
    password: "MANAGE-PRODUCTS-password",
    flags: String(Flags.ManageProducts),
    phoneNumber: "MANAGE-PRODUCTS-phoneNumber",
  },

  ManageCategories: {
    name: "MANAGE-CATEGORIES",
    email: "MANAGE-CATEGORIES@test.test",
    password: "MANAGE-CATEGORIES-password",
    flags: String(Flags.ManageCategories),
    phoneNumber: "MANAGE-CATEGORIES-phoneNumber",
  },
};
