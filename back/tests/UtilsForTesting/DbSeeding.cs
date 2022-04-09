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
  private static readonly List<User> Users = new()
  {
    new User
    {
      Name = Flags.NO_FLAGS + "name",
      Email = Flags.NO_FLAGS + "@test.test",
      PhoneNumber = Flags.NO_FLAGS + "phone",
      Password = Flags.NO_FLAGS + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.NO_FLAGS,
    },
    new User
    {
      Name = Flags.ADMINISTRATOR + "name",
      Email = Flags.ADMINISTRATOR + "@test.test",
      PhoneNumber = Flags.ADMINISTRATOR + "phone",
      Password = Flags.ADMINISTRATOR + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.ADMINISTRATOR,
    },
    new User
    {
      Name = Flags.VIEW_USERS + "name",
      Email = Flags.VIEW_USERS + "@test.test",
      PhoneNumber = Flags.VIEW_USERS + "phone",
      Password = Flags.VIEW_USERS + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.VIEW_USERS,
    },
    new User
    {
      Name = Flags.MANAGE_PRODUCTS + "name",
      Email = Flags.MANAGE_PRODUCTS + "@test.test",
      PhoneNumber = Flags.MANAGE_PRODUCTS + "phone",
      Password = Flags.MANAGE_PRODUCTS + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.MANAGE_PRODUCTS,
    },
    new User
    {
      Name = Flags.TEST_ACCOUNT + "name",
      Email = Flags.TEST_ACCOUNT + "@test.test",
      PhoneNumber = Flags.TEST_ACCOUNT + "phone",
      Password = Flags.TEST_ACCOUNT + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.TEST_ACCOUNT,
    },
    new User
    {
      Name = Flags.EMPLOYEE + "name",
      Email = Flags.EMPLOYEE + "@test.test",
      PhoneNumber = Flags.EMPLOYEE + "phone",
      Password = Flags.EMPLOYEE + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.EMPLOYEE,
    },
    new User
    {
      Name = Flags.MANAGE_REVIEWS + "name",
      Email = Flags.MANAGE_REVIEWS + "@test.test",
      PhoneNumber = Flags.MANAGE_REVIEWS + "phone",
      Password = Flags.MANAGE_REVIEWS + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.MANAGE_REVIEWS,
    },
    new User
    {
      Name = Flags.MANAGE_QUESTIONS + "name",
      Email = Flags.MANAGE_QUESTIONS + "@test.test",
      PhoneNumber = Flags.MANAGE_QUESTIONS + "phone",
      Password = Flags.MANAGE_QUESTIONS + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.MANAGE_QUESTIONS,
    },
    new User
    {
      Name = Flags.MANAGE_CATEGORIES + "name",
      Email = Flags.MANAGE_CATEGORIES + "@test.test",
      PhoneNumber = Flags.MANAGE_CATEGORIES + "phone",
      Password = Flags.MANAGE_CATEGORIES + "password",
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = Flags.MANAGE_CATEGORIES,
    }
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