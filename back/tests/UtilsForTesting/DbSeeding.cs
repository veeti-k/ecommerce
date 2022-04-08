using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using api.Data;
using api.Models.Product;
using api.Models.User;
using api.Security;
using api.Utils;

namespace tests.UtilsForTesting;

public static class DbSeeding
{
  private static readonly List<User> Users = new() { };
  
  public static readonly ProductCategory BaseCategory = new()
  {
    Name = Guid.NewGuid().ToString(),
    ParentId = null
  };
  
  public static User? GetUser(Flags flags)
  {
    return Users.FirstOrDefault(user => user.Flags == flags);
  }

  public static void SeedUsers(DataContext db)
  {
    foreach (Flags flag in Enum.GetValues(typeof(Flags)))
    {
      var password = flag.ToString() + Guid.NewGuid();
      
      var dbUser = new User
      {
        Name = flag.ToString() + Guid.NewGuid(),
        Email = flag.ToString() + Guid.NewGuid(),
        Flags = flag,
        Password = Hashing.HashToString(password),
        CreatedAt = DateTimeOffset.UtcNow,
        PhoneNumber = flag.ToString() + Guid.NewGuid()
      };

      var user = new User()
      {
        Name = dbUser.Name,
        Email = dbUser.Email,
        Flags = dbUser.Flags,
        Password = password,
        CreatedAt = dbUser.CreatedAt,
        PhoneNumber = dbUser.PhoneNumber
      };
      
      db.Users.Add(dbUser);
      Users.Add(user);
    }

    db.SaveChanges();
  }

  public static void SeedCategory(DataContext db)
  {
    db.ProductCategories.Add(BaseCategory);
    try
    {
      db.SaveChanges();

    } catch (Exception e)
    {
    }
  }
}