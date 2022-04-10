using System;
using System.Collections.Generic;
using api.Models.User;
using api.RequestsAndResponses.Auth.Login;
using api.RequestsAndResponses.Auth.Register;
using api.Security;
using api.Utils;

namespace tests.UtilsForTesting;

public static class Users
{
  public static User CreateFakeUser(
    int? userId = null,
    string? password = null,
    Flags flags = 0,
    List<Address>? addresses = null,
    List<Session>? sessions = null)
  {
    return new User
    {
      Id = userId ?? new Random().Next(1, Int32.MaxValue),
      Name = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      PhoneNumber = "12345678",
      Password = Hashing.HashToString(password ?? Guid.NewGuid().ToString()),
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = flags,
      Addresses = addresses ?? new List<Address>() { },
      Sessions = sessions ?? new List<Session>() { },
    };
  }

  public static User CreateFakeUserFromDto(RegisterDto dto) =>
    new User
    {
      Id = new Random().Next(1, Int32.MaxValue),
      Name = dto.Name,
      Email = dto.Email,
      PhoneNumber = dto.PhoneNumber,
      Password = Hashing.HashToString(dto.Password),
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = 0,
      Addresses = new List<Address>() { },
      Sessions = new List<Session>() { }
    };

  public static User CreateFakeUserFromDto(LoginDto dto) =>
    new User
    {
      Id = new Random().Next(1, Int32.MaxValue),
      Name = Guid.NewGuid().ToString(),
      Email = dto.Email,
      PhoneNumber = Guid.NewGuid().ToString(),
      Password = Hashing.HashToString(dto.Password),
      CreatedAt = DateTimeOffset.UtcNow,
      Flags = 0,
      Addresses = new List<Address>() { },
      Sessions = new List<Session>() { },
    };
}