using System;
using api.DTOs;
using api.Models;
using api.Utils;

namespace tests.ControllerTests.Utils;

public static class Users
{
  public static User CreateFakeUser(string? password = null, bool isTestAccount = false)
  {
    return new User()
    {
      Id = Guid.NewGuid(),
      Name = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      PhoneNumber = "12345678",
      Password = Hashing.HashToString(password ?? Guid.NewGuid().ToString()),
      CreatedAt = DateTime.UtcNow.ToString("o"),
      isTestAccount = isTestAccount
    };
  }

  public static UserResponse CreateFakeUserToReturn(User user)
  {
    return new UserResponse()
    {
      Id = user.Id,
      Name = user.Name,
      Email = user.Email,
      PhoneNumber = user.PhoneNumber,
      CreatedAt = user.CreatedAt,
      Addresses = user.Addresses,
      isTestAccount = user.isTestAccount
    };
  }
}