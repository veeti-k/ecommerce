using api.Exceptions;
using api.Repositories.Interfaces;
using api.RequestsAndResponses.Sessions.MeDelete;
using api.Services.Interfaces;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;

namespace api.Endpoints.Users.Me.Sessions;

public class DeleteSession : EndpointBaseAsync
  .WithRequest<MeDeleteSessionsRequest>
  .WithActionResult

{
  private readonly IContextService _contextService;
  private readonly ISessionRepo _sessionRepo;

  public DeleteSession(IContextService contextService, ISessionRepo sessionRepo)
  {
    _contextService = contextService;
    _sessionRepo = sessionRepo;
  }

  [HttpDelete(Routes.Users.Me.Sessions.Session)]
  public override async Task<ActionResult> HandleAsync(
    [FromRoute] MeDeleteSessionsRequest request,
    CancellationToken cancellationToken = new CancellationToken())
  {
    var userId = _contextService.GetCurrentUserId();

    var session = await _sessionRepo.GetOne(userId, request.SessionId);
    if (session is null) throw new SessionNotFoundException(request.SessionId);

    await _sessionRepo.Delete(session);

    return NoContent();
  }
}