using api.Repositories.Interfaces;
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
  private readonly IUserRepo _userRepo;
  private readonly IContextService _contextService;
  private readonly ISessionRepo _sessionRepo;

  public Logout(
    IAuthUtils authUtils,
    IUserRepo userRepo,
    IContextService contextService,
    ISessionRepo sessionRepo)
  {
    _authUtils = authUtils;
    _userRepo = userRepo;
    _sessionRepo = sessionRepo;
    _contextService = contextService;
  }

  [HttpPost(Routes.Auth.Logout)]
  public override async Task<ActionResult> HandleAsync(
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();
    if (userId != null)
    {
      var sessionId = _contextService.GetCurrentSessionId();
      var session = await _sessionRepo.GetOne(userId, sessionId);

      if (session is not null) await _sessionRepo.Delete(session);

      var user = await _userRepo.GetById(userId);
      if (user != null && user.Flags.HasFlag(Flags.TEST_ACCOUNT))
        await _userRepo.Delete(user); // delete test accounts on logout
    }
    
    _authUtils.SendLogout();

    return NoContent();
  }
}