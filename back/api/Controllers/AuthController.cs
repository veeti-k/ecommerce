using api.DTOs.Auth;
using api.Services.Interfaces;
using api.Utils;
using api.Utils.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : BaseController
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IUserService _userService;
  private readonly ISessionService _sessionService;

  public AuthController(
    IAuthUtils aAuthUtils,
    ITokenUtils aTokenUtils,
    IUserService aUserService,
    ISessionService aSessionRepo
  )
  {
    _authUtils = aAuthUtils;
    _tokenUtils = aTokenUtils;
    _userService = aUserService;
    _sessionService = aSessionRepo;
  }


  [HttpPost("register")]
  public async Task<ActionResult<string>> Register(RegisterDTO aDto)
  {
    var newUser = await _userService.Create(aDto);
    var newSession = await _sessionService.Create(newUser.Id);

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(newUser.Id, newSession.Id),
      _tokenUtils.CreateRefreshToken(newUser.Id, newSession.Id)
    );

    return NoContent();
  }

  [HttpPost("login")]
  public async Task<ActionResult<string>> Login(LoginDTO aDto)
  {
    var existingUser = await _userService.GetByEmail(aDto.Email);
    if (existingUser == null) return NotFound("User not found");

    var passwordMatch = Hashing.Verify(aDto.Password, existingUser.Password);
    if (!passwordMatch) return BadRequest("Invalid password");

    var newSession = await _sessionService.Create(existingUser.Id);

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(existingUser.Id, newSession.Id),
      _tokenUtils.CreateRefreshToken(existingUser.Id, newSession.Id)
    );

    return NoContent();
  }

  [HttpPost("logout")]
  public async Task<NoContentResult> Logout()
  {
    var userId = GetUserId().GetValueOrDefault();
    if (userId != null)
    {
      var sessionId = GetSessionId().GetValueOrDefault();
      await _sessionService.Remove(sessionId);

      var user = await _userService.GetById(userId);
      if (user != null && user.isTestAccount) await _userService.Remove(user); // delete test accounts on logout
    }

    _authUtils.SendLogout();
    return NoContent();
  }

  [HttpGet("tokens")]
  [Authorize(Policy = "ValidRefreshToken")]
  public ActionResult<string> GetTokens()
  {
    var userId = GetUserId().GetValueOrDefault();
    var sessionId = GetSessionId().GetValueOrDefault();

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(userId, sessionId),
      _tokenUtils.CreateRefreshToken(userId, sessionId));

    return NoContent();
  }
}