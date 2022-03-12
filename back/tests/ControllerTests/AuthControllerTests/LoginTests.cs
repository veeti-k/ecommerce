using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Configs;
using api.Controllers;
using api.DTOs.Auth;
using api.Models;
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
  private readonly TokenDecoding _tokenDecoding;

  public LoginTests()
  {
    _tokenDecoding = new TokenDecoding();
  }

  [Fact]
  public async Task Login_WithExistingUser_WithCorrectCredentials_ReturnsNoContent_SetsCorrectHeaders()
  {
    var password = Guid.NewGuid().ToString();
    var existingUser = Users.CreateFakeUser(password);
    LoginDTO testDto = new()
    {
      Email = existingUser.Email,
      Password = password
    };

    _mockUserRepo.Setup(repo => repo
        .GetOneByEmail(It.IsAny<string>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object)
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

    refreshToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
      .Value
      .Should().NotBeNull();

    refreshToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.Version)
      .Value
      .Should().NotBeNull();

    accessToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
      .Value
      .Should().NotBeNull();

    accessToken.Claims
      .FirstOrDefault(c => c.Type == ClaimTypes.Version)
      .Value
      .Should().NotBeNull();
  }
  
  [Fact]
  public async Task Login_WithExistingUser_WithInvalidPassword_ReturnsBadRequest_ReturnsCorrectMessage_DoesNotSetHeaders()
  {
    var existingUser = Users.CreateFakeUser();
    LoginDTO testDto = new()
    {
      Email = existingUser.Email,
      Password = Guid.NewGuid().ToString()
    };

    _mockUserRepo.Setup(repo => repo
        .GetOneByEmail(It.IsAny<string>()))
      .ReturnsAsync(existingUser);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(testDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader];

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
        .GetOneByEmail(It.IsAny<string>()))
      .ReturnsAsync((User)null);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Login(testDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader];

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