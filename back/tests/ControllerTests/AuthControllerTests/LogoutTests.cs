using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using api.Configs;
using api.Controllers;
using api.Models;
using api.Repositories.Session;
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
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();

  [Fact]
  public async Task
    Logout_Authenticated_WithNotATestAccount_QueriesDb_DoesNotDeleteAccount_DeletesSession_SetsCorrectHeaders_ReturnsNoContent()
  {
    var existingUser = Users.CreateFakeUser();

    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<Guid>()))
      .ReturnsAsync(existingUser);

    _mockUserRepo.Setup(repo => repo
        .Remove(It.IsAny<User>()))
      .Verifiable();

    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal(existingUser.Id, Guid.NewGuid())
    };

    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Logout();

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString();
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader].ToString();

    _mockSessionRepo.Verify(repo => repo
        .Remove(It.IsAny<Guid>()),
      Times.Once());

    _mockUserRepo.Verify(repo => repo
        .Remove(It.IsAny<User>()),
      Times.Never());

    result.StatusCode.Should().Be(StatusCodes.Status204NoContent);

    resRefreshToken.Should().Be(Tokens.CreateEmptyRefreshTokenCookie());
    resAccessToken.Should().Be("");
  }

  [Fact]
  public async Task
    Logout_Authenticated_WithATestAccount_QueriesDb_DeletesAccount_DeletesSession_SetsCorrectHeaders_ReturnsNoContent()
  {
    var existingUser = Users.CreateFakeUser(isTestAccount: true);

    _mockUserRepo.Setup(repo => repo
        .GetById(It.IsAny<Guid>()))
      .ReturnsAsync(existingUser);

    _mockUserRepo.Setup(repo => repo
        .Remove(It.IsAny<User>()))
      .Verifiable();

    var fakeContext = new DefaultHttpContext
    {
      User = Identity.CreateFakeClaimsPrincipal(existingUser.Id, Guid.NewGuid())
    };

    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Logout();

    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString();
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader].ToString();

    _mockSessionRepo.Verify(repo => repo
        .Remove(It.IsAny<Guid>()),
      Times.Once());

    _mockUserRepo.Verify(repo => repo
        .Remove(It.IsAny<User>()),
      Times.Once());

    result.StatusCode.Should().Be(StatusCodes.Status204NoContent);

    resRefreshToken.Should().Be(Tokens.CreateEmptyRefreshTokenCookie());
    resAccessToken.Should().Be("");
  }
}