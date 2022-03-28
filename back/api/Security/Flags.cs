namespace api.Security;

[Flags]
public enum Flags : long
{
  NO_FLAGS = 0,
  ADMINISTRATOR = 1 << 0,
  VIEW_USERS = 1 << 1,
  MANAGE_PRODUCTS = 1 << 2,
  TEST_ACCOUNT = 1 << 3,
  EMPLOYEE = 1 << 4,
  MANAGE_REVIEWS = 1 << 5,
  MANAGE_QUESTIONS = 1 << 6
}
