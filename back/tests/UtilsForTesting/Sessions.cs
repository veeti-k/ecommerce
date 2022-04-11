using System;
using api.Models.User;

namespace tests.UtilsForTesting;

public static class Sessions
{
  public static Session CreateFakeSession(int userId)
  {
    return new()
    {
      SessionId = Guid.NewGuid(),
      UserId = userId,
      CreatedAt = DateTimeOffset.UtcNow,
      LastUsedAt = DateTimeOffset.UtcNow,
    };
  }
}