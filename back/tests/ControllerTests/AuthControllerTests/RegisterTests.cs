using System;
using System.Linq;
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

public class RegisterTests
{
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private readonly TokenDecoding _tokenDecoding;

  public RegisterTests()
  {
    _tokenDecoding = new TokenDecoding();
  }

  [Fact]
  public async Task Register_WithUniqueParams_SetsCorrectHeaders_ReturnsNoContent()
  {
    RegisterDTO testDto = new()
    {
      Email = "test@test.test",
      FirstName = Guid.NewGuid().ToString(),
      LastName = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = "12345"
    };

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    _mockUserRepo.Setup(mock => mock
        .GetByPhoneNumber(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Register(testDto);
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
  public async Task Register_WithExistingEmail_DoesNotSetHeaders_ReturnsConflict_ReturnsCorrectMessage()
  {
    RegisterDTO testDto = new()
    {
      Email = "test@test.test",
      FirstName = Guid.NewGuid().ToString(),
      LastName = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = "12345"
    };

    var user = Users.CreateFakeUser();

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync(user);

    _mockUserRepo.Setup(mock => mock
        .GetByPhoneNumber(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Register(testDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader];

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();

    (result.Result as ConflictObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status409Conflict);
    (result.Result as ConflictObjectResult)
      .Value.Should().Be("Email in use");
  }

  [Fact]
  public async Task Register_WithExistingPhoneNumber_DoesNotSetHeaders_ReturnsConflict_ReturnsCorrectMessage()
  {
    RegisterDTO testDto = new()
    {
      Email = "test@test.test",
      FirstName = Guid.NewGuid().ToString(),
      LastName = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = "12345"
    };

    var user = Users.CreateFakeUser();

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    _mockUserRepo.Setup(mock => mock
        .GetByPhoneNumber(It.IsAny<string>()))
      .ReturnsAsync(user);

    var fakeContext = new DefaultHttpContext();
    var controller = new AuthController(_mockUserRepo.Object, _mockSessionRepo.Object)
    {
      ControllerContext = new ControllerContext()
      {
        HttpContext = fakeContext
      }
    };

    var result = await controller.Register(testDto);
    var resRefreshToken = fakeContext.Response.Headers.SetCookie;
    var resAccessToken = fakeContext.Response.Headers[TokenConfig.AccessTokenHeader];

    resRefreshToken.Should().BeEmpty();
    resAccessToken.Should().BeEmpty();

    (result.Result as ConflictObjectResult)
      .StatusCode
      .Should().Be(StatusCodes.Status409Conflict);
    (result.Result as ConflictObjectResult)
      .Value.Should().Be("Phone number in use");
  }
}