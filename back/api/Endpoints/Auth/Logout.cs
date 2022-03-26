using api.Models.User;
using api.Repositories.Interfaces;
using api.Security;
using api.Services.Interfaces;
using api.Specifications.Session;
using api.Utils.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Endpoints.Auth;

public class Logout : EndpointBaseAsync
  .WithoutRequest
  .WithActionResult
{
  private readonly IAuthUtils _authUtils;
  private readonly IGenericRepo<User> _userRepo;
  private readonly IContextService _contextService;
  private readonly IGenericRepo<Session> _sessionRepo;

  public Logout(
    IAuthUtils authUtils,
    IGenericRepo<User> userRepo,
    IContextService contextService,
    IGenericRepo<Session> sessionRepo)
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
      var session = await _sessionRepo
        .Specify(new SessionGetOneSpec(userId, sessionId))
        .FirstOrDefaultAsync(cancellationToken);

      if (session is not null) await _sessionRepo.Delete(session);

      var user = await _userRepo.GetById(userId);
      if (user != null && Flags.HasFlag(user.Flags, Flags.TEST_ACCOUNT))
        await _userRepo.Delete(user); // delete test accounts on logout
    }
    
    _authUtils.SendLogout();

    return NoContent();
  }
}