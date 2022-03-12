using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Configs;
using api.Controllers;
using api.Models;
using api.Repositories.User;
using api.Utils;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ControllerTests.AuthControllerTests;

public class LogoutTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();

  [Fact]
  public async Task Logout_NotAuthenticated_ReturnsNoContent_DoesNotQueryDb_SetsCorrectHeaders()
  {
    _mockUserRepo.Setup(repo => repo
        .GetOneById(It.IsAny<Guid>()))
      .Verifiable();

    var fakeContext = new DefaultHttpContext();
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, "this is not a guid so the userId will be null in the controller"),
      new(ClaimTypes.Version, "a not valid token version here even though this is not getting tested")
    };
    var identity = new ClaimsIdentity(claims, "test");
    var claimsPrincipal = new ClaimsPrincipal(identity);

    fakeContext.User = claimsPrincipal;

    var controller = new AuthController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Logout();

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString();
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader].ToString();

    _mockUserRepo.Verify(repo => repo
      .GetOneById(It.IsAny<Guid>()), Times.Never());

    result.StatusCode.Should().Be(StatusCodes.Status204NoContent);

    resRefreshToken.Should().Be(Tokens.CreateEmptyRefreshTokenCookie());
    resAccessToken.Should().Be("");
  }

  [Fact]
  public async Task
    Logout_Authenticated_WithNotATestAccount_ReturnsNoContent_QueriesDb_DoesNotDeleteAccount_SetsCorrectHeaders()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetOneById(It.IsAny<Guid>()))
      .ReturnsAsync(existingUser);

    _mockUserRepo.Setup(repo => repo
        .Delete(It.IsAny<User>()))
      .Verifiable();

    var fakeContext = new DefaultHttpContext();
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, existingUser.Id.ToString()),
      new(ClaimTypes.Version, existingUser.TokenVersion.ToString())
    };
    var identity = new ClaimsIdentity(claims, "test");
    var claimsPrincipal = new ClaimsPrincipal(identity);

    fakeContext.User = claimsPrincipal;

    var controller = new AuthController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Logout();

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString();
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader].ToString();

    _mockUserRepo.Verify(repo => repo
      .GetOneById(It.IsAny<Guid>()), Times.Once());

    _mockUserRepo.Verify(repo => repo
      .Delete(It.IsAny<User>()), Times.Never());

    result.StatusCode.Should().Be(StatusCodes.Status204NoContent);

    resRefreshToken.Should().Be(Tokens.CreateEmptyRefreshTokenCookie());
    resAccessToken.Should().Be("");
  }

  [Fact]
  public async Task
    Logout_Authenticated_WithATestAccount_ReturnsNoContent_QueriesDb_DeletesAccount_SetsCorrectHeaders()
  {
    var existingUser = Users.CreateFakeUser(isTestAccount: true);

    _mockUserRepo.Setup(repo => repo
        .GetOneById(It.IsAny<Guid>()))
      .ReturnsAsync(existingUser);

    _mockUserRepo.Setup(repo => repo
        .Delete(It.IsAny<User>()))
      .Verifiable();

    var fakeContext = new DefaultHttpContext();
    var claims = new List<Claim>()
    {
      new(ClaimTypes.NameIdentifier, existingUser.Id.ToString()),
      new(ClaimTypes.Version, existingUser.TokenVersion.ToString())
    };
    var identity = new ClaimsIdentity(claims, "test");
    var claimsPrincipal = new ClaimsPrincipal(identity);

    fakeContext.User = claimsPrincipal;

    var controller = new AuthController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Logout();

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString();
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader].ToString();

    _mockUserRepo.Verify(repo => repo
      .GetOneById(It.IsAny<Guid>()), Times.Once());

    _mockUserRepo.Verify(repo => repo
      .Delete(It.IsAny<User>()), Times.Once);

    result.StatusCode.Should().Be(StatusCodes.Status204NoContent);

    resRefreshToken.Should().Be(Tokens.CreateEmptyRefreshTokenCookie());
    resAccessToken.Should().Be("");
  }
}