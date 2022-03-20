using System;
using System.Collections.Generic;
using System.Diagnostics;
using api.DTOs.Auth;
using api.Endpoints.Auth;
using api.Models.User;
using api.Utils;

namespace tests.ControllerTests.Utils;

public static class Users
{
  public static User CreateFakeUser(
    int? userId = null,
    string? password = null,
    long flags = 0,
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
      Flags = flags,
      Addresses = addresses ?? new Address[] { },
      Sessions = sessions ?? new Session[] { },
    };
  }

  public static User CreateFakeUserFromDto(RegisterDTO dto) =>
    new User()
    {
      Id = new Random().Next(1, Int32.MaxValue),
      Name = $"{dto.FirstName} {dto.LastName}",
      Email = dto.Email,
      PhoneNumber = dto.PhoneNumber,
      Password = Hashing.HashToString(dto.Password),
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = 0,
      Addresses = new Address[] { },
      Sessions = new Session[] { },
    };
}