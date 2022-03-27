using System;
using api.Data;
using api.Models.User;
using api.Security;
using api.Utils;

namespace tests.UtilsForTesting;

public static class DbSeeding
{
  public static class AdminUser
  {
    public const string Name = "test-admin";
    public const string Email = "test@test.test";
    public const string PhoneNumber = "987654321";
    public const string Password = "test-admins-password";
  }

  public static void CreateAdminUser(DataContext db)
  {
    db.Users.Add(new User
    {
      Name = AdminUser.Name,
      Email = AdminUser.Email,
      PhoneNumber = AdminUser.PhoneNumber,
      Password = Hashing.HashToString(AdminUser.Password),
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.ADMINISTRATOR,
    });
    db.SaveChanges();
  }

  public static class NonAdminUser
  {
    public const string Name = "non-admin";
    public const string Email = "non-admin@test.test";
    public const string PhoneNumber = "123456789";
    public const string Password = "non-admins-password";
  }

  public static void CreateNonAdminUser(DataContext db)
  {
    db.Users.Add(new User
    {
      Name = NonAdminUser.Name,
      Email = NonAdminUser.Email,
      PhoneNumber = NonAdminUser.PhoneNumber,
      Password = Hashing.HashToString(NonAdminUser.Password),
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = 0,
    });
    db.SaveChanges();
  }
}