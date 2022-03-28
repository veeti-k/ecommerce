using System;
using api.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.UtilsForTesting;
using Xunit;

namespace tests.ServiceTests.ContextServiceTests;

public class GetCurrentUserIdTests
{
  private readonly int randomInt = new Random().Next(1, Int32.MaxValue);
  private readonly long randomLong = new Random().Next(1, 10);

  [Fact]
  public void GetCurrentUserId_WithGoodUserId_ReturnsUserId()
  {
    var userId = randomInt;

    var accessor = new Mock<IHttpContextAccessor>();
    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal(userId, Guid.NewGuid(), randomLong)
    };

    accessor.Setup(acc => acc
        .HttpContext)
      .Returns(fakeContext);

    var result = new ContextService(accessor.Object).GetCurrentUserId();

    result.Should().Be(userId);
  }

  [Fact]
  public void GetCurrentUserId_WithBadUserId_ReturnsDefault()
  {
    var accessor = new Mock<IHttpContextAccessor>();
    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal("not a valid userId", Guid.NewGuid(), randomLong)
    };

    accessor.Setup(acc => acc
        .HttpContext)
      .Returns(fakeContext);

    var result = new ContextService(accessor.Object).GetCurrentUserId();

    result.Should().Be(default);
  }
}