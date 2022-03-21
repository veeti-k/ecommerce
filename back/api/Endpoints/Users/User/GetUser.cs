using api.Mapping.MappedTypes;
using api.Security.Policies;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.User;

public class GetUser : EndpointBaseAsync
  .WithRequest<int>
  .WithActionResult<UserResponse>
{
  private readonly IUserService _userService;

  public GetUser(IUserService aUserService)
  {
    _userService = aUserService;
  }

  [HttpGet(Routes.Users.UserRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync([FromRoute] int userId,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var user = await _userService.GetById(userId);

    return Ok(user);
  }
}