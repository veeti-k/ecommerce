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
      CreatedAt = DateTimeOffset.UtcNow,
      LastUsedAt = DateTimeOffset.UtcNow,
    };
  }
}