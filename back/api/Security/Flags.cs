namespace api.Security;

public static class Flags
{
  public const long ADMINISTRATOR = 1 << 0;
  public const long VIEW_USERS = 1 << 1;
  public const long MANAGE_PRODUCTS = 1 << 2;
  public const long TEST_ACCOUNT = 1 << 3;
  public const long EMPLOYEE = 1 << 4;
  public const long MANAGE_REVIEWS = 1 << 5;
  public const long MANAGE_QUESTIONS = 1 << 6;

  public static bool HasFlag(long userFlags, long flagToCheckFor)
  {
    return (userFlags & flagToCheckFor) == flagToCheckFor;
  }
}