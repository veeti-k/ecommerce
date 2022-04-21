export const flags = {
  NO_FLAGS: 0,
  ADMINISTRATOR: 1 << 0,
  VIEW_USERS: 1 << 1,
  MANAGE_PRODUCTS: 1 << 2,
  TEST_ACCOUNT: 1 << 3,
  EMPLOYEE: 1 << 4,
  MANAGE_REVIEWS: 1 << 5,
  MANAGE_QUESTIONS: 1 << 6,
};

export const isAdmin = (userFlags: number) =>
  (userFlags & flags.ADMINISTRATOR) == flags.ADMINISTRATOR;

export const hasManageReviews = (userFlags: number) =>
  isAdmin(userFlags) || (userFlags & flags.MANAGE_REVIEWS) == flags.MANAGE_REVIEWS;

export const hasManageQuestions = (userFlags: number) =>
  isAdmin(userFlags) || (userFlags & flags.MANAGE_QUESTIONS) == flags.MANAGE_QUESTIONS;
