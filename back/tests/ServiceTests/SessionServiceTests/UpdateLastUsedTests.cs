using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.SessionServiceTests;

public class UpdateLastUsedTests
{
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private ISessionService _sessionService;

  public UpdateLastUsedTests()
  {
    _sessionService = new SessionService(_mockSessionRepo.Object);
  }
  
  [Fact]
  public async Task UpdateLastUsedAt_WithExistingSession_UpdatesSession()
  {
    var existingSession = Sessions.CreateFakeSession(Guid.NewGuid());
    var lastUsedAt = existingSession.LastUsedAt;

    _mockSessionRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync(existingSession);

    await _sessionService.UpdateLastUsedAt(existingSession.Id);

    _mockSessionRepo.Verify(mock => mock
      .Update(It.IsAny<Session>()), Times.Once);

    existingSession.LastUsedAt.Should().NotBe(lastUsedAt);
  }
  
  [Fact]
  public async Task UpdateLastUsedAt_WithNoExistingSession_DoesNotUpdateSession()
  {
    _mockSessionRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync((Session) null);

    await _sessionService.UpdateLastUsedAt(Guid.NewGuid());

    _mockSessionRepo.Verify(mock => mock
      .Update(It.IsAny<Session>()), Times.Never);
  }
}