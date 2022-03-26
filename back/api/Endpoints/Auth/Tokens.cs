using api.Security.Policies;
using api.Services.Interfaces;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Tokens : EndpointBaseSync
  .WithoutRequest
  .WithActionResult<object>
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IContextService _contextService;

  public Tokens(
    IAuthUtils authUtils,
    ITokenUtils tokenUtils,
    IContextService contextService)
  {
    _authUtils = authUtils;
    _tokenUtils = tokenUtils;
    _contextService = contextService;
  }

  [Authorize(Policy = Policies.ValidRefreshToken)]
  [HttpGet(Routes.Auth.Tokens)]
  public override ActionResult<object> Handle()
  {
    var userId = _contextService.GetCurrentUserId();
    var sessionId = _contextService.GetCurrentSessionId();
    var userFlags = _contextService.GetCurrentUserFlags();

    var accessToken = _tokenUtils.CreateAccessToken(userId, sessionId, userFlags);
    var refreshToken = _tokenUtils.CreateRefreshToken(userId, sessionId, userFlags);

    _authUtils.SendTokens(accessToken, refreshToken);

    return Ok(new {accessToken});
  }
}