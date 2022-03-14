using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Exceptions;
using api.Models;
using api.Repositories.User;
using api.Services;
using api.Services.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.UserServiceTests;

public class GetByIdTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly IUserService _userService;

  public GetByIdTests()
  {
    _userService = new UserService(_mockUserRepo.Object);
  }

  [Fact]
  public async Task GetById_WithExistingUser_NotRequired_DoesNotThrow_ReturnsExistingUser()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    Func<Task<User>> test = async () => await _userService.GetById(existingUser.Id);

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeSameAs(existingUser);
    ;
  }

  [Fact]
  public async Task GetById_WithNoExistingUser_NotRequired_DoesNotThrow_ReturnsNull()
  {
    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    Func<Task<User>> test = async () => await _userService.GetById(Guid.NewGuid());

    await test.Should().NotThrowAsync();
    var result = await test();

    result.Should().BeNull();
  }

  [Fact]
  public async Task GetById_WithNoExistingUser_Required_ThrowsNotFoundException()
  {
    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync((User) null);

    Func<Task<User>> test = async () => await _userService.GetById(Guid.NewGuid(), true);

    (await test.Should().ThrowAsync<NotFoundException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status404NotFound,
        Message = "User not found"
      });
  }
}