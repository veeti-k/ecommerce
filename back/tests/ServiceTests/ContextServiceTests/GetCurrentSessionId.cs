using System;
using api.Services;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.ContextServiceTests;

public class GetCurrentSessionId
{
  private readonly int randomInt = new Random().Next(1, Int32.MaxValue);

  [Fact]
  public void GetCurrentSessionId_WithGoodSessionId_ReturnsSessionId()
  {
    var sessionId = Guid.NewGuid();
    
    var accessor = new Mock<IHttpContextAccessor>();
    var fakeContext = new DefaultHttpContext()
    {
      User = Identity.CreateFakeClaimsPrincipal(randomInt, sessionId)
    };
    
    accessor.Setup(acc => acc
        .HttpContext)
      .Returns(fakeContext);

    var result = new ContextService(accessor.Object).GetCurrentSessionId();

    result.Should().Be(sessionId);
  }
  
  [Fact]
  public void GetCurrentSessionId_WithBadSessionId_ReturnsDefault()
  {
    var accessor = new Mock<IHttpContextAccessor>();
    var fakeContext = new DefaultHttpContext()
    {
      User = Identity.CreateFakeClaimsPrincipal(randomInt, "not a valid sessionId")
    };
    
    accessor.Setup(acc => acc
        .HttpContext)
      .Returns(fakeContext);

    var result = new ContextService(accessor.Object).GetCurrentSessionId();

    result.Should().Be((Guid)default);
  }
}