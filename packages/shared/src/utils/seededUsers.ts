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
    flags: Flags.Admin,
    createdAt: new Date(),
    phoneNumber: "ADMINISTRATOR-phoneNumber",
  },

  TestUser: {
    name: "TEST-USER",
    email: "TEST-USER@test.test",
    password: "TEST-USER-password",
    flags: Flags.None,
    createdAt: new Date(),
    phoneNumber: "TEST-USER-phoneNumber",
  },

  Employee: {
    name: "EMPLOYEE",
    email: "EMPLOYEE@test.test",
    password: "EMPLOYEE-password",
    flags: Flags.Employee,
    createdAt: new Date(),
    phoneNumber: "EMPLOYEE-phoneNumber",
  },

  ManageProducts: {
    name: "MANAGE-PRODUCTS",
    email: "MANAGE-PRODUCTS@test.test",
    password: "MANAGE-PRODUCTS-password",
    flags: Flags.ManageProducts,
    createdAt: new Date(),
    phoneNumber: "MANAGE-PRODUCTS-phoneNumber",
  },

  ManageCategories: {
    name: "MANAGE-CATEGORIES",
    email: "MANAGE-CATEGORIES@test.test",
    password: "MANAGE-CATEGORIES-password",
    flags: Flags.ManageCategories,
    createdAt: new Date(),
    phoneNumber: "MANAGE-CATEGORIES-phoneNumber",
  },
};
