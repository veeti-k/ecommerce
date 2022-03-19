using api.DTOs.Auth;
using api.Services.Interfaces;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Register : EndpointBaseAsync
  .WithRequest<RegisterDTO>
  .WithActionResult
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IUserService _userService;
  private readonly ISessionService _sessionService;

  public Register(
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

  [HttpGet(Routes.Auth.Register)]
  public override async Task<ActionResult> HandleAsync(
    RegisterDTO dto,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var newUser = await _userService.Create(dto);
    var newSession = await _sessionService.Create(newUser.Id);

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(newUser.Id, newSession.Id),
      _tokenUtils.CreateRefreshToken(newUser.Id, newSession.Id)
    );

    return NoContent();
  }
}