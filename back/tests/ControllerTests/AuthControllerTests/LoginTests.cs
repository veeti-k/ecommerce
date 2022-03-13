using System;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Configs;
using api.Controllers;
using api.DTOs.Auth;
using api.Models;
using api.Repositories.Session;
using api.Repositories.User;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ControllerTests.AuthControllerTests;

public class LoginTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private readonly TokenDecoding _tokenDecoding;

  public LoginTests()
  {
    _tokenDecoding = new TokenDecoding();
  }

  [Fact]
  public async Task Login_WithExistingUser_WithCorrectCredentials_CreatesSession_SetsCorrectHeaders_ReturnsNoContent()
  {
    var password = Guid.NewGuid().ToString();
    var existingUser = Users.CreateFakeUser(password: password);
    var newSession = Sessions.CreateFakeSession(existingUser.Id);
    LoginDTO testDto = new()
    {
      Email = existingUser.Email,
      Password = password
    };

    _mockUserRepo.Setup(repo => repo
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync(existingUser);

    _mockSessionRepo.Setup(repo => repo
        .Create(It.IsAny<Guid>()))
      .ReturnsAsync(newSession);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(testDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie.ToString().Split("=")[1].Split(";")[0];
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader];

    (result.Result as NoContentResult)
      .StatusCode
      .Should().Be(StatusCodes.Status204NoContent);

    var refreshToken = _tokenDecoding.DecodeRefreshToken(resRefreshToken);
    var accessToken = _tokenDecoding.DecodeAccessToken(resAccessToken);

    _mockUserRepo.Verify(repo => repo
      .GetByEmail(It.IsAny<string>()), Times.Once());

    _mockSessionRepo.Verify(repo => repo
      .Create(It.IsAny<Guid>()), Times.Once());

    refreshToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
      .Value
      .Should().Be(existingUser.Id.ToString());

    refreshToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.Version)
      .Value
      .Should().Be(newSession.Id.ToString());

    accessToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
      .Value
      .Should().Be(existingUser.Id.ToString());

    accessToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.Version)
      .Value
      .Should().Be(newSession.Id.ToString());
  }

  [Fact]
  public async Task
    Login_WithExistingUser_WithInvalidPassword_ReturnsBadRequest_ReturnsCorrectMessage_DoesNotSetHeaders()
  {
    var existingUser = Users.CreateFakeUser();
    LoginDTO testDto = new()
    {
      Email = existingUser.Email,
      Password = Guid.NewGuid().ToString()
    };

    _mockUserRepo.Setup(repo => repo
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(testDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader];

    _mockUserRepo.Verify(repo => repo
      .GetByEmail(It.IsAny<string>()), Times.Once());

    (result.Result as BadRequestObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status400BadRequest);

    (result.Result as BadRequestObjectResult)
      .Value
      .Should().Be("Invalid password");

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();
  }

  [Fact]
  public async Task Login_WithNoExistingUser_ReturnsNotFound_DoesNotSetHeaders()
  {
    var existingUser = Users.CreateFakeUser();
    LoginDTO testDto = new()
    {
      Email = existingUser.Email,
      Password = existingUser.Password
    };

    _mockUserRepo.Setup(repo => repo
        .GetOneByFilter(It.IsAny<Expression<Func<User, bool>>>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(testDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader];

    _mockSessionRepo.Verify(repo => repo
      .Create(It.IsAny<Guid>()), Times.Never());

    (result.Result as NotFoundObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status404NotFound);

    (result.Result as NotFoundObjectResult)
      .Value
      .Should().Be("User not found");

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();
  }
}