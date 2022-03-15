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

public class GetByEmailTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly IUserService _userService;

  public GetByEmailTests()
  {
    _userService = new UserService(_mockUserRepo.Object);
  }

  [Fact]
  public async Task GetByEmail_WithExistingUser_NotRequired_DoesNotThrow_ReturnsExistingUser()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    Func<Task<User>> test = async () => await _userService.GetByEmail(existingUser.Email);

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeSameAs(existingUser);
  }

  [Fact]
  public async Task GetByEmail_WithNoExistingUser_NotRequired_DoesNotThrow_ReturnsNull()
  {
    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    Func<Task<User>> test = async () => await _userService.GetByEmail(Guid.NewGuid().ToString());

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeNull();
  }

  [Fact]
  public async Task GetByEmail_WithNoExistingUser_Required_ThrowsNotFoundException()
  {
    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    Func<Task<User>> test = async () => await _userService.GetByEmail(Guid.NewGuid().ToString(), true);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "User not found"
      });
  }
}