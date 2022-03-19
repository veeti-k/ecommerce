﻿using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
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
    var existingSession = Sessions.CreateFakeSession(randomNumber);

    _mockSessionRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync(existingSession);

    await _sessionService.Remove(existingSession.Id);

    _mockSessionRepo.Verify(mock => mock
      .Remove(It.IsAny<Session>()), Times.Once);
  }

  [Fact]
  public async Task Remove_WithNoExistingSession_DoesNotTryToRemoveSession()
  {
    _mockSessionRepo.Setup(mock => mock
        .GetOneByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync((Session) null);

    await _sessionService.Remove(Guid.NewGuid());

    _mockSessionRepo.Verify(mock => mock
      .Remove(It.IsAny<Session>()), Times.Never);
  }
}