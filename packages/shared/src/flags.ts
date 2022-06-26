export enum Flags {
  Admin = 1 << 1,
  Employee = 1 << 2,
  ManageCategories = 1 << 3,
  ManageProducts = 1 << 4,
  ManageOrders = 1 << 5,
  ManageUsers = 1 << 6,
  ManageQuestions = 1 << 7,
  ManageReviews = 1 << 8,
}
