using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Tokens : EndpointBaseSync
  .WithoutRequest
  .WithActionResult<object>
{
  private readonly IAuthService _authService;

  public Tokens(IAuthService aAuthService)
  {
    _authService = aAuthService;
  }

  [Authorize(Policy = Policies.ValidRefreshToken)]
  [HttpGet(Routes.Auth.Tokens)]
  public override ActionResult<object> Handle()
  {
    var accessToken = _authService.RefreshTokens();

    return Ok(new {accessToken});
  }
}