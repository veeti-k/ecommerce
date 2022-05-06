export const Flags = {
  None: BigInt(1 << 0),
  Admin: BigInt(1 << 1),
  Employee: BigInt(1 << 2),
  ManageCategories: BigInt(1 << 3),
  ManageProducts: BigInt(1 << 4),
  ManageUsers: BigInt(1 << 5),
  ManageQuestions: BigInt(1 << 6),
  ManageReviews: BigInt(1 << 7),
};
export const isAdmin = (userFlags: number) => (BigInt(userFlags) & Flags.Admin) == Flags.Admin;

export const hasFlag = (userFlags: number, flag: bigint) =>
  isAdmin(userFlags) || (BigInt(userFlags) & flag) == flag;
