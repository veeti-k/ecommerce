using api.Security;
using api.Services.Interfaces;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Tokens : EndpointBaseSync
  .WithoutRequest
  .WithActionResult
{
  private readonly IAuthUtils _authUtils;
  private readonly ITokenUtils _tokenUtils;
  private readonly IContextService _contextService;

  public Tokens(
    IAuthUtils aAuthUtils,
    ITokenUtils aTokenUtils,
    IContextService aContextService)
  {
    _authUtils = aAuthUtils;
    _tokenUtils = aTokenUtils;
    _contextService = aContextService;
  }

  [Authorize(Policy = CrucialStrings.ValidRefreshToken)]
  [HttpGet(Routes.Auth.Tokens)]
  public override ActionResult Handle()
  {
    var userId = _contextService.GetCurrentUserId();
    var sessionId = _contextService.GetCurrentSessionId();

    _authUtils.SendTokens(
      _tokenUtils.CreateAccessToken(userId, sessionId),
      _tokenUtils.CreateRefreshToken(userId, sessionId));

    return NoContent();
  }
}