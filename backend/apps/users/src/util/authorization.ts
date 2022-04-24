import { Flags } from "shared";

export const hasFlags = (neededFlags: bigint[], userFlags: bigint) => {
  const totalNeeded = neededFlags.reduce((acc, curr) => acc | curr);

  return (userFlags & totalNeeded) === totalNeeded;
};

export const isAdmin = (userFlags: bigint) => (userFlags & Flags.Admin) === Flags.Admin;
