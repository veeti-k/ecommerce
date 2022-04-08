using System;
using System.Collections.Generic;
using System.Linq;
using api.Data;
using api.Models.User;
using api.Security;
using api.Utils;

namespace tests.UtilsForTesting;

public static class DbSeeding
{
  public static List<User> Users = new()
  {
    new User
    {
      Name = "admin",
      Email = "admin-test@test.test",
      PhoneNumber = "admin-123",
      Password = "admin-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.ADMINISTRATOR,
    },

    new User
    {
      Name = "non-admin",
      Email = "normal-test@test.test",
      PhoneNumber = "non-admin-123",
      Password = "normal-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = 0,
    },

    new User
    {
      Name = "manage-products",
      Email = "manage-products-test@test.test",
      PhoneNumber = "manage-products-123",
      Password = "manage-products-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.MANAGE_PRODUCTS,
    },

    new User
    {
      Name = "manage-reviews",
      Email = "manage-reviews-test@test.test",
      PhoneNumber = "manage-reviews-123",
      Password = "manage-reviews-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.MANAGE_REVIEWS,
    },

    new User
    {
      Name = "manage-questions",
      Email = "manage-questions-test@test.test",
      PhoneNumber = "manage-questions-123",
      Password = "manage-questions-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.MANAGE_QUESTIONS,
    },

    new User
    {
      Name = "view-users",
      Email = "view-users-test@test.test",
      PhoneNumber = "view-users-123",
      Password = "view-users-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.VIEW_USERS,
    },

    new User
    {
      Name = "test-account",
      Email = "test-account-test@test.test",
      PhoneNumber = "test-account-123",
      Password = "test-account-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.TEST_ACCOUNT,
    },

    new User
    {
      Name = "employee",
      Email = "employee-test@test.test",
      PhoneNumber = "employee-123",
      Password = "employee-pass",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.EMPLOYEE,
    },
  };

  public static User? GetUser(Flags flags)
  {
    return Users.FirstOrDefault(user => user.Flags == flags);
  }

  public static void SeedUsers(DataContext db)
  {
    foreach (var user in Users)
    {
      db.Users.Add(new User
      {
        Name = user.Name,
        Email = user.Email,
        Flags = user.Flags,
        Password = Hashing.HashToString(user.Password),
        CreatedAt = user.CreatedAt,
        PhoneNumber = user.PhoneNumber
      });
    }

    db.SaveChanges();
  }
}