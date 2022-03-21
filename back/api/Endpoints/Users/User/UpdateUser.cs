using api.DTOs;
using api.Mapping.MappedTypes;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User;

public class UpdateUserRequest
{
  [FromRoute(Name = "userId")] public int userId { get; set; }
  [FromBody] public UpdateUserDTO Dto { get; set; }
}

public class UpdateUser : EndpointBaseAsync
  .WithRequest<UpdateUserRequest>
  .WithActionResult<UserResponse>
{
  private readonly IUserService _userService;

  public UpdateUser(IUserService aUserService)
  {
    _userService = aUserService;
  }

  [Authorize]
  [HttpPatch(Routes.Users.UserRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    [FromRoute] UpdateUserRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var updated = await _userService.Update(request.Dto, request.userId);

    return updated;
  }
}