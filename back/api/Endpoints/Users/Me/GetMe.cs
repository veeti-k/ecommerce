using api.Mapping.MappedTypes;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me;

public class GetMe : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult<UserResponse>
{
  private readonly IUserService _userService;
  private readonly IContextService _contextService;

  public GetMe(IUserService aUserService, IContextService aContextService)
  {
    _userService = aUserService;
    _contextService = aContextService;
  }

  [Authorize]
  [HttpGet(Routes.Users.MeRoot)]
  public override async Task<ActionResult<UserResponse>> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    var sessionId = _contextService.GetCurrentSessionId();

    var user = await _userService.GetById(userId);

    // mark current session
    foreach (var session in user.Sessions)
      if (session.Id == sessionId)
        session.isCurrentSession = true;

    return Ok(user);
  }
}