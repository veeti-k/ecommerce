using System;
using System.Threading.Tasks;
using api.Controllers;
using api.Models;
using api.Repositories.User;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ControllerTests.UserControllerTests;

public class GetMeTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();

  [Fact]
  public async Task GetMe_WithExistingUser_ReturnsExistingUser_InCorrectFormat()
  {
    var existingUser = Users.CreateFakeUser();
    var userToReturn = Users.CreateFakeUserToReturn(existingUser);

    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<Guid>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal(existingUser.Id, Guid.NewGuid())
    };

    var controller = new UserController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.GetMe();

    (result.Result as OkObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status200OK);

    (result.Result as OkObjectResult)
      .Value
      .Should().BeEquivalentTo(userToReturn);
  }

  [Fact]
  public async Task GetMe_WithNoExistingUser_ReturnsNotFound_ReturnsCorrectMessage()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<Guid>()))
      .ReturnsAsync((User) null);

    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal(existingUser.Id, Guid.NewGuid())
    };

    var controller = new UserController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.GetMe();

    (result.Result as NotFoundObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status404NotFound);

    (result.Result as NotFoundObjectResult)
      .Value
      .Should().Be("User not found");
  }
}