using api.Security;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Tokens : EndpointBaseSync
  .WithoutRequest
  .WithActionResult
{
  private readonly IAuthService _authService;

  public Tokens(IAuthService aAuthService)
  {
    _authService = aAuthService;
  }

  [Authorize(Policy = Policies.ValidRefreshToken)]
  [HttpGet(Routes.Auth.Tokens)]
  public override ActionResult Handle()
  {
    _authService.RefreshTokens();

    return NoContent();
  }
}