using System;
using api.Models;

namespace tests.ControllerTests.Utils;

public static class Addresses
{
  public static Address CreateFakeAddress(Guid aUserId)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      City = Guid.NewGuid().ToString(),
      Email = Guid.NewGuid().ToString(),
      Line1 = Guid.NewGuid().ToString(),
      Line2 = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      State = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
      UserId = aUserId,
      ZipCode = Guid.NewGuid().ToString(),
    };
  }
}