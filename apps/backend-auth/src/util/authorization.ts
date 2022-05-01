import { Flags } from "shared";

export const hasAccess = (neededFlags: bigint[], userFlags: bigint) => {
  const totalNeeded = neededFlags.reduce((acc, curr) => acc | curr);

  return isAdmin(userFlags) || (userFlags & totalNeeded) === totalNeeded;
};

export const isAdmin = (userFlags: bigint) => (userFlags & Flags.Admin) === Flags.Admin;
export const isEmployee = (userFlags: bigint) => (userFlags & Flags.Employee) === Flags.Employee;
