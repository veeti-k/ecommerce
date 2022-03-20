using System;
using System.Collections.Generic;
using System.Linq;
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

public class RemoveManyTests
{
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private readonly int randomNumber = new Random().Next(1, 20);

  private ISessionService _sessionService;

  public RemoveManyTests()
  {
    _sessionService = new SessionService(_mockSessionRepo.Object);
  }

  [Fact]
  public async Task RemoveMany_WithExistingSessions_RemovesSessions()
  {
    var userId = randomNumber;

    var existingSessions = new List<Session> {
      Sessions.CreateFakeSession(randomNumber),
      Sessions.CreateFakeSession(randomNumber),
      Sessions.CreateFakeSession(randomNumber),
    };

    var ids = existingSessions.Select(session => session.Id).ToList();

    _mockSessionRepo.Setup(mock => mock
        .GetManyByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync(existingSessions);

    await _sessionService.RemoveMany(ids, userId);

    _mockSessionRepo.Verify(mock => mock
      .RemoveMany(It.IsAny<IEnumerable<Session>>()), Times.Once);
  }

  [Fact]
  public async Task RemoveMany_WithNoExistingSessions_DoesNotTryToRemove()
  {
    var userId = randomNumber;

    var emptyList = Enumerable.Empty<Session>;

    var ids = Enumerable.Repeat(Guid.NewGuid(), randomNumber).ToList();

    _mockSessionRepo.Setup(mock => mock
        .GetManyByFilter(It.IsAny<Expression<Func<Session, bool>>>()))
      .ReturnsAsync(emptyList);

    await _sessionService.RemoveMany(ids, userId);

    _mockSessionRepo.Verify(mock => mock
      .RemoveMany(It.IsAny<IEnumerable<Session>>()), Times.Never);
  }
}