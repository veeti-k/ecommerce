using api.DTOs.Auth;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Login : EndpointBaseAsync
  .WithRequest<LoginDTO>
  .WithActionResult
{
  private readonly IAuthService _authService;

  public Login(IAuthService aAuthService)
  {
    _authService = aAuthService;
  }

  [HttpPost(Routes.Auth.Login)]
  public override async Task<ActionResult> HandleAsync(
    LoginDTO dto,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _authService.Login(dto);

    return NoContent();
  }
}