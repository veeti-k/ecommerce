using api.DTOs.Auth;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Register : EndpointBaseAsync
  .WithRequest<RegisterDTO>
  .WithActionResult<object>
{
  private readonly IAuthService _authService;

  public Register(IAuthService aAuthService)
  {
    _authService = aAuthService;
  }

  [HttpPost(Routes.Auth.Register)]
  public override async Task<ActionResult<object>> HandleAsync(
    RegisterDTO dto,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var accessToken = await _authService.Register(dto);

    return Ok(new {accessToken});
  }
}