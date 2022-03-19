using api.Security;
using api.Services.Interfaces;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Auth;

public class Logout : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult
{
  private readonly IAuthUtils _authUtils;
  private readonly IUserService _userService;
  private readonly ISessionService _sessionService;
  private readonly IContextService _contextService;


  public Logout(
    IAuthUtils authUtils,
    IUserService userService,
    ISessionService sessionService,
    IContextService contextService)
  {
    _authUtils = authUtils;
    _userService = userService;
    _sessionService = sessionService;
    _contextService = contextService;
  }

  [HttpGet(Routes.Auth.Logout)]
  public override async Task<ActionResult> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    if (userId != null)
    {
      var sessionId = _contextService.GetCurrentSessionId();
      await _sessionService.Remove(sessionId);

      var user = await _userService.GetById(userId);
      if (user != null && Flags.HasFlag(user.Flags, Flags.TEST_ACCOUNT))
        await _userService.Remove(user.Id); // delete test accounts on logout
    }

    _authUtils.SendLogout();
    return NoContent();
  }
}