using System;
using System.Threading.Tasks;
using api.Models;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.SessionServiceTests;

public class CreateTests
{
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private ISessionService _sessionService;

  public CreateTests()
  {
    _sessionService = new SessionService(_mockSessionRepo.Object);
  }

  [Fact]
  public async Task Create_CreatesNewSession_CallsDb_ReturnsNewSession()
  {
    var newSession = Sessions.CreateFakeSession(Guid.NewGuid());

    var session = await _sessionService.Create(newSession.UserId);

    _mockSessionRepo.Verify(mock => mock
      .Create(It.IsAny<Session>()), Times.Once);

    session.Id.ToString().Should().NotBeNullOrWhiteSpace();
    session.UserId.Should().Be(newSession.UserId);
    session.CreatedAt.Should().BeCloseTo(DateTimeOffset.UtcNow, TimeSpan.FromSeconds(5));
    session.LastUsedAt.Should().BeCloseTo(DateTimeOffset.UtcNow, TimeSpan.FromSeconds(5));
  }
}