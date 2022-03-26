using System;
using api.Data;
using api.Models.User;
using api.Security;
using api.Utils;

namespace tests.ControllerTests.Utils;

public static class DbSeeding
{
  public const string AdminName = "test-admin";
  public const string AdminEmail = "test@test.test";
  public const string AdminPhoneNumber = "123456789";
  public const string AdminPassword = "test-admins-password";
  public static void CreateAdminUser(DataContext db)
  {
    db.Users.Add(new User()
    {
      Name = AdminName,
      Email = AdminEmail,
      Flags = Flags.ADMINISTRATOR,
      Password = Hashing.HashToString(AdminPhoneNumber),
      CreatedAt = DateTimeOffset.UtcNow,
      PhoneNumber = AdminPassword
    });
    db.SaveChanges();
  }
}