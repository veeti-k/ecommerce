using api.DTOs.Auth;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Register : EndpointBaseAsync
  .WithRequest<RegisterDTO>
  .WithActionResult
{
  private readonly IAuthService _authService;

  public Register(IAuthService aAuthService)
  {
    _authService = aAuthService;
  }

  [HttpGet(Routes.Auth.Register)]
  public override async Task<ActionResult> HandleAsync(
    RegisterDTO dto,
    CancellationToken cancellationToken = new CancellationToken())
  {
    await _authService.Register(dto);

    return NoContent();
  }
}