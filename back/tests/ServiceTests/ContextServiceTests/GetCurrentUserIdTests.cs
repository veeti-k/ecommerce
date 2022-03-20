using System;
using api.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.ContextServiceTests;

public class GetCurrentUserIdTests
{
  private readonly int randomInt = new Random().Next(1, Int32.MaxValue);

  [Fact]
  public void GetCurrentUserId_WithGoodUserId_ReturnsUserId()
  {
    var userId = randomInt;
    
    var accessor = new Mock<IHttpContextAccessor>();
    var fakeContext = new DefaultHttpContext()
    {
      User = Identity.CreateFakeClaimsPrincipal(userId, Guid.NewGuid())
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
    var fakeContext = new DefaultHttpContext()
    {
      User = Identity.CreateFakeClaimsPrincipal("not a valid userId", Guid.NewGuid())
    };
    
    accessor.Setup(acc => acc
        .HttpContext)
      .Returns(fakeContext);

    var result = new ContextService(accessor.Object).GetCurrentUserId();

    result.Should().Be(default);
  }
}