using System;
using api.Models;

namespace tests.ControllerTests.Utils;

public static class Sessions
{
  public static Session CreateFakeSession(Guid aUserId)
  {
    return new()
    {
      Id = Guid.NewGuid(),
      UserId = aUserId,
      CreatedAt = DateTime.UtcNow.ToString("o"),
      LastUsedAt = DateTime.UtcNow.ToString("o")
    };
  }
}