using api.DTOs.Auth;
using api.Exceptions;
using api.Security;
using api.Services.Interfaces;
using api.Utils;
using api.Utils.Interfaces;

namespace api.Services;

public class AuthService : IAuthService
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IUserService _userService;
  private readonly ISessionService _sessionService;
  private readonly IContextService _contextService;

  public AuthService(
    IAuthUtils aAuthUtils,
    ITokenUtils aTokenUtils,
    IUserService aUserService,
    ISessionService aSessionService, 
    IContextService aContextService)
  {
    _authUtils = aAuthUtils;
    _tokenUtils = aTokenUtils;
    _userService = aUserService;
    _sessionService = aSessionService;
    _contextService = aContextService;
  }

  public async Task Login(LoginDTO dto)
  {
    var existingUser = await _userService.GetByEmail(dto.Email);
    if (existingUser is null) throw new UnauthorizedException("Invalid email");

    var passwordMatch = Hashing.Verify(dto.Password, existingUser.Password);
    if (!passwordMatch) throw new UnauthorizedException("Invalid password");

    var newSession = await _sessionService.Create(existingUser.Id);

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(existingUser.Id, newSession.Id),
      _tokenUtils.CreateRefreshToken(existingUser.Id, newSession.Id)
    );
  }

  public async Task Logout()
  {
    var userId = _contextService.GetCurrentUserId();
    if (userId != null)
    {
      var sessionId = _contextService.GetCurrentSessionId();
      await _sessionService.Remove(sessionId);

      var user = await _userService.GetById(userId);
      if (user != null && Flags.HasFlag(user.Flags, Flags.TEST_ACCOUNT))
        await _userService.Remove(user.Id); // delete test accounts on logout
    }

    _authUtils.SendLogout();
  }

  public async Task Register(RegisterDTO dto)
  {
    var newUser = await _userService.Create(dto);
    var newSession = await _sessionService.Create(newUser.Id);

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(newUser.Id, newSession.Id),
      _tokenUtils.CreateRefreshToken(newUser.Id, newSession.Id)
    );
  }

  public void RefreshTokens()
  {
    var userId = _contextService.GetCurrentUserId();
    var sessionId = _contextService.GetCurrentSessionId();

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(userId, sessionId),
      _tokenUtils.CreateRefreshToken(userId, sessionId));
  }
}