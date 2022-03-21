using api.DTOs;
using api.Mapping.MappedTypes;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User;

public class UpdateUserFlagsRequest
{
  [FromRoute(Name = "userId")] public int userId { get; set; }
  [FromBody] public UpdateUserFlagsDTO Dto { get; set; }
}

public class UpdateUserFlags : EndpointBaseAsync
  .WithRequest<UpdateUserFlagsRequest>
  .WithActionResult<UserResponse>
{
  private readonly IUserService _userService;

  public UpdateUserFlags(IUserService aUserService)
  {
    _userService = aUserService;
  }

  [Authorize(Policy = Policies.Administrator)]
  [HttpPatch(Routes.Users.User.Flags)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    [FromRoute] UpdateUserFlagsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var updated = await _userService.UpdateFlags(request.Dto, request.userId);

    return updated;
  }
}