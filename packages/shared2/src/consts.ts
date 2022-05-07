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

export const PARAM_NUMBER_MAX_SAFE = Number.MAX_SAFE_INTEGER - 2; // -2 to be extra safe
