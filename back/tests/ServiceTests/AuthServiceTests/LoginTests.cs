using System;
using System.Threading.Tasks;
using api.DTOs.Auth;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Services;
using api.Services.Interfaces;
using api.Utils;
using api.Utils.Interfaces;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Moq;
using tests.ControllerTests.Utils;
using Xunit;

namespace tests.ServiceTests.AuthServiceTests;

[Collection("TokenThings")]
public class LoginTests
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly ISessionService _sessionService;
  private readonly IContextService _contextService;
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private readonly Mock<IHttpContextAccessor> _mockAccessor = new();

  public LoginTests(TokenThingsFixture tokenThings)
  {
    var cookieUtils = new CookieUtils(tokenThings.TokenOptions);
    var tokenOptions = tokenThings.TokenOptions;
    _authUtils = new AuthUtils(cookieUtils, _mockAccessor.Object, tokenOptions);
    _tokenUtils = new TokenUtils(tokenThings.TokenOptions);
    _sessionService = new SessionService(_mockSessionRepo.Object);
    _contextService = new ContextService(_mockAccessor.Object);
  }

  [Fact]
  public async Task Login_WithCorrectCredentials_DoesLoginThings()
  {
    var loginDto = new LoginDTO()
    {
      Email = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
    };

    var existingUser = Users.CreateFakeUserFromDto(loginDto);
    var fakeContext = new DefaultHttpContext();

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync(existingUser);

    _mockAccessor.Setup(mock => mock.HttpContext)
      .Returns(fakeContext);

    await new AuthService(_mockUserRepo.Object, _authUtils, _tokenUtils, _sessionService, _contextService)
      .Login(loginDto);

    _mockSessionRepo.Verify(mock => mock
      .Create(It.IsAny<Session>()), Times.Once);
  }

  [Fact]
  public async Task Login_WithInvalidEmail_ThrowsCorrectly()
  {
    var loginDto = new LoginDTO()
    {
      Email = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
    };

    var fakeContext = new DefaultHttpContext();

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    _mockAccessor.Setup(mock => mock.HttpContext)
      .Returns(fakeContext);

    var authService = new AuthService(_mockUserRepo.Object, _authUtils, _tokenUtils, _sessionService, _contextService);

    Func<Task> test = async () => await authService.Login(loginDto);

    (await test.Should().ThrowAsync<UnauthorizedException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status401Unauthorized,
        Message = "Invalid email"
      });

    _mockSessionRepo.Verify(mock => mock
      .Create(It.IsAny<Session>()), Times.Never);
  }

  [Fact]
  public async Task Login_WithInvalidPassword_ThrowsCorrectly()
  {
    var loginDto = new LoginDTO()
    {
      Email = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
    };

    var existingUser = Users.CreateFakeUserFromDto(loginDto);
    existingUser.Password = Hashing.HashToString(Guid.NewGuid().ToString());

    var fakeContext = new DefaultHttpContext();

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync(existingUser);

    _mockAccessor.Setup(mock => mock.HttpContext)
      .Returns(fakeContext);

    var authService = new AuthService(_mockUserRepo.Object, _authUtils, _tokenUtils, _sessionService, _contextService);

    Func<Task> test = async () => await authService.Login(loginDto);

    (await test.Should().ThrowAsync<UnauthorizedException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status401Unauthorized,
        Message = "Invalid password"
      });

    _mockSessionRepo.Verify(mock => mock
      .Create(It.IsAny<Session>()), Times.Never);
  }
}