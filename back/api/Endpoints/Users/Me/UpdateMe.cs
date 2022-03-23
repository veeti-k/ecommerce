using api.DTOs;
using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me;

public class UpdateMe : EndpointBaseAsync
  .WithRequest<UpdateUserDTO>
  .WithActionResult<UserResponse>
{
  private readonly IUserService _userService;
  private readonly IContextService _contextService;

  public UpdateMe(IUserService aUserService, IContextService aContextService)
  {
    _userService = aUserService;
    _contextService = aContextService;
  }

  [Authorize]
  [HttpPatch(Routes.Users.MeRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(UpdateUserDTO dto, CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var updated = await _userService.Update(dto, userId);

    return Ok(updated);
  }
}