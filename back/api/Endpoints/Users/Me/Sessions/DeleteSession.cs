using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Sessions;

public class DeleteSession : EndpointBaseAsync
  .WithRequest<Guid>
  .WithActionResult

{
  private readonly IContextService _contextService;
  private readonly ISessionService _sessionService;

  public DeleteSession(IContextService contextService, ISessionService sessionService)
  {
    _contextService = contextService;
    _sessionService = sessionService;
  }

  [HttpDelete(Routes.Users.Me.Sessions.Session)]
  public override async Task<ActionResult> HandleAsync(
    Guid sessionId, 
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    await _sessionService.Remove(userId, sessionId);

    return NoContent();
  }
}