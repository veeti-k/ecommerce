using api.DTOs.Auth;
using api.Exceptions;
using api.Models.User;
using api.Repositories.Interfaces;
using api.Security;
using api.Services.Interfaces;
using api.Utils;
using api.Utils.Interfaces;

namespace api.Services;

public class AuthService : IAuthService
{
  private readonly IUserRepo _userRepo;
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly ISessionService _sessionService;
  private readonly IContextService _contextService;

  public AuthService(
    IUserRepo aUserRepo,
    IAuthUtils aAuthUtils,
    ITokenUtils aTokenUtils,
    ISessionService aSessionService,
    IContextService aContextService)
  {
    _userRepo = aUserRepo;
    _authUtils = aAuthUtils;
    _tokenUtils = aTokenUtils;
    _sessionService = aSessionService;
    _contextService = aContextService;
  }

  public async Task Login(LoginDTO dto)
  {
    var existingUser = await _userRepo.GetByEmail(dto.Email);
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

      var user = await _userRepo.GetById(userId);
      if (user != null && Flags.HasFlag(user.Flags, Flags.TEST_ACCOUNT))
        await _userRepo.Remove(user); // delete test accounts on logout
    }

    _authUtils.SendLogout();
  }

  public async Task Register(RegisterDTO dto)
  {
    if (await _userRepo.GetByEmail(dto.Email) != null)
      throw new BadRequestException("Email in use");

    if (await _userRepo.GetByPhoneNumber(dto.PhoneNumber) != null)
      throw new BadRequestException("Phone number in use");

    User newUser = new()
    {
      Email = dto.Email,
      Name = $"{dto.FirstName} {dto.LastName}",
      PhoneNumber = dto.PhoneNumber,
      Flags = 0,
      Password = Hashing.HashToString(dto.Password),
      CreatedAt = DateTimeOffset.UtcNow,
    };

    var createdUser = await _userRepo.Add(newUser);
    var newSession = await _sessionService.Create(createdUser.Id);

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(createdUser.Id, newSession.Id),
      _tokenUtils.CreateRefreshToken(createdUser.Id, newSession.Id)
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