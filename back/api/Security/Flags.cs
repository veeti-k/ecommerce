namespace api.Security;

public static class Flags
{
  public const long ADMINISTRATOR = 1 << 0;
  public const long VIEW_USERS = 1 << 1;
  public const long MANAGE_PRODUCTS = 1 << 2;
  public const long TEST_ACCOUNT = 1 << 3;

  public static bool HasFlag(long userFlags, long flagToCheckFor)
  {
    return (userFlags & flagToCheckFor) == flagToCheckFor;
  }
}