using System;
using api.Models;
using api.Utils;

namespace tests.ControllerTests.Utils;

public static class Users
{
  public static User CreateFakeUser()
  {
    return new User()
    {
      Id = Guid.NewGuid(),
      Name = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      PhoneNumber = "12345678",
      Password = Hashing.HashToString(Guid.NewGuid().ToString()),
      TokenVersion = Guid.NewGuid(),
      CreatedAt = new DateTime()
    };
  }
}