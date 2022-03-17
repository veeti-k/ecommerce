﻿using System;
using System.Collections.Generic;
using api.Models.User;
using api.Utils;

namespace tests.ControllerTests.Utils;

public static class Users
{
  public static User CreateFakeUser(
    int? userId = null,
    string? password = null,
    bool isTestAccount = false,
    IEnumerable<Address>? addresses = null,
    IEnumerable<Session>? sessions = null)
  {
    return new User()
    {
      Id = userId ?? new Random().Next(1, Int32.MaxValue),
      Name = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      PhoneNumber = "12345678",
      Password = Hashing.HashToString(password ?? Guid.NewGuid().ToString()),
      CreatedAt = DateTimeOffset.UtcNow,
      isTestAccount = isTestAccount,
      Addresses = addresses ?? new Address[] { },
      Sessions = sessions ?? new Session[] { },
    };
  }
}