using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Exceptions;
using api.Models;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.UserServiceTests;

public class RemoveTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly IUserService _userService;

  public RemoveTests()
  {
    _userService = new UserService(_mockUserRepo.Object);
  }

  [Fact]
  public async Task Remove_WithUserModel_WithExistingUser_DoesNotThrow()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    Func<Task> test = async () => await _userService.Remove(existingUser);

    await test.Should().NotThrowAsync();
  }

  [Fact]
  public async Task Remove_WithUserModel_WithNoExistingUser_ThrowsNotFoundException()
  {
    var fakeUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    Func<Task> test = async () => await _userService.Remove(fakeUser);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "User not found"
      });
    
    _mockUserRepo.Verify(mock => mock
      .Remove(It.IsAny<User>()), Times.Never);
  }

  [Fact]
  public async Task Remove_WithUserId_WithExistingUser_DoesNotThrow()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    Func<Task> test = async () => await _userService.Remove(Guid.NewGuid());

    await test.Should().NotThrowAsync();
  }

  [Fact]
  public async Task Remove_WithUserId_WithNoExistingUser_ThrowsNotFoundException()
  {
    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    Func<Task> test = async () => await _userService.Remove(Guid.NewGuid());

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "User not found"
      });
    
    _mockUserRepo.Verify(mock => mock
      .Remove(It.IsAny<User>()), Times.Never);
  }
}