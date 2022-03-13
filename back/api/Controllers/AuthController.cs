using api.DTOs.Auth;
using api.Repositories.Session;
using api.Repositories.User;
using api.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : BaseController
{
  private readonly IUserRepo _userRepo;
  private readonly ISessionRepo _sessionRepo;

  public AuthController(IUserRepo userRepo, ISessionRepo sessionRepo)
  {
    _userRepo = userRepo;
    _sessionRepo = sessionRepo;
  }


  [HttpPost("register")]
  public async Task<ActionResult<string>> Register(RegisterDTO aDto)
  {
    var newUser = await _userRepo.Create(aDto);
    var newSession = await _sessionRepo.Create(newUser.Id);

    Tokens.SendTokens(
      HttpContext,
      Tokens.CreateAccessToken(newUser, newSession.Id),
      Tokens.CreateRefreshToken(newUser, newSession.Id));

    return NoContent();
  }

  [HttpPost("login")]
  public async Task<ActionResult<string>> Login(LoginDTO aDto)
  {
    var existingUser = await _userRepo.GetByEmail(aDto.Email);
    if (existingUser == null) return NotFound("User not found");

    var passwordMatch = Hashing.Verify(aDto.Password, existingUser.Password);
    if (!passwordMatch) return BadRequest("Invalid password");

    var newSession = await _sessionRepo.Create(existingUser.Id);

    Tokens.SendTokens(
      HttpContext,
      Tokens.CreateAccessToken(existingUser, newSession.Id),
      Tokens.CreateRefreshToken(existingUser, newSession.Id));

    return NoContent();
  }

  [HttpPost("logout")]
  public async Task<NoContentResult> Logout()
  {
    var userId = GetUserId();
    if (userId != null)
    {
      var sessionId = GetSessionId();
      await _sessionRepo.Remove(sessionId);

      var user = await _userRepo.GetById(userId);
      if (user != null && user.isTestAccount) await _userRepo.Remove(user); // delete test accounts on logout
    }

    Tokens.SendLogout(HttpContext);
    return NoContent();
  }

  [HttpGet("tokens")]
  [Authorize(Policy = "ValidRefreshToken")]
  public async Task<ActionResult<string>> GetTokens()
  {
    var userId = GetUserId();
    var sessionId = GetSessionId();

    var existingUser = await _userRepo.GetById(userId);

    Tokens.SendTokens(
      HttpContext,
      Tokens.CreateAccessToken(existingUser, sessionId),
      Tokens.CreateRefreshToken(existingUser, sessionId));

    return NoContent();
  }
}