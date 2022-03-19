using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Logout : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult
{
  private readonly IAuthService _authService;

  public Logout(IAuthService aAuthService)
  {
    _authService = aAuthService;
  }

  [HttpGet(Routes.Auth.Logout)]
  public override async Task<ActionResult> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _authService.Logout();
    
    return NoContent();
  }
}