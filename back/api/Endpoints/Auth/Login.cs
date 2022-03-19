using api.DTOs.Auth;
using api.Services.Interfaces;
using api.Utils;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Login : EndpointBaseAsync
  .WithRequest<LoginDTO>
  .WithActionResult
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IUserService _userService;
  private readonly ISessionService _sessionService;

  public Login(
    IAuthUtils authUtils,
    ITokenUtils tokenUtils,
    IUserService userService,
    ISessionService sessionService)
  {
    _authUtils = authUtils;
    _tokenUtils = tokenUtils;
    _userService = userService;
    _sessionService = sessionService;
  }

  [HttpPost(Routes.Auth.Login)]
  public override async Task<ActionResult> HandleAsync(
    LoginDTO dto,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var existingUser = await _userService.GetByEmail(dto.Email);
    if (existingUser is null) return NotFound("User not found");

    var passwordMatch = Hashing.Verify(dto.Password, existingUser.Password);
    if (!passwordMatch) return BadRequest("Invalid password");

    var newSession = await _sessionService.Create(existingUser.Id);

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(existingUser.Id, newSession.Id),
      _tokenUtils.CreateRefreshToken(existingUser.Id, newSession.Id)
    );

    return NoContent();
  }
}