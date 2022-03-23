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
public class RegisterTests
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly Mock<IUserRepo> _mockUserRepo = new();
  private readonly ISessionService _sessionService;
  private readonly IContextService _contextService;
  private readonly Mock<ISessionRepo> _mockSessionRepo = new();
  private readonly Mock<IHttpContextAccessor> _mockAccessor = new();

  public RegisterTests(TokenThingsFixture tokenThings)
  {
    var cookieUtils = new CookieUtils(tokenThings.TokenOptions);
    var tokenOptions = tokenThings.TokenOptions;
    _authUtils = new AuthUtils(cookieUtils, _mockAccessor.Object, tokenOptions);
    _tokenUtils = new TokenUtils(tokenThings.TokenOptions);
    _sessionService = new SessionService(_mockSessionRepo.Object);
    _contextService = new ContextService(_mockAccessor.Object);
  }

  [Fact]
  public async Task Register_WithUniqueCredentials_CreatesUser_DoesRegisterThings()
  {
    RegisterDTO registerDto = new()
    {
      Email = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
    };

    var createdUser = Users.CreateFakeUserFromDto(registerDto);

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    _mockUserRepo.Setup(mock => mock
        .GetByPhoneNumber(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    _mockUserRepo.Setup(mock => mock
        .Add(It.IsAny<User>()))
      .ReturnsAsync(createdUser);

    await new AuthService(_mockUserRepo.Object, _authUtils, _tokenUtils, _sessionService, _contextService)
      .Register(registerDto);

    _mockUserRepo.Verify(mock => mock
      .Add(It.IsAny<User>()), Times.Once);

    _mockSessionRepo.Verify(mock => mock
      .Create(It.IsAny<Session>()), Times.Once);
  }

  [Fact]
  public async Task Register_WithInUseEmail_ThrowsCorrectly_DoesNotDoRegisterThings()
  {
    RegisterDTO registerDto = new()
    {
      Email = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
    };

    var existingUser = Users.CreateFakeUserFromDto(registerDto);

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync(existingUser);

    _mockUserRepo.Setup(mock => mock
        .GetByPhoneNumber(It.IsAny<string>()))
      .ReturnsAsync((User) null);
    var authService = new AuthService(_mockUserRepo.Object, _authUtils, _tokenUtils, _sessionService, _contextService);

    Func<Task> test = async () => await authService.Register(registerDto);

    (await test.Should().ThrowAsync<BadRequestException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status400BadRequest,
        Message = "Email in use"
      });

    _mockUserRepo.Verify(mock => mock
      .Add(It.IsAny<User>()), Times.Never);

    _mockSessionRepo.Verify(mock => mock
      .Create(It.IsAny<Session>()), Times.Never);
  }

  [Fact]
  public async Task Register_WithInUsePhoneNumber_ThrowsCorrectly_DoesNotDoRegisterThings()
  {
    RegisterDTO registerDto = new()
    {
      Email = Guid.NewGuid().ToString(),
      Name = Guid.NewGuid().ToString(),
      Password = Guid.NewGuid().ToString(),
      PhoneNumber = Guid.NewGuid().ToString(),
    };

    var existingUser = Users.CreateFakeUserFromDto(registerDto);

    _mockUserRepo.Setup(mock => mock
        .GetByEmail(It.IsAny<string>()))
      .ReturnsAsync((User) null);

    _mockUserRepo.Setup(mock => mock
        .GetByPhoneNumber(It.IsAny<string>()))
      .ReturnsAsync(existingUser);
    var authService = new AuthService(_mockUserRepo.Object, _authUtils, _tokenUtils, _sessionService, _contextService);

    Func<Task> test = async () => await authService.Register(registerDto);

    (await test.Should().ThrowAsync<BadRequestException>())
      .And.Should().BeEquivalentTo(new
      {
        StatusCode = StatusCodes.Status400BadRequest,
        Message = "Phone number in use"
      });

    _mockUserRepo.Verify(mock => mock
      .Add(It.IsAny<User>()), Times.Never);

    _mockSessionRepo.Verify(mock => mock
      .Create(It.IsAny<Session>()), Times.Never);
  }
}