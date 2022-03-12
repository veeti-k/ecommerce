using System;
using System.Collections.Generic;
using System.Security.Claims;
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
        .GetOneById(It.IsAny<Guid>()))
      .ReturnsAsync(existingUser);


    var fakeContext = new DefaultHttpContext();
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, existingUser.Id.ToString()),
      new(ClaimTypes.Version, existingUser.TokenVersion.ToString())
    };
    var identity = new ClaimsIdentity(claims, "test");
    var claimsPrincipal = new ClaimsPrincipal(identity);
    
    fakeContext.User = claimsPrincipal;

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
        .GetOneById(It.IsAny<Guid>()))
      .ReturnsAsync((User) null);

    var fakeContext = new DefaultHttpContext();
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, existingUser.Id.ToString()),
      new(ClaimTypes.Version, existingUser.TokenVersion.ToString())
    };
    var identity = new ClaimsIdentity(claims, "test");
    var claimsPrincipal = new ClaimsPrincipal(identity);
    
    fakeContext.User = claimsPrincipal;

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

  [Fact]
  public async Task GetMe_WithAnInvalidUserId_ReturnsUnAuthorized_ReturnsCorrectMessage()
  {
    _mockUserRepo.Setup(repo => repo
        .GetOneById(It.IsAny<Guid>()))
      .Verifiable();

    var fakeContext = new DefaultHttpContext();
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, "a not valid user id here"),
      new(ClaimTypes.Version, "a not valid token version here even though this is not getting tested")
    };
    var identity = new ClaimsIdentity(claims, "test");
    var claimsPrincipal = new ClaimsPrincipal(identity);
    
    fakeContext.User = claimsPrincipal;

    var controller = new UserController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.GetMe();

    _mockUserRepo.Verify(repo => repo
      .GetOneById(It.IsAny<Guid>()), Times.Never());

    (result.Result as UnauthorizedObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status401Unauthorized);

    (result.Result as UnauthorizedObjectResult)
      .Value
      .Should().Be("Invalid userId");
  }
}