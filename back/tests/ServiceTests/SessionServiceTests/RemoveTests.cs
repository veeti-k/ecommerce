using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.SessionServiceTests;

public class RemoveTests
{
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private ISessionService _sessionService;
  private readonly int randomNumber = new Random().Next(1, Int32.MaxValue);
  
  public RemoveTests()
  {
    _sessionService = new SessionService(_mockSessionRepo.Object);
  }
  
  [Fact]
  public async Task Remove_WithExistingSession_RemovesSession()
  {
    var userId = randomNumber;
    var existingSession = Sessions.CreateFakeSession(randomNumber);

    _mockSessionRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync(existingSession);

    await _sessionService.Remove(userId, existingSession.Id);

    _mockSessionRepo.Verify(mock => mock
      .Remove(It.IsAny<Session>()), Times.Once);
  }

  [Fact]
  public async Task Remove_WithNoExistingSession_ThrowsNotFoundException()
  {
    var userId = randomNumber;

    _mockSessionRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync((Session) null);

    Func<Task> test = async () => await _sessionService.Remove(userId, Guid.NewGuid());

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "Session not found"
      });

    _mockSessionRepo.Verify(mock => mock
      .Remove(It.IsAny<Session>()), Times.Never);
  }
}