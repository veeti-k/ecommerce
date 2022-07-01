import { Flags } from "@ecommerce/shared";

export const hasPermission = (
  flags: number,
  requiredFlags: Flags[]
): boolean => {
  if ((flags & Flags.Admin) === Flags.Admin) return true; // admin has all perms

  const totalRequired = requiredFlags.reduce((acc, flag) => acc | flag);

  if ((flags & totalRequired) !== totalRequired) return false;

  return true;
};
